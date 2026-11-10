/* ============================================================
 * data.js — 商品 / 秒杀 / 优惠券 静态数据
 * 说明：所有页面展示数据集中在此，方便统一维护与替换
 * 字段：
 *   id        唯一编号
 *   name      商品名称
 *   desc      卖点描述
 *   price     双11狂欢价
 *   origin    原价
 *   cat       分类（digital/beauty/fashion/food/home）
 *   emoji     占位图标（演示用，真实项目替换为商品图 URL）
 *   gradient  卡片渐变色背景
 *   tag       角标文字
 * ============================================================ */

const COUPONS = [
    { id: 1, value: 50, cond: "满300可用" },
    { id: 2, value: 100, cond: "满600可用" },
    { id: 3, value: 200, cond: "满1200可用" },
    { id: 4, value: 500, cond: "满3000可用" },
];

const SECKILLS = [
    { id: "s1", name: "无线蓝牙耳机 Pro 主动降噪款", price: 199, origin: 899,
      emoji: "🎧", gradient: "linear-gradient(135deg,#667eea,#764ba2)", sold: 86 },
    { id: "s2", name: "超薄智能手机 12GB+256GB", price: 1999, origin: 3299,
      emoji: "📱", gradient: "linear-gradient(135deg,#f093fb,#f5576c)", sold: 72 },
    { id: "s3", name: "大牌口红礼盒 5支装", price: 99, origin: 399,
      emoji: "💄", gradient: "linear-gradient(135deg,#fa709a,#fee140)", sold: 93 },
    { id: "s4", name: "智能扫地机器人 扫拖一体", price: 899, origin: 1999,
      emoji: "🤖", gradient: "linear-gradient(135deg,#43e97b,#38f9d7)", sold: 65 },
];

// ---------- 预售商品（定金膨胀玩法） ----------
const PRESALES = [
    { id: "p1", name: "旗舰手机 256G 新品首发", desc: "付定金立减300 · 11日付尾款",
      price: 3699, deposit: 100, expand: 400, emoji: "📱",
      gradient: "linear-gradient(135deg,#667eea,#764ba2)", sold: 68 },
    { id: "p2", name: "大牌护肤套装 水乳精华3件套", desc: "付定金立减200 · 加赠中样5件",
      price: 599, deposit: 50, expand: 250, emoji: "🧴",
      gradient: "linear-gradient(135deg,#fbc2eb,#a6c1ee)", sold: 82 },
    { id: "p3", name: "超薄笔记本电脑 办公本", desc: "付定金立减500 · 赠鼠标+包",
      price: 4499, deposit: 200, expand: 700, emoji: "💻",
      gradient: "linear-gradient(135deg,#f093fb,#f5576c)", sold: 45 },
    { id: "p4", name: "扫地机器人 全自动扫拖一体", desc: "付定金立减300 · 2年质保",
      price: 1299, deposit: 100, expand: 400, emoji: "🤖",
      gradient: "linear-gradient(135deg,#43e97b,#38f9d7)", sold: 57 },
];

// ---------- 直播间 ----------
const LIVES = [
    { id: "l1", title: "数码专场 · 手机直降", anchor: "阿伟数码", viewers: 12800,
      emoji: "📱", gradient: "linear-gradient(135deg,#667eea,#764ba2)" },
    { id: "l2", title: "美妆大促 · 全套抄底", anchor: "小美化妆间", viewers: 25600,
      emoji: "💄", gradient: "linear-gradient(135deg,#fa709a,#fee140)" },
    { id: "l3", title: "穿搭直播 · 秋冬新款", anchor: "时尚买手Lily", viewers: 8600,
      emoji: "👗", gradient: "linear-gradient(135deg,#c471f5,#fa71cd)" },
    { id: "l4", title: "美食专场 · 产地直发", anchor: "吃货小陈", viewers: 15200,
      emoji: "🍜", gradient: "linear-gradient(135deg,#f6d365,#fda085)" },
];

const PRODUCTS = [
    // ---- 数码家电 ----
    { id: 1, name: "超薄笔记本电脑 14英寸 轻薄本", desc: "酷睿i5 / 16G / 512G 固态",
      price: 3999, origin: 5499, cat: "digital", emoji: "💻",
      gradient: "linear-gradient(135deg,#667eea,#764ba2)", tag: "直降1500" },
    { id: 2, name: "真无线蓝牙耳机 降噪旗舰", desc: "40dB深度降噪 / 30h续航",
      price: 299, origin: 699, cat: "digital", emoji: "🎧",
      gradient: "linear-gradient(135deg,#a18cd1,#fbc2eb)", tag: "5折" },
    { id: 3, name: "智能手表 运动版 血氧监测", desc: "14天长续航 / 50米防水",
      price: 599, origin: 999, cat: "digital", emoji: "⌚",
      gradient: "linear-gradient(135deg,#f093fb,#f5576c)", tag: "爆款" },
    { id: 4, name: "4K高清投影仪 家用卧室", desc: "自动对焦 / 1080P解码",
      price: 1299, origin: 2299, cat: "digital", emoji: "📽",
      gradient: "linear-gradient(135deg,#ff9a9e,#fecfef)", tag: "新品" },

    // ---- 美妆护肤 ----
    { id: 5, name: "烟酰胺精华水 补水提亮 200ml", desc: "水润轻薄 / 敏感肌适用",
      price: 89, origin: 199, cat: "beauty", emoji: "🧴",
      gradient: "linear-gradient(135deg,#fbc2eb,#a6c1ee)", tag: "买1送1" },
    { id: 6, name: "丝绒哑光口红 持久不脱色", desc: "显白正红色 / 礼盒装",
      price: 79, origin: 189, cat: "beauty", emoji: "💄",
      gradient: "linear-gradient(135deg,#fa709a,#fee140)", tag: "限时特价" },
    { id: 7, name: "氨基酸洁面乳 温和不紧绷", desc: "深层清洁 / 泡沫细腻",
      price: 39, origin: 89, cat: "beauty", emoji: "🧼",
      gradient: "linear-gradient(135deg,#84fab0,#8fd3f4)", tag: "第二件半价" },
    { id: 8, name: "防晒霜 SPF50+ 全身可用", desc: "清爽不油腻 / 防水防汗",
      price: 59, origin: 129, cat: "beauty", emoji: "☀️",
      gradient: "linear-gradient(135deg,#fddb92,#d1fdff)", tag: "囤货装" },

    // ---- 服饰鞋包 ----
    { id: 9, name: "加厚羽绒服 女款短款", desc: "90白鸭绒 / 御寒保暖",
      price: 399, origin: 899, cat: "fashion", emoji: "🧥",
      gradient: "linear-gradient(135deg,#c471f5,#fa71cd)", tag: "直降500" },
    { id: 10, name: "复古慢跑鞋 男款透气", desc: "缓震鞋底 / 百搭通勤",
      price: 249, origin: 499, cat: "fashion", emoji: "👟",
      gradient: "linear-gradient(135deg,#48c6ef,#6f86d6)", tag: "5折" },
    { id: 11, name: "真皮斜挎包 女款简约风", desc: "头层牛皮 / 多隔层",
      price: 329, origin: 699, cat: "fashion", emoji: "👜",
      gradient: "linear-gradient(135deg,#fccb90,#d57eeb)", tag: "店长推荐" },
    { id: 12, name: "纯棉卫衣 宽松情侣款", desc: "320g重磅 / 多色可选",
      price: 99, origin: 199, cat: "fashion", emoji: "👕",
      gradient: "linear-gradient(135deg,#e0c3fc,#8ec5fc)", tag: "2件8折" },

    // ---- 食品生鲜 ----
    { id: 13, name: "每日坚果 混合装 30包", desc: "孕妇儿童零食 / 独立小包",
      price: 79, origin: 159, cat: "food", emoji: "🥜",
      gradient: "linear-gradient(135deg,#f6d365,#fda085)", tag: "囤货首选" },
    { id: 14, name: "冷榨橄榄油 750ml*2瓶", desc: "西班牙进口 / 食用油",
      price: 129, origin: 259, cat: "food", emoji: "🫒",
      gradient: "linear-gradient(135deg,#d4fc79,#96e6a1)", tag: "健康饮食" },
    { id: 15, name: "精选车厘子 JJ级 2斤装", desc: "顺丰空运 / 现货现发",
      price: 159, origin: 299, cat: "food", emoji: "🍒",
      gradient: "linear-gradient(135deg,#ff6e7f,#bfe9ff)", tag: "产地直采" },
    { id: 16, name: "手工黑巧克力 礼盒装", desc: "可可含量70% / 送礼佳品",
      price: 69, origin: 139, cat: "food", emoji: "🍫",
      gradient: "linear-gradient(135deg,#a18cd1,#fbc2eb)", tag: "圣诞礼盒" },

    // ---- 家居生活 ----
    { id: 17, name: "记忆棉枕头 护颈一对装", desc: "慢回弹 / 防螨抗菌",
      price: 99, origin: 229, cat: "home", emoji: "🛏",
      gradient: "linear-gradient(135deg,#89f7fe,#66a6ff)", tag: "睡眠神器" },
    { id: 18, name: "香薰蜡烛礼盒 助眠香氛", desc: "天然大豆蜡 / 无烟",
      price: 59, origin: 129, cat: "home", emoji: "🕯",
      gradient: "linear-gradient(135deg,#fad0c4,#ffd1ff)", tag: "氛围感" },
    { id: 19, name: "免打孔置物架 卫生间收纳", desc: "不锈钢 / 承重10kg",
      price: 39, origin: 89, cat: "home", emoji: "🧻",
      gradient: "linear-gradient(135deg,#8fd3f4,#84fab0)", tag: "收纳必备" },
    { id: 20, name: "北欧风抱枕套 45*45cm", desc: "棉麻材质 / 两只装",
      price: 29, origin: 69, cat: "home", emoji: "🛋",
      gradient: "linear-gradient(135deg,#fccb90,#d57eeb)", tag: "家装好物" },
];
