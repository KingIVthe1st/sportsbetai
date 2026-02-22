# AI Image Generation Prompts for AI Sports Betting Pro

**Purpose:** Generate premium images using Google AI Studio (Imagen) or Midjourney  
**Date:** 2026-02-21

---

## ACCESS IMAGEN

**Option 1: Google AI Studio**
1. Go to https://aistudio.google.com/
2. Sign in with Google account
3. Click "Create New" → "Image"
4. Paste prompts below
5. Download as PNG (1200x800px recommended)

**Option 2: Gemini CLI (if configured)**
```bash
gemini imagen "YOUR_PROMPT_HERE" --output ~/Projects/ai-sports-betting-pro/public/images/
```

---

## IMAGE 1: Hero Background Overlay
**Filename:** `hero-bg-overlay.png`  
**Size:** 1920x1080px  
**Use:** Subtle overlay on hero section background

**Prompt:**
```
Abstract futuristic AI neural network visualization, dark background #0A0E17, glowing cyan #00F0FF and green #10B981 hexagonal nodes, flowing data streams, holographic effect, semi-transparent, subtle, professional tech aesthetic, 8K quality, cinematic lighting
```

**Placement:** `<Image className="absolute inset-0 opacity-10" />`

---

## IMAGE 2: XGBoost ML Engine Icon
**Filename:** `xgboost-engine.png`  
**Size:** 400x400px  
**Use:** Feature card icon for "XGBoost ML Engine"

**Prompt:**
```
Futuristic AI brain made of glowing cyan and green neural network nodes, hexagonal structure, holographic style, dark background, 3D rendered brain with data flowing through synapses, professional tech icon, transparent background, high detail
```

**Placement:** Replace `<Brain />` icon in features section

---

## IMAGE 3: Situational Intelligence Visualization
**Filename:** `situational-intelligence.png`  
**Size:** 400x400px  
**Use:** Feature card icon for "Situational Intelligence"

**Prompt:**
```
Holographic display showing basketball court analysis, glowing cyan data overlays, heat maps, player movement trails in green, travel distance calculations, timezone indicators, dark sleek interface, futuristic sports analytics, professional tech aesthetic
```

**Placement:** Replace `<TrendingUp />` icon in features section

---

## IMAGE 4: Injury Tracking Dashboard
**Filename:** `injury-tracking.png`  
**Size:** 400x400px  
**Use:** Feature card icon for "Injury-Adjusted Picks"

**Prompt:**
```
Futuristic medical cross with AI circuit board pattern, glowing cyan edges, player silhouettes with health status indicators, holographic injury impact visualization, dark background, neon green and cyan accents, professional medical tech icon
```

**Placement:** Replace `<Shuffle />` icon in features section

---

## IMAGE 5: Live Dashboard Mockup
**Filename:** `dashboard-mockup.png`  
**Size:** 1400x900px  
**Use:** Replace or enhance the 3 dashboard cards

**Prompt:**
```
Professional sports betting dashboard showing NBA game predictions, LAL vs DEN matchup, glowing cyan interface elements, live odds display (-1.65, -1.20, 8.26 highlighted in green), dark sleek UI #0A0E17, hexagonal design patterns, AI confidence score bar, futuristic holographic style, 8K quality
```

**Placement:** Background image for dashboard cards section

---

## IMAGE 6: Performance Metrics Visualization
**Filename:** `metrics-visualization.png`  
**Size:** 1200x600px  
**Use:** "Verified Performance Metrics" section background

**Prompt:**
```
Abstract data visualization showing 68.3% win rate, Brier Score graphs, MAE accuracy charts, glowing cyan and green statistical displays, dark background, holographic numbers floating in 3D space, professional analytics dashboard aesthetic, futuristic
```

**Placement:** Background for Verified Performance Metrics cards

---

## IMAGE 7: AI Processing Animation Frame
**Filename:** `ai-processing.png`  
**Size:** 800x800px  
**Use:** Loading states or "how it works" section

**Prompt:**
```
Circular holographic visualization of AI processing NBA game data, glowing cyan data streams flowing in spiral pattern, green hexagonal nodes, dark background, futuristic tech aesthetic, machine learning algorithm visualization, professional quality
```

**Placement:** "How It Works" step illustrations

---

## IMAGE 8: Team Logo - Lakers (LAL)
**Filename:** `lakers-logo.png`  
**Size:** 200x200px  
**Use:** Dashboard card team logo

**Prompt:**
```
Futuristic Los Angeles Lakers logo, purple #552583 with cyan holographic glow effect, hexagonal frame, dark background, neon style, professional sports tech aesthetic, transparent background
```

**Placement:** LAL team circle in dashboard cards

---

## IMAGE 9: Team Logo - Nuggets (DEN)
**Filename:** `nuggets-logo.png`  
**Size:** 200x200px  
**Use:** Dashboard card team logo

**Prompt:**
```
Futuristic Denver Nuggets logo, navy blue #0E2240 with cyan holographic glow effect, hexagonal frame, dark background, neon style, professional sports tech aesthetic, transparent background
```

**Placement:** DEN team circle in dashboard cards

---

## IMAGE 10: Hexagonal Pattern Texture
**Filename:** `hex-pattern.png`  
**Size:** 1920x1080px (tileable)  
**Use:** Background texture overlay

**Prompt:**
```
Seamless tileable hexagonal grid pattern, very subtle, dark background #0A0E17, thin cyan #00F0FF lines, low opacity 5%, futuristic tech aesthetic, repeating pattern, high resolution
```

**Placement:** Background pattern across entire site

---

## BATCH GENERATION INSTRUCTIONS

1. **Google AI Studio:** Generate all 10 images in one session
2. **Download:** Save to `~/Projects/ai-sports-betting-pro/public/images/`
3. **Optimize:** Use ImageOptim or similar to reduce file sizes
4. **Deploy:** Commit and push to GitHub (auto-deploys to Vercel)

---

## IMPLEMENTATION CHECKLIST

After generating images:

- [ ] Place images in `/public/images/` directory
- [ ] Update `landing-page.tsx` to use `<Image src="/images/..." />`
- [ ] Replace Lucide icons with custom images
- [ ] Add background overlays to hero and sections
- [ ] Test image loading performance
- [ ] Commit and push to GitHub
- [ ] Verify deployment on Vercel

---

**Alternative:** If you want me to handle the browser automation to access Google AI Studio directly, I can use the Chrome extension relay to generate these images automatically. Just let me know!
