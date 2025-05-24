```markdown
# InsightIQ 🧠💡

[![npm version](https://badge.fury.io/js/my-app.svg)](https://www.npmjs.com/package/my-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)

InsightIQ is your application for unlocking deeper insights and
enhancing your understanding using AI. It leverages powerful AI
models and a modern UI to provide a seamless user experience.

## Features

*   **AI-Powered Content Generation:** Generate text and images using
    OpenAI and Replicate.
*   **Modern User Interface:** Built with Next.js and Radix UI for
    a clean and intuitive experience.
*   **Secure Authentication:** Uses Clerk for user authentication and
    authorization.
*   **Data Management:** Leverages Prisma for robust data storage.
*   **Payment Processing:** Seamless Stripe integration.

## Prerequisites

Before you begin, ensure you have these installed:

*   **Node.js:** Version 18 or higher from [nodejs.org](https://nodejs.org/).
*   **npm or yarn:** Your preferred package manager.
*   **Git:** For cloning the repository.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd my-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file and add your API keys:

    ```
    DATABASE_URL="your_database_url"
    OPENAI_API_KEY="your_openai_api_key"
    REPLICATE_API_TOKEN="your_replicate_api_token"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    CLERK_SECRET_KEY="your_clerk_secret_key"
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
    STRIPE_API_KEY="your_stripe_api_key"
    STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Generate Prisma client:**

    ```bash
    npm run postinstall
    ```

    This also executes `npx prisma generate`.

## Usage

1.  **Running the development server:**

    ```bash
    npm run dev
    ```

    Access the application at `http://localhost:3000`.

2.  **Generating text with OpenAI (example):**

    First, install the OpenAI package:

    ```bash
    npm install openai
    ```

    Then, use it in your component:

    ```javascript
    import OpenAI from 'openai';

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    async function generateText(prompt) {
      try {
        const completion = await openai.completions.create({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt,
          max_tokens: 150,
        });
        return completion.choices[0].text;
      } catch (error) {
        console.error("Error generating text:", error);
        return "An error occurred.";
      }
    }

    // Example usage:
    generateText("Write a short poem about the moon.")
      .then(text => console.log(text));
    ```

    **Expected output:** A short poem about the moon.

3.  **Creating a Radix UI Dialog Component:**

    ```javascript
    import * as Dialog from '@radix-ui/react-dialog';

    function MyDialog() {
      return (
        <Dialog.Root>
          <Dialog.Trigger>Open Dialog</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] max-w-[95vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="m-0 text-[17px] font-medium">
                Edit profile
              </Dialog.Title>
              <Dialog.Description className="text-[15px] leading-normal text-gray-700">
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label className="text-[15px] font-medium leading-[normal]" htmlFor="name">
                  Name
                </label>
                <input className="w-[90px] rounded-[4px] border border-gray-500 px-4 py-2 text-[15px] leading-[normal] shadow-[0_0_0_1px] focus:shadow-[0_0_0_2px_black]" id="name" defaultValue="Pedro Duarte" />
              </fieldset>
              <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                  <button className="focus:shadow-outline inline-flex h-[35px] items-center justify-center rounded-[4px] bg-black px-[15px] font-medium leading-none text-white focus:outline-none">
                    Save changes
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="absolute top-[10px] right-[10px] inline-flex items-center justify-center rounded-full p-[4px] focus:shadow-outline focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M4.764 4.764a.5.5 0 0 1 .708 0L8 7.293l2.528-2.529a.5.5 0 1 1 .707.707L8.707 8l2.528 2.528a.5.5 0 0 1-.707.707L8 8.707l-2.528 2.528a.5.5 0 0 1-.707-.707L7.293 8 4.764 5.436a.5.5 0 0 1 0-.707z"></path>
                  </svg>
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
    }
    ```

## API/Configuration

The application uses external APIs like OpenAI and Replicate. See
their documentation for details:

*   **OpenAI API:** [https://platform.openai.com/docs/api-reference](https://platform.openai.com/docs/api-reference)
*   **Replicate API:** [https://replicate.com/docs](https://replicate.com/docs)

Key environment variables for configuration:

*   `DATABASE_URL`: PostgreSQL database URL.
*   `OPENAI_API_KEY`: OpenAI API key.
*   `REPLICATE_API_TOKEN`: Replicate API token.
*   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key.
*   `CLERK_SECRET_KEY`: Clerk secret key.
*   `STRIPE_API_KEY`: Stripe API key.
*   `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret.

## Contributing

Contributions are welcome! Follow these guidelines:

1.  Fork the repository.
2.  Create a branch for your feature/bug fix.
3.  Write clear code with comments.
4.  Submit a pull request with a description.
5.  Follow code style conventions.
6.  Ensure tests pass.

## License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for details.
```