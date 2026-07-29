/**
 * Bella Essence — Premium Beauty Salon Website
 * JavaScript ES2026+ with dynamic data, GSAP animations, Three.js particles
 */

'use strict';

// =====================================================
// Global State
// =====================================================
const state = {
  services: [],
  professionals: [],
  products: [],
  gallery: [],
  testimonials: [],
  blog: [],
  faq: [],
  packages: [],
  currentTestimonial: 0,
  isDark: false,
};

// =====================================================
// Utility Functions
// =====================================================
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;
const generateStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '<i class="fas fa-star text-gold"></i>'.repeat(full)
    + (half ? '<i class="fas fa-star-half-alt text-gold"></i>' : '')
    + '<i class="far fa-star text-gold/40"></i>'.repeat(empty);
};

// =====================================================
// Toast Notification
// =====================================================
function showToast(message, duration = 3000) {
  const toast = $('#toast');
  const toastMessage = $('#toast-message');
  toastMessage.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, duration);
}

// =====================================================
// Data Loading
// =====================================================
async function loadData() {
  try {
    const [services, professionals, products, gallery, testimonials, blog, faq, packages] = await Promise.all([
      fetch('data/services.json').then(r => r.json()),
      fetch('data/professionals.json').then(r => r.json()),
      fetch('data/products.json').then(r => r.json()),
      fetch('data/gallery.json').then(r => r.json()),
      fetch('data/testimonials.json').then(r => r.json()),
      fetch('data/blog.json').then(r => r.json()),
      fetch('data/faq.json').then(r => r.json()),
      fetch('data/packages.json').then(r => r.json()),
    ]);
    state.services = services;
    state.professionals = professionals;
    state.products = products;
    state.gallery = gallery;
    state.testimonials = testimonials;
    state.blog = blog;
    state.faq = faq;
    state.packages = packages;

    renderAll();
    initBooking();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    showToast('Erro ao carregar dados. Tente recarregar a página.');
  }
}

// =====================================================
// Rendering Functions
// =====================================================
function renderAll() {
  renderServices(state.services);
  renderGallery(state.gallery);
  renderTeam(state.professionals);
  renderTestimonials(state.testimonials);
  renderPlans(state.packages);
  renderProducts(state.products);
  renderBlog(state.blog);
  renderFAQ(state.faq);
  populateBookingOptions();
}

function renderServices(services) {
  const grid = $('#services-grid');
  if (!grid || !services.length) return;
  grid.innerHTML = services.map(service => `
    <article class="service-card group">
      <div class="card-image h-64 relative">
        <img src="${service.imagem}" alt="${service.nome}" class="w-full h-full object-cover" loading="lazy">
        ${service.destaque ? '<span class="absolute top-4 left-4 bg-gold text-white text-xs px-3 py-1 rounded-full">Destaque</span>' : ''}
      </div>
      <div class="p-6">
        <span class="text-rose-gold text-xs uppercase tracking-wider font-medium">${service.categoria}</span>
        <h3 class="font-serif text-xl font-bold text-charcoal mt-2 mb-3">${service.nome}</h3>
        <p class="text-charcoal/60 text-sm leading-relaxed mb-4">${service.descricao}</p>
        <div class="flex items-center gap-4 text-sm text-charcoal/70 mb-5">
          <span class="flex items-center gap-1"><i data-lucide="clock" class="w-4 h-4"></i> ${service.duracao}</span>
          <span class="flex items-center gap-1 font-semibold text-gold"><i data-lucide="tag" class="w-4 h-4"></i> ${service.preco}</span>
        </div>
        <div class="flex gap-3">
          <a href="#agendamento" class="btn-primary flex-1 text-center py-2.5 rounded-full text-sm" data-service="${service.id}">Agendar</a>
          <button class="btn-secondary px-4 py-2.5 rounded-full text-sm" onclick="showServiceDetails('${service.id}')">Saiba Mais</button>
        </div>
      </div>
    </article>
  `).join('');
  lucide.createIcons();
}

function renderGallery(gallery) {
  const grid = $('#gallery-grid');
  if (!grid || !gallery.length) return;
  grid.innerHTML = gallery.map(item => `
    <div class="gallery-item mb-6" data-category="${item.categoria}" onclick="openLightbox('${item.url}', '${item.titulo}')">
      <img src="${item.url}" alt="${item.titulo}" class="w-full rounded-[1.5rem]" loading="lazy">
      <div class="gallery-overlay rounded-[1.5rem]">
        <p class="text-white font-medium">${item.titulo}</p>
      </div>
    </div>
  `).join('');
}

function renderTeam(team) {
  const grid = $('#team-grid');
  if (!grid || !team.length) return;
  grid.innerHTML = team.map(member => `
    <article class="team-card group">
      <div class="h-72 overflow-hidden">
        <img src="${member.foto}" alt="${member.nome}" class="w-full h-full object-cover" loading="lazy">
      </div>
      <div class="p-6">
        <h3 class="font-serif text-xl font-bold text-charcoal">${member.nome}</h3>
        <p class="text-rose-gold text-sm font-medium mb-2">${member.especialidade}</p>
        <p class="text-charcoal/60 text-sm mb-4">${member.experiencia} de experiência</p>
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          ${member.certificacoes.map(cert => `<span class="text-[10px] px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">${cert}</span>`).join('')}
        </div>
        <a href="https://instagram.com/${member.instagram.replace('@', '')}" target="_blank" rel="noopener" class="text-charcoal/60 hover:text-gold transition-colors text-sm flex items-center justify-center gap-1">
          <i class="fab fa-instagram"></i> ${member.instagram}
        </a>
      </div>
    </article>
  `).join('');
}

function renderTestimonials(testimonials) {
  const slider = $('#testimonials-slider');
  if (!slider || !testimonials.length) return;
  slider.innerHTML = testimonials.map((t, index) => `
    <div class="testimonial-slide ${index === 0 ? 'active' : 'hidden'}" data-index="${index}">
      <div class="flex justify-center mb-6">
        <img src="${t.foto}" alt="${t.nome}" class="w-20 h-20 rounded-full object-cover border-4 border-gold/20">
      </div>
      <div class="flex justify-center gap-1 mb-4">${generateStars(t.avaliacao)}</div>
      <p class="text-charcoal/80 text-lg italic leading-relaxed mb-6">"${t.texto}"</p>
      <h4 class="font-serif text-xl font-bold text-charcoal">${t.nome}</h4>
      <p class="text-rose-gold text-sm">${t.servico}</p>
    </div>
  `).join('');
  updateTestimonialVisibility();
}

function updateTestimonialVisibility() {
  $$('.testimonial-slide').forEach((slide, index) => {
    slide.classList.toggle('hidden', index !== state.currentTestimonial);
    slide.classList.toggle('active', index === state.currentTestimonial);
  });
}

function renderPlans(plans) {
  const grid = $('#plans-grid');
  if (!grid || !plans.length) return;
  grid.innerHTML = plans.map(plan => `
    <article class="plan-card ${plan.destaque ? 'featured' : ''}">
      ${plan.destaque ? '<span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs px-4 py-1 rounded-full">Mais Popular</span>' : ''}
      <h3 class="font-serif text-2xl font-bold text-charcoal mb-2">${plan.nome}</h3>
      <p class="text-gold text-3xl font-bold mb-6">${plan.preco}</p>
      <ul class="space-y-3 mb-8">
        ${plan.beneficios.map(benefit => `
          <li class="flex items-start gap-2 text-sm text-charcoal/70">
            <i data-lucide="check" class="w-4 h-4 text-success shrink-0 mt-0.5"></i>
            ${benefit}
          </li>
        `).join('')}
      </ul>
      <a href="#agendamento" class="btn-primary block text-center py-3 rounded-full">Assinar Plano</a>
    </article>
  `).join('');
  lucide.createIcons();
}

function renderProducts(products) {
  const grid = $('#products-grid');
  if (!grid || !products.length) return;
  grid.innerHTML = products.map(product => `
    <article class="product-card group">
      <div class="relative h-64 overflow-hidden">
        <img src="${product.imagem}" alt="${product.nome}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
        <button class="favorite-btn absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-charcoal/60 ${product.favorito ? 'active' : ''}" onclick="toggleFavorite('${product.id}', this)" aria-label="Favoritar">
          <i data-lucide="heart" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="p-6">
        <span class="text-rose-gold text-xs uppercase tracking-wider font-medium">${product.categoria}</span>
        <h3 class="font-serif text-lg font-bold text-charcoal mt-1 mb-2">${product.nome}</h3>
        <p class="text-charcoal/60 text-sm mb-3">${product.descricao}</p>
        <div class="flex items-center gap-1 mb-4 text-xs">${generateStars(product.avaliacao)} <span class="text-charcoal/50">(${product.avaliacao})</span></div>
        <div class="flex items-center justify-between">
          <span class="text-gold text-xl font-bold">${formatCurrency(product.preco)}</span>
          <button class="btn-primary px-4 py-2 rounded-full text-sm" onclick="addToCart('${product.id}')">Comprar</button>
        </div>
      </div>
    </article>
  `).join('');
  lucide.createIcons();
}

function renderBlog(posts) {
  const grid = $('#blog-grid');
  if (!grid || !posts.length) return;
  grid.innerHTML = posts.map(post => `
    <article class="service-card group cursor-pointer">
      <div class="card-image h-56 relative">
        <img src="${post.imagem}" alt="${post.titulo}" class="w-full h-full object-cover" loading="lazy">
      </div>
      <div class="p-6">
        <span class="text-rose-gold text-xs uppercase tracking-wider font-medium">${post.categoria}</span>
        <h3 class="font-serif text-lg font-bold text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors">${post.titulo}</h3>
        <p class="text-charcoal/60 text-sm leading-relaxed mb-4">${post.resumo}</p>
        <p class="text-charcoal/40 text-xs">${new Date(post.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
      </div>
    </article>
  `).join('');
}

function renderFAQ(faqs) {
  const container = $('#faq-container');
  if (!container || !faqs.length) return;
  container.innerHTML = faqs.map((item, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-question" aria-expanded="${index === 0}" onclick="toggleFAQ(this)">
        <span>${item.pergunta}</span>
        <i data-lucide="chevron-down" class="faq-icon w-5 h-5"></i>
      </button>
      <div class="faq-answer">
        <p class="text-charcoal/70 leading-relaxed">${item.resposta}</p>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// =====================================================
// Interactions
// =====================================================
function toggleFAQ(button) {
  const item = button.closest('.faq-item');
  const isActive = item.classList.contains('active');
  $$('.faq-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });
  if (!isActive) {
    item.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
  }
}

function toggleFavorite(productId, button) {
  button.classList.toggle('active');
  const product = state.products.find(p => p.id === productId);
  const isFavorite = button.classList.contains('active');
  showToast(isFavorite ? `${product.nome} adicionado aos favoritos` : `${product.nome} removido dos favoritos`);
}

function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  showToast(`${product.nome} adicionado ao carrinho`);
}

function showServiceDetails(serviceId) {
  const service = state.services.find(s => s.id === serviceId);
  if (!service) return;
  showToast(`${service.nome}: ${service.duracao} — ${service.preco}`);
}

function openLightbox(url, title) {
  const lightbox = $('#lightbox');
  const img = $('#lightbox-img');
  img.src = url;
  img.alt = title;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = $('#lightbox');
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

function populateBookingOptions() {
  const serviceSelect = $('#booking-service');
  const professionalSelect = $('#booking-professional');
  if (serviceSelect) {
    serviceSelect.innerHTML = '<option value="">Selecione</option>' +
      state.services.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
  }
  if (professionalSelect) {
    professionalSelect.innerHTML = '<option value="">Qualquer</option>' +
      state.professionals.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
  }
}

function initBooking() {
  const timeSelect = $('#booking-time');
  if (timeSelect) {
    const times = [];
    for (let h = 9; h <= 20; h++) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
      if (h !== 20) times.push(`${h.toString().padStart(2, '0')}:30`);
    }
    timeSelect.innerHTML = '<option value="">Selecione</option>' +
      times.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  const form = $('#booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Agendamento:', data);
      showToast('Agendamento confirmado! Em breve entraremos em contato.');
      form.reset();
    });
  }

  const dateInput = $('#booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Service pre-selection from URL
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get('servico');
  if (serviceId && serviceSelect) {
    serviceSelect.value = serviceId;
  }
}

// =====================================================
// Filters
// =====================================================
function initFilters() {
  $$('#service-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#service-filters .filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      const filtered = filter === 'todos' ? state.services : state.services.filter(s => s.categoria === filter);
      renderServices(filtered);
    });
  });

  $$('#gallery-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#gallery-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'todos' ? state.gallery : state.gallery.filter(g => g.categoria === filter);
      renderGallery(filtered);
    });
  });
}

// =====================================================
// Testimonials Slider
// =====================================================
function initTestimonials() {
  $('#prev-testimonial')?.addEventListener('click', () => {
    state.currentTestimonial = (state.currentTestimonial - 1 + state.testimonials.length) % state.testimonials.length;
    updateTestimonialVisibility();
  });
  $('#next-testimonial')?.addEventListener('click', () => {
    state.currentTestimonial = (state.currentTestimonial + 1) % state.testimonials.length;
    updateTestimonialVisibility();
  });

  setInterval(() => {
    if (state.testimonials.length) {
      state.currentTestimonial = (state.currentTestimonial + 1) % state.testimonials.length;
      updateTestimonialVisibility();
    }
  }, 6000);
}

// =====================================================
// Header Scroll Effect
// =====================================================
function initHeader() {
  const header = $('#site-header');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// =====================================================
// Mobile Menu
// =====================================================
function initMobileMenu() {
  const btn = $('#mobile-menu-btn');
  const menu = $('#mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  $$('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// =====================================================
// Theme Toggle
// =====================================================
function initTheme() {
  const toggle = $('#theme-toggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('bella-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    state.isDark = true;
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    state.isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('bella-theme', state.isDark ? 'dark' : 'light');
    updateThemeIcon();
  });
  updateThemeIcon();
}

function updateThemeIcon() {
  const toggle = $('#theme-toggle');
  if (!toggle) return;
  const icon = state.isDark ? 'sun' : 'moon';
  toggle.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i>`;
  lucide.createIcons();
}

// =====================================================
// Before/After Slider
// =====================================================
function initBeforeAfter() {
  const container = $('.before-after-container');
  if (!container) return;
  const overlay = container.querySelector('.before-after-overlay');
  const handle = container.querySelector('.slider-handle');
  let isDragging = false;

  const updateSlider = (x) => {
    const rect = container.getBoundingClientRect();
    let percentage = ((x - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    overlay.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    handle.style.left = `${percentage}%`;
  };

  const startDrag = (e) => {
    isDragging = true;
    updateSlider(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };

  const stopDrag = () => { isDragging = false; };

  const drag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSlider(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };

  container.addEventListener('mousedown', startDrag);
  container.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchend', stopDrag);
  window.addEventListener('mousemove', drag);
  window.addEventListener('touchmove', drag, { passive: false });
}

// =====================================================
// Counter Animation
// =====================================================
function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target, 10);
        const duration = 2000;
        const startTime = performance.now();
        const format = target > 1000 ? (n) => n.toLocaleString('pt-BR') : (n) => n;

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);
          counter.textContent = format(current);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// =====================================================
// GSAP Animations
// =====================================================
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero animations
  gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1.2, delay: 0.4, ease: 'power3.out' });
  gsap.from('.hero-text', { opacity: 0, y: 30, duration: 1, delay: 0.6, ease: 'power3.out' });
  gsap.from('.hero-buttons', { opacity: 0, y: 30, duration: 1, delay: 0.8, ease: 'power3.out' });

  // Scroll reveal
  const revealElements = [
    '.about-images', '.about-content',
    '#services-grid', '#gallery-grid',
    '#team-grid', '#testimonials-slider',
    '#plans-grid', '#products-grid',
    '#blog-grid', '#faq-container',
    '#contato > div > div', '#agendamento > div > div'
  ];

  revealElements.forEach(selector => {
    gsap.utils.toArray(selector).forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  });
}

// =====================================================
// Three.js Particles
// =====================================================
function initParticles() {
  if (typeof THREE === 'undefined') return;
  const canvas = $('#particles-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const particlesCount = window.innerWidth < 768 ? 40 : 80;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const gold = new THREE.Color('#D4AF37');
  const rose = new THREE.Color('#C08497');

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    const color = Math.random() > 0.5 ? gold : rose;
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  camera.position.z = 5;

  let animationId;
  let isVisible = true;

  const animate = () => {
    if (!isVisible) return;
    animationId = requestAnimationFrame(animate);
    particles.rotation.x += 0.0003;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
  };

  animate();

  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  resizeObserver.observe(document.body);

  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible) animate();
    else cancelAnimationFrame(animationId);
  });
}

// =====================================================
// Newsletter
// =====================================================
function initNewsletter() {
  const form = $('#newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Inscrição confirmada! Em breve você recebe nossas novidades.');
    form.reset();
  });
}

// =====================================================
// Lightbox Events
// =====================================================
function initLightbox() {
  $('#lightbox-close')?.addEventListener('click', closeLightbox);
  $('#lightbox')?.addEventListener('click', (e) => {
    if (e.target === $('#lightbox')) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// =====================================================
// Smooth Scroll & Active Nav
// =====================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('text-gold', link.getAttribute('href') === `#${entry.target.id}`);
          link.classList.toggle('text-charcoal', link.getAttribute('href') !== `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

// =====================================================
// Service Worker Registration (PWA)
// =====================================================
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg.scope))
      .catch(err => console.error('Erro ao registrar Service Worker:', err));
  }
}

// =====================================================
// Initialize Everything
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  loadData().then(() => {
    initFilters();
    initTestimonials();
  });
  lucide.createIcons();
  initHeader();
  initMobileMenu();
  initTheme();
  initBeforeAfter();
  initCounters();
  initGSAP();
  initParticles();
  initNewsletter();
  initLightbox();
  initSmoothScroll();
  initActiveNav();
  registerServiceWorker();
});

// Expose helper functions for inline handlers
window.toggleFAQ = toggleFAQ;
window.toggleFavorite = toggleFavorite;
window.addToCart = addToCart;
window.showServiceDetails = showServiceDetails;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
