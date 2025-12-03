// ==========================================
// 插件詳情頁面功能
// ==========================================

class PluginDetailPage {
    constructor() {
        this.plugin = null;
        this.relatedPlugins = [];
        this.init();
    }

    async init() {
        const pluginId = this.getPluginIdFromUrl();
        if (!pluginId) {
            this.redirectToPluginsList();
            return;
        }

        await this.loadPluginData(pluginId);
        if (this.plugin) {
            this.renderPluginDetails();
            this.loadRelatedPlugins();
        } else {
            this.showNotFound();
        }
    }

    // ==========================================
    // URL 和路由處理
    // ==========================================

    getPluginIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    redirectToPluginsList() {
        window.location.href = 'plugins.html';
    }

    // ==========================================
    // 數據載入
    // ==========================================

    async loadPluginData(pluginId) {
        // 硬編碼的數據
        const data = {
            "plugins": [
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
            ],
            "categories": [
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
            ]
        };
        
        this.plugin = data.plugins.find(plugin => plugin.id === pluginId);
        this.allPlugins = data.plugins;
        this.categories = data.categories;
    }

    // ==========================================
    // 渲染插件詳情
    // ==========================================

    renderPluginDetails() {
        this.updatePageTitle();
        this.renderPluginHeader();
        this.renderPluginContent();
        this.renderSidebar();
        this.setupEventListeners();
    }

    updatePageTitle() {
        document.title = `${this.plugin.name} - 專業 Minecraft 插件開發`;
        const titleElement = document.getElementById('pluginTitle');
        if (titleElement) {
            titleElement.textContent = `${this.plugin.name} - 專業 Minecraft 插件開發`;
        }
    }

    renderPluginHeader() {
        // 更新插件圖示
        const iconElement = document.getElementById('pluginIcon');
        if (iconElement) {
            if (this.plugin.iconImage) {
                iconElement.src = this.plugin.iconImage;
                iconElement.alt = this.plugin.name + ' 圖示';
                iconElement.style.display = 'block';
            } else {
                iconElement.innerHTML = `<div style="font-size: 4rem;">${this.plugin.icon}</div>`;
            }
        }

        // 更新插件名稱
        const nameElement = document.getElementById('pluginName');
        if (nameElement) {
            nameElement.textContent = this.plugin.name;
        }

        // 更新簡短描述
        const shortDescElement = document.getElementById('pluginShortDesc');
        if (shortDescElement) {
            shortDescElement.textContent = this.plugin.shortDescription;
        }

        // 更新分類
        const categoryElement = document.getElementById('pluginCategory');
        if (categoryElement) {
            const categoryInfo = this.getCategoryInfo(this.plugin.category);
            categoryElement.textContent = categoryInfo.name;
        }

        // 更新版本
        const versionElement = document.getElementById('pluginVersion');
        if (versionElement) {
            versionElement.textContent = `v${this.plugin.version}`;
        }

        // 移除評分顯示
        const ratingElement = document.getElementById('pluginRating');
        if (ratingElement) {
            ratingElement.style.display = 'none';
        }
    }

    renderPluginContent() {
        // 更新 demo 影片
        const demoVideo = document.getElementById('demoVideo');
        if (demoVideo && this.plugin.demoVideo) {
            demoVideo.src = this.plugin.demoVideo;
        }

        // 更新詳細描述
        const descriptionElement = document.getElementById('pluginDescription');
        if (descriptionElement) {
            descriptionElement.innerHTML = `<p>${this.plugin.description}</p>`;
        }

        // 更新功能特色
        const featuresElement = document.getElementById('pluginFeatures');
        if (featuresElement && this.plugin.features) {
            featuresElement.innerHTML = this.plugin.features
                .map(feature => `<li><span class="feature-icon">✅</span>${feature}</li>`)
                .join('');
        }
    }

    renderSidebar() {
        // 更新側邊欄資訊 - 移除評分相關顯示
        this.updateElement('sidebarVersion', `v${this.plugin.version}`);
        this.updateElement('sidebarMcVersion', this.plugin.mcVersion);
        
        // 隱藏評分顯示
        const sidebarRating = document.getElementById('sidebarRating');
        if (sidebarRating) {
            sidebarRating.parentElement.style.display = 'none';
        }
        
        this.updateElement('sidebarDevelopmentTime', '2-3 週'); // 可以根據需要調整
        this.updateElement('sidebarLastUpdate', this.formatDate(this.plugin.lastUpdate));

        // 渲染開發歷程
        this.renderVersionHistory();
    }

    renderVersionHistory() {
        const versionHistoryElement = document.getElementById('versionHistory');
        if (versionHistoryElement && this.plugin.versions) {
            versionHistoryElement.innerHTML = this.plugin.versions
                .map(version => `
                    <div class="version-item">
                        <div class="version-header">
                            <span class="version-number">v${version.version}</span>
                            <span class="version-date">${this.formatDate(version.date)}</span>
                        </div>
                        <div class="version-changes">${version.changes}</div>
                    </div>
                `).join('');
        }
    }

    // ==========================================
    // 相關插件
    // ==========================================

    loadRelatedPlugins() {
        // 找到同分類的其他插件
        this.relatedPlugins = this.allPlugins
            .filter(plugin => 
                plugin.category === this.plugin.category && 
                plugin.id !== this.plugin.id
            )
            .slice(0, 3);

        this.renderRelatedPlugins();
    }

    renderRelatedPlugins() {
        const relatedElement = document.getElementById('relatedPlugins');
        if (relatedElement && this.relatedPlugins.length > 0) {
            relatedElement.innerHTML = this.relatedPlugins
                .map(plugin => `
                    <div class="related-plugin">
                        <div class="related-plugin-icon">${plugin.icon}</div>
                        <div class="related-plugin-info">
                            <h4 class="related-plugin-name">${plugin.name}</h4>
                            <p class="related-plugin-desc">${plugin.shortDescription}</p>
                            <div class="related-plugin-meta">
                                <span class="related-plugin-category">${this.getCategoryInfo(plugin.category).name}</span>
                            </div>
                        </div>
                        <a href="plugin-detail.html?id=${plugin.id}" class="related-plugin-link">
                            查看
                        </a>
                    </div>
                `).join('');
        } else if (relatedElement) {
            relatedElement.innerHTML = '<p class="no-related">暫無相關插件</p>';
        }
    }

    // ==========================================
    // 事件處理
    // ==========================================

    setupEventListeners() {
        // 下載按鈕點擊追蹤
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.trackDownload();
            });
        }

        // GitHub 按鈕點擊追蹤
        const githubBtn = document.getElementById('githubBtn');
        if (githubBtn) {
            githubBtn.addEventListener('click', () => {
                this.trackGitHubVisit();
            });
        }

        // 複製下載連結
        this.setupCopyToClipboard();

        // 版本歷史展開/收縮
        this.setupVersionToggle();
    }

    trackDownload() {
        console.log(`Download tracked for plugin: ${this.plugin.name}`);
        window.MinecraftUtils?.showNotification('開始下載...', 'success');
    }

    trackGitHubVisit() {
        console.log(`GitHub visit tracked for plugin: ${this.plugin.name}`);
    }

    setupCopyToClipboard() {
        // 創建複製下載連結的功能
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn-secondary';
            copyBtn.innerHTML = '<span class="btn-icon">📋</span>複製連結';
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyToClipboard(this.plugin.downloadUrl);
            });
            
            downloadBtn.parentNode.appendChild(copyBtn);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            window.MinecraftUtils?.showNotification('連結已複製到剪貼簿', 'success');
        }).catch(() => {
            window.MinecraftUtils?.showNotification('複製失敗', 'error');
        });
    }

    setupVersionToggle() {
        const versionItems = document.querySelectorAll('.version-item');
        versionItems.forEach(item => {
            const header = item.querySelector('.version-header');
            if (header) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    const changes = item.querySelector('.version-changes');
                    if (changes) {
                        changes.style.display = changes.style.display === 'none' ? 'block' : 'none';
                    }
                });
            }
        });
    }

    // ==========================================
    // 輔助方法
    // ==========================================

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    getCategoryInfo(categoryId) {
        return this.categories?.find(cat => cat.id === categoryId) || 
               { name: '未知', description: '' };
    }

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

    showNotFound() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="container">
                    <div class="not-found">
                        <div class="not-found-icon">😔</div>
                        <h1>插件未找到</h1>
                        <p>抱歉，您尋找的插件不存在或已被移除。</p>
                        <a href="plugins.html" class="btn btn-primary">返回插件列表</a>
                    </div>
                </div>
            `;
        }
    }

    // ==========================================
    // SEO 和分享功能
    // ==========================================

    updateMetaTags() {
        // 更新頁面 meta 標籤以改善 SEO
        this.updateMetaTag('description', this.plugin.description);
        this.updateMetaTag('keywords', `minecraft,plugin,${this.plugin.name},${this.plugin.category}`);
        
        // Open Graph 標籤
        this.updateMetaTag('og:title', this.plugin.name);
        this.updateMetaTag('og:description', this.plugin.shortDescription);
        this.updateMetaTag('og:type', 'website');
    }

    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (name.startsWith('og:')) {
                meta.setAttribute('property', name);
            } else {
                meta.setAttribute('name', name);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    createShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'share-buttons';
        shareContainer.innerHTML = `
            <h4>分享這個插件</h4>
            <div class="share-button-group">
                <button class="share-btn" data-platform="twitter">Twitter</button>
                <button class="share-btn" data-platform="facebook">Facebook</button>
                <button class="share-btn" data-platform="reddit">Reddit</button>
                <button class="share-btn" data-platform="copy">複製連結</button>
            </div>
        `;

        // 插入到側邊欄
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.appendChild(shareContainer);
            this.setupShareButtons();
        }
    }

    setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                this.shareToPlatform(platform);
            });
        });
    }

    shareToPlatform(platform) {
        const url = window.location.href;
        const text = `查看這個很棒的 Minecraft 插件：${this.plugin.name}`;
        
        switch (platform) {
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                break;
            case 'reddit':
                window.open(`https://reddit.com/submit?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
                break;
            case 'copy':
                this.copyToClipboard(url);
                break;
        }
    }
}

// ==========================================
// 附加樣式
// ==========================================

const detailPageStyles = `
    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--primary-color);
        text-decoration: none;
        margin-bottom: 2rem;
        font-weight: 500;
        transition: color 0.3s ease;
    }

    .back-link:hover {
        color: var(--primary-hover);
    }

    .plugin-hero {
        padding: 3rem 2rem;
        background: var(--bg-secondary);
        border-bottom: 2px solid var(--border-color);
    }

    .plugin-header {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    }

    .plugin-icon img {
        width: 120px;
        height: 120px;
        border-radius: 16px;
        box-shadow: 0 8px 32px var(--shadow-color);
    }

    .plugin-name {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }

    .plugin-short-desc {
        font-size: 1.2rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
    }

    .plugin-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .plugin-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .plugin-content {
        padding: 3rem 2rem;
        background: var(--bg-primary);
    }

    .content-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .video-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        margin-bottom: 2rem;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 12px;
    }

    .features-list {
        list-style: none;
        padding: 0;
    }

    .features-list li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background: var(--bg-secondary);
        border-radius: 8px;
    }

    .feature-icon {
        font-size: 1.2rem;
    }

    .installation-steps {
        display: grid;
        gap: 1rem;
    }

    .step {
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: 12px;
        border-left: 4px solid var(--primary-color);
    }

    .step-number {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .step h3 {
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }

    .step p {
        color: var(--text-secondary);
        margin: 0;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .info-card,
    .versions-card,
    .related-card {
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: 12px;
        border: 2px solid var(--border-color);
    }

    .card-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-light);
    }

    .info-item:last-child {
        border-bottom: none;
    }

    .info-label {
        color: var(--text-secondary);
        font-weight: 500;
    }

    .info-value {
        color: var(--text-primary);
        font-weight: 600;
    }

    .version-item {
        margin-bottom: 1rem;
        padding: 1rem;
        background: var(--bg-primary);
        border-radius: 8px;
        border: 1px solid var(--border-light);
    }

    .version-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .version-number {
        font-weight: bold;
        color: var(--primary-color);
    }

    .version-date {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .version-changes {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.4;
    }

    .related-plugin {
        display: grid;
        grid-template-columns: 40px 1fr auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        background: var(--bg-primary);
        border-radius: 8px;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    }

    .related-plugin:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px var(--shadow-color);
    }

    .related-plugin-icon {
        font-size: 1.5rem;
    }

    .related-plugin-name {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 0.25rem;
        color: var(--text-primary);
    }

    .related-plugin-desc {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 0.25rem;
    }

    .related-plugin-meta {
        display: flex;
        gap: 0.5rem;
        font-size: 0.8rem;
    }

    .related-plugin-category {
        background: var(--bg-tertiary);
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        white-space: nowrap;
    }

    .related-plugin-link {
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        font-size: 0.9rem;
        transition: background 0.3s ease;
    }

    .related-plugin-link:hover {
        background: var(--primary-hover);
    }

    .not-found {
        text-align: center;
        padding: 4rem 2rem;
    }

    .not-found-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .not-found h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }

    .not-found p {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
        .plugin-header {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1rem;
        }

        .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .plugin-actions {
            justify-content: center;
        }

        .step {
            grid-template-columns: 1fr;
        }

        .step-number {
            margin: 0 auto;
        }
    }
`;

// 注入樣式
const detailStyleElement = document.createElement('style');
detailStyleElement.textContent = detailPageStyles;
document.head.appendChild(detailStyleElement);

// ==========================================
// 初始化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 檢查頁面元素來決定是否初始化
    if (document.getElementById('pluginName')) {
        window.pluginDetailPage = new PluginDetailPage();
    }
});

// 導出類別
window.PluginDetailPage = PluginDetailPage;