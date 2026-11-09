# SelfAI Admin Portal 🚀

> **Enterprise Control Plane & RBAC Administration Suite for SelfAI**

A user-friendly, responsive, and robust administrative portal designed to monitor, analyze, and manage the **SelfAI** application ecosystem. Built with React 18, TypeScript, Tailwind CSS, Recharts, and Lucide Icons.

---

## 🌟 Core Features

### 1. 📊 Executive Dashboard
- **Real-Time KPIs**: Total weekly queries, active app users, p50 inference turnaround latency, and token cost burn rate.
- **System Health Fleet**: Live status monitoring across microservices (AI Inference Gateway, LLM Orchestrator, Vector DB, Whisper Pipeline, Redis Cache, Billing Webhook).
- **Mini Throughput Sparklines**: 7-day query volume trends with tooltip metrics.
- **Active Rollouts Preview**: Instant access to ongoing feature rollouts with immediate kill switches.

### 2. 📈 Weekly Usage & Advanced Analytics
- **Week-over-Week Growth Comparison**: Track query trends, user engagement, and SLA health.
- **Multi-Metric Interactive Charting**:
  - Daily queries and daily active users (DAU) area charts.
  - Stacked token consumption (Prompt Tokens vs Completion Tokens).
  - Daily inference cost trajectory ($).
- **AI Model Share Breakdown**: Donut chart tracking volume across SelfAI Pro v2.5, Claude 3.5 Sonnet, GPT-4o, SelfAI Fast Flash, and Whisper-v3.
- **One-Click Export**: Download daily performance breakdowns in CSV or JSON format.

### 3. 🎛️ Feature Control ("Control Adding Feature in My App")
- **Dynamic Feature Flags**: Control every aspect of what capabilities are exposed in the SelfAI app.
- **Canary & Staged Rollouts**: Adjust traffic percentage sliders (0% Disabled, 25% Canary, 50% Staged, 100% GA).
- **Target Audience Gating**: Restrict features to specific RBAC roles or customer tiers.
- **Environment Targeting**: Segment flags between `Production`, `Staging`, or `All Environments`.
- **Add New Feature Modal**: Seamless form to register new AI models, developer sandboxes, UI modes, or third-party webhooks.
- **Instant Audit Logging**: Every toggle, rollout change, and feature creation automatically appends to the immutable audit trail.

### 4. 🛡️ Role-Based Access Control (RBAC) Structure
Permissions are strictly defined and dynamically enforced across the entire user interface:

| Role | Permissions | Security Scope |
| :--- | :--- | :--- |
| **Super Admin** | Full unrestricted access | Root clearance; can alter settings, manage roles, and delete resources. |
| **Admin** | All operational permissions | Can manage feature flags, users, inspect all telemetry; cannot edit root credentials. |
| **Product Manager** | Feature rollout owner | Can create, edit, and toggle feature flags, adjust rollout %, and inspect analytics. |
| **Analyst** | Read-only analytics | Can view dashboard, weekly usage charts, token consumption, and export reports. |
| **Support Agent** | Frontline viewer | Can view user directories, system status, and feature flags to diagnose user issues. |

> **Interactive Role Switcher**: Click on the **Active Role** dropdown in the top header to instantly switch between roles and observe the UI permissions dynamically recalculating!

### 5. 🖥️ System Fleet & Infrastructure Telemetry
- Real-time hardware telemetry: GPU cluster VRAM utilization (8x H100), Pinecone vector counts (14.8M embeddings), cache hit rate (88.4%), and p99 SLA latency.
- Microservice health monitoring table with simulated zero-downtime rolling restart.

### 6. 📝 Audit Trail & Compliance
- Tamper-evident log of all administrative actions (actor, action, target resource, timestamp, IP address, payload details).
- Filter by category or search by actor/resource with detailed JSON inspection modal.

---

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to GitHub Pages

### Option 1: Automated GitHub Actions (Recommended)
This repository includes a pre-configured workflow at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/SelfAi-admin.git
   git branch -M main
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger on push and publish your site at:
   `https://<YOUR_USERNAME>.github.io/SelfAi-admin/`

### Option 2: Deploy via `gh-pages`
```bash
npm run deploy
```

---

## 📂 Project Structure

```
selfai_admin/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for Pages
├── src/
│   ├── components/
│   │   ├── common/           # Reusable Badge, Modal, etc.
│   │   └── layout/           # Header, Sidebar, ToastContainer
│   ├── context/
│   │   └── AdminContext.tsx  # Central state & LocalStorage sync
│   ├── data/
│   │   └── mockData.ts       # Realistic SelfAI telemetry & sample flags
│   ├── pages/
│   │   ├── Dashboard.tsx     # Executive overview
│   │   ├── WeeklyUsage.tsx   # Weekly analytics & model distribution
│   │   ├── FeatureControl.tsx# Feature flags & rollout management
│   │   ├── RbacUsers.tsx     # Team directory & RBAC matrix
│   │   ├── SystemMonitoring.tsx # Microservice fleet health
│   │   ├── AuditLogs.tsx     # Tamper-evident audit trail
│   │   └── Settings.tsx      # System configuration & data reset
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces & RBAC types
│   ├── utils/
│   │   └── rbac.ts           # Permission checker & role definitions
│   ├── App.tsx               # Main layout wrapper
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind base & custom styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License
ISC © 2026 Anubhab Nandi & SelfAI Platform Team.
