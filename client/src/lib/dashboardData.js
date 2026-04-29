import {
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Store,
  BarChart3,
  Image,
  Layout,
  Brain,
} from "lucide-react";
import { FaYoutube as Youtube } from "react-icons/fa6";

export const tools = [
  {
    id: "productivity",
    icon: Sparkles,
    label: "Productivity",
    tools: [
      {
        id: 1,
        category: "Productivity",
        name: "AI Resume Analyzer",
        slug: "ai-resume-analyzer",
        tagline: "Get hired faster with ATS-proof feedback",
        description:
          "Scans your resume like a real recruiter — checks ATS compatibility, keyword gaps, formatting issues, and role alignment to give you a scored improvement report.",
        whatItDoes:
          "Parses your resume's structure and content, compares it against job-role keywords, flags formatting problems that ATS systems reject, and returns a 0–100 score with section-by-section improvement notes.",
        howItHelps:
          "75% of resumes are rejected before a human reads them. This tool ensures yours passes ATS filters, matches the job description, and actually gets seen.",
        howToUse: [
          "Upload your resume as PDF or paste plain text",
          "Optionally paste the target job description",
          "Click Analyze — get your ATS score instantly",
          "Follow the improvement suggestions per section",
          "Re-upload the revised resume to re-check your score",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Resume parsing + feedback generation",
            tier: "Free tier — 15 req/min",
          },
          {
            name: "pdf-parse",
            purpose: "Extract text from uploaded PDF resumes",
            tier: "Open-source npm",
          },
          {
            name: "mammoth.js",
            purpose: "Extract text from DOCX resumes",
            tier: "Open-source npm",
          },
          {
            name: "HuggingFace keyword extraction",
            purpose: "Find missing keywords vs job description",
            tier: "Free inference API",
          },
        ],
        difficulty: "Easy",
        proPrice: "$11/mo",
      },
      {
        id: 2,
        category: "Productivity",
        name: "AI PDF Summarizer",
        slug: "ai-pdf-summarizer",
        tagline: "Read less. Understand more.",
        description:
          "Converts any PDF — research paper, report, textbook chapter — into a clean structured summary with key points, takeaways, and a Q&A section.",
        whatItDoes:
          "Extracts and chunks PDF text, feeds it to an LLM with a structured summarization prompt, and returns a tiered output: 3-sentence TL;DR, bullet-point key findings, and 5 auto-generated Q&As from the document.",
        howItHelps:
          "Reading a 40-page report takes 90 minutes. This delivers the same understanding in 60 seconds. Useful for students reviewing papers, professionals scanning reports, and researchers doing a first-pass literature review.",
        howToUse: [
          "Upload any PDF (research paper, contract, report)",
          "Click Summarize",
          "Read the TL;DR and key bullet points",
          "Explore the auto-generated Q&A",
          "Download or copy the summary as Markdown",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Large-context summarization",
            tier: "Free tier — 1M token context window",
          },
          {
            name: "pdf-parse",
            purpose: "Extract raw text from PDF",
            tier: "Open-source npm",
          },
          {
            name: "jsPDF",
            purpose: "Export summary as downloadable PDF",
            tier: "Open-source npm",
          },
        ],
        difficulty: "Easy",
        proPrice: "$8/mo",
      },
      {
        id: 3,
        category: "Productivity",
        name: "Task Breakdown AI",
        slug: "task-breakdown-ai",
        tagline: "Any goal → a clear execution plan",
        description:
          "Takes any vague goal or complex project and breaks it into a prioritized, time-estimated, step-by-step action plan with subtasks and dependencies.",
        whatItDoes:
          "Sends your goal to an LLM with a structured planning prompt. Returns a hierarchical task tree: phases → milestones → daily subtasks, each with a time estimate and dependency note. Optionally exports as a Markdown checklist or JSON for Notion/Trello import.",
        howItHelps:
          "Most people fail at goals not because they lack motivation but because the path is unclear. This removes the blank-page paralysis by turning 'build a SaaS product' into 47 concrete daily tasks you can start today.",
        howToUse: [
          "Type your goal (e.g., 'Launch a SaaS product in 3 months')",
          "Set optional constraints: deadline, hours/day available",
          "Click Generate Plan",
          "Review phases and subtasks",
          "Export to Markdown, JSON, or copy to Notion",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Goal decomposition + task structuring",
            tier: "Free tier",
          },
          {
            name: "Mistral-7B via HuggingFace",
            purpose: "Alternative fast inference",
            tier: "Free inference API",
          },
        ],
        difficulty: "Easy",
        proPrice: "$9/mo",
      },
    ],
  },

  {
    id: "web",
    icon: Code2,
    label: "Web Tools",
    tools: [
      {
        id: 4,
        category: "Web",
        name: "AI SEO Keyword Generator",
        slug: "ai-seo-keyword-generator",
        tagline: "Find keywords your competitors are missing",
        description:
          "Enter any topic and get a clustered list of high-intent, low-competition SEO keywords with search intent labels and content angle ideas for each cluster.",
        whatItDoes:
          "Takes your topic, fetches related keyword signals from free sources, and uses an LLM to cluster them by search intent (informational, transactional, navigational). Returns primary keywords, long-tail variants, content title ideas, and internal linking suggestions.",
        howItHelps:
          "Content creators and SEO teams waste hours in paid tools like Ahrefs just to find keyword clusters. This delivers the same output in seconds with no subscription. Especially useful for blog planning and pillar-page strategy.",
        howToUse: [
          "Enter your core topic or niche",
          "Click Generate Keywords",
          "Review clusters by search intent",
          "Pick your target keyword cluster",
          "Use the content angle suggestions to write your article",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Keyword clustering + intent labeling",
            tier: "Free tier",
          },
          {
            name: "Google Trends RSS",
            purpose: "Trending topic signals for keyword expansion",
            tier: "Free — no API key needed",
          },
          {
            name: "DataForSEO free tier",
            purpose: "Search volume estimates",
            tier: "Free trial credits",
          },
        ],
        difficulty: "Easy",
        proPrice: "$14/mo",
      },
      {
        id: 5,
        category: "Web",
        name: "AI Website Builder",
        slug: "ai-website-builder",
        tagline: "Describe a site. Get the code.",
        description:
          "Generates a complete, responsive multi-section website — including HTML, CSS, and vanilla JS — from a plain-English description. No design skills needed.",
        whatItDoes:
          "Takes your website description and generates semantic HTML with embedded responsive CSS and lightweight JavaScript interactions. Sections include hero, features, testimonials, pricing, FAQ, and footer — all customized to your input. Output is a single downloadable HTML file.",
        howItHelps:
          "Freelancers spend hours on landing page boilerplate. Startup founders pay $500+ for a simple site. This generates a production-ready, downloadable HTML file in under 30 seconds that can be hosted on Netlify for free.",
        howToUse: [
          "Describe your site (e.g., 'A SaaS landing page for a task manager app')",
          "Click Generate Site",
          "Preview the rendered page live",
          "Edit section content inline if needed",
          "Download as a single HTML file and deploy",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Full HTML/CSS/JS generation from description",
            tier: "Free tier",
          },
          {
            name: "HuggingFace — CodeLlama",
            purpose: "Alternative code generation model",
            tier: "Free inference",
          },
          {
            name: "Unsplash API",
            purpose: "Auto-insert relevant section images",
            tier: "Free tier — 50 req/hr",
          },
        ],
        difficulty: "Medium",
        proPrice: "$18/mo",
      },
      {
        id: 6,
        category: "Web",
        name: "Repo Reviewer",
        slug: "repo-review-ai",
        tagline: "Automated PR reviews before humans touch it",
        description:
          "Connects to your GitHub repo via webhook. When a PR is opened, it reads the diff, scores each changed function by complexity, flags security issues, detects anti-patterns, and posts inline review comments automatically.",
        whatItDoes:
          "Listens for GitHub PR webhook events, extracts the code diff, parses it using an AST parser, chunks it by function, and sends each chunk to a code model. Returns structured JSON with inline comment positions, severity levels, and fix suggestions — then posts them directly to the GitHub PR.",
        howItHelps:
          "Junior developers get instant structured feedback on every commit. Senior developers skip reviewing obvious issues and focus on architecture. Teams catch security bugs before they hit main. Code review bottlenecks disappear.",
        howToUse: [
          "Connect your GitHub account",
          "Select the repo to monitor",
          "Enable the PR webhook from the dashboard",
          "Open a pull request on GitHub",
          "Inline review comments appear automatically within seconds",
        ],
        freeApis: [
          {
            name: "HuggingFace — CodeLlama-34B",
            purpose: "Code review + bug detection",
            tier: "Free inference tier",
          },
          {
            name: "GitHub REST API",
            purpose: "Webhook events + posting inline comments",
            tier: "Free for all repos",
          },
          {
            name: "tree-sitter",
            purpose: "AST parsing for code structure analysis",
            tier: "Open-source",
          },
        ],
        difficulty: "Medium",
        proPrice: "$12/mo",
      },
      {
        id: 7,
        category: "Web",
        name: "AI Landing Page Copy Generator",
        slug: "landing-page-copy-generator",
        tagline: "Conversion copy in seconds, not hours",
        description:
          "Enter your product name and target audience. Get a complete landing page copy kit: hero headline, sub-headline, feature bullets, social proof lines, FAQ answers, and primary CTA — all structured and ready to paste.",
        whatItDoes:
          "Uses a multi-prompt pipeline to generate each landing page section separately using proven copywriting frameworks (AIDA, PAS, Before-After-Bridge). Returns copy in a structured JSON format so each section maps directly to your page layout.",
        howItHelps:
          "Hiring a copywriter for a landing page costs $300–$800. Writing it yourself takes 3–4 hours with mediocre results. This delivers conversion-optimized copy in 30 seconds, structured by section so you can drop it straight into your page builder.",
        howToUse: [
          "Enter product name and one-line description",
          "Describe your target audience",
          "Click Generate Copy",
          "Review each section: hero, features, FAQ, CTA",
          "Copy sections directly into Webflow, Framer, or your HTML",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose:
              "Multi-section copy generation with copywriting frameworks",
            tier: "Free tier",
          },
          {
            name: "Mistral-7B via HuggingFace",
            purpose: "Alternate fast inference option",
            tier: "Free inference",
          },
        ],
        difficulty: "Easy",
        proPrice: "$13/mo",
      },
    ],
  },

  {
    id: "business",
    icon: Briefcase,
    label: "Business Tools",
    tools: [
      {
        id: 8,
        category: "Business",
        name: "Business Idea Generator",
        slug: "business-idea-generator",
        tagline: "From niche to validated startup concept",
        description:
          "Enter an industry or interest. Get 5 startup ideas — each with a problem statement, target audience, revenue model, unfair advantage angle, and a quick validation checklist.",
        whatItDoes:
          "Sends your niche to an LLM with a structured startup ideation prompt. Returns ideas in a consistent schema: problem, solution, target user, revenue model, competition level, and 3 first-step validation actions. Filters out generic ideas by prompting for underserved micro-niches.",
        howItHelps:
          "Most founders either pick the wrong problem or overthink ideation for months. This gives you 5 researched, structured concepts in 30 seconds — each with a validation path so you spend time testing, not guessing.",
        howToUse: [
          "Enter a niche, industry, or personal skill",
          "Set optional filters: B2B or B2C, SaaS or service",
          "Click Generate Ideas",
          "Review each idea's revenue model and competition level",
          "Use the 3-step validation checklist to test the best idea",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Structured idea generation with market framing",
            tier: "Free tier",
          },
          {
            name: "Google Trends RSS",
            purpose: "Signal check for niche growth trends",
            tier: "Free",
          },
        ],
        difficulty: "Easy",
        proPrice: "$10/mo",
      },
      {
        id: 9,
        category: "Business",
        name: "Cold Email Writer",
        slug: "cold-email-writer",
        tagline: "Personalized cold emails that actually get replies",
        description:
          "Enter a prospect's name, company, and what you're offering. Get a personalized cold email with 3 subject line variants, a strong opening line, clear value prop, and a low-friction CTA.",
        whatItDoes:
          "Takes prospect and offer details, optionally scrapes the prospect's public website for signals (tech stack, recent news, team size), and generates a full cold email using proven outreach frameworks (Pattern Interrupt, Relevance-Value-CTA). Returns 3 tonal variants: direct, conversational, and formal.",
        howItHelps:
          "Generic cold emails average under 5% reply rates. Personalized, signal-based emails hit 20–35%. This gives you that personalization without the 45 minutes of manual research per prospect. Useful for freelancers, agency owners, and SDRs.",
        howToUse: [
          "Enter prospect name, company, and role",
          "Describe what you're offering and your goal",
          "Optionally paste the prospect's website URL for signal scraping",
          "Click Generate — get 3 variants (direct / conversational / formal)",
          "Edit and send via your email client",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Personalized email copy generation",
            tier: "Free tier",
          },
          {
            name: "Cheerio + Axios",
            purpose: "Prospect website scraping for personalization signals",
            tier: "Open-source npm",
          },
          {
            name: "Hunter.io",
            purpose: "Email address finding for prospects",
            tier: "Free tier — 25 lookups/mo",
          },
        ],
        difficulty: "Medium",
        proPrice: "$22/mo",
      },
      {
        id: 10,
        category: "Business",
        name: "AI Pricing Strategy Tool",
        slug: "pricing-strategy-tool",
        tagline: "Stop undercharging. Price with confidence.",
        description:
          "Enter your product, target customer, and cost inputs. Get a full pricing strategy: recommended tier structure, price points, freemium vs paid logic, and positioning rationale.",
        whatItDoes:
          "Analyzes your product category, target user willingness-to-pay signals, and competitive context to recommend a pricing model (freemium, usage-based, tiered, flat-rate, or per-seat). Returns a 3-tier structure with feature allocation, pricing psychology notes, and a recommended launch price.",
        howItHelps:
          "Most founders underprice by 40–60% because pricing feels uncomfortable and arbitrary. This gives you a structured, justified pricing framework based on value alignment — so you charge what your product is worth.",
        howToUse: [
          "Enter your product name and what it does",
          "Describe your target customer (e.g., freelancers, SMBs, enterprises)",
          "Enter your estimated cost to serve one user",
          "Click Generate Strategy",
          "Review the recommended tier structure and pricing rationale",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Pricing model analysis and tier generation",
            tier: "Free tier",
          },
        ],
        difficulty: "Easy",
        proPrice: "$12/mo",
      },
      {
        id: 11,
        category: "Business",
        name: "AI Competitor Analysis",
        slug: "competitor-analysis",
        tagline: "Know your market before you build",
        description:
          "Enter your product idea or niche. Get a structured competitor landscape: top 5 competitors, their strengths and weaknesses, pricing tiers, gaps they're missing, and your differentiation angle.",
        whatItDoes:
          "Combines LLM knowledge with optional live web scraping of competitor landing pages. Returns a structured SWOT-style analysis per competitor, a market gap summary, and a positioning recommendation for your product — exported as a shareable report.",
        howItHelps:
          "Building without knowing your competition leads to building the wrong thing. This replaces 4–6 hours of manual competitor research with a structured 2-minute analysis so you can validate positioning before writing a single line of code.",
        howToUse: [
          "Enter your product idea or target niche",
          "Click Analyze Market",
          "Review the top 5 competitors with SWOT breakdowns",
          "Read the market gap summary",
          "Use the positioning recommendation to craft your angle",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Competitor profiling and gap analysis",
            tier: "Free tier",
          },
          {
            name: "Cheerio + Axios",
            purpose: "Live scraping of competitor landing pages",
            tier: "Open-source npm",
          },
          {
            name: "Google Search via SerpAPI",
            purpose: "Competitor discovery",
            tier: "Free tier — 100 searches/mo",
          },
        ],
        difficulty: "Medium",
        proPrice: "$16/mo",
      },
    ],
  },

  {
    id: "social",
    icon: Youtube,
    label: "Social Media",
    tools: [
      {
        id: 12,
        category: "Social Media",
        name: "YouTube Thumbnail Generator",
        slug: "youtube-thumbnail-generator",
        tagline: "More clicks start with a better thumbnail",
        description:
          "Enter your video topic. Get 5 high-CTR thumbnail concepts: layout description, text overlay copy, color scheme, emotion to convey, and a Midjourney/DALL-E prompt to generate it.",
        whatItDoes:
          "Analyzes your video topic against high-CTR thumbnail patterns (contrast, face emotion, bold text, curiosity gap) and generates 5 distinct concept briefs. Each includes a visual layout description, headline text (under 5 words), recommended background color, and a ready-to-use AI image generation prompt.",
        howItHelps:
          "CTR is the #1 factor in YouTube growth. A thumbnail going from 4% to 8% CTR doubles your impressions without any extra work. This turns your video title into 5 tested, pattern-based thumbnail concepts in 15 seconds.",
        howToUse: [
          "Enter your video title or topic",
          "Click Generate Concepts",
          "Review the 5 thumbnail concept briefs",
          "Copy the AI image prompt for your favorite concept",
          "Generate the image in DALL-E or Midjourney, add text in Canva",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Thumbnail concept and copy generation",
            tier: "Free tier",
          },
          {
            name: "HuggingFace — SDXL",
            purpose: "Optional free image generation from concept prompt",
            tier: "Free inference",
          },
        ],
        difficulty: "Easy",
        proPrice: "$10/mo",
      },
      {
        id: 13,
        category: "Social Media",
        name: "Reel / Shorts Script Generator",
        slug: "shorts-script-generator",
        tagline: "Hook. Hold. Convert. In 60 seconds.",
        description:
          "Enter a topic or idea. Get a complete short-form video script (30–90 sec) with a pattern-interrupt hook, retention-optimized body, and a clear CTA — formatted for reading on-camera.",
        whatItDoes:
          "Uses a proven short-form script structure (Hook → Problem → Solution → Proof → CTA) to generate a complete word-for-word script. Optimizes the first 3 seconds (the hook) for scroll-stopping power and labels each section for easy teleprompter reading.",
        howItHelps:
          "Most creators record videos without a script and lose 60–70% of viewers in the first 5 seconds. A structured hook-based script consistently holds attention longer, which the algorithm rewards with more reach.",
        howToUse: [
          "Enter your video topic or content angle",
          "Select platform: Instagram Reels, YouTube Shorts, or TikTok",
          "Set script length: 30s, 60s, or 90s",
          "Click Generate Script",
          "Read the labeled sections: Hook / Body / CTA",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Hook-optimized script generation",
            tier: "Free tier",
          },
          {
            name: "Mistral-7B via HuggingFace",
            purpose: "Alternative fast inference",
            tier: "Free inference",
          },
        ],
        difficulty: "Easy",
        proPrice: "$11/mo",
      },
      {
        id: 14,
        category: "Social Media",
        name: "AI Content Repurposer",
        slug: "content-repurposer",
        tagline: "One piece of content. Ten formats.",
        description:
          "Paste a blog post, video transcript, or newsletter. Get it automatically repurposed into a Twitter/X thread, LinkedIn post, Instagram caption, YouTube description, and a short-form script — all tone-matched to the original.",
        whatItDoes:
          "Extracts the core ideas and structure from your source content, then reformats each piece for the conventions of each platform: thread format for X, long-form storytelling for LinkedIn, caption + hashtags for Instagram, SEO-structured paragraph for YouTube, hook script for Reels.",
        howItHelps:
          "Most creators publish once and move on, leaving 90% of the content's value unused. Repurposing one piece into 5 formats multiplies your reach without extra research or ideation. This replaces 2 hours of reformatting work per piece.",
        howToUse: [
          "Paste your blog post, transcript, or newsletter",
          "Select which output formats you want",
          "Click Repurpose",
          "Review each formatted version",
          "Copy and publish directly to each platform",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Multi-format content transformation",
            tier: "Free tier — large context window",
          },
        ],
        difficulty: "Easy",
        proPrice: "$12/mo",
      },
      {
        id: 15,
        category: "Social Media",
        name: "YouTube SEO Optimizer",
        slug: "youtube-seo-optimizer",
        tagline: "Rank higher before you hit upload",
        description:
          "Enter your video topic or draft title. Get an optimized title (CTR + SEO balanced), full keyword-rich description, 15 ranked tags, and a chapter timestamp structure — all ready to paste on upload.",
        whatItDoes:
          "Analyzes your video topic for search volume signals, generates 5 title variants ranked by CTR and keyword strength, writes a 200-word SEO description with natural keyword placement, suggests 15 tags ordered by relevance and competition, and generates a chapter structure from your content outline.",
        howItHelps:
          "90% of YouTube channels under 10k subscribers are invisible because their metadata is weak. This closes the metadata gap against larger channels in under 60 seconds, giving your video a fighting chance in search and suggested.",
        howToUse: [
          "Enter your video topic or draft title",
          "Optionally paste your video outline for chapter timestamps",
          "Click Optimize",
          "Pick your preferred title from 5 ranked variants",
          "Copy the description, tags, and chapter list — paste on upload",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Title, description, and tag generation",
            tier: "Free tier",
          },
          {
            name: "Google Trends RSS",
            purpose: "Search trend signals for keyword selection",
            tier: "Free",
          },
          {
            name: "YouTube Data API v3",
            purpose: "Tag and search term validation",
            tier: "Free — 10,000 units/day",
          },
        ],
        difficulty: "Easy",
        proPrice: "$11/mo",
      },
    ],
  },

  {
    id: "life-optimization",
    icon: Brain,
    label: "Life Optimization",
    tools: [
      {
        id: 16,
        category: "Life Optimization",
        name: "AI Daily Planner",
        slug: "ai-daily-planner",
        tagline: "Plan your day based on energy, not time",
        description:
          "Creates a personalized daily schedule based on your energy levels, goals, and available time — instead of generic time blocks.",
        whatItDoes:
          "Takes user goals, available hours, and energy patterns (morning focus / afternoon slump), then generates an optimized schedule with deep work blocks, breaks, and low-energy tasks placement.",
        howItHelps:
          "Most people fail productivity systems because they ignore energy cycles. This system improves output by matching task difficulty with mental energy peaks.",
        howToUse: [
          "Enter your tasks for the day",
          "Select energy pattern (morning/night focus)",
          "Set available hours",
          "Click Generate Plan",
          "Follow optimized schedule",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Schedule optimization logic",
            tier: "Free tier",
          },
        ],
        difficulty: "Easy",
        proPrice: "$8/mo",
      },
      {
        id: 17,
        category: "Life Optimization",
        name: "AI Habit Coach",
        slug: "ai-habit-coach",
        tagline: "Build habits that actually stick",
        description:
          "Creates personalized habit-building plans and daily nudges based on psychology principles like habit stacking and dopamine loops.",
        whatItDoes:
          "Analyzes user's goal and behavior type, then builds a 21–66 day habit plan with micro-steps, triggers, and reinforcement strategies. Sends daily motivational or corrective nudges.",
        howItHelps:
          "Most people fail habits due to unrealistic starting points. This breaks habits into micro-actions that are easy to sustain.",
        howToUse: [
          "Enter habit goal (e.g., wake up early, gym, coding)",
          "Select difficulty level",
          "Click Generate Plan",
          "Follow daily micro-tasks",
          "Track streak progress",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Behavior plan generation",
            tier: "Free tier",
          },
        ],
        difficulty: "Easy",
        proPrice: "$9/mo",
      },
      {
        id: 18,
        category: "Life Optimization",
        name: "AI Decision Maker",
        slug: "ai-decision-maker",
        tagline: "Stop overthinking. Get clarity.",
        description:
          "Helps you make better decisions by analyzing pros/cons, long-term impact, risk level, and emotional bias.",
        whatItDoes:
          "Takes a decision scenario, breaks it into structured pros/cons, evaluates short-term vs long-term impact, and assigns a clarity score with recommendation bias warning.",
        howItHelps:
          "People lose time and opportunities due to overthinking. This reduces cognitive overload by structuring decisions logically.",
        howToUse: [
          "Enter your decision (e.g., job switch, project choice)",
          "Add optional context",
          "Click Analyze",
          "Review pros/cons breakdown",
          "Follow AI recommendation insight",
        ],
        freeApis: [
          {
            name: "Gemini 1.5 Flash",
            purpose: "Decision reasoning analysis",
            tier: "Free tier",
          },
        ],
        difficulty: "Easy",
        proPrice: "$7/mo",
      },
    ],
  },
];
