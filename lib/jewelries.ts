import type { ElementKey, StoreJewelry } from "@/lib/types";

export const jewelries: StoreJewelry[] = [
  {
    id: "1",
    slug: "moon-pearl-ring",
    name: "月映珍珠戒",
    element: "metal",
    material: "18K 浅金、淡水珍珠",
    gemstone: "珍珠",
    color: "月白",
    styleTags: ["清透", "通勤", "轻礼服"],
    tryOnNote: "请店员优先安排同系列戒指与耳钉一起试戴，观察手部与面部光泽是否更明亮。",
    recommendationReason: "柔和白光与细金线条能强化金元素的清朗与秩序感。",
    description: "圆润珍珠搭配细窄金环，保留东方留白，也适合与素圈叠戴。",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    displayStatus: "available",
    featured: true
  },
  {
    id: "2",
    slug: "jade-bamboo-necklace",
    name: "青竹翡翠项链",
    element: "wood",
    material: "18K 金、天然翡翠",
    gemstone: "翡翠",
    color: "青绿",
    styleTags: ["温润", "新中式", "日常"],
    tryOnNote: "建议让店员对比短链和锁骨链长度，选择更贴合颈部线条的佩戴位置。",
    recommendationReason: "翠色宝石与竹节线条呼应木元素的舒展和生长感。",
    description: "竹节比例的金属线条托起素面翡翠，简洁而有生命力。",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
    displayStatus: "available",
    featured: true
  },
  {
    id: "3",
    slug: "sapphire-water-earrings",
    name: "澄海蓝宝耳钉",
    element: "water",
    material: "白金、蓝宝石",
    gemstone: "蓝宝石",
    color: "海蓝",
    styleTags: ["冷静", "精致", "晚宴"],
    tryOnNote: "请店员先推荐贴耳款，再对比垂坠款，观察哪种更能修饰脸型。",
    recommendationReason: "蓝色宝石对应水意，适合表达沉静、流动与智慧感。",
    description: "小颗蓝宝石以低调爪镶固定，适合通勤与晚宴之间自由切换。",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    displayStatus: "limited",
    featured: true
  },
  {
    id: "4",
    slug: "ruby-flame-bracelet",
    name: "朱焰红宝手链",
    element: "fire",
    material: "玫瑰金、红宝石",
    gemstone: "红宝石",
    color: "朱红",
    styleTags: ["明亮", "聚会", "提气色"],
    tryOnNote: "建议在自然光下试戴，重点看红色宝石是否能提亮肤色和整体气色。",
    recommendationReason: "红色火光能增强面部气色和表达感，适合作为造型亮点。",
    description: "细链上点缀渐变红宝，轻巧但存在感明确。",
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
    displayStatus: "sample",
    featured: true
  },
  {
    id: "5",
    slug: "citrine-earth-pendant",
    name: "琥珀黄晶吊坠",
    element: "earth",
    material: "18K 金、黄水晶",
    gemstone: "黄水晶",
    color: "琥珀金",
    styleTags: ["稳重", "温暖", "亲和"],
    tryOnNote: "请店员推荐不同链长搭配，优先选择落在锁骨下方的稳定视觉中心。",
    recommendationReason: "暖黄色宝石与包镶结构带来土元素的安定、承托与丰盛感。",
    description: "黄水晶采用包镶结构，像一枚温润的小印章。",
    imageUrl: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80",
    displayStatus: "available",
    featured: true
  },
  {
    id: "6",
    slug: "onyx-water-ring",
    name: "墨泉黑玛瑙戒",
    element: "water",
    material: "银、黑玛瑙",
    gemstone: "黑玛瑙",
    color: "墨黑",
    styleTags: ["极简", "冷调", "专注"],
    tryOnNote: "建议与银色素戒叠戴试试，找到既沉静又不压手的组合。",
    recommendationReason: "黑色水象宝石沉静内敛，适合作为冷色调试戴方向。",
    description: "宽窄适中的银戒托住椭圆黑玛瑙，干净、冷静、有分量。",
    imageUrl: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80",
    displayStatus: "limited",
    featured: false
  }
];

export function getJewelryBySlug(slug: string) {
  return jewelries.find((jewelry) => jewelry.slug === slug);
}

export function getJewelriesByElement(element: ElementKey) {
  return jewelries.filter((jewelry) => jewelry.element === element);
}
