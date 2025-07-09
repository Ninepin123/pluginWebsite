# 專業 Minecraft 插件開發作品集

一個專業的 Minecraft 插件開發作品集網站，展示高品質的插件開發能力和專業技術實力。使用純 HTML、CSS 和 JavaScript 構建，具備響應式設計和主題切換功能，適合作為接案展示和客戶諮詢平台。

## 🌟 功能特色

### 🎨 設計特色
- **Minecraft 風格設計** - 採用遊戲內建築方塊美學
- **深色/淺色主題** - 完整的主題切換系統
- **響應式布局** - 完美適配各種設備和螢幕尺寸
- **現代化 UI** - 流暢的動畫效果和交互體驗

### 🔧 核心功能
- **作品展示** - 專業的插件開發作品集展示
- **技術實力** - 展示代碼品質和開發能力
- **專案詳情** - 完整的開發流程和技術說明
- **客戶服務** - 專業的接案諮詢和報價系統

### 📱 技術特點
- **專業展示** - 突出技術實力和開發經驗
- **高效能** - 優化的載入速度和流暢體驗
- **SEO 優化** - 有利於搜尋引擎收錄，提升曝光度
- **行動優先** - 完美支援各種裝置的瀏覽體驗

## 📂 項目結構

```
minecraftPluginShowCase/
├── index.html                 # 首頁
├── plugins.html               # 插件列表頁
├── about.html                 # 關於頁面
├── plugin-detail.html         # 插件詳情頁模板
├── css/
│   ├── style.css             # 主要樣式檔案
│   ├── themes.css            # 主題系統
│   └── plugin-detail.css     # 詳情頁樣式
├── js/
│   ├── main.js               # 核心功能
│   ├── animations.js         # 動畫效果
│   ├── plugins.js            # 插件管理
│   └── plugin-detail.js      # 詳情頁功能
├── data/
│   └── plugins.json          # 插件數據
├── assets/
│   ├── icons/                # 圖示檔案
│   └── images/               # 圖片資源
└── README.md                 # 說明文件
```

## 🚀 快速開始

### 1. 下載項目
```bash
git clone https://github.com/yourusername/minecraft-plugin-showcase.git
cd minecraft-plugin-showcase
```

### 2. 本地預覽
使用任何 HTTP 伺服器來預覽網站：

**方法一：Python 內建伺服器**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**方法二：Node.js serve**
```bash
npx serve .
```

**方法三：Live Server (VS Code 擴展)**
- 安裝 Live Server 擴展
- 右鍵點擊 index.html 選擇 "Open with Live Server"

### 3. 訪問網站
打開瀏覽器訪問 `http://localhost:8000`

## 📝 自定義內容

### 修改個人資訊
編輯 `about.html` 檔案中的個人資訊：
- 開發者名稱和介紹
- 技能和專長
- 聯絡方式
- 開發歷程

### 添加插件
編輯 `data/plugins.json` 檔案：

```json
{
  "plugins": [
    {
      "id": "your-plugin-id",
      "name": "插件名稱",
      "shortDescription": "簡短描述",
      "description": "詳細描述",
      "category": "economy|pvp|utility|fun|admin",
      "version": "1.0.0",
      "mcVersion": "1.20.x",
      "downloads": 0,
      "rating": 5.0,
      "fileSize": "1.0 MB",
      "lastUpdate": "2024-01-15",
      "icon": "💰",
      "featured": true,
      "githubUrl": "https://github.com/...",
      "downloadUrl": "assets/downloads/...",
      "demoVideo": "https://www.youtube.com/embed/...",
      "features": ["功能1", "功能2"],
      "versions": [...]
    }
  ]
}
```

### 自定義主題
修改 `css/themes.css` 中的 CSS 變數：
```css
[data-theme="light"] {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* 其他顏色變數 */
}
```

## 🌐 部署指南

### GitHub Pages
1. 將項目推送到 GitHub 倉庫
2. 到 Settings > Pages 
3. 選擇 Source: Deploy from a branch
4. 選擇 main 分支和 / (root) 資料夾
5. 點擊 Save，等待部署完成

### Netlify
1. 連接 GitHub 倉庫到 Netlify
2. Build command: 留空
3. Publish directory: `/`
4. 點擊 Deploy

### Vercel
1. 導入 GitHub 倉庫到 Vercel
2. Framework Preset: Other
3. 其他設定保持預設
4. 點擊 Deploy

### 自託管
將所有檔案上傳到您的網頁託管服務商：
- 確保 index.html 在根目錄
- 保持檔案結構完整
- 配置正確的 MIME 類型（如果需要）

## 🎯 瀏覽器支援

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 授權協議

MIT License - 詳見 [LICENSE](LICENSE) 檔案

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

1. Fork 項目
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📞 業務聯絡

如果您有插件開發需求或合作洽談，歡迎透過以下方式聯絡：

- 業務信箱: business@example.com
- 即時諮詢: Discord 專業服務
- 技術展示: [@yourusername](https://github.com/yourusername)

## 🎯 適用場景

這個作品集網站適合以下情況：

- **自由接案者** - 展示插件開發能力
- **技術諮詢** - 提供專業服務展示
- **客戶溝通** - 清楚展示開發實力
- **業務拓展** - 吸引潛在客戶關注

---

💼 **專業插件開發服務，為您的 Minecraft 伺服器提供獨特解決方案** 