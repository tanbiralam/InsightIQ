# InsightIQ 🧠📊

[![npm version](https://img.shields.io/npm/v/my-app.svg?style=flat-square)](https://www.npmjs.com/package/my-app)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/tanbiralam/InsightIQ/blob/main/LICENSE)  
[![Build Status](https://github.com/tanbiralam/InsightIQ/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/tanbiralam/InsightIQ/actions/workflows/ci.yml)  
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-blue.svg?style=flat-square)  

---

InsightIQ is a modern Next.js-based analytics and AI insights platform designed to empower businesses with actionable data intelligence. Leveraging OpenAI's GPT models and Prisma ORM, InsightIQ delivers advanced data processing, natural language querying, and customizable dashboards in a seamless developer experience.

---

## ✨ Features

- **AI-Powered Insights:** Utilize OpenAI GPT-4 to generate natural language summaries and recommendations based on your data.  
- **Next.js Fullstack Framework:** Server-side rendering with API routes and React 18 support for optimal performance.  
- **Prisma ORM Integration:** Robust, type-safe database interactions with PostgreSQL support.  
- **User Authentication:** Powered by Clerk for secure and scalable user management.  
- **Rich UI Components:** Built with Radix-UI and TailwindCSS for accessible, customizable UI building blocks.  
- **Real-time Notifications:** Integrated with React Hot Toast and Crisp chat for user engagement and support.  
- **Stripe Payments:** Subscription and billing management using Stripe’s latest API.  
- **TypeScript First:** Fully typed codebase ensures maintainability and developer confidence.  

---

## 📋 Prerequisites

- Node.js v18 or higher (recommended: v20)  
- PostgreSQL 13+ database instance  
- A valid OpenAI API key with chat completion access  
- Stripe account for payment features (optional)  
- Clerk.dev account for authentication setup  
- Git installed on your machine  

---

## 🚀 Installation

1. **Clone the repository**  
```bash
git clone https://github.com/tanbiralam/InsightIQ.git
cd InsightIQ
2. **Install dependencies**  
```bash
npm install
3. **Set up your environment**  
Create a `.env` file based on `.env.example` and fill in your credentials.

```bash
cp .env.example .env
4. **Set up the PostgreSQL database**  
- Ensure PostgreSQL is running locally or remotely.  
- Update `DATABASE_URL` in `.env` accordingly.  
- Run Prisma migrations and generate client:  
```bash
npx prisma migrate deploy
npx prisma generate
5. **Verify setup and run the app**  
```bash
npm run dev
Open your browser at [http://localhost:3000](http://localhost:3000). You should see the InsightIQ welcome page.

---

## 💻 Usage

### Example 1: Fetch AI Insights with OpenAI GPT-4

```typescript
import { config } from "dotenv";
import OpenAI from "openai";

config(); // Load environment variables from .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface InsightRequest {
  query: string;
}

async function fetchInsight({ query }: InsightRequest): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an analytics assistant." },
        { role: "user", content: query },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content ?? "No insight generated.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to fetch AI insight.");
  }
}

// Usage
(async () => {
  try {
    const insight = await fetchInsight({ query: "Summarize last month's sales trends." });
    console.log("AI Insight:", insight);
  } catch (error) {
    console.error(error);
  }
})();
---

### Example 2: Querying Database with Prisma Client

```typescript
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function getActiveUsers(): Promise<User[]> {
  try {
    return await prisma.user.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to fetch active users.");
  } finally {
    await prisma.$disconnect();
  }
}

// Usage
(async () => {
  try {
    const users = await getActiveUsers();
    console.log("Active users:", users);
  } catch (error) {
    console.error(error);
  }
})();
---

### Example 3: Handling Rate Limiting and Retry Logic for OpenAI Requests

```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createChatCompletionWithRetry(messages: { role: string; content: string }[], retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
      });
      return response.choices[0]?.message?.content ?? "";
    } catch (error: any) {
      if (error.status === 429 && attempt < retries) {
        // Rate limited, wait and retry
        const waitTime = 1000 * attempt;
        console.warn(`Rate limit hit. Retrying in ${waitTime}ms...`);
        await new Promise((r) => setTimeout(r, waitTime));
      } else {
        console.error("OpenAI request failed:", error);
        throw error;
      }
    }
  }
  throw new Error("Exceeded maximum retry attempts.");
}

// Usage
(async () => {
  try {
    const result = await createChatCompletionWithRetry([
      { role: "user", content: "Generate a summary of today's user activity." },
    ]);
    console.log("Summary:", result);
  } catch (error) {
    console.error(error);
  }
})();
---

## ⚙️ Configuration

InsightIQ requires the following environment variables configured in your `.env` file:

```env
# .env.example

# PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# OpenAI API key for GPT chat completions
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Clerk authentication settings
CLERK_FRONTEND_API="your-clerk-frontend-api"
CLERK_API_KEY="your-clerk-api-key"

# Stripe keys for payments & subscriptions
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxx"

# Crisp live chat website ID (optional)
CRISP_WEBSITE_ID="your-crisp-website-id"

# Other environment settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Security note:
# Keep all keys private. Never commit .env files or secrets to public repositories.
**Where to get keys:**  
- OpenAI API: https://platform.openai.com/account/api-keys  
- Clerk: https://clerk.com/dashboard  
- Stripe: https://dashboard.stripe.com/apikeys  
- Crisp: https://app.crisp.chat/en/settings/website  

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:  

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/your-feature`)  
3. Commit your changes (`git commit -m "Add feature"`)  
4. Push to your branch (`git push origin feature/your-feature`)  
5. Open a Pull Request on GitHub  

Please adhere to the existing code style and write tests where applicable. For major changes, please open an issue first to discuss your plans.

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/tanbiralam/InsightIQ/blob/main/LICENSE).

---

> Built with ❤️ by [tanbiralam](https://github.com/tanbiralam)