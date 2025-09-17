#!/bin/bash

# 爱恋小铺数据展示网站 - 部署脚本
# 用于快速部署到GitHub Pages

echo "🚀 开始部署爱恋小铺数据展示网站到GitHub Pages"
echo ""

# 检查是否提供了GitHub仓库信息
if [ $# -eq 0 ]; then
    echo "用法: $0 <github-username> [repository-name]"
    echo "示例: $0 myusername love-data-showcase"
    echo ""
    echo "如果还没有创建GitHub仓库，请按以下步骤操作："
    echo "1. 访问 https://github.com/new"
    echo "2. 仓库名称：love-data-showcase"
    echo "3. 描述：爱恋小铺数据展示网站"
    echo "4. 设为公开仓库"
    echo "5. 创建仓库"
    exit 1
fi

USERNAME=$1
REPO_NAME=${2:-"love-data-showcase"}

echo "📝 部署信息："
echo "GitHub用户名: $USERNAME"
echo "仓库名称: $REPO_NAME"
echo "部署地址: https://$USERNAME.github.io/$REPO_NAME"
echo ""

# 检查Git是否安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：Git未安装，请先安装Git"
    exit 1
fi

# 初始化Git仓库（如果还没有初始化）
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    git add .
    git commit -m "Initial commit: 爱恋小铺数据展示网站"
fi

# 检查远程仓库是否存在
if git remote get-url origin &> /dev/null; then
    echo "🔄 更新远程仓库地址..."
    git remote set-url origin "https://github.com/$USERNAME/$REPO_NAME.git"
else
    echo "🔗 添加远程仓库..."
    git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
fi

# 提交所有更改
echo "💾 提交文件..."
git add .
git commit -m "Update: 优化数据展示功能"

# 推送到GitHub
echo "🚀 推送代码到GitHub..."
if git push -u origin main 2>/dev/null; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "🌐 网站访问地址："
    echo "https://$USERNAME.github.io/$REPO_NAME"
    echo ""
    echo "📋 接下来请："
    echo "1. 访问GitHub仓库：https://github.com/$USERNAME/$REPO_NAME"
    echo "2. 点击 Settings → Pages"
    echo "3. Source选择 'main' 分支"
    echo "4. 保存设置"
    echo "5. 等待几分钟，网站即可访问"
elif git push -u origin master 2>/dev/null; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "🌐 网站访问地址："
    echo "https://$USERNAME.github.io/$REPO_NAME"
    echo ""
    echo "📋 接下来请："
    echo "1. 访问GitHub仓库：https://github.com/$USERNAME/$REPO_NAME"
    echo "2. 点击 Settings → Pages"
    echo "3. Source选择 'master' 分支"
    echo "4. 保存设置"
    echo "5. 等待几分钟，网站即可访问"
else
    echo ""
    echo "❌ 推送失败！"
    echo ""
    echo "🔧 可能的原因："
    echo "1. GitHub仓库不存在"
    echo "2. 没有推送权限"
    echo "3. 网络连接问题"
    echo ""
    echo "💡 请手动执行以下命令："
    echo "git push -u origin main"
    echo ""
    echo "然后在GitHub上启用Pages功能"
fi

echo ""
echo "📚 使用说明："
echo "1. 打开网站，点击'选择文件'上传导出的JSON数据"
echo "2. 点击'分析数据'查看统计信息"
echo "3. 浏览'美好回忆'重温甜蜜时光"
echo ""
echo "🎉 祝您和您的伴侣重温更多美好回忆！"
