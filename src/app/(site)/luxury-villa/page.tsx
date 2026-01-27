import HeroSub from "@/components/shared/HeroSub";
import LuxuryVillas from "@/components/Properties/LuxuryVilla";
import React from "react";
import { Metadata } from "next";
import { luxuryVillaPage } from "@/app/api/pages";

export const metadata: Metadata = {
    title: luxuryVillaPage.title + " | leeverage",
    description: luxuryVillaPage.description,
};

const page = () => {
    return (
        <>
            <HeroSub
                title={luxuryVillaPage.heading}
                description={luxuryVillaPage.subheading}
                badge="Properties"
            />
            <LuxuryVillas />
        </>
    );
};

export default page;