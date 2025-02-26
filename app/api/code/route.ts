import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(configuration)

const instruction: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a pro code generator. You should code anything. You must answer only in markdown code snippets. Use code comments for explanation"
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured", {status:500})
        }

        if(!messages) {
            return new NextResponse("Messages are required", {status:400})
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkSubscription()

        if(!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 })
        }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [instruction, ...messages],
        })

        if(!isPro){
        await increaseApiLimit()
        }
        return NextResponse.json(response.data.choices[0].message)


    } catch (error) {
        console.log("[CODE_ERROR]", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}