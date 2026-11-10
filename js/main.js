/* ============================================================
 * main.js — 程序入口
 * 职责：初始化各功能模块、Toast、新人弹窗、红包雨、悬浮工具
 * ============================================================ */

// ---------- 全局 Toast 提示组件 ----------
const Toast = (function () {
    let timer = null;
    function show(msg) {
        const el = document.getElementById("toast");
        el.textContent = msg;
        el.classList.add("show");
        clearTimeout(timer);
        timer = setTimeout(() => el.classList.remove("show"), 2000);
    }
    return { show };
})();

// ---------- 新人弹窗 ----------
function initWelcomeModal() {
    const mask = document.getElementById("welcomeMask");
    // 页面加载 1.2 秒后弹出
    setTimeout(() => mask.classList.add("show"), 1200);
    // 关闭按钮
    document.getElementById("welcomeClose").addEventListener("click", () => {
        mask.classList.remove("show");
    });
    // 立即领取
    document.getElementById("welcomeBtn").addEventListener("click", () => {
        mask.classList.remove("show");
        Toast.show("新人礼包已放入您的账户（演示）");
    });
    // 点击遮罩关闭
    mask.addEventListener("click", (e) => {
        if (e.target === mask) mask.classList.remove("show");
    });
}

// ---------- 红包雨 Canvas 动画 ----------
function initRedPacketRain() {
    const canvas = document.getElementById("redPacketRain");
    const ctx = canvas.getContext("2d");
    const rainTip = document.getElementById("rainTip");
    let particles = [];
    let rafId = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // 生成一个红包粒子
    function spawn() {
        return {
            x: Math.random() * canvas.width,
            y: -30,
            size: 24 + Math.random() * 16,
            speed: 2 + Math.random() * 3,
            rotate: Math.random() * Math.PI * 2,
            rotateSpeed: (Math.random() - 0.5) * 0.1,
            value: [1, 5, 11, 66, 111][Math.floor(Math.random() * 5)],
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.speed;
            p.rotate += p.rotateSpeed;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotate);
            // 红包本体
            ctx.fillStyle = "#e4393c";
            ctx.beginPath();
            ctx.roundRect(-p.size/2, -p.size/2, p.size, p.size*1.2, 4);
            ctx.fill();
            // 红包封口
            ctx.fillStyle = "#ffb800";
            ctx.beginPath();
            ctx.arc(0, -p.size*0.2, p.size*0.18, 0, Math.PI*2);
            ctx.fill();
            ctx.restore();
        });
        // 清除落地粒子
        particles = particles.filter(p => p.y < canvas.height + 50);
        rafId = requestAnimationFrame(draw);
    }

    function startRain() {
        rainTip.classList.add("show");
        canvas.style.display = "block";
        let spawnCount = 0;
        const spawnTimer = setInterval(() => {
            particles.push(spawn());
            spawnCount++;
            if (spawnCount > 60) clearInterval(spawnTimer);
        }, 150);
        draw();
        // 8秒后自动停
        setTimeout(stopRain, 8000);
    }

    function stopRain() {
        rainTip.classList.remove("show");
        canvas.style.display = "none";
        cancelAnimationFrame(rafId);
        particles = [];
    }

    // 点击红包雨按钮
    document.getElementById("redPacketBtn").addEventListener("click", startRain);
    document.getElementById("rainClose").addEventListener("click", stopRain);

    // 点击画布抢红包：随机中奖提示
    canvas.addEventListener("click", () => {
        const v = [1, 5, 11, 66][Math.floor(Math.random() * 4)];
        Toast.show(`恭喜抢到 ¥${v} 红包（演示）`);
    });
}

// ---------- 悬浮工具 ----------
function initFloatTools() {
    // 回到顶部
    document.getElementById("backTop").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // 悬浮购物车：打开购物车抽屉
    document.getElementById("floatCart").addEventListener("click", () => {
        Cart.open && Cart.open();
        document.getElementById("cartDrawer").classList.add("open");
        document.getElementById("cartMask").classList.add("show");
    });
    // 客服
    document.getElementById("floatService").addEventListener("click", () => {
        Toast.show("正在为您接通人工客服（演示）");
    });
}

// ---------- 启动入口 ----------
document.addEventListener("DOMContentLoaded", function () {
    // 初始化各模块
    Countdown.start();
    Product.init();
    Cart.init();
    initWelcomeModal();
    initRedPacketRain();
    initFloatTools();

    // 移动端汉堡菜单切换
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    // 导航滚动高亮
    const sections = document.querySelectorAll("section[id]");
    const navA = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY + 80;
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                navA.forEach(a => a.classList.toggle("active",
                    a.getAttribute("href") === "#" + sec.id));
            }
        });
    });
});
