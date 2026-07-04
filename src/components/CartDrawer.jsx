import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import CategoryIcon from './CategoryIcon'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// ---------------------------------------------------------------------------
// Integração com Google Pay — AMBIENTE DE TESTE (TEST)
// ---------------------------------------------------------------------------
// Isto é um exemplo funcional: o botão aparece e o fluxo de pagamento
// funciona de ponta a ponta, mas nenhuma cobrança real é feita.
//
// Para publicar em produção você precisa:
//   1. Cadastrar a loja no Google Pay & Wallet Console.
//   2. Trocar `environment: 'TEST'` por `'PRODUCTION'` abaixo.
//   3. Substituir o gateway de exemplo ('example' / 'exampleGatewayMerchantId')
//      pelas credenciais reais do seu processador de pagamento
//      (Stripe, Adyen, Cielo, Mercado Pago etc.) — é ele quem processa a
//      cobrança de fato; o Google Pay só tokeniza o cartão do cliente.
// ---------------------------------------------------------------------------

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX', 'ELO']
  },
  tokenizationSpecification: {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'example',
      gatewayMerchantId: 'exampleGatewayMerchantId'
    }
  }
}

function getIsReadyToPayRequest() {
  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [baseCardPaymentMethod]
  }
}

function getPaymentDataRequest(amount) {
  const req = getIsReadyToPayRequest()
  req.transactionInfo = {
    totalPriceStatus: 'FINAL',
    totalPrice: amount.toFixed(2),
    currencyCode: 'BRL',
    countryCode: 'BR'
  }
  req.merchantInfo = { merchantName: 'Quatro Raízes' }
  return req
}

export default function CartDrawer() {
  const { items, subtotal, removeItem, isOpen, setIsOpen, clearCart } = useCart()
  const [form, setForm] = useState({ nome: '', endereco: '', telefone: '' })
  const [orderId, setOrderId] = useState(null)
  const [gpayReady, setGpayReady] = useState(false)

  const gpayContainerRef = useRef(null)
  const paymentsClientRef = useRef(null)
  const formRef = useRef(null)

  function validateForm() {
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity()
      return false
    }
    if (items.length === 0) {
      alert('Adicione ao menos uma planta ao carrinho antes de finalizar.')
      return false
    }
    return true
  }

  function finishOrder() {
    const id = 'QR-' + Math.floor(100000 + Math.random() * 899999)
    setOrderId(id)
    clearCart()
  }

  function handleFallbackPay() {
    if (!validateForm()) return
    finishOrder()
  }

  function handleGooglePayClick() {
    if (!validateForm()) return
    const client = paymentsClientRef.current
    if (!client) return
    client
      .loadPaymentData(getPaymentDataRequest(subtotal))
      .then(() => {
        // Em produção: envie paymentData.paymentMethodData.tokenizationData.token
        // para o seu backend, que processa a cobrança real junto ao gateway.
        finishOrder()
      })
      .catch((err) => {
        if (err?.statusCode !== 'CANCELED') {
          alert('Não foi possível concluir o pagamento pelo Google Pay. Tente novamente ou use o botão alternativo.')
        }
      })
  }

  // Carrega o script do Google Pay uma única vez e cria o botão.
  useEffect(() => {
    function initClient() {
      if (!window.google?.payments || paymentsClientRef.current) return
      const client = new window.google.payments.api.PaymentsClient({ environment: 'TEST' })
      paymentsClientRef.current = client
      client
        .isReadyToPay(getIsReadyToPayRequest())
        .then((res) => {
          if (res.result) setGpayReady(true)
        })
        .catch(() => setGpayReady(false))
    }

    if (window.google?.payments) {
      initClient()
      return
    }

    const existing = document.getElementById('gpay-script')
    if (existing) {
      existing.addEventListener('load', initClient)
      return () => existing.removeEventListener('load', initClient)
    }

    const script = document.createElement('script')
    script.id = 'gpay-script'
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    script.async = true
    script.onload = initClient
    document.body.appendChild(script)
  }, [])

  // Cria/atualiza o botão visual do Google Pay dentro do container.
  useEffect(() => {
    if (!gpayReady || !paymentsClientRef.current || !gpayContainerRef.current) return
    gpayContainerRef.current.innerHTML = ''
    const button = paymentsClientRef.current.createButton({
      onClick: handleGooglePayClick,
      buttonColor: 'black',
      buttonType: 'pay',
      buttonSizeMode: 'fill'
    })
    gpayContainerRef.current.appendChild(button)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpayReady, subtotal, items.length])

  function closeDrawer() {
    setIsOpen(false)
    setOrderId(null)
  }

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={closeDrawer} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="drawerTitle">
        <div className="drawer-head">
          <h2 id="drawerTitle">Seu carrinho</h2>
          <button className="drawer-close" onClick={closeDrawer} aria-label="Fechar carrinho">
            ×
          </button>
        </div>

        <div className="drawer-body">
          {orderId ? (
            <div className="confirm-panel">
              <span className="tag">Pedido confirmado</span>
              <h3>Suas raízes estão a caminho 🌱</h3>
              <div className="order-id">{orderId}</div>
              <p>
                Enviamos os detalhes de entrega para o telefone informado. Nossa equipe entra em
                contato para confirmar a janela de entrega.
              </p>
            </div>
          ) : items.length === 0 ? (
            <p className="drawer-empty">Seu carrinho está vazio. Escolha uma planta no catálogo.</p>
          ) : (
            <>
              {items.map(({ plant, qty }) => (
                <div className="drawer-item" key={plant.id}>
                  <div className="di-icon">
                    {plant.image ? (
                      <img src={plant.image} alt={plant.name} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 4 }} />
                    ) : (
                      <CategoryIcon category={plant.category} />
                    )}
                  </div>
                  <div className="di-info">
                    <div className="di-name">{plant.name}</div>
                    <div className="di-meta">
                      <span className="tag">
                        Qtd: {qty} &middot; {currency.format(plant.price)}
                      </span>
                      <button type="button" className="di-remove" onClick={() => removeItem(plant.id)}>
                        remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <form className="drawer-form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="fld-nome">Nome completo</label>
                  <input
                    id="fld-nome"
                    required
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    placeholder="Como podemos te chamar"
                  />
                </div>
                <div>
                  <label htmlFor="fld-endereco">Endereço de entrega</label>
                  <input
                    id="fld-endereco"
                    required
                    value={form.endereco}
                    onChange={(e) => setForm((f) => ({ ...f, endereco: e.target.value }))}
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>
                <div>
                  <label htmlFor="fld-telefone">Telefone / WhatsApp</label>
                  <input
                    id="fld-telefone"
                    required
                    type="tel"
                    value={form.telefone}
                    onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {!orderId && items.length > 0 && (
          <div className="drawer-foot">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>{currency.format(subtotal)}</strong>
            </div>
            <div id="gpay-container" ref={gpayContainerRef} />
            <button type="button" className="fallback-link" onClick={handleFallbackPay}>
              Finalizar pedido sem Google Pay
            </button>
            <p className="gpay-note">Pagamento processado com segurança pelo Google Pay.</p>
          </div>
        )}
      </aside>
    </>
  )
}
