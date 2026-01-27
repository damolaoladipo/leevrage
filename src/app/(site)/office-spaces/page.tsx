import HeroSub from "@/components/shared/HeroSub";
import OfficeSpace from "@/components/Properties/OfficeSpaces";
import React from "react";
import { Metadata } from "next";
import { officeSpacesPage } from "@/app/api/pages";

export const metadata: Metadata = {
    title: officeSpacesPage.title + " | leeverage",
    description: officeSpacesPage.description,
};

const page = () => {
    return (
        <>
            <HeroSub
                title={officeSpacesPage.heading}
                description={officeSpacesPage.subheading}
                badge="Properties"
            />
            <OfficeSpace />
        </>
    );
};

export default page;