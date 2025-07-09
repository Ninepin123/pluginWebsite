from flask import Flask, render_template, send_from_directory, jsonify
import os

app = Flask(__name__)

# 配置靜態文件和模板目錄
app.static_folder = '.'
app.template_folder = '.'

@app.route('/')
def index():
    """首頁路由"""
    return send_from_directory('.', 'index.html')

@app.route('/index.html')
def index_html():
    """首頁路由（備用）"""
    return send_from_directory('.', 'index.html')

@app.route('/plugins.html')
def plugins():
    """作品集頁面"""
    return send_from_directory('.', 'plugins.html')

@app.route('/plugin-detail.html')
def plugin_detail():
    """插件詳情頁面"""
    return send_from_directory('.', 'plugin-detail.html')

@app.route('/about.html')
def about():
    """關於頁面"""
    return send_from_directory('.', 'about.html')

# 靜態文件路由
@app.route('/css/<path:filename>')
def css_files(filename):
    """CSS 文件"""
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def js_files(filename):
    """JavaScript 文件"""
    return send_from_directory('js', filename)

@app.route('/data/<path:filename>')
def data_files(filename):
    """數據文件"""
    return send_from_directory('data', filename)

@app.route('/assets/<path:filename>')
def assets_files(filename):
    """資源文件"""
    return send_from_directory('assets', filename)

@app.route('/assets/icons/<path:filename>')
def icon_files(filename):
    """圖標文件"""
    return send_from_directory('assets/icons', filename)

@app.route('/assets/images/<path:filename>')
def image_files(filename):
    """圖片文件"""
    return send_from_directory('assets/images', filename)

@app.route('/assets/images/plugins/<path:filename>')
def plugin_images(filename):
    """插件圖片文件"""
    return send_from_directory('assets/images/plugins', filename)

# API 路由（如果需要的話）
@app.route('/api/plugins')
def api_plugins():
    """插件數據 API"""
    try:
        return send_from_directory('data', 'plugins.json')
    except:
        return jsonify({"error": "無法載入插件數據"}), 500

@app.route('/health')
def health_check():
    """健康檢查"""
    return jsonify({"status": "ok", "message": "Flask 伺服器運行正常"})

# 錯誤處理
@app.errorhandler(404)
def not_found(error):
    """404 錯誤處理"""
    return jsonify({"error": "頁面未找到"}), 404

@app.errorhandler(500)
def internal_error(error):
    """500 錯誤處理"""
    return jsonify({"error": "伺服器內部錯誤"}), 500

if __name__ == '__main__':
    print("🚀 正在啟動 Minecraft 插件展示網站...")
    print("📱 網站地址: http://localhost:5000")
    print("🔧 開發模式: 已啟用")
    print("📁 靜態文件目錄: 當前目錄")
    print("-" * 50)
    
    # 開發環境配置
    app.run(
        host='0.0.0.0',  # 允許外部訪問
        port=5000,       # 端口
        debug=True,      # 開發模式
        threaded=True    # 多線程支援
    ) 