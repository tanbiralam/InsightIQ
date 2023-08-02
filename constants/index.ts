import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Code, MusicIcon, Settings} from "lucide-react"

export const Categories = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500"
    },
    {
        label: "Image Generator",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700"
    },
    {
        label: "Video Generator",
        icon: VideoIcon,
        href: "/video",
        color: "text-pink-700"
    },
    {
        label: "Code Generator",
        icon: Code,
        href: "/code",
        color: "text-orange-700"
    },
    {
        label: "Music Generator",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
]

export const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      href: "/conversation"
    },
    {
      label: "Music Genration",
      icon: MusicIcon,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      href: "/music"
    },
    {
      label: "Image Genration",
      icon: ImageIcon,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
      href: "/image"
    },
    {
      label: "Video Genration",
      icon: VideoIcon,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      href: "/video"
    },
    {
      label: "Code Genration",
      icon: Code,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
      href: "/code"
    }
  ]

export const testimonials = [
  {
      name: "John Doe",
      avatar: "J",
      title: "Software Enginner",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi cupiditate quis illo similique quia amet reiciendis omnis debitis itaque sapiente!"
  },
  {
      name: "Alison Parker",
      avatar: "A",
      title: "UI/UX Engineer",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi cupiditate quis illo similique quia amet reiciendis omnis debitis itaque sapiente!"
  },
  {
      name: "Robert Matthew",
      avatar: "R",
      title: "Data Analytics",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi cupiditate quis illo similique quia amet reiciendis omnis debitis itaque sapiente!"
  },
  {
      name: "Walter White",
      avatar: "W",
      title: "Meth Producer",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi cupiditate quis illo similique quia amet reiciendis omnis debitis itaque sapiente!"
  },
]

export const MAX_FREE_COUNTS = 5