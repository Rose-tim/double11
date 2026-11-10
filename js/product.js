/* ============================================================
 * product.js — 优惠券 / 秒杀 / 商品列表 渲染逻辑
 * 职责：把 data.js 里的静态数据渲染成 HTML 节点，并绑定事件
 * ============================================================ */

const Product = (function () {

    // ---------- 1. 渲染优惠券 ----------
    function renderCoupons() {
        const box = document.getElementById("couponList");
        box.innerHTML = COUPONS.map(c => `
            <div class="coupon-card">
                <div class="coupon-value">¥${c.value}<small> 元</small></div>
                <div class="coupon-cond">${c.cond}</div>
                <button class="coupon-btn" data-id="${c.id}">立即领取</button>
            </div>
        `).join("");

        // 领券点击：切换为"已领取"状态
        box.querySelectorAll(".coupon-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("got")) return;
                btn.classList.add("got");
                btn.textContent = "已领取";
                Toast.show(`成功领取 ¥${COUPONS.find(c => c.id == btn.dataset.id).value} 优惠券`);
            });
        });
    }

    // ---------- 2. 渲染秒杀商品 ----------
    function renderSeckill() {
        const box = document.getElementById("seckillList");
        box.innerHTML = SECKILLS.map(s => `
            <div class="seckill-card">
                <div class="seckill-img" style="background:${s.gradient}">${s.emoji}</div>
                <div class="seckill-info">
                    <div class="seckill-name">${s.name}</div>
                    <div class="seckill-price-row">
                        <span class="seckill-price">¥${s.price}</span>
                        <span class="seckill-origin">¥${s.origin}</span>
                    </div>
                    <div class="seckill-progress">
                        <div class="seckill-progress-bar" style="width:${s.sold}%"></div>
                    </div>
                    <div class="seckill-progress-text">已抢 ${s.sold}%</div>
                </div>
            </div>
        `).join("");
    }

    // ---------- 2.5 渲染预售商品 ----------
    function renderPresale() {
        const box = document.getElementById("presaleList");
        box.innerHTML = PRESALES.map(p => `
            <div class="presale-card">
                <div class="presale-img" style="background:${p.gradient}">
                    ${p.emoji}
                    <span class="live-dot">● 预售中</span>
                </div>
                <div class="presale-body">
                    <div class="presale-name">${p.name}</div>
                    <div class="presale-desc">${p.desc}</div>
                    <div class="presale-price-row">
                        <span class="presale-price">¥${p.price}</span>
                    </div>
                    <div class="presale-deposit">
                        定金 ¥${p.deposit} 立减 ${p.expand - p.deposit}
                    </div>
                    <div class="presale-progress">
                        <div class="presale-progress-bar" style="width:${p.sold}%"></div>
                    </div>
                    <div class="presale-progress-text">已订 ${p.sold}%</div>
                </div>
            </div>
        `).join("");
    }

    // ---------- 2.6 渲染直播间 ----------
    function renderLive() {
        const box = document.getElementById("liveList");
        box.innerHTML = LIVES.map(l => `
            <div class="live-card">
                <div class="live-cover" style="background:${l.gradient}">
                    ${l.emoji}
                    <span class="live-badge">直播中</span>
                    <span class="live-viewers">👀 ${l.viewers.toLocaleString()}</span>
                </div>
                <div class="live-info">
                    <div class="live-title">${l.title}</div>
                    <div class="live-anchor">主播：${l.anchor}</div>
                </div>
            </div>
        `).join("");
    }

    // ---------- 3. 渲染商品网格（支持分类筛选） ----------
    function renderGoods(cat) {
        const box = document.getElementById("goodsGrid");
        // 根据分类过滤；cat === "all" 时显示全部
        const list = (cat === "all" || !cat)
            ? PRODUCTS
            : PRODUCTS.filter(p => p.cat === cat);

        if (list.length === 0) {
            box.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;padding:40px 0">该分类暂无商品</p>`;
            return;
        }

        box.innerHTML = list.map(p => `
            <div class="goods-card">
                <div class="goods-img" style="background:${p.gradient}">
                    ${p.emoji}
                    <span class="goods-tag">${p.tag}</span>
                </div>
                <div class="goods-body">
                    <div class="goods-name">${p.name}</div>
                    <div class="goods-desc">${p.desc}</div>
                    <div class="goods-price-row">
                        <div>
                            <span class="goods-price"><small>¥</small>${p.price}</span>
                            <span class="goods-origin">¥${p.origin}</span>
                        </div>
                    </div>
                    <button class="add-cart-btn" data-id="${p.id}">加入购物车</button>
                </div>
            </div>
        `).join("");

        // 绑定"加入购物车"按钮
        box.querySelectorAll(".add-cart-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                Cart.add(parseInt(btn.dataset.id));
            });
        });
    }

    // ---------- 4. 分类筛选按钮事件 ----------
    function bindFilter() {
        const bar = document.getElementById("filterBar");
        bar.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter-btn");
            if (!btn) return;
            // 切换 active 样式
            bar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            // 重新渲染对应分类
            renderGoods(btn.dataset.cat);
        });
    }

    // 对外初始化入口
    function init() {
        renderCoupons();
        renderSeckill();
        renderPresale();
        renderLive();
        renderGoods("all");   // 默认显示全部
        bindFilter();
    }

    return { init, renderGoods };
})();
