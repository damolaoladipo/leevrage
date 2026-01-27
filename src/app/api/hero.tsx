export type HeroData = {
  location: string
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText: string
  secondaryCtaLink: string
  heroImage: string
  features: Array<{
    label: string
    icon: string
  }>
}

const heroData: HeroData = {
  location: "Palm springs, CA",
  title: "Futuristic Haven",
  subtitle: "",
  ctaText: "Get in touch",
  ctaLink: "/contactus",
  secondaryCtaText: "View Details",
  secondaryCtaLink: "#",
  heroImage: "/images/hero/heroBanner.png",
  features: [
    {
      label: "4 Bedrooms",
      icon: "sofa"
    },
    {
      label: "4 Restroom",
      icon: "tube"
    },
    {
      label: "4 Parking",
      icon: "parking"
    },
    {
      label: "120 sqm",
      icon: "area"
    }
  ]
}

export const hero = heroData
