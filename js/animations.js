// ==========================================
// 動畫效果管理
// ==========================================

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupParticleEffects();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }

    // ==========================================
    // 滾動顯示動畫
    // ==========================================

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.createScrollObserver(observerOptions);
    }

    createScrollObserver(options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        // 監聽需要動畫的元素
        const animationElements = document.querySelectorAll(
            '.plugin-card, .feature-card, .stat-card, .contact-card, .skill-card, .timeline-item'
        );

        animationElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // 添加額外的動畫類別
        element.classList.add('animated');
    }

    // ==========================================
    // 粒子效果
    // ==========================================

    setupParticleEffects() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            this.createMinecraftParticles(heroSection);
        }
    }

    createMinecraftParticles(container) {
        const particleCount = 20;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle();
            container.appendChild(particle);
            particles.push(particle);
            this.animateParticle(particle);
        }

        return particles;
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'minecraft-particle';
        
        // 隨機選擇粒子類型
        const types = ['grass', 'stone', 'gold', 'diamond'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--minecraft-${type});
            opacity: 0.6;
            pointer-events: none;
            border-radius: 2px;
            box-shadow: 0 0 4px rgba(0,0,0,0.2);
        `;

        // 隨機位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        return particle;
    }

    animateParticle(particle) {
        const duration = 3000 + Math.random() * 2000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = startX + (Math.random() - 0.5) * 20;
        const endY = startY + (Math.random() - 0.5) * 20;

        particle.animate([
            { 
                left: startX + '%', 
                top: startY + '%',
                opacity: 0.6,
                transform: 'rotate(0deg) scale(1)'
            },
            { 
                left: endX + '%', 
                top: endY + '%',
                opacity: 0,
                transform: 'rotate(360deg) scale(0.5)'
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            // 重新開始動畫
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = '0.6';
            setTimeout(() => this.animateParticle(particle), Math.random() * 1000);
        };
    }

    // ==========================================
    // 懸停效果
    // ==========================================

    setupHoverEffects() {
        this.setupCardHoverEffects();
        this.setupButtonHoverEffects();
        this.setupImageHoverEffects();
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.plugin-card, .feature-card, .stat-card, .contact-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHoverRipple(e.target, e);
            });

            card.addEventListener('mouseleave', (e) => {
                this.removeHoverRipple(e.target);
            });
        });
    }

    createHoverRipple(element, event) {
        const ripple = document.createElement('div');
        ripple.className = 'hover-ripple';
        
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--primary-color-alpha) 0%, transparent 70%);
            border-radius: 50%;
            left: ${x - 10}px;
            top: ${y - 10}px;
            pointer-events: none;
            animation: ripple-expand 0.6s ease-out;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);
    }

    removeHoverRipple(element) {
        const ripples = element.querySelectorAll('.hover-ripple');
        ripples.forEach(ripple => {
            ripple.style.animation = 'ripple-fade 0.3s ease-out forwards';
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 300);
        });
    }

    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addButtonGlow(button);
            });

            button.addEventListener('mouseleave', () => {
                this.removeButtonGlow(button);
            });
        });
    }

    addButtonGlow(button) {
        button.style.boxShadow = `0 0 20px var(--primary-color-alpha), ${button.style.boxShadow || ''}`;
    }

    removeButtonGlow(button) {
        button.style.boxShadow = button.style.boxShadow.replace(/0 0 20px var\(--primary-color-alpha\),?\s?/, '');
    }

    setupImageHoverEffects() {
        const images = document.querySelectorAll('.plugin-card-icon, .avatar-img');
        
        images.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1) rotate(5deg)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // ==========================================
    // 載入動畫
    // ==========================================

    setupLoadingAnimations() {
        this.createTypingEffect();
        this.createCounterAnimations();
        this.createProgressBarAnimations();
    }

    createTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typing) || 50;
            
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';
            
            this.typeText(element, text, speed);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                // 移除游標
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    createCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current);
        }, 16);
    }

    createProgressBarAnimations() {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 500);
                    
                    observer.unobserve(entry.target);
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // ==========================================
    // 頁面切換動畫
    // ==========================================

    createPageTransition() {
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // 只對內部連結添加過渡效果
                if (href.startsWith('/') || href.startsWith('./') || href.includes(window.location.hostname)) {
                    e.preventDefault();
                    this.transitionToPage(href);
                }
            });
        });
    }

    transitionToPage(url) {
        // 創建過渡遮罩
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-gradient);
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(overlay);

        // 顯示遮罩
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        // 導航到新頁面
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }
}

// ==========================================
// CSS 動畫定義
// ==========================================

const animationStyles = `
    @keyframes ripple-expand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes ripple-fade {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes float-up {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes bounce-in {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slide-in-left {
        0% {
            opacity: 0;
            transform: translateX(-50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slide-in-right {
        0% {
            opacity: 0;
            transform: translateX(50px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animated {
        animation-fill-mode: both;
    }

    .float-up {
        animation: float-up 0.8s ease;
    }

    .bounce-in {
        animation: bounce-in 0.6s ease;
    }

    .slide-in-left {
        animation: slide-in-left 0.6s ease;
    }

    .slide-in-right {
        animation: slide-in-right 0.6s ease;
    }

    /* 懸停效果 */
    .plugin-card,
    .feature-card,
    .stat-card,
    .contact-card {
        transition: all 0.3s ease;
    }

    .plugin-card:hover,
    .feature-card:hover,
    .stat-card:hover,
    .contact-card:hover {
        transform: translateY(-10px);
    }

    /* 按鈕動畫 */
    .btn {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }

    .btn:hover::before {
        width: 300px;
        height: 300px;
    }

    /* 圖片效果 */
    .plugin-card-icon,
    .avatar-img {
        transition: transform 0.3s ease;
    }

    /* 載入動畫 */
    .loading-pulse {
        animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
`;

// 注入動畫樣式
const styleElement = document.createElement('style');
styleElement.textContent = animationStyles;
document.head.appendChild(styleElement);

// ==========================================
// 初始化動畫管理器
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// 導出動畫管理器
window.AnimationManager = AnimationManager; 