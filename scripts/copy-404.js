// GitHub Pages não tem servidor configurável: quando alguém acessa uma URL
// "profunda" como /admin diretamente (em vez de navegar a partir da home),
// o GitHub Pages não sabe que essa rota existe e devolve o arquivo 404.html.
//
// O truque padrão para Single Page Apps é fazer o 404.html ser uma cópia do
// index.html. Assim, o GitHub Pages "acha" que deu erro, mas na prática
// carrega o app React normalmente — e o React Router, olhando a URL do
// navegador, exibe a página correta (inclusive /admin).
//
// Este script roda automaticamente depois do `npm run build` (ver o script
// "postbuild" no package.json).
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')

copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))

console.log('✔ dist/404.html criado a partir de dist/index.html (fallback de rotas para o GitHub Pages).')
