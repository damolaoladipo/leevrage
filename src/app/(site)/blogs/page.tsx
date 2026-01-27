import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import { blogsPage } from "@/app/api/pages";

export const metadata: Metadata = {
    title: blogsPage.title + " | leeverage",
    description: blogsPage.description,
};

const Blog = () => {
    return (
        <>
            <HeroSub
                title={blogsPage.heading}
                description={blogsPage.subheading}
                badge="Blog"
            />
            <BlogList />
        </>
    );
};

export default Blog;
