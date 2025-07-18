export interface HotWord {
  id: number;
  chinese: string;
  pinyin: string;
  english: string;
  videoUrl: string;
  scenarios: string[];
  usages: string[];
  difficulty: number;
  relatedWords: number[];
}

export interface CultureContent {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
}

export interface Meme {
  id: number;
  imageUrl: string;
  title: string;
  chineseDesc: string;
  englishDesc: string;
  culturalAnalysis: string;
  relatedWords: number[];
}

export const hotWords: HotWord[] = [
  {
    id: 1,
    chinese: "破防",
    pinyin: "pò fáng",
    english: "Emotionally overwhelmed",
    videoUrl: "https://example.com/video1",
    scenarios: ["看到感人的电影场景时", "听到朋友分享的励志故事时"],
    usages: ["这部电影让我破防了", "他的经历让我瞬间破防"],
    difficulty: 3,
    relatedWords: [2, 3]
  },
  {
    id: 2,
    chinese: "躺平",
    pinyin: "tǎng píng",
    english: "Lie flat",
    videoUrl: "https://example.com/video2",
    scenarios: ["面对工作压力时", "讨论生活态度时"],
    usages: ["我决定躺平不卷了", "年轻人选择躺平的生活方式"],
    difficulty: 2,
    relatedWords: [1, 3]
  },
  {
    id: 3,
    chinese: "社死",
    pinyin: "shè sǐ",
    english: "Social death",
    videoUrl: "https://example.com/video3",
    scenarios: ["在公共场合出丑时", "社交媒体上发错内容时"],
    usages: ["今天在会议上说错话，简直社死", "不小心把私信发到群里，大型社死现场"],
    difficulty: 4,
    relatedWords: [1, 2]
  },
  {
    id: 4,
    chinese: "内卷",
    pinyin: "nèi juǎn",
    english: "Involution",
    videoUrl: "https://example.com/video4",
    scenarios: ["讨论竞争压力时", "分析社会现象时"],
    usages: ["这个行业太内卷了", "拒绝无意义的内卷"],
    difficulty: 4,
    relatedWords: [2, 5]
  },
  {
    id: 5,
    chinese: "凡尔赛",
    pinyin: "fán ěr sài",
    english: "Humblebrag",
    videoUrl: "https://example.com/video5",
    scenarios: ["炫耀但假装低调时", "评论他人炫耀行为时"],
    usages: ["他又在凡尔赛了", "这发言太凡尔赛了"],
    difficulty: 3,
    relatedWords: [4, 1]
  }
];

export interface CultureComparison {
  id: number;
  title: string;
  chinaContent: string;
  westContent: string;
  highlights: string[];
  relatedMemes: number[];
}

export const cultureContent: CultureContent = {
  id: 1,
  title: "春节习俗",
  summary: "中国春节的传统习俗与现代变化",
  imageUrl: "https://example.com/culture1"
};

export const cultureComparisons: CultureComparison[] = [
  {
    id: 1,
    title: "春节 vs 圣诞节",
    chinaContent: "春节是中国最重要的传统节日，家人团聚、吃年夜饭、发红包、放鞭炮是主要习俗。春节象征着新的开始，人们会大扫除、贴春联、穿新衣，表达对新年的美好祝愿。",
    westContent: "圣诞节是西方最重要的节日之一，家人团聚、交换礼物、装饰圣诞树是主要传统。圣诞节源于基督教，但已成为广泛庆祝的世俗节日，强调给予、分享和家庭团聚。",
    highlights: [
      "春节持续时间更长（通常15天）",
      "圣诞节有固定的日期（12月25日）",
      "红包 vs 圣诞礼物"
    ],
    relatedMemes: [1, 3]
  },
  {
    id: 2,
    title: "餐桌礼仪对比",
    chinaContent: "在中国文化中，餐桌礼仪强调尊重长辈。主人通常会为客人夹菜，拒绝可能被视为不礼貌。吃饭时发出声音（如喝汤）是可以接受的，这表示食物美味。",
    westContent: "西方餐桌礼仪强调个人空间和安静用餐。为他人夹菜不常见，各自取用自己需要的食物。吃饭时发出声音通常被认为不礼貌，应尽量避免。",
    highlights: [
      "夹菜文化差异",
      "用餐声音的不同理解",
      "餐具使用的不同"
    ],
    relatedMemes: [2, 4]
  }
];

export const memes: Meme[] = [
  {
    id: 1,
    imageUrl: "https://example.com/meme1",
    title: "熊猫表情包",
    chineseDesc: "熊猫人表情包，用于表达各种情绪",
    englishDesc: "Panda meme for expressing various emotions",
    culturalAnalysis: "熊猫是中国的国宝，这种表情包结合了可爱与文化象征",
    relatedWords: [1, 5]
  },
  {
    id: 2,
    imageUrl: "https://example.com/meme2",
    title: "中国功夫梗图",
    chineseDesc: "搞笑版功夫动作配文'我练过两年半'",
    englishDesc: "Funny kung fu moves with caption 'I trained for 2.5 years'",
    culturalAnalysis: "调侃中国功夫电影的夸张表现手法",
    relatedWords: [3, 4]
  },
  {
    id: 3,
    imageUrl: "https://example.com/meme3",
    title: "方言搞笑图",
    chineseDesc: "各地方言对比产生的幽默效果",
    englishDesc: "Humorous comparison of Chinese dialects",
    culturalAnalysis: "展示中国丰富的方言文化差异",
    relatedWords: [2, 5]
  },
  {
    id: 4,
    imageUrl: "https://example.com/meme4",
    title: "网络流行语配图",
    chineseDesc: "网络热词'栓Q'配搞笑图片",
    englishDesc: "Internet slang 'Shuan Q' with funny image",
    culturalAnalysis: "展示网络流行语的视觉化表达",
    relatedWords: [1, 3]
  },
  {
    id: 5,
    imageUrl: "https://example.com/meme5",
    title: "古风搞笑图",
    chineseDesc: "古代人物配现代网络用语",
    englishDesc: "Ancient figures with modern internet slang",
    culturalAnalysis: "古今文化碰撞产生的幽默",
    relatedWords: [2, 4]
  }
];

export interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  replies: Reply[];
  likes: number;
  timestamp: string;
}

export interface Reply {
  id: number;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
}

export interface StudyGroup {
  id: number;
  name: string;
  members: number;
  topic: string;
  description: string;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  answers: Answer[];
  points: number;
  solved: boolean;
}

export interface Answer {
  id: number;
  author: string;
  content: string;
  points: number;
  isBest: boolean;
  timestamp: string;
}

export const posts: Post[] = [
  {
    id: 1,
    author: "张三",
    avatar: "https://example.com/avatar1",
    content: "今天学习了'破防'这个词，大家有什么有趣的用法可以分享吗？@李四",
    replies: [
      {
        id: 1,
        author: "李四",
        content: "我昨天看视频时听到'破防了'，意思是感动到哭😂",
        likes: 5,
        timestamp: "2025-07-10 14:30"
      }
    ],
    likes: 12,
    timestamp: "2025-07-10 10:15"
  },
  {
    id: 2,
    author: "王五",
    avatar: "https://example.com/avatar2",
    content: "有人能解释下'躺平'和'内卷'的区别吗？感觉这两个词经常一起出现",
    replies: [],
    likes: 8,
    timestamp: "2025-07-09 16:45"
  }
];

export const studyGroups: StudyGroup[] = [
  {
    id: 1,
    name: "网络热词学习",
    members: 42,
    topic: "网络流行语",
    description: "一起学习最新的中文网络热词和用法"
  },
  {
    id: 2,
    name: "中国文化探索",
    members: 35,
    topic: "文化差异",
    description: "探讨中西文化差异和有趣的文化现象"
  }
];

export const questions: Question[] = [
  {
    id: 1,
    title: "'社死'的正确使用场景",
    content: "在什么情况下可以使用'社死'这个词？有没有英文对应的表达？",
    author: "赵六",
    answers: [
      {
        id: 1,
        author: "钱七",
        content: "'社死'通常用于在公共场合出丑的情况，英文可以翻译为'social death'或'embarrassing moment'",
        points: 15,
        isBest: true,
        timestamp: "2025-07-08 11:20"
      }
    ],
    points: 20,
    solved: true
  },
  {
    id: 2,
    title: "如何区分'凡尔赛'和普通炫耀",
    content: "有时候分不清别人是在凡尔赛还是单纯分享，有什么判断标准吗？",
    author: "孙八",
    answers: [],
    points: 5,
    solved: false
  }
];