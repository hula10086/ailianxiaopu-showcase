// 数据展示网站核心功能
class LoveDataShowcase {
    constructor() {
        this.data = null;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupFileUpload();
        this.setupNavigation();
        this.setupFilters();
        console.log('爱恋小铺数据展示网站已初始化');
    }

    // 设置文件上传
    setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');

        // 拖拽上传
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('drag-over');
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFile(files[0]);
        });

        // 点击上传
        fileInput.addEventListener('change', (e) => {
            this.handleFile(e.target.files[0]);
        });

        // 阻止默认行为
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    // 处理文件
    handleFile(file) {
        if (!file) return;

        if (!file.name.endsWith('.json')) {
            this.showError('请选择JSON格式的文件');
            return;
        }

        // 显示文件信息
        const fileInfo = document.getElementById('fileInfo');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');

        fileName.textContent = file.name;
        fileSize.textContent = this.formatFileSize(file.size);
        fileInfo.style.display = 'flex';

        // 读取文件内容
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.data = JSON.parse(e.target.result);
                console.log('数据加载成功:', this.data);
                this.showSuccess('文件加载成功！');
            } catch (error) {
                console.error('JSON解析失败:', error);
                this.showError('文件格式错误，请选择正确的JSON文件');
            }
        };
        reader.readAsText(file);
    }

    // 分析数据
    analyzeData() {
        if (!this.data) {
            this.showError('请先上传数据文件');
            return;
        }

        console.log('开始分析数据...');
        this.updateStats();
        this.showDashboard();
        this.showMemories();
        this.showSuccess('数据分析完成！');
    }

    // 更新统计数据
    updateStats() {
        const stats = {
            checkinCount: this.data.checkinRecords?.length || 0,
            moodCount: this.data.moodRecords?.length || 0,
            taskCount: this.data.tasks?.length || 0,
            noteCount: this.data.notes?.length || 0
        };

        document.getElementById('checkinCount').textContent = stats.checkinCount;
        document.getElementById('moodCount').textContent = stats.moodCount;
        document.getElementById('taskCount').textContent = stats.taskCount;
        document.getElementById('noteCount').textContent = stats.noteCount;

        console.log('统计数据更新完成:', stats);
    }

    // 显示数据概览
    showDashboard() {
        document.getElementById('dashboard').style.display = 'block';
        this.scrollToSection('dashboard');
    }

    // 显示美好回忆
    showMemories() {
        document.getElementById('memories').style.display = 'block';
        this.renderMemories();
        this.scrollToSection('memories');
    }

    // 渲染回忆列表
    renderMemories(filter = 'all') {
        const grid = document.getElementById('memoriesGrid');
        const allMemories = this.collectAllMemories();

        let filteredMemories = allMemories;
        if (filter !== 'all') {
            filteredMemories = allMemories.filter(memory => memory.type === filter);
        }

        // 按时间排序（最新的在前）
        filteredMemories.sort((a, b) => new Date(b.date) - new Date(a.date));

        grid.innerHTML = '';

        filteredMemories.forEach((memory, index) => {
            const card = this.createMemoryCard(memory, index);
            grid.appendChild(card);
        });

        console.log(`渲染了 ${filteredMemories.length} 个回忆项目`);
    }

    // 收集所有回忆数据
    collectAllMemories() {
        const memories = [];

        // 处理打卡记录
        if (this.data.checkinRecords) {
            this.data.checkinRecords.forEach(record => {
                memories.push({
                    type: 'checkin',
                    title: record.content || '每日打卡',
                    text: record.note || '记录美好的一天',
                    date: record.createTime || record.date,
                    icon: 'fas fa-calendar-check',
                    color: '#FF6B9D'
                });
            });
        }

        // 处理心情记录
        if (this.data.moodRecords) {
            this.data.moodRecords.forEach(record => {
                memories.push({
                    type: 'mood',
                    title: record.typeName || '心情记录',
                    text: record.content || '',
                    date: record.createTime,
                    icon: record.typeIcon || 'fas fa-smile',
                    color: '#4ECDC4'
                });
            });
        }

        // 处理任务记录
        if (this.data.tasks) {
            this.data.tasks.forEach(task => {
                memories.push({
                    type: 'task',
                    title: task.title || '任务完成',
                    text: task.description || task.content || '',
                    date: task.createTime || task.completedAt,
                    icon: 'fas fa-tasks',
                    color: '#45B7D1'
                });
            });
        }

        // 处理笔记记录
        if (this.data.notes) {
            this.data.notes.forEach(note => {
                memories.push({
                    type: 'note',
                    title: note.title || '小纸条',
                    text: note.content || '',
                    date: note.createTime,
                    icon: 'fas fa-sticky-note',
                    color: '#FFA07A'
                });
            });
        }

        return memories;
    }

    // 创建回忆卡片
    createMemoryCard(memory, index) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const date = new Date(memory.date);
        const formattedDate = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        card.innerHTML = `
            <div class="memory-header" style="background: linear-gradient(135deg, ${memory.color}, ${this.adjustColor(memory.color, -20)})">
                <i class="${memory.icon} memory-icon"></i>
                <span class="memory-type">${this.getTypeName(memory.type)}</span>
                <span class="memory-date">${formattedDate}</span>
            </div>
            <div class="memory-content">
                <h3 class="memory-title">${this.escapeHtml(memory.title)}</h3>
                <p class="memory-text">${this.escapeHtml(memory.text || '记录美好时光')}</p>
                <div class="memory-meta">
                    <span><i class="fas fa-heart"></i> 美好回忆</span>
                    <span><i class="fas fa-clock"></i> ${formattedDate}</span>
                </div>
            </div>
        `;

        return card;
    }

    // 设置导航
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.scrollToSection(target);

                // 更新活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // 设置过滤器
    setupFilters() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.currentFilter = filter;

                // 更新按钮状态
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 重新渲染回忆
                if (this.data) {
                    this.renderMemories(filter);
                }
            });
        });
    }

    // 工具方法
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    getTypeName(type) {
        const typeNames = {
            checkin: '每日打卡',
            mood: '心情记录',
            task: '任务完成',
            note: '小纸条'
        };
        return typeNames[type] || type;
    }

    adjustColor(color, amount) {
        // 简单的颜色调整函数
        const usePound = color[0] === '#';
        const col = usePound ? color.slice(1) : color;

        const num = parseInt(col, 16);
        let r = (num >> 16) + amount;
        let g = (num >> 8 & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;

        r = r > 255 ? 255 : r < 0 ? 0 : r;
        g = g > 255 ? 255 : g < 0 ? 0 : g;
        b = b > 255 ? 255 : b < 0 ? 0 : b;

        return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        // 创建简单的提示
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new LoveDataShowcase();
});

// 添加拖拽样式
const style = document.createElement('style');
style.textContent = `
    .drag-over {
        border-color: rgba(255, 255, 255, 0.8) !important;
        background: rgba(255, 255, 255, 0.1) !important;
    }
`;
document.head.appendChild(style);
