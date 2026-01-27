import { Category, ServicesData } from "./services"

const interiorDesignData: ServicesData = {
  tag: "Interior design",
  title: "Explore best Interior designs with expert services.",
  description: "Discover a diverse range of premium properties, from luxurious apartments to spacious villas, tailored to your needs",
  ctaText: "View properties",
  ctaLink: "/properties",
  categories: [
    {
      name: "Residential Homes",
      description: "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.",
      image: "/images/categories/villas.jpg",
      link: "/residential-homes"
    },
    {
      name: "Luxury villas",
      description: "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.",
      image: "/images/categories/luxury-villa.jpg",
      link: "/luxury-villa"
    },
    {
      name: "Appartment",
      description: "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.",
      image: "/images/categories/appartment.jpg",
      link: "/appartment"
    },
    {
      name: "Office Spaces",
      description: "Experience elegance and comfort with our exclusive luxury villas, designed for sophisticated living.",
      image: "/images/categories/office.jpg",
      link: "/office-spaces"
    }
  ]
}

export const interiorDesign = interiorDesignData
