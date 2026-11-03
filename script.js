/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initProgressBar();
    initHeader();
    initMobileMenu();
    initThemeToggle();
    initSmoothScroll();
    initScrollTop();
    initCounters();
    initPortfolioFilter();
    initTestimonialsSlider();
    initFAQ();
    initContactForm();
    initNewsletter();
    initPricingToggle();
    initModal();
    initScrollAnimations();
});

/* ============================================
   CANVAS DE PARTÍCULAS
   ============================================ */
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connect() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connect();
        animationId = requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/* ============================================
   BARRA DE PROGRESSO
   ============================================ */
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ============================================
   HEADER SCROLL
   ============================================ */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Atualiza link ativo baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   MENU MOBILE
   ============================================ */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navList) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

/* ============================================
   ALTERNAR TEMA
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
}

/* ============================================
   SCROLL SUAVE
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   BOTÃO VOLTAR AO TOPO
   ============================================ */
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   CONTADORES ANIMADOS
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (counters.length === 0) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   FILTRO DO PORTFÓLIO
   ============================================ */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/* ============================================
   CARROSSEL DE DEPOIMENTOS
   ============================================ */
function initTestimonialsSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Cria os dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    
    startAutoSlide();
    
    // Pausa ao passar o mouse
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos
            faqItems.forEach(i => {
                i.classList.remove('active');
                const a = i.querySelector('.faq-answer');
                if (a) a.style.maxHeight = null;
            });
            
            // Abre o clicado (se não estava ativo)
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ============================================
   FORMULÁRIO DE CONTATO
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validação dos campos
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const phone = form.querySelector('#phone');
        const subject = form.querySelector('#subject');
        const message = form.querySelector('#message');
        const terms = form.querySelector('#terms');
        
        // Reset erros
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
        form.querySelectorAll('.error-message').forEach(e => e.textContent = '');
        
        // Valida nome
        if (name.value.trim().length < 3) {
            showError(name, 'Nome deve ter pelo menos 3 caracteres');
            isValid = false;
        }
        
        // Valida email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Email inválido');
            isValid = false;
        }
        
        // Valida telefone (opcional)
        if (phone.value && phone.value.replace(/\D/g, '').length < 10) {
            showError(phone, 'Telefone inválido');
            isValid = false;
        }
        
        // Valida assunto
        if (!subject.value) {
            showError(subject, 'Selecione um assunto');
            isValid = false;
        }
        
        // Valida mensagem
        if (message.value.trim().length < 10) {
            showError(message, 'Mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        // Valida termos
        if (!terms.checked) {
            const status = document.getElementById('formStatus');
            status.className = 'form-status error';
            status.textContent = 'Você precisa aceitar os termos';
            isValid = false;
        }
        
        if (isValid) {
            // Simula envio
            const status = document.getElementById('formStatus');
            status.className = 'form-status success';
            status.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
            form.reset();
            
            setTimeout(() => {
                status.className = 'form-status';
                status.textContent = '';
            }, 5000);
        }
    });
    
    // Máscara de telefone
    const phone = form.querySelector('#phone');
    if (phone) {
        phone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 3) {
                value = value.slice(0, 3) + ') ' + value.slice(3);
            }
            if (value.length > 10) {
                value = value.slice(0, 10) + '-' + value.slice(10);
            }
            
            e.target.value = value;
        });
    }
    
    function showError(input, message) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.add('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) errorMsg.textContent = message;
        }
    }
}

/* ============================================
   NEWSLETTER
   ============================================ */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(input.value)) {
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '✓ Inscrito!';
            btn.style.background = '#10b981';
            btn.style.color = 'white';
            input.value = '';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        }
    });
}

/* ============================================
   ALTERNADOR DE PREÇOS
   ============================================ */
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const priceValues = document.querySelectorAll('.price-value');
    
    if (!toggle) return;
    
    toggle.addEventListener('change', () => {
        const isYearly = toggle.checked;
        
        priceValues.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const yearly = price.getAttribute('data-yearly');
            const target = isYearly ? yearly : monthly;
            
            // Animação de contagem
            const current = parseInt(price.textContent);
            const targetNum = parseInt(target);
            const duration = 500;
            const steps = 30;
            const increment = (targetNum - current) / steps;
            let step = 0;
            
            const interval = setInterval(() => {
                step++;
                price.textContent = Math.round(current + increment * step);
                if (step >= steps) {
                    price.textContent = target;
                    clearInterval(interval);
                }
            }, duration / steps);
        });
    });
}

/* ============================================
   MODAL
   ============================================ */
function initModal() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const ctaBtn = document.getElementById('ctaBtn');
    
    if (!modal) return;
    
    // Abre modal após 3 segundos na primeira visita
    if (!sessionStorage.getItem('modalShown')) {
        setTimeout(() => {
            modal.classList.add('active');
            sessionStorage.setItem('modalShown', 'true');
        }, 3000);
    }
    
    // Botão CTA abre modal
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }
    
    // Fecha modal
    function closeModal() {
        modal.classList.remove('active');
    }
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ============================================
   ANIMAÇÕES DE SCROLL
   ============================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Anima elementos ao aparecerem
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .stat-box, .pricing-card, .faq-item'
    );
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        elementObserver.observe(el);
    });
}

/* ============================================
   EFEITO PARALLAX SUAVE
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

/* ============================================
   EFEITO DE DIGITAÇÃO (OPCIONAL)
   ============================================ */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ============================================
   LOG NO CONSOLE
   ============================================ */
console.log('%c🚀 NovaTech', 'font-size: 30px; font-weight: bold; color: #6366f1;');
console.log('%cDesenvolvido com ❤️ usando HTML, CSS e JavaScript', 'font-size: 14px; color: #6b7280;');
console.log('%c© 2026 Todos os direitos reservados', 'font-size: 12px; color: #9ca3af;');
