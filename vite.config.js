import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Este repositório se chama "boutiquequatroraizes.github.io" — é o formato
// especial de "página de usuário/organização" do GitHub Pages, que publica
// DIRETO NA RAIZ do domínio (https://boutiquequatroraizes.github.io/),
// e não dentro de uma subpasta como os repositórios normais.
// Por isso o base fica em '/' (o padrão do Vite).
//
// Se um dia você criar outro repositório NORMAL (nome diferente de
// usuario.github.io) para outro projeto, aí sim o base precisa ser
// '/nome-do-repositorio/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})
