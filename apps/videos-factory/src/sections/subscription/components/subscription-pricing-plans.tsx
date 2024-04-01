"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import { ChangeEvent, useState } from "react";

import { IPlan } from "@/types/billing";

import PricingCard from "./subscription-plan-card";

// ----------------------------------------------------------------------

type Props = {
    plans: IPlan[];
};

const arrow = (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.2147 30.6123C6.71243 22.9891 10.1906 14.9695 17.1738 11.0284C24.2834 7.01748 33.9187 7.08209 41.1519 10.6817C42.6578 11.4331 41.4507 13.5427 39.9511 12.945C33.399 10.3368 25.7611 10.0919 19.3278 13.1729C16.5269 14.4946 14.2131 16.6643 12.7143 19.3746C10.7314 22.9202 11.202 26.5193 11.6878 30.3396C11.8055 31.2586 10.5388 31.3074 10.2147 30.6123Z"
            fill="#919EAB"
            fillOpacity="0.24"
        />
        <path
            d="M11.8126 39.0341C9.56032 35.9944 6.83856 32.7706 6.01828 28.9795C5.98242 28.8458 5.99937 28.7036 6.0656 28.5821C6.13183 28.4607 6.24226 28.3694 6.374 28.3271C6.50573 28.2849 6.64867 28.295 6.77316 28.3553C6.89765 28.4157 6.99414 28.5216 7.04263 28.6511C8.43444 31.8092 10.4092 34.463 12.553 37.1099C13.8625 35.3195 14.915 33.2716 16.4773 31.7142C16.6164 31.5741 16.8007 31.4879 16.9974 31.471C17.1941 31.4541 17.3905 31.5075 17.5515 31.6218C17.7125 31.736 17.8277 31.9037 17.8767 32.095C17.9257 32.2863 17.9052 32.4887 17.8189 32.6663C16.5996 35.0298 15.0564 37.2116 13.2339 39.1484C13.1391 39.2464 13.0238 39.3222 12.8963 39.3703C12.7688 39.4185 12.6321 39.4378 12.4963 39.4268C12.3604 39.4159 12.2286 39.375 12.1104 39.3071C11.9922 39.2392 11.8905 39.1459 11.8126 39.0341Z"
            fill="#919EAB"
            fillOpacity="0.24"
        />
    </svg>
);

export default function SubscriptionPricinPlans({ plans }: Props) {
    const [isYearly, setIsYearly] = useState(true);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const handleSwitchChange = (event: ChangeEvent, checked: boolean) => {
        setIsYearly(checked);
    };

    return (
        <>
            <Box sx={{ position: "relative" }}>
                <Stack direction="row" alignItems="center">
                    <Typography variant="overline">MONTHLY</Typography>

                    <Switch checked={isYearly} onChange={handleSwitchChange} sx={{ mx: 1 }} />

                    <Box sx={{ position: "relative" }}>
                        <Stack direction="row" sx={{ position: "absolute", left: 12, bottom: 12 }}>
                            {arrow}
                            <Box
                                component="span"
                                sx={{
                                    whiteSpace: "nowrap",
                                    color: "success.main",
                                    typography: "overline",
                                }}
                            >
                                save 20%
                            </Box>
                        </Stack>

                        <Typography variant="overline">YEARLY</Typography>
                    </Box>
                </Stack>
            </Box>
            <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4, xl: 6 }}
                direction={isDesktop ? "row" : "column-reverse"}
            >
                {plans.map((x, index) => {
                    const plan = isYearly ? x.variants[1] : x.variants[0];
                    return (
                        <Grid key={plan.id} xs={12} md={4}>
                            <PricingCard plan={plan} isYearly={isYearly} index={index} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}
