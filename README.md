# CyberShield Youth UAE

**National Cyber Resilience Monitoring & Projection Console**

A strategic cyber resilience platform for UAE youth aged 15-22. Built for presentation to the UAE Cyber Security Council, ministry-level stakeholders, and school administrators.

Live: [cybershield-youth-uae.onrender.com](https://cybershield-youth-uae.onrender.com)

---

## Features

### Cyber Resilience Assessment
- 12-question behavioral assessment across 4 domains: Password Hygiene, Phishing Awareness, Data Privacy, and Device Security
- Scored on a 0-100 Cyber Resilience Index (CRI) with three tiers: Foundational, Operational, and Resilience Ready
- Personalized recommendations based on individual scores

### Training Missions
- 8 structured training modules (2 per domain) with lessons and knowledge checks
- Beginner, Intermediate, and Advanced difficulty levels
- Designed to directly improve weak areas identified by the assessment

### Strategic Console (`/national`)
- **National CRI** with live status classification: Stable (70+), Watch (55-69), Elevated (40-54), Critical (0-39)
- **5 Strategic Indices** — independent ratings for Password, Phishing, Privacy, Device, and Program Coverage, each with trend data and intelligence briefings
- **External Threat Context Panel** — mock CISA KEV, CVE, education risk, and phishing trend data (architected for future live API integration)
- **Executive Briefing Mode** — toggle into a full SWOT-style executive view with strengths, weaknesses, recommended actions, and strategic outlook

### Admin Dashboard (`/admin`)
- **View Toggle** — switch between School, Emirate, and National aggregate views
- **Mission Impact Projection Simulator** — select any mission, adjust completion rate, and see projected CRI improvement with risk reduction percentages
- **3-Month Trend Charts** — CSS-based sparkline bars showing Dec 2025 - Feb 2026 CRI movement per school
- **Emirate Heat Table** — per-category heat-colored scores with weakest domain identification
- School rankings, category analysis, and emirate overview cards

### Design
- Intelligence-agency-grade dark UI with scan-line animations and glow borders
- SVG geometric icons replacing emoji for a professional, consistent look
- Pulse animations on Critical and Elevated status badges
- Fully responsive across desktop and mobile

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Geist Sans / Geist Mono
- **Hosting:** Render (Web Service)
- **Dependencies:** Zero external runtime dependencies beyond Next.js and React

---

## Project Structure

```
src/
  app/                  # Pages (landing, assessment, results, missions, admin, national)
  components/
    admin/              # SchoolTable, EmirateCard, ViewToggle, ProjectionSimulator, TrendChart, EmirateHeatTable
    assessment/         # QuestionCard, AssessmentProgress, CategoryIndicator
    executive/          # ExecutiveBriefingView, ExecutiveToggle
    layout/             # Header, Footer, PageShell
    missions/           # MissionCard, LessonContent, KnowledgeCheck
    national/           # HeatGrid, ReadinessIndicator, NationalStatusHeader, StrategicIndexCard
    threat/             # ThreatContextPanel
    ui/                 # Button, Panel, ScoreMeter, CategoryIcon, StatusBadge, TrendArrow, LargeMetric, ...
  data/                 # questions.json, missions.json, demo.json, threat-context.json, trends.json
  lib/                  # types, constants, data loaders, scoring, national-status, projection, executive
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Data

All data is mock, structured for future integration with live APIs (CISA KEV, institutional survey backends, NESA feeds). The 12 demo schools span all 7 UAE emirates with realistic CRI distributions.

---

## License

Private — UAE Cyber Security Council initiative.
