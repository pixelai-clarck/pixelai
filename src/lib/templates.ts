import type { Template, TemplateCategory, GenerationType } from "@/types";

export const TEMPLATE_CATEGORIES: {
  id: TemplateCategory;
  label: string;
  icon: string;
}[] = [
  { id: "moda", label: "Moda", icon: "Shirt" },
  { id: "fitness", label: "Fitness", icon: "Dumbbell" },
  { id: "beleza", label: "Beleza", icon: "Sparkles" },
  { id: "financas", label: "Finanças", icon: "TrendingUp" },
  { id: "food", label: "Food", icon: "UtensilsCrossed" },
  { id: "tech", label: "Tech", icon: "Cpu" },
  { id: "lifestyle", label: "Lifestyle", icon: "Sun" },
  { id: "saude", label: "Saúde", icon: "Heart" },
];

export const templates: Template[] = [
  // ── MODA ──────────────────────────────────────────────
  {
    id: "moda-01",
    title: "Look verão feminino",
    prompt:
      "Young Brazilian woman, 25 years old, wearing elegant summer dress, studio lighting, fashion photography, white background, high-end editorial style",
    category: "moda",
    type: "image",
    tags: ["feminino", "verão", "editorial"],
  },
  {
    id: "moda-02",
    title: "Streetwear masculino",
    prompt:
      "Young man, 22 years old, urban streetwear outfit, oversized hoodie and cargo pants, city background with graffiti, golden hour lighting, street photography style",
    category: "moda",
    type: "image",
    tags: ["masculino", "streetwear", "urbano"],
  },
  {
    id: "moda-03",
    title: "Acessórios em flat lay",
    prompt:
      "Flat lay photography of luxury accessories, gold jewelry, designer sunglasses, leather handbag, marble surface, soft shadows, minimalist composition, product photography",
    category: "moda",
    type: "image",
    tags: ["acessórios", "flat lay", "produto"],
  },
  {
    id: "moda-04",
    title: "Desfile editorial",
    prompt:
      "Fashion runway model, elegant evening gown, dramatic lighting with colored gels, motion blur on fabric, high fashion editorial, Vogue style photography",
    category: "moda",
    type: "image",
    tags: ["desfile", "editorial", "alta moda"],
  },
  {
    id: "moda-05",
    title: "Moda praia",
    prompt:
      "Brazilian woman on tropical beach, stylish bikini and sarong, sunset golden hour, palm trees in background, lifestyle fashion photography, warm tones",
    category: "moda",
    type: "image",
    tags: ["praia", "feminino", "lifestyle"],
  },
  {
    id: "moda-06",
    title: "Look casual inverno",
    prompt:
      "Young woman in cozy winter outfit, knit sweater and jeans, coffee shop setting, soft natural window light, warm tones, lifestyle editorial photography",
    category: "moda",
    type: "image",
    tags: ["feminino", "inverno", "casual"],
  },

  // ── FITNESS ───────────────────────────────────────────
  {
    id: "fitness-01",
    title: "Treino na academia",
    prompt:
      "Athletic man, 30 years old, gym setting, wearing sportswear, natural lighting, motivational pose, holding dumbbells, sweat detail, cinematic fitness photography",
    category: "fitness",
    type: "image",
    tags: ["masculino", "academia", "treino"],
  },
  {
    id: "fitness-02",
    title: "Yoga ao ar livre",
    prompt:
      "Fit woman doing yoga pose on mountain top, sunrise background, athletic wear, serene expression, wide angle landscape, wellness photography, golden light",
    category: "fitness",
    type: "image",
    tags: ["feminino", "yoga", "outdoor"],
  },
  {
    id: "fitness-03",
    title: "Crossfit intenso",
    prompt:
      "Crossfit athlete mid-workout, box jump action shot, dramatic gym lighting, chalk dust in air, intense expression, dynamic motion, sports photography",
    category: "fitness",
    type: "image",
    tags: ["crossfit", "ação", "intenso"],
  },
  {
    id: "fitness-04",
    title: "Corrida ao ar livre",
    prompt:
      "Runner on urban trail at dawn, athletic build, modern running shoes closeup, motion blur background, city skyline, fresh morning light, sports lifestyle",
    category: "fitness",
    type: "image",
    tags: ["corrida", "outdoor", "urbano"],
  },
  {
    id: "fitness-05",
    title: "Before & After transformation",
    prompt:
      "Split composition fitness transformation, left side before, right side after, clean white background, same lighting both sides, professional body photography, motivational",
    category: "fitness",
    type: "image",
    tags: ["transformação", "antes e depois"],
  },

  // ── BELEZA ────────────────────────────────────────────
  {
    id: "beleza-01",
    title: "Beauty editorial close-up",
    prompt:
      "Close-up portrait, young woman, flawless skin, soft dewy makeup, ring light reflection in eyes, beauty editorial, clean background, high-end skincare ad style",
    category: "beleza",
    type: "image",
    tags: ["retrato", "skincare", "editorial"],
  },
  {
    id: "beleza-02",
    title: "Maquiagem artística",
    prompt:
      "Creative makeup art on model face, bold colorful eyeshadow, glitter accents, macro photography, studio lighting with colored gels, avant-garde beauty editorial",
    category: "beleza",
    type: "image",
    tags: ["maquiagem", "artístico", "criativo"],
  },
  {
    id: "beleza-03",
    title: "Cabelo cacheado natural",
    prompt:
      "Beautiful Brazilian woman with natural curly hair, hair product advertisement, soft studio lighting, hair flowing with movement, clean background, haircare editorial",
    category: "beleza",
    type: "image",
    tags: ["cabelo", "cacheado", "natural"],
  },
  {
    id: "beleza-04",
    title: "Skincare routine",
    prompt:
      "Woman applying face serum, bathroom mirror setting, soft morning light, dewy fresh skin, minimalist aesthetic, skincare product visible, lifestyle beauty photography",
    category: "beleza",
    type: "image",
    tags: ["skincare", "rotina", "lifestyle"],
  },
  {
    id: "beleza-05",
    title: "Unhas decoradas",
    prompt:
      "Elegant manicured hands closeup, trendy nail art design, soft pastel colors, delicate flowers in background, macro photography, beauty salon style, soft focus",
    category: "beleza",
    type: "image",
    tags: ["unhas", "nail art", "macro"],
  },

  // ── FINANÇAS ──────────────────────────────────────────
  {
    id: "financas-01",
    title: "Investidor confiante",
    prompt:
      "Confident young professional in modern office, business casual outfit, laptop showing financial charts, clean desk setup, warm ambient lighting, corporate lifestyle",
    category: "financas",
    type: "image",
    tags: ["profissional", "escritório", "investimento"],
  },
  {
    id: "financas-02",
    title: "Dashboard financeiro",
    prompt:
      "Modern financial dashboard on large monitor, dark theme with green and blue charts, trading data, clean desk with keyboard, ambient RGB lighting, tech finance aesthetic",
    category: "financas",
    type: "image",
    tags: ["dashboard", "trading", "tech"],
  },
  {
    id: "financas-03",
    title: "Liberdade financeira",
    prompt:
      "Person working from tropical location, laptop on wooden table, ocean view in background, digital nomad lifestyle, warm sunset tones, financial freedom concept",
    category: "financas",
    type: "image",
    tags: ["liberdade", "nomade digital", "lifestyle"],
  },
  {
    id: "financas-04",
    title: "Empreendedor startup",
    prompt:
      "Young entrepreneur in coworking space, presenting to small team, whiteboard with business plan, modern industrial interior, motivated expression, startup culture",
    category: "financas",
    type: "image",
    tags: ["startup", "empreendedor", "apresentação"],
  },
  {
    id: "financas-05",
    title: "Crypto & blockchain",
    prompt:
      "Futuristic digital art with Bitcoin and Ethereum symbols, holographic interface, dark background with neon blue and purple accents, tech finance illustration, 3D render",
    category: "financas",
    type: "image",
    tags: ["crypto", "blockchain", "futurista"],
  },

  // ── FOOD ──────────────────────────────────────────────
  {
    id: "food-01",
    title: "Prato gourmet",
    prompt:
      "Gourmet dish beautifully plated, fine dining presentation, dark wooden table, soft side lighting, shallow depth of field, food photography, Michelin star style",
    category: "food",
    type: "image",
    tags: ["gourmet", "fine dining", "prato"],
  },
  {
    id: "food-02",
    title: "Café da manhã aesthetic",
    prompt:
      "Aesthetic breakfast flat lay, avocado toast, acai bowl, fresh juice, marble table, flowers, soft morning light from window, Instagram-worthy food photography",
    category: "food",
    type: "image",
    tags: ["café da manhã", "flat lay", "aesthetic"],
  },
  {
    id: "food-03",
    title: "Hambúrguer artesanal",
    prompt:
      "Juicy artisan burger with melting cheese, brioche bun, fresh lettuce and tomato, dark moody background, dramatic lighting, sauce dripping, food advertising photography",
    category: "food",
    type: "image",
    tags: ["hambúrguer", "fast food", "artesanal"],
  },
  {
    id: "food-04",
    title: "Confeitaria & doces",
    prompt:
      "Beautiful pastry display, macarons in pastel colors, elegant cake with floral decoration, bakery setting, soft natural light, confectionery photography, dreamy tones",
    category: "food",
    type: "image",
    tags: ["doces", "confeitaria", "macarons"],
  },
  {
    id: "food-05",
    title: "Drink tropical",
    prompt:
      "Colorful tropical cocktail with fresh fruits, ice, tropical flowers garnish, beach bar setting, vibrant sunset background, refreshing summer drink photography",
    category: "food",
    type: "image",
    tags: ["drink", "tropical", "coquetel"],
  },

  // ── TECH ──────────────────────────────────────────────
  {
    id: "tech-01",
    title: "Setup gamer/streamer",
    prompt:
      "Epic gaming setup, ultrawide monitor with RGB lighting, mechanical keyboard, gaming chair, neon purple and blue ambient lighting, dark room, tech lifestyle photography",
    category: "tech",
    type: "image",
    tags: ["gaming", "setup", "RGB"],
  },
  {
    id: "tech-02",
    title: "Produto tech minimal",
    prompt:
      "Minimalist tech product shot, wireless earbuds on clean white surface, soft shadows, studio lighting, Apple-style product photography, high-end commercial",
    category: "tech",
    type: "image",
    tags: ["produto", "minimal", "earbuds"],
  },
  {
    id: "tech-03",
    title: "Workspace produtivo",
    prompt:
      "Clean productive workspace, MacBook on wooden desk, plant, coffee cup, organized cables, natural window light, warm tones, productivity lifestyle, top-down angle",
    category: "tech",
    type: "image",
    tags: ["workspace", "produtividade", "desk setup"],
  },
  {
    id: "tech-04",
    title: "Inteligência artificial",
    prompt:
      "Futuristic AI visualization, neural network connections, glowing nodes on dark background, blue and violet color scheme, abstract digital art, technology concept illustration",
    category: "tech",
    type: "image",
    tags: ["IA", "futurista", "abstrato"],
  },
  {
    id: "tech-05",
    title: "Smartphone em uso",
    prompt:
      "Person holding latest smartphone, app interface visible on screen, urban background with bokeh lights, night scene, lifestyle tech photography, shallow depth of field",
    category: "tech",
    type: "image",
    tags: ["smartphone", "app", "lifestyle"],
  },

  // ── LIFESTYLE ─────────────────────────────────────────
  {
    id: "lifestyle-01",
    title: "Viagem & aventura",
    prompt:
      "Young traveler at iconic travel destination, backpack, golden hour lighting, wide angle landscape, adventure lifestyle, wanderlust photography, warm cinematic tones",
    category: "lifestyle",
    type: "image",
    tags: ["viagem", "aventura", "wanderlust"],
  },
  {
    id: "lifestyle-02",
    title: "Home decor minimalista",
    prompt:
      "Minimalist living room interior, neutral tones, designer furniture, large window with natural light, indoor plants, Scandinavian style, interior photography",
    category: "lifestyle",
    type: "image",
    tags: ["decoração", "minimalista", "interior"],
  },
  {
    id: "lifestyle-03",
    title: "Casal lifestyle",
    prompt:
      "Happy young couple in urban setting, casual stylish outfits, walking and laughing together, golden hour light, candid moment, relationship lifestyle photography",
    category: "lifestyle",
    type: "image",
    tags: ["casal", "lifestyle", "candid"],
  },
  {
    id: "lifestyle-04",
    title: "Pet lover",
    prompt:
      "Person cuddling with golden retriever dog, cozy home setting, soft blanket, warm afternoon light from window, heartwarming lifestyle photography, soft tones",
    category: "lifestyle",
    type: "image",
    tags: ["pet", "cachorro", "cozy"],
  },
  {
    id: "lifestyle-05",
    title: "Self care domingo",
    prompt:
      "Woman in cozy robe enjoying self-care day, candles, bath products, cup of tea, reading a book, soft diffused light, relaxation lifestyle, warm pastel tones",
    category: "lifestyle",
    type: "image",
    tags: ["self care", "relaxamento", "cozy"],
  },

  // ── SAÚDE ─────────────────────────────────────────────
  {
    id: "saude-01",
    title: "Suplementos & vitaminas",
    prompt:
      "Clean supplement bottles and vitamin capsules arranged on white marble surface, fresh fruits nearby, bright clean lighting, health product photography, clinical yet inviting",
    category: "saude",
    type: "image",
    tags: ["suplementos", "vitaminas", "produto"],
  },
  {
    id: "saude-02",
    title: "Alimentação saudável",
    prompt:
      "Colorful healthy meal prep in glass containers, fresh vegetables, grains, lean protein, kitchen counter, natural light, clean eating lifestyle, nutrition photography",
    category: "saude",
    type: "image",
    tags: ["alimentação", "meal prep", "saudável"],
  },
  {
    id: "saude-03",
    title: "Meditação & mindfulness",
    prompt:
      "Person meditating in peaceful garden setting, eyes closed, serene expression, morning light, plants and nature around, zen atmosphere, wellness photography, calm tones",
    category: "saude",
    type: "image",
    tags: ["meditação", "mindfulness", "bem-estar"],
  },
  {
    id: "saude-04",
    title: "Consultório moderno",
    prompt:
      "Modern medical office interior, clean white and green tones, friendly doctor with patient, warm professional atmosphere, healthcare lifestyle photography",
    category: "saude",
    type: "image",
    tags: ["médico", "consultório", "profissional"],
  },
  {
    id: "saude-05",
    title: "Saúde mental",
    prompt:
      "Peaceful person journaling in cozy corner, soft blanket, warm light, plants, calming colors, mental health awareness concept, introspective mood, lifestyle wellness photography",
    category: "saude",
    type: "image",
    tags: ["saúde mental", "journaling", "bem-estar"],
  },
];

export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return templates.filter((t) => t.category === category);
}

export function getTemplatesByType(type: GenerationType): Template[] {
  return templates.filter((t) => t.type === type);
}

export function searchTemplates(query: string): Template[] {
  const q = query.toLowerCase().trim();
  if (!q) return templates;

  return templates.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.prompt.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
