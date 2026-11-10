/* ============================================================
 * countdown.js — 双11活动倒计时
 * 逻辑：计算当前时间距 11月11日 00:00:00 的差值，每秒刷新一次
 * ============================================================ */

const Countdown = (function () {
    // 计算目标日期：今年 11月11日 0点；若已过则顺延到明年
    function getTargetDate() {
        const now = new Date();
        let target = new Date(now.getFullYear(), 10, 11, 0, 0, 0); // 月份从0开始，10=11月
        if (now.getTime() > target.getTime()) {
            target = new Date(now.getFullYear() + 1, 10, 11, 0, 0, 0);
        }
        return target;
    }

    const target = getTargetDate();

    // 补零：1 -> "01"
    function pad(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    // 刷新一次倒计时显示
    function tick() {
        const now = new Date();
        let diff = Math.max(0, target.getTime() - now.getTime()) / 1000;

        const day = Math.floor(diff / 86400);
        diff -= day * 86400;
        const hour = Math.floor(diff / 3600);
        diff -= hour * 3600;
        const min = Math.floor(diff / 60);
        const sec = Math.floor(diff - min * 60);

        // 写入 DOM
        document.getElementById("cdDay").textContent = pad(day);
        document.getElementById("cdHour").textContent = pad(hour);
        document.getElementById("cdMin").textContent = pad(min);
        document.getElementById("cdSec").textContent = pad(sec);
    }

    // 对外启动：立即执行一次，再每秒轮询
    function start() {
        tick();
        setInterval(tick, 1000);
    }

    return { start };
})();
