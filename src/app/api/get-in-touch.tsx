export type GetInTouchData = {
  title: string
  ctaText: string
  ctaLink: string
  videoUrl: string
  bannerMessages: string[]
}

const getInTouchData: GetInTouchData = {
  title: "Enter a realm where exquisite design and timeless luxury come together.",
  ctaText: "Get In Touch",
  ctaLink: "/contactus",
  videoUrl: "https://videos.pexels.com/video-files/7233782/7233782-hd_1920_1080_25fps.mp4",
  bannerMessages: [
    "GET A FREE PROPERTY VALUATION—SELL YOUR HOME WITH CONFIDENCE!",
    "BROWSE THOUSANDS OF LISTINGS IN PRIME LOCATIONS AT GREAT PRICES!",
    "GET A FREE PROPERTY VALUATION—SELL YOUR HOME WITH CONFIDENCE!",
    "BROWSE THOUSANDS OF LISTINGS IN PRIME LOCATIONS AT GREAT PRICES!"
  ]
}

export const getInTouch = getInTouchData
