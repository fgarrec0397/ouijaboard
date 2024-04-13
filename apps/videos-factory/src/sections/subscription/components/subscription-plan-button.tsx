import { CardProps } from "@mui/material/Card";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/auth/hooks";
import { PrimaryButton } from "@/components/button";
import { paths } from "@/routes/paths";
import { updateSubscription } from "@/services/subscriptionsService/subscriptionsService";
import { IPlan } from "@/types/billing";
import { IUser } from "@/types/user";

// ----------------------------------------------------------------------

type Props = CardProps & {
    plan: IPlan;
    isYearly?: boolean;
    isCurrentPlan?: boolean;
    text: string;
    user: IUser;
};

export default function SubscriptionPlanButton({
    plan,
    isYearly,
    isCurrentPlan,
    text,
    user,
}: Props) {
    const router = useRouter();
    const { authenticated, user: authUser } = useAuthContext();
    const isAlreadyOnPaidPlan = user.currentPlanId !== "free";
    const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;

    console.log({ authUser, user });

    const buttonText = isCurrentPlan ? "Current plan" : text;

    const onClick = async () => {
        if (!authenticated) {
            return router.push(paths.auth.register);
        }

        if (isAlreadyOnPaidPlan) {
            return updateSubscription(authUser?.accessToken, priceId);
        }

        (window as any).Paddle.Checkout.open({
            customer: {
                email: user?.email,
            },
            customData: {
                userId: user?.id,
            },
            items: [
                {
                    priceId,
                    quantity: 1,
                },
            ],
        });
    };

    return (
        <PrimaryButton
            fullWidth
            size="large"
            variant="contained"
            onClick={onClick}
            disabled={isCurrentPlan}
        >
            {buttonText}
        </PrimaryButton>
    );
}
