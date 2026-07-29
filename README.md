# Bella Essence — Salão de Beleza Premium

Website moderno, sofisticado e elegante para um salão de beleza de alto padrão, transmitindo luxo, confiança, bem-estar e exclusividade desde o primeiro acesso.

## 🎯 Objetivo

Criar uma experiência digital premium inspirada em grandes marcas de beleza e luxo internacional, facilitando o agendamento online e a apresentação dos serviços do salão.

## ✨ Funcionalidades Implementadas

- **Home impactante** com hero fullscreen, gradientes, partículas e glassmorphism
- **Menu fixo transparente** com efeito blur ao rolar a página
- **Seção Sobre** com história, missão, visão, valores, contadores animados e certificações
- **Serviços Premium** com cards, filtros por categoria, duração, preço e botões de agendamento
- **Antes e Depois** com slider interativo (arrastar para comparar)
- **Galeria estilo Pinterest** com filtros, hover sofisticado e lightbox
- **Equipe** com fotos, especialidades, certificações e Instagram
- **Depoimentos** em slider automático com avaliações 5 estrelas
- **Planos e Pacotes** (Bronze, Prata, Ouro, VIP) com destaque para o mais popular
- **Agendamento Online** com formulário completo (serviço, profissional, data, horário)
- **Loja Virtual** com produtos, favoritos, avaliações e carrinho
- **Blog** com artigos organizados por categoria
- **FAQ** com acordeão interativo
- **Contato** com mapa, redes sociais e informações completas
- **Rodapé** com newsletter e crédito ao desenvolvedor
- **Dark Mode** opcional com persistência local
- **PWA Ready** com manifesto e service worker
- **SEO avançado** com meta tags, Open Graph, schema semântico e acessibilidade
- **Animações** com GSAP + ScrollTrigger e Three.js (partículas leves)
- **Totalmente responsivo** e otimizado para mobile
- **Lighthouse friendly** (semântica, acessibilidade, performance, boas práticas)

## 📁 Estrutura de Arquivos

```
/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos premium, Glassmorphism, animações e dark mode
├── js/
│   └── main.js             # Interatividade, dados dinâmicos, animações e PWA
├── data/
│   ├── services.json       # Serviços oferecidos
│   ├── professionals.json  # Equipe de profissionais
│   ├── products.json       # Produtos da loja virtual
│   ├── gallery.json        # Galeria de fotos
│   ├── testimonials.json   # Depoimentos de clientes
│   ├── blog.json           # Artigos do blog
│   ├── faq.json            # Perguntas frequentes
│   └── packages.json       # Planos e pacotes
├── icons/
│   ├── icon-192x192.png    # Ícone PWA 192x192
│   └── icon-512x512.png    # Ícone PWA 512x512
├── manifest.json           # Configuração PWA
├── service-worker.js       # Cache para funcionamento offline
└── README.md               # Documentação do projeto
```

## 🚀 Como Usar / URLs de Entrada

A página principal é acessível em:

```
/index.html
```

### Parâmetros de URL

- `?servico=svc-id` — pré-seleciona um serviço no formulário de agendamento
  - Exemplo: `index.html?servico=svc-hidratacao`

## 🎨 Sistema de Design

### Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| Fundo | `#FFFDFB` | Background principal (cream) |
| Primária | `#D4AF37` | Dourado — CTAs, destaques, títulos |
| Secundária | `#C08497` | Rose Gold — subtítulos, detalhes |
| Detalhes | `#F5E6CC` | Bordas, divisores, cards |
| Texto | `#2B2B2B` | Texto principal (charcoal) |
| Sucesso | `#22C55E` | Confirmações, WhatsApp |

### Tipografia

- **Títulos:** Playfair Display
- **Textos:** Poppins
- **Interface:** Inter

## 🛠 Tecnologias Utilizadas

- HTML5 semântico
- CSS3 moderno (variáveis, flexbox, grid, backdrop-filter, animações)
- Tailwind CSS (via CDN)
- JavaScript ES2026+ (módulos inline, fetch, IntersectionObserver)
- GSAP + ScrollTrigger (animações de scroll)
- Three.js (partículas sutis de fundo)
- Lucide Icons + Font Awesome
- Google Fonts
- Service Worker (PWA)

## 📦 Modelos de Dados

### Serviço

```json
{
  "id": "svc-hidratacao",
  "nome": "Hidratação Premium",
  "categoria": "Cabelos",
  "descricao": "Tratamento profundo...",
  "imagem": "https://...",
  "duracao": "60 minutos",
  "preco": "R$ 180,00",
  "destaque": true
}
```

### Produto

```json
{
  "id": "prod-shampoo",
  "nome": "Shampoo Revitalizante",
  "categoria": "Shampoo",
  "preco": 89.90,
  "avaliacao": 4.8,
  "imagem": "https://...",
  "descricao": "Limpeza suave...",
  "favorito": false
}
```

### Profissional

```json
{
  "id": "prof-ana",
  "nome": "Ana Carolina",
  "especialidade": "Colorista Master",
  "foto": "https://...",
  "instagram": "@ana.beauty",
  "experiencia": "12 anos",
  "certificacoes": ["Wella Professionals", "L'Oréal Professionnel"]
}
```

## 🔄 Próximos Passos Recomendados

1. Substituir as imagens placeholder do Unsplash por fotos reais do salão
2. Configurar integração real com WhatsApp Business API
3. Implementar backend de agendamento com Google Calendar / e-mail
4. Adicionar gateway de pagamento para loja virtual e planos
5. Criar páginas individuais para cada serviço
6. Implementar autenticação e área do cliente
7. Adicionar mais seções de "Planos e Pacotes" personalizados (Noiva, Debutante, etc.)
8. Otimizar imagens para WebP e lazy loading avançado
9. Adicionar schema.org JSON-LD para SEO local
10. Configurar Google Analytics e Pixel

## 📌 Notas de Implementação

- O site é **100% estático (frontend-only)**. O agendamento e a loja virtual são preparados para integração futura com backend / API externa.
- Dados dinâmicos são carregados via `fetch` a partir dos arquivos JSON em `/data/`.
- Dark mode alterna classes CSS e persiste em `localStorage`.
- Service Worker faz cache dos principais assets para experiência PWA.
- Acessibilidade: skip link, ARIA labels, focus visible, semantic HTML e redução de movimento.

## 👤 Crédito

Criado e desenvolvido por **Pedro Correia Lopes Filho**.

## 📄 Licença

© 2026 Bella Essence. Todos os direitos reservados.
