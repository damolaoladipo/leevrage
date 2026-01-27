import HeroSub from "@/components/shared/HeroSub";
import ResidentialList from "@/components/Properties/Residential";
import React from "react";
import { Metadata } from "next";
import { residentialHomesPage } from "@/app/api/pages";

export const metadata: Metadata = {
    title: residentialHomesPage.title + " | leeverage",
    description: residentialHomesPage.description,
};

const page = () => {
    return (
        <>
            <HeroSub
                title={residentialHomesPage.heading}
                description={residentialHomesPage.subheading}
                badge="Properties"
            />
            <ResidentialList />
        </>
    );
};

export default page;