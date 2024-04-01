import { CardProps } from "@mui/material/Card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthContext } from "@/auth/hooks";
import { PrimaryButton } from "@/components/button";
import { getCheckoutURL } from "@/services/subscriptionsService/subscriptionsService";
import { IPlanVariant } from "@/types/billing";

// ----------------------------------------------------------------------

type Props = CardProps & {
    plan: IPlanVariant;
    currentPlan?: IPlanVariant;
    embed?: boolean;
};

export default function SubscriptionPlanButton({ plan, currentPlan, embed }: Props) {
    const router = useRouter();
    const auth = useAuthContext();
    const [loading, setLoading] = useState(false);
    const isCurrent = plan.id === currentPlan?.id;

    const label = isCurrent ? "Your plan" : "Sign up";

    // Make sure Lemon.js is loaded, you need to enqueue the Lemon Squeezy SDK in your app first.
    useEffect(() => {
        if (typeof window.createLemonSqueezy === "function") {
            window.createLemonSqueezy();
        }
    }, []);

    console.log(auth, "auth");

    const onClick = async () => {
        // Create a checkout and open the Lemon.js modal
        let checkoutUrl: string | undefined = "";

        try {
            checkoutUrl = await getCheckoutURL(auth.user?.accessToken, auth.user?.email, plan.id);
        } catch (error) {
            console.error("Error creating a checkout");
        }

        console.log(checkoutUrl, "checkoutUrl");

        if (checkoutUrl) {
            window.LemonSqueezy.Url.Open(checkoutUrl);
        }
    };

    return (
        <PrimaryButton
            fullWidth
            size="large"
            variant="contained"
            onClick={onClick}
            // disabled={basic}
            // color={starter ? "primary" : "inherit"}
        >
            {"test"}
        </PrimaryButton>
    );
}
