"use client"

import {Menu} from "lucide-react"
import { Button } from "./ui/button"
import { SheetContent, SheetTrigger, Sheet } from "./ui/sheet"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react"


interface MobileSideBarProps {
  apiLimitCount: number;
  isPro: boolean,
}


const MobileSideBar = ({
  apiLimitCount = 0,
  isPro = false
}: MobileSideBarProps) => { 
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient) {
    return null
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar

