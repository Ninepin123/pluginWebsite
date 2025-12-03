// ==========================================
// 插件列表頁面功能
// ==========================================

class PluginManager {
    constructor() {
        this.plugins = [];
        this.categories = [];
        this.filteredPlugins = [];
        this.currentFilters = {
            search: '',
            category: '',
            version: '',
            sort: 'name'
        };
        this.init();
    }

    async init() {
        await this.loadPluginData();
        this.setupEventListeners();
        this.renderPlugins();
        this.renderCategoryOptions();
        this.hideLoading();
    }

    // ==========================================
    // 數據載入
    // ==========================================

    async loadPluginData() {
        try {
            console.log('Attempting to load plugins.json...');
            const response = await fetch('/data/plugins.json');
            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Loaded data:', data);

            if (!data.plugins || !Array.isArray(data.plugins)) {
                throw new Error('Invalid data format: plugins array not found');
            }

            this.plugins = data.plugins;
            this.categories = data.categories || [];
            this.filteredPlugins = [...this.plugins];

            console.log(`Successfully loaded ${this.plugins.length} plugins`);
        } catch (error) {
            console.error('Failed to load plugin data:', error);
            console.error('Error details:', error.message);
            this.showError(`無法載入插件數據: ${error.message}`);
        }
    }

    // ==========================================
    // 事件監聽器
    // ==========================================

    setupEventListeners() {
        // 搜尋輸入
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // 分類篩選
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }

        // 版本篩選
        const versionFilter = document.getElementById('versionFilter');
        if (versionFilter) {
            versionFilter.addEventListener('change', (e) => {
                this.currentFilters.version = e.target.value;
                this.applyFilters();
            });
        }

        // 排序
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.applyFilters();
            });
        }

        // 搜尋按鈕
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }
    }

    // ==========================================
    // 篩選功能
    // ==========================================

    applyFilters() {
        let filtered = [...this.plugins];

        // 搜尋篩選
        if (this.currentFilters.search) {
            filtered = filtered.filter(plugin => 
                plugin.name.toLowerCase().includes(this.currentFilters.search) ||
                plugin.shortDescription.toLowerCase().includes(this.currentFilters.search) ||
                plugin.description.toLowerCase().includes(this.currentFilters.search)
            );
        }

        // 分類篩選
        if (this.currentFilters.category) {
            filtered = filtered.filter(plugin => 
                plugin.category === this.currentFilters.category
            );
        }

        // 版本篩選
        if (this.currentFilters.version) {
            filtered = filtered.filter(plugin => 
                plugin.mcVersion.includes(this.currentFilters.version)
            );
        }

        // 排序
        this.sortPlugins(filtered);

        this.filteredPlugins = filtered;
        this.renderPlugins();
    }

    sortPlugins(plugins) {
        switch (this.currentFilters.sort) {
            case 'name':
                plugins.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'updated':
                plugins.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
                break;
            // 移除 downloads 和 rating 的排序選項，或保留但不依賴這些數據
            case 'downloads':
            case 'rating':
                // 改為按名稱排序
                plugins.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }

    // ==========================================
    // 渲染功能
    // ==========================================
    renderCategoryOptions() {
        const categoryFilter = document.getElementById('categoryFilter');
        if (!categoryFilter || !this.categories) return;

        // 清空現有選項（保留"所有分類"）
        categoryFilter.innerHTML = '<option value="">所有分類</option>';
        
        // 添加從 JSON 載入的分類
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }
    renderPlugins() {
        const pluginsGrid = document.getElementById('pluginsGrid');
        const noResults = document.getElementById('noResults');

        if (!pluginsGrid) return;

        if (this.filteredPlugins.length === 0) {
            pluginsGrid.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
            return;
        }

        if (noResults) noResults.style.display = 'none';

        pluginsGrid.innerHTML = this.filteredPlugins.map(plugin => 
            this.createPluginCard(plugin)
        ).join('');

        // 重新應用動畫
        this.reapplyAnimations();
    }

    createPluginCard(plugin) {
        const categoryInfo = this.getCategoryInfo(plugin.category);

        return `
            <div class="plugin-card" data-plugin-id="${plugin.id}">
                <div class="plugin-card-header">
                    <div class="plugin-card-icon">
                        ${plugin.iconImage ? 
                            `<img src="${plugin.iconImage}" alt="${plugin.name}">` : 
                            plugin.icon
                        }
                    </div>
                </div>
                <div class="plugin-card-body">
                    <h3 class="plugin-card-title">${plugin.name}</h3>
                    <p class="plugin-card-description">${plugin.shortDescription}</p>
                    
                    <div class="plugin-card-meta">
                        <span class="plugin-category">#${categoryInfo.name}</span>
                        <span style="font-size: 0.8rem; color: #666; font-family: var(--font-mono);">${plugin.mcVersion}</span>
                    </div>
                </div>
                
                <div class="plugin-card-footer">
                    <a href="plugin-detail.html?id=${plugin.id}" class="btn btn-primary btn-small">
                        DETAILS_VIEW
                    </a>
                </div>
            </div>
        `;
    }

    getCategoryInfo(categoryId) {
        return this.categories.find(cat => cat.id === categoryId) || 
               { name: '未知', description: '' };
    }

    // ==========================================
    // 輔助功能
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
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return '昨天';
        } else if (diffDays < 7) {
            return `${diffDays} 天前`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} 週前`;
        } else {
            return date.toLocaleDateString('zh-TW');
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    showError(message) {
        const pluginsGrid = document.getElementById('pluginsGrid');
        if (pluginsGrid) {
            pluginsGrid.innerHTML = `
                <div class="error-message">
                    <div class="error-icon">⚠️</div>
                    <h3>載入失敗</h3>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        重新載入
                    </button>
                </div>
            `;
        }
        this.hideLoading();
    }

    reapplyAnimations() {
        const cards = document.querySelectorAll('.plugin-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }

    // ==========================================
    // 公開方法
    // ==========================================

    getPlugin(id) {
        return this.plugins.find(plugin => plugin.id === id);
    }

    getFeaturedPlugins() {
        return this.plugins.filter(plugin => plugin.featured);
    }

    getPluginsByCategory(categoryId) {
        return this.plugins.filter(plugin => plugin.category === categoryId);
    }
}

// ==========================================
// 首頁插件載入器
// ==========================================

class HomePageLoader {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadFeaturedPlugins();
    }

    async loadFeaturedPlugins() {
        try {
            const response = await fetch('/data/plugins.json');
            const data = await response.json();
            const featuredPlugins = data.plugins.filter(plugin => plugin.featured).slice(0, 3);

            this.renderFeaturedPlugins(featuredPlugins);
        } catch (error) {
            console.error('Failed to load featured plugins:', error);
        }
    }

    renderFeaturedPlugins(plugins) {
        const featuredGrid = document.querySelector('.featured-grid');
        if (!featuredGrid) return;

        featuredGrid.innerHTML = plugins.map(plugin => `
            <div class="plugin-card">
                <div class="plugin-card-header">
                    <div class="plugin-card-icon">
                        ${plugin.iconImage ? 
                            `<img src="${plugin.iconImage}" alt="${plugin.name}">` : 
                            plugin.icon
                        }
                    </div>
                </div>
                <div class="plugin-card-body">
                    <h3 class="plugin-card-title">${plugin.name}</h3>
                    <p class="plugin-card-description">${plugin.shortDescription}</p>
                    
                    <div class="plugin-card-meta">
                        <span class="plugin-category">#${plugin.category}</span>
                    </div>
                </div>
                
                <div class="plugin-card-footer">
                    <a href="plugin-detail.html?id=${plugin.id}" class="btn btn-secondary btn-small">
                        DETAILS_VIEW
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================
// 初始化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 檢查頁面元素來決定初始化哪個功能
    const pluginsGrid = document.getElementById('pluginsGrid');
    const heroSection = document.querySelector('.hero');

    if (pluginsGrid) {
        // 插件列表頁
        window.pluginManager = new PluginManager();
    } else if (heroSection) {
        // 首頁
        window.homePageLoader = new HomePageLoader();
    }
});

// 導出類別供其他腳本使用
window.PluginManager = PluginManager;
window.HomePageLoader = HomePageLoader;