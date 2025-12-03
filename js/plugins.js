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
        // 硬編碼的插件數據
        this.plugins = [
            {
                "id": "DungeonSystem",
                "name": "DungeonSystem",
                "shortDescription": "完整的副本系統，簡單設定，一看就上手",
                "description": "這是一個包含副本設定，派對系統，復活系統，排行榜等多功能系統的副本插件，讓您的玩家有新奇的副本體驗",
                "category": "dungeon",
                "version": "1.0.3",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-07-03",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/dungeon.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/6Fe8FfFlQr4?si=H-cdjveuOikO4SNm",
                "features": [
                    "完整的config檔案設定",
                    "自定義怪物生成，副本波次",
                    "復活系統設定",
                    "相容於oraxen，可以自行修改副本入場鑰匙材質",
                    "完全兼容mythicmob",
                    "排行榜系統，各種placeHolder變量",
                    "副本鑰匙冷卻完全可以自定義，並提供額外指令可以做為vip用途"
                ],
                "versions": [
                    {
                        "version": "1.0.3",
                        "date": "2025-07-03",
                        "changes": "新增總副本數排行"
                    },
                    {
                        "version": "1.0.2",
                        "date": "2025-06-12",
                        "changes": "新增波次副本類型，新增復活系統開關"
                    },
                    {
                        "version": "1.0.0",
                        "date": "2025-03-05",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "MailBox",
                "name": "信箱系統",
                "shortDescription": "簡單好用的信箱系統",
                "description": "想要發送獎勵給玩家卻又怕有玩家沒上線無法領取?不想要拿著物品一個一個打指令發送給玩家?那我們就是你要的選擇",
                "category": "utility",
                "version": "1.1.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-05-03",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/mailbox.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/mxuXVx01KOk?si=RhO2gBc1AWVJ3hhL",
                "features": [
                    "不需要額外設定，安裝即可使用",
                    "支援MySQL",
                    "完整的API可以調用",
                    "支援線下玩家物品發送"
                ],
                "versions": [
                    {
                        "version": "1.1.0",
                        "date": "2025-07-12",
                        "changes": "添加MySQL資料儲存功能"
                    },
                    {
                        "version": "1.0.0",
                        "date": "2025-03-05",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "playerPointBot",
                "name": "點數機器人",
                "shortDescription": "透過DC給予玩家贊助點數",
                "description": "依賴discord SRV，新增功能來讓你可以在DC就給予玩家贊助點數，用手機也能即時處理贊助需求",
                "category": "discord",
                "version": "1.0.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-04-02",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/pointBot.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/RGnQizQIJoQ?si=MzyJNo_itekqMK2B",
                "features": [
                    "不需要額外設定，安裝即可使用",
                    "config檔案調整顯示文字",
                    "記錄點數操作，誰給了多少點一目了然"
                ],
                "versions": [
                    {
                        "version": "1.0.0",
                        "date": "2025-04-02",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "tomestone",
                "name": "墓碑插件",
                "shortDescription": "玩家死亡後，在原地產生墓碑",
                "description": "想要生存噴裝，但怕被清理物品插件清掉嗎？那你一定要看看這個",
                "category": "utility",
                "version": "1.0.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-03-01",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/tombstone.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/Q5z52AYFRuA?si=mqteEj1sc2J8bbc7",
                "features": [
                    "不需要額外設定，安裝即可使用",
                    "提供額外指令來讓玩家可以遠端獲取墓碑內物品",
                    "自己只能開自己的墓碑，有效避免糾紛"
                ],
                "versions": [
                    {
                        "version": "1.0.0",
                        "date": "2025-03-02",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "mmoitemUpdater",
                "name": "mmoItem自動更新",
                "shortDescription": "修改mmoitems後，自動更新玩家所擁有的裝備武器",
                "description": "武器裝備太強勢需要修調整得一位一位玩家回收?這個插件可以幫助你",
                "category": "utility",
                "version": "1.0.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-07-18",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/mmoitemUpdater.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/Hu4avV1FYmk?si=SJaDohAs2uXh41EY",
                "features": [
                    "自動更新武器裝備，讓管理員不必忙於回收道具",
                    "提供指令讓管理員強制更新其他玩家的道具",
                    "免費下載於 https://github.com/Ninepin123/mmoitemUpdater"
                ],
                "versions": [
                    {
                        "version": "1.0.0",
                        "date": "2025-07-18",
                        "changes": "初版製作完成"
                    }
                ]
            }
        ];

        this.categories = [
            {
                "id": "dungeon",
                "name": "副本系統",
                "description": "副本、Mythicmob相關插件"
            },
            {
                "id": "utility",
                "name": "實用工具",
                "description": "輔助功能和實用工具插件"
            },
            {
                "id": "discord",
                "name": "DC機器人",
                "description": "串接遊戲內與dc的互動"
            },
            {
                "id": "admin",
                "name": "管理工具",
                "description": "伺服器管理和維護插件"
            }
        ];

        this.filteredPlugins = [...this.plugins];
        console.log(`Successfully loaded ${this.plugins.length} plugins (hardcoded)`);
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
        // 硬編碼的插件數據
        const allPlugins = [
            {
                "id": "DungeonSystem",
                "name": "DungeonSystem",
                "shortDescription": "完整的副本系統，簡單設定，一看就上手",
                "description": "這是一個包含副本設定，派對系統，復活系統，排行榜等多功能系統的副本插件，讓您的玩家有新奇的副本體驗",
                "category": "dungeon",
                "version": "1.0.3",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-07-03",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/dungeon.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/6Fe8FfFlQr4?si=H-cdjveuOikO4SNm",
                "features": [
                    "完整的config檔案設定",
                    "自定義怪物生成，副本波次",
                    "復活系統設定",
                    "相容於oraxen，可以自行修改副本入場鑰匙材質",
                    "完全兼容mythicmob",
                    "排行榜系統，各種placeHolder變量",
                    "副本鑰匙冷卻完全可以自定義，並提供額外指令可以做為vip用途"
                ],
                "versions": [
                    {
                        "version": "1.0.3",
                        "date": "2025-07-03",
                        "changes": "新增總副本數排行"
                    },
                    {
                        "version": "1.0.2",
                        "date": "2025-06-12",
                        "changes": "新增波次副本類型，新增復活系統開關"
                    },
                    {
                        "version": "1.0.0",
                        "date": "2025-03-05",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "MailBox",
                "name": "信箱系統",
                "shortDescription": "簡單好用的信箱系統",
                "description": "想要發送獎勵給玩家卻又怕有玩家沒上線無法領取?不想要拿著物品一個一個打指令發送給玩家?那我們就是你要的選擇",
                "category": "utility",
                "version": "1.1.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-05-03",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/mailbox.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/mxuXVx01KOk?si=RhO2gBc1AWVJ3hhL",
                "features": [
                    "不需要額外設定，安裝即可使用",
                    "支援MySQL",
                    "完整的API可以調用",
                    "支援線下玩家物品發送"
                ],
                "versions": [
                    {
                        "version": "1.1.0",
                        "date": "2025-07-12",
                        "changes": "添加MySQL資料儲存功能"
                    },
                    {
                        "version": "1.0.0",
                        "date": "2025-03-05",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "playerPointBot",
                "name": "點數機器人",
                "shortDescription": "透過DC給予玩家贊助點數",
                "description": "依賴discord SRV，新增功能來讓你可以在DC就給予玩家贊助點數，用手機也能即時處理贊助需求",
                "category": "discord",
                "version": "1.0.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-04-02",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/pointBot.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/RGnQizQIJoQ?si=MzyJNo_itekqMK2B",
                "features": [
                    "不需要額外設定，安裝即可使用",
                    "config檔案調整顯示文字",
                    "記錄點數操作，誰給了多少點一目了然"
                ],
                "versions": [
                    {
                        "version": "1.0.0",
                        "date": "2025-04-02",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "tomestone",
                "name": "墓碑插件",
                "shortDescription": "玩家死亡後，在原地產生墓碑",
                "description": "想要生存噴裝，但怕被清理物品插件清掉嗎？那你一定要看看這個",
                "category": "utility",
                "version": "1.0.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-03-01",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/tombstone.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/Q5z52AYFRuA?si=mqteEj1sc2J8bbc7",
                "features": [
                    "不需要額外設定，安裝即可使用",
                    "提供額外指令來讓玩家可以遠端獲取墓碑內物品",
                    "自己只能開自己的墓碑，有效避免糾紛"
                ],
                "versions": [
                    {
                        "version": "1.0.0",
                        "date": "2025-03-02",
                        "changes": "初版製作完成"
                    }
                ]
            },
            {
                "id": "mmoitemUpdater",
                "name": "mmoItem自動更新",
                "shortDescription": "修改mmoitems後，自動更新玩家所擁有的裝備武器",
                "description": "武器裝備太強勢需要修調整得一位一位玩家回收?這個插件可以幫助你",
                "category": "utility",
                "version": "1.0.0",
                "mcVersion": "1.20.6 - 1.21.4",
                "lastUpdate": "2025-07-18",
                "icon": "💰",
                "iconImage": "/assets/images/plugins/mmoitemUpdater.png",
                "featured": true,
                "demoVideo": "https://www.youtube.com/embed/Hu4avV1FYmk?si=SJaDohAs2uXh41EY",
                "features": [
                    "自動更新武器裝備，讓管理員不必忙於回收道具",
                    "提供指令讓管理員強制更新其他玩家的道具",
                    "免費下載於 https://github.com/Ninepin123/mmoitemUpdater"
                ],
                "versions": [
                    {
                        "version": "1.0.0",
                        "date": "2025-07-18",
                        "changes": "初版製作完成"
                    }
                ]
            }
        ];

        const featuredPlugins = allPlugins.filter(plugin => plugin.featured).slice(0, 3);

        this.renderFeaturedPlugins(featuredPlugins);
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