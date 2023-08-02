import { Heading } from "@/components/Heading";
import { SubButton } from "@/components/SubButton";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const SettingsPage = async () => {

    const isPro = await checkSubscription()
    return ( 
        <div>
            <Heading
                title="Settings"
                description="Manage Account Settings"
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm">
                {isPro ? "You are currently on a pro plan.": "You are currently on a free plan."}
                </div>
                <SubButton isPro={isPro}/>
            </div>
        </div>
     );
}
 
export default SettingsPage;