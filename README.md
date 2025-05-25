# InsightIQ 💡

InsightIQ is an AI-powered platform meticulously crafted to streamline content creation and deliver intelligent data analysis. Leveraging Next.js, TypeScript, and sophisticated AI models from OpenAI and Replicate, InsightIQ provides an array of creative tools and insightful solutions to its users.

[![npm version](https://badge.fury.io/js/my-app.svg)](https://www.npmjs.com/package/my-app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/tanbiralam/InsightIQ/actions/workflows/main.yml/badge.svg)](https://github.com/tanbiralam/InsightIQ/actions/workflows/main.yml)
![Primary Language](https://img.shields.io/github/languages/top/tanbiralam/InsightIQ)

## ✨ Features

*   **AI-Driven Text Generation:** Generate diverse creative text formats, including poems, code snippets, scripts, and emails, utilizing OpenAI's `gpt-3.5-turbo` model. Enhanced with rate limiting and robust error handling to ensure consistent performance.
*   **AI Image Creation:** Create stunning visuals from text prompts using Stable Diffusion, seamlessly integrated with the Replicate API. Features comprehensive error management and real-time status updates for a fluid user experience.
*   **Real-time Support:** Provide instant support and enhance user engagement through chat functionalities using `crisp-sdk-web`, ensuring seamless and immediate communication.
*   **Secure User Authentication:** Implement Clerk for secure user authentication and comprehensive account management. Enjoy customizable sign-in and sign-up flows for a tailored user experience.
*   **Seamless Payment Integration:** Integrate Stripe for secure transactions, subscription management, and efficient payment processing. Benefit from webhook support for reliable, real-time event handling.
*   **Responsive UI:** Deliver a user-friendly experience across various devices with a responsive design built using Tailwind CSS and Radix UI components, ensuring accessibility and optimal viewing.
*   **Persistent Data Storage:** Utilize Prisma and PostgreSQL for efficient and secure storage of user data, preferences, and application-specific information, ensuring data integrity and fast retrieval.

## 📋 Prerequisites

Before installing and running InsightIQ, ensure the following are installed and correctly configured on your system:

1.  **Node.js:** (Version 18 or higher) - [https://nodejs.org/](https://nodejs.org/)
2.  **npm:** (Comes with Node.js) - [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
3.  **PostgreSQL:** A relational database management system - [https://www.postgresql.org/](https://www.postgresql.org/)
4.  **Git:** For effective version control - [https://git-scm.com/](https://git-scm.com/)

This project relies on the following npm packages, as detailed in `package.json`:

*   `@clerk/nextjs`: Provides robust user authentication features.
*   `@hookform/resolvers`: Used for form validation with Zod schemas for data integrity.
*   `@prisma/client`: Offers a type-safe database client for secure data access.
*   `openai`: Enables seamless interaction with the OpenAI API for text generation.
*   `replicate`: Integrates Replicate's advanced image generation models.
*   `stripe`: Manages payment processing and subscription services securely.
*   `next`: Powers the Next.js framework for server-side rendering and routing.
*   `typescript`: Ensures type safety throughout the application's codebase.
*   `zod`: Provides schema validation for data consistency.

## 🚀 Installation

Follow these steps to install and set up InsightIQ on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tanbiralam/InsightIQ.git
    cd InsightIQ
2.  **Install dependencies:**

    ```bash
    npm install
3.  **Configure environment variables:**

    Create a `.env` file in the root directory. Copy the contents from the `.env.example` file (provided below) and fill in the necessary API keys and database connection details.

4.  **Database setup with Prisma:**

    ```bash
    npx prisma migrate dev --name init
    This command creates the database tables based on the schema defined in `prisma/schema.prisma`. Ensure your PostgreSQL database is running before executing this command.

5.  **Generate Prisma Client:**

    ```bash
    npm run postinstall
    This command, defined in `package.json`, executes `prisma generate` to create the Prisma client, which is essential for interacting with the database.

6.  **Start the development server:**

    ```bash
    npm run dev
7.  **Verify Installation:**

    *   Open your web browser and navigate to `http://localhost:3000`.
    *   The InsightIQ application should be running without any initial errors.
    *   Create a new user account and log in to verify that the user authentication system powered by Clerk is functioning correctly.
    *   Test the AI content generation and image generation features. Check the browser console for any errors related to missing or invalid API keys, and ensure that the features are functioning as expected.

## 💻 Usage

The following examples demonstrate how to effectively utilize InsightIQ's core functionalities:

**1. Generating Text with OpenAI:**

```typescript
import OpenAI from 'openai';

// Load environment variables and validate the API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Missing OPENAI_API_KEY environment variable.");
  throw new Error("OPENAI_API_KEY is required. Obtain from: https://platform.openai.com/account/api-keys");
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true, // Only allow in the browser if you understand the security implications
});

// Function to generate text using OpenAI's chat completion API
async function generateText(prompt: string, retries = 3): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7, // Adjust for creativity
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      console.warn("No content returned from OpenAI.");
      return null;
    }

    return content;

  } catch (error: any) {
    console.error("Error generating text:", error);

    // Implement retry logic for rate limiting errors
    if (error.status === 429) {
      if (retries > 0) {
        console.warn(`Rate limit exceeded. Retrying after a delay... (Retries left: ${retries})`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        return generateText(prompt, retries - 1); // Retry the request
      } else {
        console.error("Max retries reached. Unable to generate text.");
        return null;
      }
    }

    return null; // Return null on failure
  }
}

// Example usage of the generateText function
async function main() {
  const prompt = "Write a short limerick about a coding cat.";
  const generatedPoem = await generateText(prompt);

  if (generatedPoem) {
    console.log("Generated Limerick:", generatedPoem);
  } else {
    console.log("Failed to generate limerick.");
  }
}

main();
**2. Generating Images with Replicate:**

```typescript
import Replicate from "replicate";

// Validate environment variables
const replicateApiKey = process.env.REPLICATE_API_TOKEN;
if (!replicateApiKey) {
  console.error("Missing REPLICATE_API_TOKEN environment variable.");
  throw new Error("REPLICATE_API_TOKEN is required. Obtain from: https://replicate.com/account/api-tokens");
}

const replicate = new Replicate({
  auth: replicateApiKey,
});

// Function to generate an image from a text prompt using Replicate
async function generateImage(prompt: string, retries = 3): Promise<string | null> {
  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion:db21e94d56c235a219f353e958e9c70ca896bd0b6fab2d247598a5aa39a95e83",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    if (Array.isArray(output)) {
      return output[0] as string; // Assuming the first element is the image URL
    } else {
      console.error("Unexpected output format from Replicate:", output);
      return null;
    }

  } catch (error: any) {
    console.error("Error generating image:", error);
     if (retries > 0 && error.message.includes("RateLimitExceeded")) {
            console.warn(`Replicate rate limit exceeded. Retrying after a delay... (Retries left: ${retries})`);
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
            return generateImage(prompt, retries - 1);
        }
    return null;
  }
}

// Example usage
async function main() {
  const prompt = "A photorealistic painting of a corgi in space.";
  const imageUrl = await generateImage(prompt);

  if (imageUrl) {
    console.log("Generated Image URL:", imageUrl);
  } else {
    console.log("Failed to generate image.");
  }
}

main();
**3. Using Clerk for User Authentication (Server-Side - Next.js API Route):**

```typescript
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json({ userId });
  } catch (error) {
    console.error("Clerk authentication error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
**4. Prisma Client Usage Example:**

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: 'newuser@example.com',
        name: 'New User Example',
      },
    });
    console.log('Created user:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
## ⚙️ Configuration

Example `.env.example` file:
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
# PostgreSQL database connection URL.
# Replace with your database credentials. Ensure strong passwords and secure access.
# Example: postgresql://dbuser:securepassword@localhost:5432/mydatabase?schema=public

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Clerk Publishable Key (public). Obtain from your Clerk dashboard: https://dashboard.clerk.com/
# This key is safe to expose in client-side code.

CLERK_SECRET_KEY="sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Clerk Secret Key (private). Retrieve from your Clerk dashboard. NEVER commit this to version control!
# Treat this key like a password. Store it securely and limit access.

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
# The sign-in URL for Clerk.

NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
# The sign-up URL for Clerk.

NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
# Where to redirect users after successful sign-in.

NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
# Where to redirect users after successful sign-up.

OPENAI_API_KEY="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Your OpenAI API key. Get it from: https://platform.openai.com/account/api-keys.
# Keep this key private and secure! Do not share or commit this to version control.

REPLICATE_API_TOKEN="r8_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Your Replicate API token. Obtain from: https://replicate.com/account/api-tokens.
# Securely store and manage this token.

STRIPE_API_KEY="sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Your Stripe API Secret Key (private). Get it from: https://dashboard.stripe.com/apikeys.
# NEVER commit this key to version control! Handle with extreme care.

NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Your Stripe Public Key (public). This key can be safely exposed.

STRIPE_WEBHOOK_SECRET="whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
# Stripe Webhook Secret. Used to verify incoming Stripe webhooks. NEVER commit this!
# This secret is crucial for ensuring the integrity of Stripe webhook events.

NEXT_PUBLIC_APP_URL="http://localhost:3000"
# The URL of your application (used for Stripe webhooks, CORS, etc.).
# This should be the base URL where your application is deployed.
## 🤝 Contributing

We warmly welcome contributions to InsightIQ! To contribute effectively, please follow these guidelines:

1.  **Fork the repository:** Begin by forking the InsightIQ repository on GitHub to create your own copy.
2.  **Create a new branch:** Create a dedicated branch for your feature or bug fix: `git checkout -b feature/your-feature-name`. This ensures a clean and organized workflow.
3.  **Make your changes:** Implement your changes, ensuring that your code adheres to the project's coding standards. Write clear and concise commit messages to explain your changes.
4.  **Push your branch:** Push your branch to your forked repository: `git push origin feature/your-feature-name`.
5.  **Submit a pull request:** Submit a pull request to the main branch of the original InsightIQ repository. Provide a detailed description of your changes and the problem they solve.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.