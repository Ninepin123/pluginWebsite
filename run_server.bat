@echo off
echo =======================================
echo   Minecraft 插件展示網站 - 本地伺服器
echo =======================================
echo.

echo 檢查 Python 是否已安裝...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 錯誤: 未找到 Python，請先安裝 Python 3.7+
    echo 下載地址: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python 已安裝

echo.
echo 檢查 Flask 是否已安裝...
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Flask 未安裝，正在安裝依賴...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ 依賴安裝失敗
        pause
        exit /b 1
    )
    echo ✅ 依賴安裝完成
) else (
    echo ✅ Flask 已安裝
)

echo.
echo 🚀 正在啟動本地伺服器...
echo 📱 請在瀏覽器中打開: http://localhost:5000
echo 💡 按 Ctrl+C 停止伺服器
echo.

python app.py

pause 