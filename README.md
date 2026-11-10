# Vitrine de produtos Econverse

Página de vitrine desenvolvida com React, TypeScript e Sass. Os produtos são carregados primeiro do JSON público da Econverse; se o navegador bloquear a chamada externa, a página usa a cópia em `public/produtos.json`. Clicar na imagem ou em **COMPRAR** abre o modal com os dados daquele produto.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Tecnologias

- React e TypeScript
- Sass
- Vite

O modal pode ser fechado pelo botão, clicando fora dele ou pressionando `Esc`. A página inclui navegação responsiva, rótulos acessíveis e metadados básicos para mecanismos de busca.
