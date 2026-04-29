const prompts = {
  // BUSINESS TOOLS
  competitorAnalysisPrompt: (niche) =>
    `
Conduct a professional competitive landscape analysis for the following market: "${niche}"

Your analysis must reflect real market dynamics. Think like a Series A investor evaluating whether to fund a new entrant.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "competitors": [
    {
      "name": "Competitor name",
      "description": "Core value proposition in one sentence",
      "pricing": "Pricing model + specific price range (e.g., '$29–$299/mo, usage-based')",
      "strengths": ["Specific strength 1", "Specific strength 2", "Specific strength 3"],
      "weaknesses": ["Exploitable weakness 1", "Exploitable weakness 2"],
      "targetMarket": "Specific customer segment they serve best",
      "estimatedMarketShare": "Rough % or 'Unknown' with reasoning"
    }
  ],
  "marketGap": "2–3 sentences: what real pain point remains unaddressed, and which customer type suffers most",
  "positioningRecommendation": "2–3 sentences: how to position a new entrant — must name at least one competitor",
  "opportunityScore": 75,
  "competitionLevel": "Low | Medium | High",
  "estimatedMarketSize": "TAM estimate with reasoning (e.g., '$2.4B — based on 8M SMBs × $25/mo avg')",
  "entryStrategy": "One specific go-to-market wedge a new entrant should use to get first 100 customers"
}

Include exactly 5 competitors. Be specific. Vague answers are unacceptable.
    `.trim(),

  pricingStrategyPrompt: ({ product, description, customer, cost }) =>
    `
Design a complete, investor-ready pricing strategy for the following product.

Product: ${product}
Description: ${description}
Target Customer: ${customer}
Cost to Serve One User/Month: ${cost || "Unknown — make a realistic assumption and state it"}

Think like a pricing strategist who has studied Notion, Linear, and Stripe's pricing evolution.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "recommendedModel": "Freemium | Usage-based | Tiered | Flat-rate | Per-seat",
  "rationale": "2–3 sentences: why this model fits this product's growth motion and customer type",
  "launchPrice": "Specific recommended launch price with reasoning (e.g., '$29/mo — below psychological $30 threshold, above 'free tool' perception')",
  "tiers": [
    {
      "name": "Tier name (must reflect customer journey stage)",
      "price": "$X/mo or free",
      "target": "Specific customer persona for this tier",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      "limit": "Specific usage cap or 'Unlimited'",
      "conversionHook": "What makes users upgrade FROM this tier"
    }
  ],
  "psychologyNotes": [
    "Specific pricing psychology tactic 1 (e.g., 'Middle tier anchoring: Pro at $49 makes $29 feel like a bargain')",
    "Specific pricing psychology tactic 2",
    "Specific pricing psychology tactic 3"
  ],
  "freemiumRecommendation": "Yes/No — include expected free-to-paid conversion rate estimate and reasoning",
  "riskWarning": "One specific pricing failure mode for this product category (e.g., 'Underpricing signals low quality to enterprise buyers')",
  "competitorPricingContext": "How this pricing compares to 2–3 market benchmarks"
}
    `.trim(),

  businessIdeasPrompt: ({ niche, audience, model }) =>
    `
Generate 5 fundable, specific startup ideas for the following criteria.

Niche: "${niche}"
Target Audience: ${audience}
Preferred Revenue Model: ${model}

Think like Paul Graham reviewing YC applications — reject generic ideas, reward specificity and insight.

Return ONLY a valid JSON array with exactly 5 objects. No markdown. Raw JSON only.

Schema for each object:
{
  "name": "Startup name (2–4 words, memorable)",
  "tagline": "One-line pitch — under 12 words, no buzzwords",
  "problem": "Specific painful problem — name the exact frustration and who feels it",
  "solution": "Concrete product description — what you build and how it works",
  "targetUser": "Named, specific user persona (e.g., 'Shopify sellers doing $5K–$50K/mo revenue')",
  "revenueModel": "Specific model with price points (e.g., '$49/mo per seat, enterprise at $500/mo')",
  "competitionLevel": "Low | Medium | High",
  "unfairAdvantage": "Specific moat: data network effect | regulatory edge | community | distribution",
  "estimatedTAM": "Rough market size with calculation logic",
  "validation": [
    "Concrete action 1 (e.g., 'Post in r/ecommerce: Would you pay $X for Y? Target 50 upvotes')",
    "Concrete action 2",
    "Concrete action 3"
  ],
  "firstRevenueIn": "Realistic estimate: how many days to first paying customer if execution starts today"
}
    `.trim(),

  coldEmailPrompt: ({ name, company, role, offering, goal, websiteUrl }) =>
    `
Write 3 high-converting cold email variants for the following outreach campaign.

Prospect: ${[name, role, company ? `at ${company}` : ""].filter(Boolean).join(", ")}
Offering: ${offering}
Goal: ${goal || "Book a 15-minute discovery call"}
${websiteUrl ? `Website for context: ${websiteUrl}` : ""}

Write as if you personally researched this prospect. Each email must feel 1:1, not templated.

Return ONLY a valid JSON object. No markdown. Raw JSON only.

Required schema:
{
  "direct": {
    "subject": "Under 8 words — creates curiosity, not clickbait",
    "body": "Punchy, under 100 words. Opens with specific observation or result. One CTA.",
    "openingType": "pattern interrupt | social proof | bold claim | specific question"
  },
  "conversational": {
    "subject": "Friendly, 5–7 words",
    "body": "Warm but confident, 80–120 words. Feels like a peer reaching out, not a vendor.",
    "openingType": "pattern interrupt | social proof | bold claim | specific question"
  },
  "formal": {
    "subject": "Professional, under 10 words",
    "body": "Structured, 100–150 words. Appropriate for VP/C-suite. Credibility-first approach.",
    "openingType": "pattern interrupt | social proof | bold claim | specific question"
  },
  "subjectLineRationale": "One sentence explaining the psychological hook used across subject lines",
  "followUpSuggestion": "One-sentence follow-up strategy for non-responders after 3 days"
}

FORBIDDEN openers: "I hope this finds you well", "I wanted to reach out", "Just checking in", "Quick question", "Touch base", "I came across your profile".
    `.trim(),

  // PRODUCTIVITY TOOLS

  pdfSummarizerPrompt: ({ fileName, summaryLength, language, focus, pdfText }) =>
    `
Perform a professional document intelligence analysis on the following PDF.

File: ${fileName}
Requested Summary Length: ${summaryLength}
Output Language: ${language}
Special Focus Area: ${focus || "General — capture the author's core argument and evidence"}

Document Content:
---
${pdfText}
---

Analyze as if preparing a briefing for a senior executive who has 3 minutes to understand this document.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "title": "Document title or a descriptive title you generate",
  "estimatedReadTime": 12,
  "wordCount": 3200,
  "documentType": "Academic paper | Business report | Legal document | Technical doc | Other",
  "summary": "Main summary — addresses WHO wrote it, WHAT they argue, WHY it matters. Match requested length.",
  "keyPoints": [
    "Standalone insight 1 — complete sentence, not a topic label",
    "Standalone insight 2",
    "Standalone insight 3",
    "Standalone insight 4",
    "Standalone insight 5"
  ],
  "topics": ["Noun phrase topic 1", "Topic 2", "Topic 3", "Topic 4"],
  "conclusion": "Single sentence: the ONE most important takeaway from this document",
  "audienceRecommendation": "Who should read this document and why — one sentence"
}

If output language is not English, translate ALL field values to ${language}.
    `.trim(),

  resumeAnalyzerPrompt: ({ jobTitle, jobDescription, fileName, resumeText }) =>
    `
Perform a comprehensive ATS and human-readability analysis of the following resume.

Target Role: "${jobTitle}"
Job Description: ${jobDescription || "General analysis — identify strongest role fit"}
Resume File: ${fileName}
Resume Content:
---
${resumeText}
---

Analyze as a senior technical recruiter AND an ATS system simultaneously.
Be honest. Most resumes score 40–65. Reserve 80+ for genuinely strong candidates.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "candidateName": "Extract from resume or use 'Candidate'",
  "overallScore": 72,
  "scores": {
    "atsCompatibility": 68,
    "skillsMatch": 75,
    "experienceRelevance": 70,
    "presentationQuality": 74,
    "impactClarity": 65
  },
  "skills": [
    { "name": "Skill name", "level": "Expert | Proficient | Beginner" }
  ],
  "strengths": [
    "Specific strength referencing actual resume content (e.g., 'Quantified impact: 40% load time reduction at Company X')",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "improvements": [
    "Specific, actionable fix (e.g., 'Managed social media' → add: platform, follower growth %, and monthly budget managed)",
    "Specific improvement 2",
    "Specific improvement 3"
  ],
  "summary": "2–3 sentences: candidate's strongest asset, biggest gap, and overall hiring likelihood for this role",
  "recommendedRoles": [
    "Specific role title with seniority level (e.g., 'Mid-level Frontend Engineer at growth-stage startup')",
    "Role 2",
    "Role 3"
  ],
  "keywordsMissing": ["ATS keyword 1 from job description", "Keyword 2", "Keyword 3"],
  "atsTip": "One specific formatting or keyword fix to immediately improve ATS score"
}
    `.trim(),

  taskBreakdownPrompt: ({
    projectName,
    description,
    timeline,
    teamSize,
    complexity,
  }) =>
    `
Create a CTO-level phased project execution plan for the following project.

Project Name: ${projectName}
Description: ${description}
Timeline: ${timeline}
Team Size: ${teamSize}
Complexity: ${complexity}

Think like a principal engineer: sequence tasks by dependency, surface risks early, and make estimates defensible.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "projectSummary": "1–2 sentences: what will be built, for whom, and what success looks like",
  "estimatedHours": 80,
  "riskLevel": "Low | Medium | High",
  "suggestedStack": ["Technology 1 (version)", "Technology 2", "Technology 3", "Technology 4"],
  "milestones": [
    "Measurable milestone 1 (e.g., 'Auth system live with Google OAuth and role-based access')",
    "Measurable milestone 2",
    "Measurable milestone 3"
  ],
  "phases": [
    {
      "phaseNumber": 1,
      "phaseName": "Foundation | Development | Launch (or equivalent)",
      "phaseGoal": "One sentence: what this phase achieves",
      "estimatedHours": 24,
      "tasks": [
        {
          "title": "Specific task title",
          "description": "What to build and why it matters for the project",
          "priority": "High | Medium | Low",
          "estimatedTime": "X hours",
          "dependency": "Title of dependent task or null",
          "technicalNote": "Key implementation decision or gotcha to be aware of"
        }
      ]
    }
  ],
  "biggestRisk": "The single most likely cause of delay or failure, and how to mitigate it",
  "mvpCutLine": "Which features to cut if timeline pressure hits — one sentence"
}
    `.trim(),

  // LIFE OPTIMIZATION TOOLS

  dailyPlannerPrompt: ({ tasks, energyPattern, availableHours, startTime }) =>
    `
Build an energy-optimized daily execution plan using chronobiology and cognitive load science.

Tasks to schedule: ${tasks.join(", ")}
Energy Pattern: ${energyPattern} person — peak cognitive performance in the ${
      energyPattern === "Morning"
        ? "morning (6AM–12PM)"
        : energyPattern === "Night"
          ? "late evening (8PM–12AM)"
          : "afternoon (1PM–6PM)"
    }
Available Hours: ${availableHours} hours starting at ${startTime}
Strategy: Apply ultradian rhythm theory — 90-minute deep work blocks followed by 15-minute recovery. Place cognitively demanding tasks during peak energy. Batch low-cognitive admin during energy slumps.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "totalTasks": 4,
  "deepWorkBlocks": 2,
  "breakTime": 60,
  "peakHours": "9:00 AM – 12:00 PM",
  "schedule": [
    {
      "time": "9:00 AM",
      "task": "Task name",
      "type": "Deep Work | Break | Low Energy | Admin | Meeting | Exercise",
      "duration": "90 min",
      "tip": "Specific, actionable micro-instruction for this exact block (not generic advice)"
    }
  ],
  "insights": [
    "Insight 1 — must reference a specific block or pattern in the generated schedule",
    "Insight 2",
    "Insight 3"
  ],
  "energyAdvice": "One sentence of personalized advice specific to a ${energyPattern} chronotype"
}

Rules:
- 6–10 schedule blocks total.
- Never place Deep Work during energy slump hours for this chronotype.
- Every 60–90 min of Deep Work must be followed by a Break block.
- Tips must be specific to the task type, not generic (e.g., not "focus well" — instead "open only the one tab you need, set a 25-min timer").
    `.trim(),

  habitCoachPrompt: ({ habitGoal, difficulty, habitType, reminderTime }) =>
    `
Design a science-backed, psychology-driven habit formation plan.

Habit Goal: "${habitGoal}"
Type: ${habitType} a habit
Difficulty Level: ${difficulty}
Preferred Reminder Time: ${reminderTime}

Apply: BJ Fogg's Tiny Habits (start impossibly small), James Clear's habit stacking (anchor to existing behaviors), and dopamine-based reinforcement (reward immediately after completion, not after results).

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "habitName": "Catchy, identity-based habit name (e.g., 'The 5-Min Victory Protocol')",
  "totalDays": 21,
  "successRate": "Realistic percentage string (e.g., '79% of users maintain this habit past Day 21')",
  "keyPrinciple": "Named behavioral psychology concept applied (e.g., 'Implementation Intention + Temptation Bundling')",
  "phases": [
    {
      "phase": "Foundation | Expansion | Automation (use these exact names)",
      "days": "Day 1–7",
      "goal": "One sentence: behavioral objective for this phase",
      "action": "Exact micro-action — must include duration, trigger, and location"
    }
  ],
  "dailyMicroTasks": [
    {
      "task": "Specific action completable in under 5 minutes",
      "trigger": "Existing behavior to stack onto (e.g., 'After brewing morning coffee')",
      "time": "X min"
    }
  ],
  "rewardSystem": [
    "Day 7 reward — must be specific and immediately enjoyable",
    "Day 21 reward — social or identity-based",
    "Day [totalDays] reward — meaningful, pre-committed"
  ],
  "obstacleStrategy": "Must include: the 'never miss twice' rule + a minimum viable fallback action (e.g., 'If you miss the gym, do 5 pushups right now — the cue matters more than the rep count')",
  "weekOneChallenge": "Exact 7-day micro-challenge with specific duration and trigger event — no vague instructions"
}
    `.trim(),

  decisionMakerPrompt: ({ decision, context, timeframe, stakes }) =>
    `
Perform a structured decision analysis using second-order thinking, pre-mortem analysis, and cognitive bias detection.

Decision: "${decision}"
Context: ${context || "No additional context provided"}
Timeframe Focus: ${timeframe}
Stakes Level: ${stakes}

Analyze as a principal decision analyst advising a C-suite executive. Be calibrated — most decisions have genuine uncertainty on both sides.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Required schema:
{
  "decisionTitle": "Short, neutral reformulation of the decision (under 10 words)",
  "clarityScore": 7,
  "confidenceScore": 7,
  "riskScore": 5,
  "recommendation": "Go | Don't Go | Gather More Info | Renegotiate",
  "recommendationReason": "One sentence: the single most important factor driving this recommendation",
  "pros": [
    { "point": "Specific pro — explain WHY it matters for this decision", "weight": "High | Medium | Low" },
    { "point": "Pro 2", "weight": "High | Medium | Low" },
    { "point": "Pro 3", "weight": "High | Medium | Low" }
  ],
  "cons": [
    { "point": "Specific con — explain WHY it matters for this decision", "weight": "High | Medium | Low" },
    { "point": "Con 2", "weight": "High | Medium | Low" },
    { "point": "Con 3", "weight": "High | Medium | Low" }
  ],
  "shortTermImpact": "Impact in next 1–3 months — specific to this decision context",
  "longTermImpact": "Impact in 1–5 years — specific to this decision context",
  "biasWarnings": [
    "Named cognitive bias (e.g., 'Sunk Cost Fallacy') + how it applies specifically to THIS decision",
    "Named cognitive bias 2 + specific application"
  ],
  "keyQuestion": "One Socratic question that forces examination of the deepest assumption behind this decision",
  "worstCase": "Realistic worst outcome — specific, not catastrophic",
  "bestCase": "Realistic best outcome — specific, not utopian",
  "reversibilityScore": "High | Medium | Low — how easily can this decision be undone?",
  "decidingFactor": "If the user could only know ONE more thing before deciding, what should it be?"
}
    `.trim(),

  // SOCIAL MEDIA TOOLS
  buildThumbnailPrompt: ({
    title,
    prompt,
    text_overlay,
    color_scheme,
    style,
    emotion,
    aspect_ratio,
  }) => {
    const allowedRatios = ["16:9", "1:1", "4:5", "9:16"];
    const ratio = allowedRatios.includes(aspect_ratio) ? aspect_ratio : "16:9";

    const parts = [
      "YouTube thumbnail",
      style || "cinematic dramatic",
      color_scheme
        ? `color scheme ${color_scheme}`
        : "red and yellow high contrast",
      emotion ? `emotion ${emotion}` : "excited, shocked expression",

      prompt?.trim() || "expressive face, dynamic composition",

      title ? `theme ${title.slice(0, 60)}` : "",

      text_overlay
        ? `text "${text_overlay}" with clear placement`
        : "bold text overlay space",

      "single subject, clean composition",
      "high contrast lighting, sharp focus",
      "blurred background, depth of field",
      "viral, eye-catching, high CTR",

      `${ratio} aspect ratio`,
      "ultra high quality",
    ];

    return parts.filter(Boolean).join(", ");
  },

  ytSeoOptimizePrompt: ({ topic, outline }) =>
    `
You are a YouTube SEO expert. Generate complete upload metadata for this video.

Topic/Draft Title: "${topic}"
${outline ? `Content Outline: ${outline}` : ""}

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Schema:
{
  "titles": [
    { "title": "Title variant 1", "score": 87, "reason": "Why this title scores well for SEO and CTR" },
    { "title": "Title variant 2", "score": 82, "reason": "Why this scores well" },
    { "title": "Title variant 3", "score": 79, "reason": "Why this scores well" },
    { "title": "Title variant 4", "score": 74, "reason": "Why this scores well" },
    { "title": "Title variant 5", "score": 70, "reason": "Why this scores well" }
  ],
  "description": "Full 200-word SEO-optimized YouTube description with keywords naturally placed, formatted with line breaks and sections. Include a hook, key points with emoji bullets, a subscribe CTA, and relevant hashtags at the end.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag11", "tag12", "tag13", "tag14", "tag15"],
  "chapters": [
    { "time": "0:00", "title": "Introduction" },
    { "time": "1:30", "title": "Chapter name" }
  ]
}

Rules:
- Title scores must reflect real ranking factors: keyword placement, click-through potential, search volume signal, character count (50–70 chars ideal).
- Scores must be distinct and ordered from highest to lowest.
- Tags must include: exact topic, variants, long-tail phrases, related terms. No duplicates.
- Chapters must match the outline if provided, otherwise generate logical sections (6–8 chapters).
- Description first 100 words must be keyword-dense for YouTube's SEO crawler.
    `.trim(),

  scriptGenPrompt: ({ topic, platform, length }) => {
    const wordCount = length === "30s" ? 75 : length === "60s" ? 150 : 225;
    return `
You are a viral short-form video script writer. Write a ${length} script for ${platform} about: "${topic}"

Structure: Hook (first 3 seconds, scroll-stopper) → Problem → Solution → Proof → CTA

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Schema:
{
  "title": "Descriptive script title under 8 words",
  "hookType": "Pattern interrupt type used — e.g. Contrarian statement, Shocking stat, Bold question, Personal confession",
  "sections": [
    { "label": "Hook",     "content": "Exact words to say — max 2 sentences. Must stop the scroll instantly. No generic openers." },
    { "label": "Problem",  "content": "Exact words. Name the specific pain point. Make the viewer feel seen." },
    { "label": "Solution", "content": "Exact words. Present the solution clearly and confidently. One mechanism only." },
    { "label": "Proof",    "content": "Exact words. Quick credibility — stat, personal result, or social proof." },
    { "label": "CTA",      "content": "Exact words. One action: follow, comment a keyword, or click link in bio. Never two CTAs." }
  ],
  "totalWords": ${wordCount},
  "toneNotes": "One sentence on the delivery tone — e.g. fast-paced and punchy, calm and authoritative, conversational and warm"
}

Rules:
- Hook must NOT start with: 'In this video', 'Today I'm going to', 'Have you ever', 'Welcome back'.
- Every section must be ready to read on camera — no placeholders, no [brackets], no vague instructions.
- Total word count across all sections must be approximately ${wordCount} words.
- Platform-specific tone: TikTok = casual Gen-Z energy; YouTube Shorts = slightly more polished; Instagram Reels = aspirational and aesthetic.
    `.trim();
  },

  contentRepurposerPrompt: ({ sourceContent, selectedFormats }) => {
    // normalize to array
    const formatsArray = Array.isArray(selectedFormats)
      ? selectedFormats
      : typeof selectedFormats === "string"
        ? [selectedFormats]
        : Object.keys(selectedFormats || {}).filter((k) => selectedFormats[k]);

    const formatMap = {
      twitter: "Twitter / X Thread",
      linkedin: "LinkedIn Post",
      instagram: "Instagram Caption",
      youtube: "YouTube Description",
      script: "Reels / Shorts Script",
    };

    const formatLabels = formatsArray
      .map((f) => formatMap[f])
      .filter(Boolean)
      .join(", ");

    return `
You are an expert content repurposing strategist...

Source content:
"""
${sourceContent}
"""

Repurpose for: ${formatLabels}

Return ONLY a valid JSON object...

Schema:
{
  ${formatsArray.includes("twitter") ? `"twitter": "...",` : ""}
  ${formatsArray.includes("linkedin") ? `"linkedin": "...",` : ""}
  ${formatsArray.includes("instagram") ? `"instagram": "...",` : ""}
  ${formatsArray.includes("youtube") ? `"youtube": "...",` : ""}
  ${formatsArray.includes("script") ? `"script": "...",` : ""}
}
`.trim();
  },

  // WEB TOOLS

  landingPageCopyPrompt: ({
    productName,
    productDesc,
    audience,
    framework,
    tone,
  }) =>
    `
You are an expert conversion copywriter. Generate a complete landing page copy kit.

Product Name: "${productName}"
Product Description: "${productDesc}"
Target Audience: ${audience || "General audience"}
Copywriting Framework: ${framework}
Tone of Voice: ${tone}

Apply the ${framework} framework as the structural backbone of the copy. Every section must serve the framework's logic — not just the headline. Apply ${tone} tone consistently across all sections.

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Schema:
{
  "heroHeadline": "Powerful, benefit-driven headline — under 10 words. Lead with the transformation, not the feature.",
  "subHeadline": "2 sentences expanding the headline's core promise. Must reinforce the ${framework} framework's opening move.",
  "featureBullets": [
    "Benefit-first bullet — start with the outcome, not the feature",
    "Benefit-first bullet 2",
    "Benefit-first bullet 3",
    "Benefit-first bullet 4",
    "Benefit-first bullet 5"
  ],
  "socialProof": [
    "Testimonial 1 — include a specific result or metric, end with Name + Role",
    "Testimonial 2 — contrasting use case, different persona",
    "Testimonial 3 — addresses the most common objection"
  ],
  "faqAnswers": [
    "Q: [most common pre-purchase question]? A: [direct, trust-building answer]",
    "Q: [comparison or 'why you' question]? A: [differentiation answer]",
    "Q: [risk or refund question]? A: [objection-handling answer]"
  ],
  "primaryCTA": "CTA button text (3–5 words max) + one line of microcopy beneath it addressing the #1 objection",
  "frameworkNote": "One sentence explaining exactly how the ${framework} framework was applied across this copy kit"
}

Rules:
- Every line must be specific to ${productName} — zero generic filler.
- heroHeadline must contain the primary benefit, not the product name.
- featureBullets must be outcome-first (e.g. 'Cut review time by 60%' not 'Fast review tool').
- socialProof items must feel real — include specific numbers or named outcomes.
- primaryCTA microcopy must directly counter a purchase hesitation (e.g. 'No credit card needed · Cancel anytime').
    `.trim(),

  repoReviewPrompt: ({ language, reviewFocus, repoUrl, codeSnippet }) => {
    const focusArray = Array.isArray(reviewFocus)
      ? reviewFocus
      : typeof reviewFocus === "string" && reviewFocus.trim()
        ? reviewFocus.split(",").map((f) => f.trim())
        : [];

    return `
You are a senior code reviewer and security engineer. Perform a thorough, production-grade code review.

Language: ${language}
Review Focus: ${focusArray.length > 0 ? focusArray.join(", ") : "All aspects — security, performance, quality, anti-patterns, complexity"}
GitHub URL: ${repoUrl || "Not provided"}

Code to Review:
\`\`\`${language.toLowerCase()}
${codeSnippet || "// Perform analysis based on GitHub URL: " + repoUrl}
\`\`\`

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Schema:
{
  "summary": "2 sentences: what the code does well AND its most critical risk before production",
  "overallScore": 72,
  "scores": {
    "security": 7,
    "performance": 7,
    "codeQuality": 8,
    "maintainability": 7
  },
  "issueCount": {
    "critical": 1,
    "warning": 2,
    "info": 2,
    "suggestion": 2
  },
  "issues": [
    {
      "severity": "Critical",
      "issue": "Short issue title — under 6 words",
      "file": "filename.ts or function name",
      "line": 34,
      "description": "Detailed explanation of why this is a problem and what could go wrong in production",
      "fix": "// Exact code fix — show before/after when possible"
    }
  ]
}

Rules:
- Provide exactly 5–7 issues covering a mix of severities — never all the same level.
- severity: EXACTLY one of "Critical" | "Warning" | "Info" | "Suggestion".
- Critical issues must be real vulnerabilities or data-loss risks — not style preferences.
- Every "fix" must be a real, copy-pasteable code snippet — no placeholders or pseudocode.
- overallScore: integer 0–100. Most production code scores 55–75. Reserve 80+ for genuinely clean code.
- All scores inside "scores" must be integers 1–10.
- issueCount values must match the actual number of issues at each severity in the "issues" array.
    `.trim();
  },

  seoKeywordPrompt: ({ topic, niche }) =>
    `
You are an expert SEO strategist and keyword research specialist. Generate a comprehensive keyword cluster report.

Core Topic: "${topic}"
Niche / Industry: ${niche || "General — infer the most likely niche from the topic"}

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Raw JSON only.

Schema:
{
  "topicOverview": "2 sentences: the SEO opportunity for this topic and the recommended content strategy angle",
  "totalKeywords": 23,
  "clusters": [
    {
      "intent": "Informational",
      "primaryKeyword": "exact keyword phrase to target",
      "longTailVariants": [
        "long-tail variant 1",
        "long-tail variant 2",
        "long-tail variant 3",
        "long-tail variant 4"
      ],
      "contentTitles": [
        "SEO-optimized article title 1",
        "SEO-optimized article title 2",
        "SEO-optimized article title 3"
      ],
      "internalLinkingSuggestion": "One sentence: which page type to link from/to and why"
    }
  ]
}

Rules:
- Provide exactly 5 clusters covering these intents: Informational, Transactional, Commercial, Navigational, and one repeat of the highest-opportunity intent.
- intent: EXACTLY one of "Informational" | "Transactional" | "Navigational" | "Commercial".
- primaryKeyword: realistic search phrase people actually type — not a topic label.
- longTailVariants: must be genuinely long-tail (3–6 words), distinct from each other, and lower competition than the primary.
- contentTitles: must be publish-ready article titles with SEO best practices (number, year, or power word where natural).
- totalKeywords: must equal the sum of all primaryKeywords (5) + all longTailVariants (5×4=20) = 25, or adjust to match actual count.
- internalLinkingSuggestion must be specific — name the page type and the SEO reason (e.g. 'Link from your pillar guide to this cluster page to pass authority to transactional intent').
- Never invent search volumes or difficulty scores — focus on strategic clustering only.
    `.trim(),

  websiteBuilderPrompt: ({ siteType, description, primaryColor }) =>
    `
You are a senior frontend developer specializing in conversion-optimized, production-ready websites.
Generate a complete, responsive, single-page website.

Site Type: ${siteType}
Description: "${description}"
Primary Color: ${primaryColor}

Return ONLY raw HTML. No explanation, no markdown, no backticks. Start directly with <!DOCTYPE html>.

Requirements:
- Complete self-contained HTML file with embedded CSS and vanilla JS — zero external dependencies, zero CDN links.
- Sections (adapt to site type): sticky nav, hero with headline + CTA, features/about (3–6 cards), social proof or testimonials, pricing or final CTA section, footer with links.
- Responsive: mobile-first breakpoints at 768px and 480px. Nav collapses on mobile.
- Primary color ${primaryColor} used for: CTA buttons, accent text, hover states, card borders. Never overuse — keep it purposeful.
- Hover effects on cards (translateY + subtle shadow), smooth scroll for anchor links, button hover opacity transitions.
- Placeholder content must match the description — product name, tagline, and feature copy must feel real and specific.
- Typography: system-ui or Segoe UI, 900-weight headings, 1.6–1.7 line-height for body.
- Accessibility: semantic HTML (nav, main, section, footer), alt text on any images, focus-visible outlines.
- Production quality: no commented-out code, no TODO blocks, no lorem ipsum.
    `.trim(),
};

module.exports = { prompts };
