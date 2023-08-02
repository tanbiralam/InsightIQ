"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("122bdc0f-ee8e-46eb-b0be-baf9353145b9")
    }, [])

    return null;
}

