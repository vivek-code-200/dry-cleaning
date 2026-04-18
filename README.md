# 🧺 Laundry Order Management System (AI-First)

A fast, production-minded system for managing dry cleaning orders — built with an **AI-first approach**, focusing on **real-world workflows, correctness, and practical UX decisions**.

---

## 🚀 Live Demo

👉 <your-deployed-link>

## 📂 GitHub Repository

👉 <your-repo-link>

---

## ⚡ Core Highlights

* End-to-end order lifecycle management
* Strict **status workflow with controlled transitions**
* Business-aware dashboard (not naive metrics)
* Mobile-first responsive UI (cards + tables)
* AI-assisted development with **critical validation & improvements**

---

## 🧩 Features

### 🧾 Order Creation

* Add customer name & phone
* Add multiple garments with quantity & pricing
* Automatic bill calculation
* Unique order number generation
* Optional **estimated delivery date (validated + fallback logic)**

---

### 🔄 Status Workflow

```id="wf1"
RECEIVED → PROCESSING → READY → DELIVERED
                      ↘
                     CANCELLED
```

* Enforced **valid transitions only**
* CANCELLED is a **terminal state**
* No invalid or backward transitions
* Interactive stepper UI

---

### 📋 Orders Listing

#### 📱 Mobile (Card UI)

* Clean, stacked layout
* Thumb-friendly interaction
* No horizontal scrolling

#### 🖥 Desktop (Table UI)

* Dense layout for scanning multiple orders
* Efficient for operational use

👉 Responsive rendering using Tailwind (`md:` breakpoints)

---

### 🔍 Filtering & Search

* Filter by status
* Search by name / phone
* **Debounced search** (prevents unnecessary calls)
* URL-based state (shareable + reload-safe)

---

### 📊 Dashboard

Provides a **quick operational snapshot** of the system:

#### 🔢 Order Summary

* **Total Orders** – total created
* **Pending Orders** – active (RECEIVED + PROCESSING + READY)
* **Processing** – currently in progress
* **Ready** – ready for delivery
* **Delivered** – completed (revenue source)
* **Cancelled** – excluded from business metrics

#### 💰 Financial Metrics

* **Revenue** = sum of DELIVERED orders
* **Pending Amount** = sum of active orders
* CANCELLED orders excluded from calculations

#### ⚡ Recent Activity

* Shows **latest 2 orders**
* Helps quickly track recent operations

---

### 📅 Estimated Delivery Date

* User-defined input
* Prevents past date selection
* Fallback logic if not provided
* Displayed across UI

---

### 🔐 Authentication

* OAuth login using:

  * **Google**
  * **GitHub**
* Implemented via NextAuth
* Secure session handling

---

## 🏗 Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** NextAuth (Google + GitHub OAuth)

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash id="s1"
git clone <your-repo-link>
cd <project-folder>
```

---

### 2. Install Dependencies

```bash id="s2"
npm install
```

---

### 3. Environment Variables

Create `.env`:

```env id="s3"
DATABASE_URL="your_postgres_url"

NEXTAUTH_SECRET="your_secret"

AUTH_GITHUB_ID="your_id"
AUTH_GITHUB_SECRET="your_secret"

AUTH_GOOGLE_ID="your_id"
AUTH_GOOGLE_SECRET="your_secret"
```

---

### 4. Setup Database

```bash id="s4"
npx prisma migrate dev
npx prisma generate
```

---

### 5. Run App

```bash id="s5"
npm run dev
```

---

## 🤖 AI Usage Report

### Tools Used

* ChatGPT
* GitHub Copilot

---

### Where AI Helped

* Initial Prisma schema design
* API scaffolding (orders, status updates)
* UI generation (forms, cards, stepper, filters)
* Dashboard logic suggestions

---

### What AI Got Wrong

* Incorrect status transition logic
* Missing validation (delivery date, inputs)
* Poor workflow UI alignment
* Inefficient search implementation

---

### Improvements Made

* Enforced strict state transitions
* Added full validation (frontend + backend)
* Implemented debounced search with URL sync
* Refined UI for mobile-first usability
* Fixed workflow visualization

---

## ⚖️ Engineering Decisions

### ❌ No Delete Operation

Orders are not deleted to preserve:

* financial integrity
* audit history

👉 Introduced **CANCELLED state instead**

---

### 💰 Revenue Logic

* Only **DELIVERED orders contribute to revenue**
* Active orders = pending
* CANCELLED excluded

---

### 📱 Responsive UI Strategy

* Cards for mobile → usability
* Tables for desktop → efficiency

👉 Avoided one-size-fits-all layout

---

## ⚠️ Tradeoffs

* No pagination (MVP scope)
* Minimal authentication (OAuth only)
* No role-based access
* No real-time updates

---

## 🔮 Future Improvements

* Pagination & performance optimization
* Real-time updates (WebSockets)
* Notifications (order ready/delivered)
* Advanced analytics dashboard
* Multi-user roles
* Invoice PDF generation

---

## 🧠 Key Learnings

* AI accelerates development, but **verification is critical**
* Real systems require **controlled workflows**
* UX should adapt to **device context**
* Speed without structure leads to fragile systems

---

## 📌 Final Note

This project focuses on:

> **Using AI to move fast, while applying engineering judgment to make it correct**

The goal was to deliver a **working, scalable, and realistic system within constraints**, not over-engineer.

---
