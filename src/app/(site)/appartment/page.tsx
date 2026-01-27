import HeroSub from "@/components/shared/HeroSub";
import Appartment from "@/components/Properties/Appartment";
import React from "react";
import { Metadata } from "next";
import { apartmentPage } from "@/app/api/pages";

export const metadata: Metadata = {
    title: apartmentPage.title + " | leeverage",
    description: apartmentPage.description,
};

const page = () => {
    return (
        <>
            <HeroSub
                title={apartmentPage.heading}
                description={apartmentPage.subheading}
                badge="Properties"
            />
            <Appartment />
        </>
    );
};

export default page;