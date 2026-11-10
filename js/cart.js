/* ============================================================
 * cart.js — 购物车逻辑
 * 功能：加入购物车 / 修改数量 / 删除商品 / 计算合计 / 满减优惠提示
 * 数据结构：cart = { 商品id: 数量 }，例：{ 1: 2, 5: 1 }
 * ============================================================ */

const Cart = (function () {
    // 购物车数据（内存态，演示用）
    let items = {};

    // 满减规则：满 300 减 50
    const PROMO_THRESHOLD = 300;
    const PROMO_DEDUCT = 50;

    // ---------- 工具：根据 id 找到商品完整信息 ----------
    function findProduct(id) {
        return PRODUCTS.find(p => p.id === id);
    }

    // ---------- 加入购物车 ----------
    function add(id) {
        items[id] = (items[id] || 0) + 1;
        const p = findProduct(id);
        Toast.show(`已加入购物车：${p.name}`);
        render();
    }

    // ---------- 修改数量（+1 / -1） ----------
    function changeQty(id, delta) {
        if (!items[id]) return;
        items[id] += delta;
        if (items[id] <= 0) delete items[id];   // 数量为0时移除
        render();
    }

    // ---------- 删除商品 ----------
    function remove(id) {
        delete items[id];
        render();
    }

    // ---------- 计算合计金额 ----------
    function calcTotal() {
        let total = 0;
        for (const id in items) {
            const p = findProduct(parseInt(id));
            if (p) total += p.price * items[id];
        }
        return total;
    }

    // ---------- 渲染购物车面板 ----------
    function render() {
        const box = document.getElementById("cartItems");
        const ids = Object.keys(items);

        // 空购物车状态
        if (ids.length === 0) {
            box.innerHTML = `<p class="cart-empty">购物车还是空的，去挑几件好物吧～</p>`;
        } else {
            box.innerHTML = ids.map(id => {
                const p = findProduct(parseInt(id));
                const qty = items[id];
                return `
                    <div class="cart-item">
                        <div class="cart-item-thumb" style="background:${p.gradient}">${p.emoji}</div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">${p.name}</div>
                            <div class="cart-item-price">¥${p.price} × ${qty}</div>
                            <div class="cart-item-ctrl">
                                <button class="qty-btn" data-id="${p.id}" data-op="minus">−</button>
                                <span class="qty-num">${qty}</span>
                                <button class="qty-btn" data-id="${p.id}" data-op="plus">＋</button>
                                <button class="cart-item-remove" data-id="${p.id}" aria-label="删除">×</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            // 绑定数量 +/- 与删除按钮
            box.querySelectorAll(".qty-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = parseInt(btn.dataset.id);
                    changeQty(id, btn.dataset.op === "plus" ? 1 : -1);
                });
            });
            box.querySelectorAll(".cart-item-remove").forEach(btn => {
                btn.addEventListener("click", () => remove(parseInt(btn.dataset.id)));
            });
        }

        // 计算总件数 & 总价
        const totalCount = Object.values(items).reduce((a, b) => a + b, 0);
        const total = calcTotal();

        // 角标 & 合计
        document.getElementById("cartBadge").textContent = totalCount;
        document.getElementById("cartCount").textContent = totalCount;
        document.getElementById("cartTotal").textContent = "¥" + total.toFixed(2);

        // 满减提示文案
        const promoEl = document.getElementById("cartPromo");
        if (total >= PROMO_THRESHOLD) {
            promoEl.textContent = `已享跨店满减：-${PROMO_DEDUCT} 元`;
        } else if (totalCount > 0) {
            const diff = PROMO_THRESHOLD - total;
            promoEl.textContent = `再买 ¥${diff.toFixed(2)} 可跨店减 ${PROMO_DEDUCT} 元`;
        } else {
            promoEl.textContent = "";
        }
    }

    // ---------- 打开 / 关闭购物车抽屉 ----------
    function openDrawer() {
        document.getElementById("cartDrawer").classList.add("open");
        document.getElementById("cartMask").classList.add("show");
    }
    function closeDrawer() {
        document.getElementById("cartDrawer").classList.remove("open");
        document.getElementById("cartMask").classList.remove("show");
    }

    // ---------- 初始化：绑定按钮事件 ----------
    function init() {
        document.getElementById("cartBtn").addEventListener("click", openDrawer);
        document.getElementById("cartClose").addEventListener("click", closeDrawer);
        document.getElementById("cartMask").addEventListener("click", closeDrawer);

        // 结算按钮：演示用 toast 提示
        document.getElementById("checkoutBtn").addEventListener("click", () => {
            const totalCount = Object.values(items).reduce((a, b) => a + b, 0);
            if (totalCount === 0) {
                Toast.show("购物车是空的哦～");
            } else {
                const total = calcTotal();
                const afterPromo = total >= PROMO_THRESHOLD ? total - PROMO_DEDUCT : total;
                Toast.show(`下单成功！实付 ¥${afterPromo.toFixed(2)}（演示）`);
                items = {};   // 清空购物车
                render();
                closeDrawer();
            }
        });
    }

    return { init, add, render, open: openDrawer };
})();
