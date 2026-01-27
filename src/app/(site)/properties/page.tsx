import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
import { propertiesPage } from "@/app/api/pages";

export const metadata: Metadata = {
    title: propertiesPage.title + " | leeverage",
    description: propertiesPage.description,
};

const page = () => {
    return (
        <>
            <HeroSub
                title={propertiesPage.heading}
                description={propertiesPage.subheading}
                badge="Properties"
            />
            <PropertiesListing />
        </>
    );
};

export default page;
