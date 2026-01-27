export interface PageData {
  slug: string;
  title: string;
  description: string;
  heading: string;
  subheading: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const blogsPage: PageData = {
  slug: "blogs",
  title: "Our Latest Blogs",
  description: "Discover insights and tips from our real estate experts. Stay updated with market trends, buying guides, and property investment strategies.",
  heading: "Explore Our Real Estate Insights",
  subheading: "Read expert advice and tips from the Leeverage team"
};

export const propertiesPage: PageData = {
  slug: "properties",
  title: "Featured Properties",
  description: "Browse our exclusive collection of premium residential, commercial, and luxury properties. Find your perfect home or investment opportunity.",
  heading: "All Properties",
  subheading: "Discover your dream property from our curated selection"
};

export const apartmentPage: PageData = {
  slug: "appartment",
  title: "Apartments",
  description: "Explore our collection of modern apartments. Find stylish urban living spaces with premium amenities and convenient locations.",
  heading: "Apartments",
  subheading: "Modern urban living at your fingertips"
};

export const luxuryVillaPage: PageData = {
  slug: "luxury-villa",
  title: "Luxury Villas",
  description: "Experience luxury living in our exclusive villas. Spacious homes with premium finishes, private gardens, and sophisticated design.",
  heading: "Luxury Villas",
  subheading: "Premium properties for discerning buyers"
};

export const residentialHomesPage: PageData = {
  slug: "residential-homes",
  title: "Residential Homes",
  description: "Discover our residential homes perfect for families. Comfortable, well-designed properties in vibrant neighborhoods.",
  heading: "Residential Homes",
  subheading: "Find your perfect family home"
};

export const officeSpacesPage: PageData = {
  slug: "office-spaces",
  title: "Office Spaces",
  description: "Modern office spaces designed for business success. Professional environments with flexible layouts and excellent facilities.",
  heading: "Office Spaces",
  subheading: "Prime locations for your business growth"
};

export const contactUsPage: PageData = {
  slug: "contactus",
  title: "Get In Touch",
  description: "Have questions? We'd love to hear from you. Contact our team for property inquiries, consultations, or investment opportunities.",
  heading: "Contact Us",
  subheading: "Reach out and let's discuss your real estate needs",
  email: "info@leeverage.com",
  phone: "+1 (555) 123-4567",
  address: "123 Real Estate Avenue, Palm Springs, CA 92260"
};
