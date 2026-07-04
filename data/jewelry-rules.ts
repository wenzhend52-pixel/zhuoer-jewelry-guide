import type { ElementKey } from "@/lib/types";

export type ElementJewelryRule = {
  element: ElementKey;
  elementLabel: string;
  energyMeaning: string;
  colors: string[];
  gemstones: string[];
  materials: string[];
  wearingStyle: string;
  staffKeywords: string[];
};

export const jewelryRules: Record<ElementKey, ElementJewelryRule> = {
  metal: {
    element: "metal",
    elementLabel: "金",
    energyMeaning: "金代表清醒、品质、边界感与干净的审美。",
    colors: ["月白", "银白色", "浅金色"],
    gemstones: ["珍珠", "白水晶", "钻石感珠宝"],
    materials: ["18K 白金", "银色金属", "浅金色金属"],
    wearingStyle: "适合简洁、有质感、线条干净的戒指、耳钉或短项链。",
    staffKeywords: ["清透", "简洁", "高级感", "有品质"]
  },
  wood: {
    element: "wood",
    elementLabel: "木",
    energyMeaning: "木代表生长、舒展、柔和与内在韧性。",
    colors: ["青绿色", "浅翠色", "孔雀绿色"],
    gemstones: ["翡翠", "绿松石", "孔雀石", "绿幽灵"],
    materials: ["18K 金", "磨砂金", "自然纹理宝石"],
    wearingStyle: "适合清透、自然、带有生机感的项链、手链或胸针。",
    staffKeywords: ["温润", "自然", "舒展", "有生命力"]
  },
  water: {
    element: "water",
    elementLabel: "水",
    energyMeaning: "水代表柔和、流动、沉静与智慧。",
    colors: ["海蓝色", "墨黑色", "银白色"],
    gemstones: ["海蓝宝", "青金石", "黑曜石", "蓝宝石", "蓝托帕石"],
    materials: ["白金", "银", "冷色调镶嵌"],
    wearingStyle: "适合冷色调、柔和、带有流动感的耳饰、戒指或吊坠。",
    staffKeywords: ["沉稳", "温柔", "有质感", "显气质"]
  },
  fire: {
    element: "fire",
    elementLabel: "火",
    energyMeaning: "火代表光彩、表达、热情与被看见的力量。",
    colors: ["朱红色", "玫瑰金色", "紫红色", "粉色"],
    gemstones: ["红宝石", "石榴石", "红玛瑙", "南红", "紫水晶"],
    materials: ["玫瑰金", "亮面 18K 金", "暖色金属"],
    wearingStyle: "适合能够提升气色、增强存在感的耳饰、锁骨链或手链。",
    staffKeywords: ["提气色", "有精神", "有魅力", "明亮"]
  },
  earth: {
    element: "earth",
    elementLabel: "土",
    energyMeaning: "土代表稳定、承托、安全感与亲和力。",
    colors: ["米金色", "琥珀色", "暖褐色"],
    gemstones: ["黄水晶", "虎眼石", "琥珀", "蜜蜡", "茶晶"],
    materials: ["黄金", "拉丝金", "暖色半宝石"],
    wearingStyle: "适合暖色调、自然光泽、不过分夸张的吊坠、手镯或戒指。",
    staffKeywords: ["温润", "安定", "耐看", "亲和"]
  }
};
