# Studio Primus — Versão HTML/CSS/JS Puro

Site estático em HTML + CSS + JavaScript puro (sem frameworks, sem build).

## Estrutura

```
studio-primus-vanilla/
├── index.html      # Markup completo do site
├── styles.css      # Todos os estilos (design system + responsivo)
├── script.js       # Menu, scroll, schedule, reviews, form WhatsApp
├── assets/         # Imagens
│   ├── hero-fighter.jpg
│   ├── gym-interior.jpg
│   ├── training-1.jpg
│   ├── training-2.jpg
│   └── champion.jpg
└── README.md
```

## Dependências externas (via CDN)

- **Google Fonts**: Bebas Neue + Inter
- **Lucide Icons**: https://unpkg.com/lucide (ícones)

Nenhum `npm install` necessário. Tudo é carregado via `<script>` / `<link>` no HTML.

## Como rodar

Basta abrir `index.html` no navegador, ou servir com qualquer servidor estático:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

## Como hospedar

Faça upload da pasta inteira em qualquer um destes serviços (todos gratuitos):
- Netlify — arraste a pasta em app.netlify.com/drop
- Vercel — `vercel deploy`
- GitHub Pages
- Cloudflare Pages
- Hospedagem tradicional (cPanel, etc.)

## Personalizar

- **Telefone/WhatsApp**: procure por `5518999999999` e `(18) 99999-9999` em `index.html` e `script.js`
- **Endereço**: em `index.html`, seção "LOCATION" e footer
- **Instagram**: procure `studioprimus`
- **Horários das aulas**: edite o array `schedule` em `script.js`
- **Depoimentos**: edite o array `reviews` em `script.js`
- **Cores**: edite as variáveis CSS em `:root` no topo de `styles.css`
