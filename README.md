# Financiaa — Business Finance & Management OS (UI/UX Prototype)

An enterprise-grade, polished, and modern **Business Finance & Management Web Application UI Prototype** built for academic project review and concept approval.

> **Project Phase:** Academic Concept & UI/UX Approval Prototype  
> **Status:** Frontend Only • Mock & Simulated Datasets • Zero Backend/Live Database Dependencies  
> **Currency & Locale:** Indian Rupee (`₹ INR`), Indian accounting formats & GST calculations  

---

## 🌟 Key Application Modules & Architecture

### 1. 📊 Executive Dashboard
* **Dynamic Header**: Greeting `"Good morning, Business Owner"` with daily operational recap.
* **Top KPI Metric Cards**:
  * **Total Revenue**: `₹18,42,500` (+12.4% MoM)
  * **Total Expenses**: `₹11,28,400` (+4.8% MoM)
  * **Net Profit**: `₹7,14,100` (+18.2% MoM)
  * **Outstanding Payments**: `₹2,34,800` (5 invoices action needed)
* **Monthly Revenue vs Expenses Chart**: Interactive Recharts gradient area chart comparing April through September performance.
* **Expense Breakdown Donut Visualization**: Categorized by Salaries (58%), Marketing (12%), Operations (11%), Software (9%), Office (6%), and Other (4%).
* **Recent Transactions Ledger**: Real-time snapshot with category badges, amounts, and settlement statuses.
* **Client Payment Status**: Visual ratio bar separating Paid (77%), Pending (10%), and Overdue (13%) receivables.
* **AI Business Insights**: Quick intelligence cards highlighting revenue growth, overdue accounts, and liquidity thresholds.

---

### 2. 💳 Finance Management
* **Financial Overview**: Comprehensive 6-KPI command center (Revenue, OPEX, Profit, Cash Balance, Receivables, Payables) with P&L trajectory and cash flow activity charts.
* **Transaction Ledger**: Complete audit trail with filters (Type, Category, Status), keyword search, pagination, and a fully interactive **"+ Add Transaction"** modal that dynamically updates state.
* **Income Streams**: Filterable income receipts by source, category, and payment channel with MoM growth tracking.
* **Operating Expenses**: Breakdown of non-payroll overheads, category budget caps, and debits ledger.
* **Invoice Management**:
  * Invoices tracking by status (Paid, Pending, Overdue, Draft).
  * **"+ Create Invoice"** modal with automated 18% GST calculation preview.
  * **Invoice Detail Dossier**: Full GST tax invoice format (Apex Nova Tech Pvt Ltd, GSTIN, Bill To, line items, CGST/SGST breakdown, settlement UTR, and simulated PDF download).
* **Payment Infrastructure**: Live bank feed status (HDFC, ICICI, Razorpay, Corporate Cards), T+1 transit balances, and RBI UTR settlement history.

---

### 3. 👥 People & Employee Management
* **Workforce Directory**: 34 staff profiles across Engineering, Finance, Product, Sales, Marketing, and HR.
* **Employee Profile Dossier**: Multi-tab modal displaying:
  * Personal Information & emergency contacts
  * Professional role details & reporting hierarchy
  * Attendance & leave quota balance breakdown
  * Salary slip breakdown (Basic, HRA, PF/Tax statutory deductions, and Net pay)
  * Compliance KYC documents (Aadhaar, PAN, Appointment Letter, NDA).
* **Departments**: Headcount, managers, monthly burn rate, and budget consumption limits across all 6 divisions.
* **Attendance Tracking**: Real-time check-in metrics, late mark audits, and monthly employee attendance matrix.
* **Leave Management**: Filterable leave request queue with interactive **"Approve"** and **"Reject"** action triggers that update UI state and unread counters.

---

### 4. 🏢 Client Relationship Management (CRM)
* **All Clients**: Corporate portfolio directory with primary contact persons, outstanding receivables, and engagement health.
* **Client Portfolio Dossier**: Complete account overview, active deliverables, invoice history, payment audit, and activity timeline.
* **Client Activity Audit**: Chronological feed of contract signatures, invoice dispatches, milestone approvals, and support events.
* **Receivables & Aging Schedule**: Aging schedule buckets (0-30 days, 31-60 days, 61-90 days), Days Sales Outstanding (34 Days), and targeted reminder dispatch controls.

---

### 5. 📈 Reports & Analytics
* **Statement of Profit & Loss (P&L)**: Ind AS aligned executive format detailing Gross Revenue, Direct COGS, EBITDA, OPEX, and Net Profit Before Tax.
* **Employee Reports**: Departmental compensation averages, workforce retention index, and attendance heatmaps.
* **Client Reports**: Lifetime Value (LTV), Net Revenue Retention (118.4%), and corporate concentration analysis.
* **Quarterly Performance**: Comparative bar analytics for Q1 vs Q2 FY26.
* **Export Controls**: One-click simulated `"Generate Report"`, `"Download PDF"`, and `"Export CSV"` with interactive toast confirmations.

---

### 6. 🧠 AI Business Intelligence
* **Interactive AI Assistant**: Natural language prompt interface with suggested executive questions:
  * *"Why did expenses increase this month?"*
  * *"What are my highest expenses?"*
  * *"Which clients have pending payments?"*
  * *"How is revenue performing?"*
  * *"What changed compared with last month?"*
  * Generates structured executive answers with KPI badges, attribution tables, and actionable decision advice.
* **Business Insights**: Machine-audited findings with severity badges (`Info`, `Attention`, `Warning`) and drill-down remediation plans.
* **Business Watchdog**: 24/7 threshold monitor tracking Cash Flow runway (6.2 months), Expense variances, Overdue invoices, and Departmental budget consumption.

---

### 7. ⚙️ Preferences & Global Shell
* **Global Search (⌘K / Ctrl+K)**: Unified modal searching across Employees, Clients, Transactions, Invoices, and Reports with direct keyboard navigation.
* **Multi-Category Notifications Drawer**: Filterable by Finance, Clients, Employees, Business, and AI Insights with unread badge counter.
* **Workspace Selector**: Switch between *Apex Nova Tech Pvt Ltd*, *Zenith Logistics India*, and *CloudScale Ventures*.
* **Settings**: Profile, Business GSTIN/PAN info, Notification channels, Appearance mode, and 2FA Security rules.
* **Teacher Architecture Guide**: Modal (via `?` icon) explicitly detailing the project scope, mock constraints, and evaluation checklist.

---

## 🚀 Running the Prototype Locally

### Prerequisites
* Node.js (v18 or higher recommended; v24 tested)
* NPM (v10 or higher)

### Quick Start
```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Build for production preview
npm run build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Design Philosophy
* **Palette**: Sophisticated neutral slate background (`#f8fafc`) with a commanding enterprise indigo primary (`#4f46e5`) and crisp semantic indicators (Emerald, Rose, Amber).
* **Typography**: Plus Jakarta Sans for executive hierarchy paired with JetBrains Mono for monetary figures, transaction identifiers, and tax GSTINs.
* **Responsive**: Desktop persistent sidebar with mobile slide-out drawer, scrollable data tables, and adaptive grid layouts.
