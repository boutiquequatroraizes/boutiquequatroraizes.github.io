# Quatro Raízes — Loja de Paisagismo

Projeto React (Vite) da loja virtual Quatro Raízes: catálogo público com
carrinho e pagamento via Google Pay, mais uma área administrativa protegida
por login para gerenciar o estoque.

## Como rodar no seu computador

1. Tenha o [Node.js](https://nodejs.org) instalado (versão 18 ou superior).
2. Abra a pasta do projeto no terminal (ou use o terminal integrado do VS Code).
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
5. Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).
   - Para testar em um tablet/celular na mesma rede Wi-Fi, acesse
     `http://SEU_IP_LOCAL:5173` (o terminal do Vite mostra esse endereço
     como "Network").

## Acessando a área administrativa

A área de administração **não tem nenhum link visível no site público** —
isso foi proposital, conforme pedido. Para acessar, digite a URL diretamente:

```
http://localhost:5173/admin
```

Você será redirecionado para a tela de login. Credenciais padrão:

- **Usuário:** `admin`
- **Senha:** `quatroraizes2026`

Troque essas credenciais antes de publicar o site — elas estão no arquivo
`src/context/AuthContext.jsx`, no topo do arquivo.

⚠️ **Importante sobre segurança:** este projeto é 100% front-end (sem
servidor próprio), então esse login serve para afastar visitantes casuais,
não para proteger dados sensíveis de verdade. Qualquer pessoa com
conhecimento técnico pode abrir o código-fonte no navegador e encontrar a
senha. Para uma loja com mais de um administrador ou informações mais
sensíveis, o passo natural é usar autenticação de servidor (Firebase Auth,
Supabase Auth, Auth0, ou seu próprio backend).

## O que você pode fazer na área admin

- **Ver o estoque atual**: quantidade de cada planta, alertas de estoque
  baixo (5 unidades ou menos) e esgotadas.
- **Editar a quantidade em estoque** direto na tabela (digite e clique fora
  do campo, ou aperte Enter).
- **Adicionar novas plantas**, com foto, nome, nome científico, categoria,
  preço, estoque, descrição e curiosidade.
- **Editar ou excluir** plantas existentes.

Tudo que você cadastra aparece automaticamente na loja pública.

## Onde os dados ficam salvos

Este projeto guarda os dados no **localStorage do navegador** (não em um
banco de dados). Isso significa:

- É rápido para desenvolver e não exige backend.
- Os dados só existem **naquele navegador/dispositivo específico**. Se você
  cadastrar uma planta no seu notebook, ela não vai aparecer automaticamente
  no celular de um cliente, nem em outro navegador.
- Fotos são convertidas em base64 e guardadas junto com o resto — funciona
  bem para um catálogo pequeno, mas o navegador tem um limite de alguns MB.

**Para uma loja real, publicada e usada por várias pessoas**, o próximo
passo natural é trocar o armazenamento local por um backend/banco de dados
(por exemplo Supabase, Firebase, ou uma API própria em Node.js) e subir as
fotos para um serviço de armazenamento de arquivos (Cloudinary, S3, Supabase
Storage). A estrutura do projeto já foi pensada para isso: toda a lógica de
dados está isolada em `src/context/PlantsContext.jsx` — é ali que você troca
o localStorage por chamadas de API, sem precisar tocar nos componentes.

## Pagamento com Google Pay

O carrinho já tem um botão do Google Pay funcional, mas configurado em
**ambiente de TESTE (`TEST`)** — o fluxo completo funciona, porém nenhuma
cobrança real é feita. Para publicar de verdade:

1. Cadastre a loja no [Google Pay & Wallet Console](https://pay.google.com/business/console).
2. No arquivo `src/components/CartDrawer.jsx`, troque
   `environment: 'TEST'` por `environment: 'PRODUCTION'`.
3. Troque o gateway de exemplo (`gateway: 'example'`,
   `gatewayMerchantId: 'exampleGatewayMerchantId'`) pelas credenciais reais
   do seu processador de pagamento (Stripe, Cielo, Mercado Pago, Adyen
   etc.) — é ele quem efetivamente processa a cobrança.

Há também um botão "Finalizar pedido sem Google Pay" como alternativa,
para clientes que preferem outro método (ou cujo navegador não suporta
Google Pay).

## Redes sociais

Os ícones de Instagram, TikTok, YouTube e LinkedIn estão no rodapé do site,
apontando para links de exemplo. Troque as URLs em
`src/components/SocialIcons.jsx`.

## Estrutura do projeto

```
src/
  components/     componentes reutilizáveis da loja pública
  context/        estado global: plantas, carrinho e autenticação
  data/           catálogo inicial (usado só na primeira execução) e categorias
  pages/          páginas (Home pública + páginas da área /admin)
  styles/         CSS da área administrativa
  index.css       CSS global e tokens de design da loja pública
```

## Personalizando o visual

As cores, fontes e espaçamentos estão centralizados como variáveis CSS no
topo do arquivo `src/index.css` (`:root { --mata: ...; --terra: ...; }`).
Trocar esses valores já muda a aparência em todo o site.

## Build para produção

```
npm run build
```

Isso gera a pasta `dist/`, que pode ser publicada em qualquer hospedagem de
site estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages etc.).
Lembre-se: como o estoque fica em localStorage, cada visitante do site
publicado veria apenas o catálogo salvo no próprio navegador dele — combine
com um backend antes de considerar isso uma loja "em produção" de verdade.

## Publicando no GitHub Pages

> **Caso especial deste projeto:** se o seu repositório se chama
> `SEU_USUARIO.github.io` (uma "página de usuário/organização"), o site é
> publicado **direto na raiz** do domínio
> (`https://SEU_USUARIO.github.io/`), e não numa subpasta. O
> `vite.config.js` já está configurado para isso (`base: '/'`). Se em vez
> disso você criar um repositório com outro nome (uma "página de projeto"),
> o site fica em `https://SEU_USUARIO.github.io/nome-do-repo/` e você
> precisa trocar o `base` em `vite.config.js` para `'/nome-do-repo/'`.

1. **Crie o repositório no GitHub** e suba o projeto (se ainda não fez):
   ```bash
   git init
   git add .
   git commit -m "primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   git push -u origin main
   ```

2. **Instale as dependências** (o pacote de deploy já está listado no
   `package.json`):
   ```bash
   npm install
   ```

3. **Publique:**
   ```bash
   npm run deploy
   ```
   Esse comando builda o projeto e envia a pasta `dist/` para uma branch
   chamada `gh-pages` no seu repositório (criada automaticamente).

4. **Ative o GitHub Pages no repositório:**
   - Vá em **Settings → Pages** no repositório no GitHub.
   - Em "Build and deployment", escolha **Source: Deploy from a branch**.
   - Em "Branch", selecione **gh-pages** e a pasta **/ (root)**.
   - Salve. Em alguns minutos o site estará no ar.

5. **Sempre que quiser atualizar o site publicado**, depois de editar o
   projeto, rode `npm run deploy` de novo.

### Por que existe o arquivo `scripts/copy-404.js`?

O GitHub Pages não tem um servidor configurável, então quando alguém acessa
uma URL "profunda" como `/admin` diretamente (sem passar pela home), ele não
sabe que essa rota existe dentro do seu app React e mostraria uma página de
erro. O script `postbuild` copia automaticamente `index.html` para
`404.html` a cada build — um truque padrão para Single Page Apps que faz o
React Router assumir o controle e mostrar a página certa mesmo em acessos
diretos, inclusive a área `/admin`.

### Atenção: seu repositório será público (ou você paga pelo privado)

O GitHub Pages gratuito publica o site a partir de um repositório, e o
código-fonte desse repositório fica visível para quem tiver acesso a ele.
Como a senha de admin deste projeto está escrita diretamente no código
(em `src/context/AuthContext.jsx`), **qualquer pessoa que veja o
repositório no GitHub também vê a senha**. Isso é razoável para portfólio e
testes, mas antes de usar isso com dados reais de clientes:

- Deixe o repositório **privado** (GitHub permite repositórios privados
  gratuitos, mas o GitHub Pages gratuito com repositório privado exige uma
  conta paga — confirme o plano atual no próprio GitHub), **ou**
- Troque a autenticação por algo real (Firebase Auth, Supabase Auth etc.),
  como já mencionado na seção sobre a área administrativa.
