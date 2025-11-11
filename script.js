// 移动端菜单切换
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// 激活当前导航链接
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// 数字动画
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// 使用 Intersection Observer 来触发数字动画
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
            });
        }
    });
}, observerOptions);

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    observer.observe(aboutStats);
}

// 返回顶部按钮
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 表单提交处理
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // 这里可以添加实际的表单提交逻辑
    console.log('表单数据:', formData);
    
    // 显示成功消息
    alert('感谢您的留言！我们会尽快与您联系。');
    
    // 重置表单
    contactForm.reset();
});

// Newsletter 表单提交
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        console.log('订阅邮箱:', email);
        alert('感谢您的订阅！');
        form.reset();
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动动画
const scrollElements = document.querySelectorAll('.service-card, .news-card, .contact-item');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset)
    );
};

const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
};

const hideScrollElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 0.2)) {
            displayScrollElement(el);
        }
    });
};

// 初始化元素样式
scrollElements.forEach((el) => {
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    hideScrollElement(el);
});

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // 初始检查

// 防止页面加载时的闪烁
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
});

// 新闻详情数据
const newsData = {
    1: {
        date: '2024年12月15日',
        title: '星彩IOT荣获2024年度随身Wi-Fi行业创新奖',
        content: `
            <p>2024年12月15日，星彩IOT在"2024年度移动通信设备行业颁奖典礼"上，凭借在随身Wi-Fi设备领域的卓越创新能力和优质服务，荣获本年度行业创新奖。</p>
            
            <p>此次获奖是对星彩IOT多年来在随身Wi-Fi领域持续创新和技术突破的充分肯定。公司推出的5G随身Wi-Fi产品在性能、续航和用户体验方面均获得行业专家和用户的高度认可。</p>
            
            <p><strong>获奖产品亮点：</strong></p>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li>支持SA/NSA双模5G网络，下载速度可达1Gbps</li>
                <li>采用最新低功耗芯片技术，续航时间长达15小时</li>
                <li>支持最多32台设备同时连接</li>
                <li>内置智能流量管理功能，有效控制流量使用</li>
                <li>采用WPA3加密技术，保障网络安全</li>
            </ul>
            
            <p>星彩IOT将继续秉承"专业、创新、卓越"的理念，不断推出更多优质产品，为全球用户提供更好的移动网络体验。</p>
        `
    },
    2: {
        date: '2024年12月8日',
        title: '全新5G随身Wi-Fi系列产品正式发布',
        content: `
            <p>2024年12月8日，星彩IOT在东莞松山湖总部正式发布了全新的5G随身Wi-Fi产品系列，这是公司在5G移动网络设备领域的重要突破。</p>
            
            <p><strong>产品特色：</strong></p>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li><strong>极速5G网络：</strong>支持SA/NSA双模5G网络，理论下载速度可达1Gbps，上传速度可达150Mbps，轻松应对4K视频、在线游戏等高带宽应用。</li>
                <li><strong>超长续航：</strong>采用5000mAh大容量电池和先进的低功耗技术，续航时间长达15小时，满足全天候使用需求。</li>
                <li><strong>多设备连接：</strong>支持最多32台设备同时连接，适合家庭、办公室、小型团队等多种使用场景。</li>
                <li><strong>智能管理：</strong>内置智能流量管理功能，可设置流量上限、设备限速、访问控制等，让网络使用更加灵活可控。</li>
                <li><strong>全球漫游：</strong>支持全球200+国家和地区，为商务出行和旅行用户提供无缝网络体验。</li>
            </ul>
            
            <p>该系列产品包括标准版、Pro版和Ultra版三个型号，满足不同用户群体的需求。产品现已在全国各大电商平台和线下门店同步发售。</p>
            
            <p>星彩IOT产品经理表示："我们致力于为移动办公和旅行用户提供最强大的网络支持，让连接无处不在，让工作更高效，让生活更便捷。"</p>
        `
    },
    3: {
        date: '2024年12月1日',
        title: '与三大运营商达成战略合作协议',
        content: `
            <p>2024年12月1日，星彩IOT与中国移动、中国联通、中国电信三大运营商在深圳签署战略合作协议，共同推动5G随身Wi-Fi产业发展。</p>
            
            <p>此次战略合作标志着星彩IOT与三大运营商在5G移动网络设备领域的深度合作正式启动。根据协议，双方将在以下方面展开合作：</p>
            
            <p><strong>合作内容：</strong></p>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li><strong>网络优化：</strong>共同优化5G网络覆盖和信号质量，提升用户网络体验。</li>
                <li><strong>流量套餐：</strong>为星彩IOT用户提供专属流量套餐，包括月包、年包等多种选择，价格更优惠。</li>
                <li><strong>技术支持：</strong>运营商提供专业技术支持，确保设备与网络的最佳兼容性。</li>
                <li><strong>渠道合作：</strong>在运营商营业厅和线上渠道销售星彩IOT产品，扩大产品覆盖范围。</li>
                <li><strong>联合营销：</strong>共同开展市场推广活动，提升品牌知名度和产品销量。</li>
            </ul>
            
            <p>星彩IOTCEO在签约仪式上表示："与三大运营商的战略合作将为用户提供更优质的网络服务和更灵活的流量套餐选择。我们将携手运营商，共同推动5G随身Wi-Fi产业的发展，为构建万物互联的智能世界贡献力量。"</p>
            
            <p>此次合作预计将为星彩IOT带来超过50%的销量增长，同时也将为三大运营商带来更多5G用户和流量收入，实现互利共赢。</p>
        `
    }
};

// 新闻模态框功能
const newsModal = document.getElementById('newsModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalBody = document.getElementById('modalBody');
const newsLinks = document.querySelectorAll('.news-link');

// 打开模态框
function openNewsModal(newsId) {
    const news = newsData[newsId];
    if (news) {
        modalTitle.textContent = news.title;
        modalDate.textContent = news.date;
        modalBody.innerHTML = news.content;
        newsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

// 关闭模态框
function closeNewsModal() {
    newsModal.classList.remove('active');
    document.body.style.overflow = ''; // 恢复滚动
}

// 为新闻链接添加点击事件
newsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const newsId = link.getAttribute('data-news');
        if (newsId) {
            openNewsModal(newsId);
        }
    });
});

// 关闭按钮事件
modalClose.addEventListener('click', closeNewsModal);

// 点击遮罩层关闭
newsModal.querySelector('.modal-overlay').addEventListener('click', closeNewsModal);

// ESC键关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsModal.classList.contains('active')) {
        closeNewsModal();
    }
});

