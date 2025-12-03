// ==========================================
// 主要 JavaScript 功能
// ==========================================

class MinecraftPluginShowcase {
    constructor() {
        this.initTheme();
        this.initNavigation();
        this.initAnimations();
        this.initUtilities();
    }

    // ==========================================
    // 主題管理
    // ==========================================

    initTheme() {
        // 從本地存儲獲取主題設定
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        // 綁定主題切換按鈕
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // 更新主題圖示
        this.updateThemeIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // 添加切換動畫
        document.body.style.transition = 'background-color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    // ==========================================
    // 導航功能
    // ==========================================

    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // 點擊導航連結時關閉選單
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // 點擊外部區域關閉選單
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // 處理滾動時的導航欄效果
        this.handleNavbarScroll();
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (navbar) {
                if (currentScrollY > 100) {
                    navbar.style.background = this.currentTheme === 'light' 
                        ? 'rgba(248, 249, 250, 0.95)' 
                        : 'rgba(45, 45, 45, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                } else {
                    navbar.style.background = '';
                    navbar.style.backdropFilter = '';
                }
            }

            lastScrollY = currentScrollY;
        });
    }

    // ==========================================
    // 動畫效果
    // ==========================================

    initAnimations() {
        // 數字動畫
        this.animateNumbers();
        
        // 滾動動畫
        this.initScrollAnimations();
        
        // 載入動畫
        this.initLoadingAnimations();
    }

    animateNumbers() {
        const statNumbers = document.querySelectorAll('[data-target]');
        
        const animateNumber = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // 格式化數字顯示
                if (target > 1000) {
                    element.textContent = (current / 1000).toFixed(1) + 'k';
                } else if (target < 10 && target % 1 !== 0) {
                    element.textContent = current.toFixed(1);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        };

        // 使用 Intersection Observer 監聽元素進入視窗
        if (statNumbers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateNumber(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            statNumbers.forEach(stat => observer.observe(stat));
        }
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 為卡片元素添加滾動動畫
        const animatedElements = document.querySelectorAll('.plugin-card, .feature-card, .stat-card, .skill-card');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    initLoadingAnimations() {
        // 頁面載入完成後移除載入動畫
        window.addEventListener('load', () => {
            const loadingElements = document.querySelectorAll('.loading');
            loadingElements.forEach(loading => {
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            });
        });
    }

    // ==========================================
    // 實用工具函數
    // ==========================================

    initUtilities() {
        // 平滑滾動
        this.initSmoothScroll();
        
        // 表單處理
        this.initFormHandling();
        
        // 圖片延遲載入
        this.initLazyLoading();
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showNotification('表單提交功能尚未實現', 'info');
            });
        });
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ==========================================
    // 通知系統
    // ==========================================

    showNotification(message, type = 'info', duration = 3000) {
        // 移除現有通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 創建新通知
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // 添加樣式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
            box-shadow: 0 4px 12px var(--shadow-color);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // 顯示動畫
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // 關閉按鈕事件
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });

        // 自動隱藏
        setTimeout(() => {
            this.hideNotification(notification);
        }, duration);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ==========================================
    // API 相關功能
    // ==========================================

    async fetchData(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            this.showNotification('資料載入失敗', 'error');
            return null;
        }
    }

    // ==========================================
    // 格式化工具
    // ==========================================

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // ==========================================
    // 錯誤處理
    // ==========================================

    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        this.showNotification('發生錯誤，請稍後再試', 'error');
    }
}

// ==========================================
// 全域事件監聽器
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 初始化主應用
    window.app = new MinecraftPluginShowcase();

    // 添加全域錯誤處理
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });

    // 性能監控
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
});

// ==========================================
// 導出工具函數供其他腳本使用
// ==========================================

window.MinecraftUtils = {
    formatNumber: (num) => window.app?.formatNumber(num) || num,
    formatDate: (date) => window.app?.formatDate(date) || date,
    showNotification: (msg, type) => window.app?.showNotification(msg, type),
    setTheme: (theme) => window.app?.setTheme(theme)
}; 