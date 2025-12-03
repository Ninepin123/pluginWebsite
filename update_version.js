const fs = require('fs');
const path = require('path');

// 設定要處理的 HTML 檔案列表
const htmlFiles = [
    'index.html',
    'plugins.html',
    'plugin-detail.html',
    'about.html',
    'dungeon-system-detail.html'
];

// 產生當前時間戳記 (例如: 1701234567890)
const timestamp = Date.now();

console.log(`正在更新資源版本號至: ${timestamp}`);

htmlFiles.forEach(fileName => {
    const filePath = path.join(__dirname, fileName);

    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 1. 更新 CSS連結 (href="...css")
        // 尋找 .css 結尾，並替換或新增 ?v=...
        content = content.replace(
            /(href=["'])(.*?\.css)(\?v=\d+)?(["'])/g, 
            `$1$2?v=${timestamp}$4`
        );

        // 2. 更新 JS連結 (src="...js")
        // 尋找 .js 結尾，並替換或新增 ?v=...
        content = content.replace(
            /(src=["'])(.*?\.js)(\?v=\d+)?(["'])/g, 
            `$1$2?v=${timestamp}$4`
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 已更新: ${fileName}`);
    } else {
        console.log(`⚠️ 找不到檔案: ${fileName}`);
    }
});

console.log('🎉 所有檔案版本號更新完成！');
