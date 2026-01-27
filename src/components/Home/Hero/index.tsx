import Image from 'next/image'
import Link from 'next/link'
import { hero } from '@/app/api/hero'

const Hero: React.FC = () => {
  const getIconPath = (iconName: string, isDark: boolean = false) => {
    const prefix = isDark ? 'dark-' : ''
    return `/images/hero/${prefix}${iconName}.svg`
  }

  return (
    <section className='!py-0'>
      <div className='bg-gradient-to-b from-skyblue via-lightskyblue dark:via-[#4298b0] to-white/10 dark:to-black/10 overflow-hidden relative'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-60 md:pb-68'>
          <div className='relative text-white dark:text-dark text-center md:text-start z-10'>
            <p className='text-inherit text-xm font-medium'>{hero.location}</p>
            <h1 className='text-inherit text-6xl sm:text-9xl font-semibold -tracking-wider md:max-w-45p mt-4 mb-6'>
              {hero.title}
            </h1>
            <div className='flex flex-col xs:flex-row justify-center md:justify-start gap-4'>
              <Link href={hero.ctaLink} className='px-8 py-4 border border-white dark:border-dark bg-primary dark:bg-primary text-white dark:text-white duration-300 dark:hover:text-dark hover:bg-transparent hover:text-white text-base font-semibold rounded-full hover:cursor-pointer'>
                {hero.ctaText}
              </Link>
              <Link href={hero.secondaryCtaLink} className='px-8 py-4 border border-white dark:border-dark bg-transparent text-white dark:text-dark hover:bg-white dark:hover:bg-dark dark:hover:text-white hover:text-dark duration-300 text-base font-semibold rounded-full hover:cursor-pointer'>
                {hero.secondaryCtaText}
              </Link>
            </div>
          </div>
          <div className='hidden md:block absolute -top-2 -right-68'>
            <Image
              src={hero.heroImage}
              alt='heroImg'
              width={1082}
              height={1016}
              priority={false}
              unoptimized={true}
            />
          </div>
        </div>
        <div className='md:absolute bottom-0 md:-right-68 xl:right-0 bg-white dark:bg-black py-12 px-8 mobile:px-16 md:pl-16 md:pr-[295px] rounded-2xl md:rounded-none md:rounded-tl-2xl mt-24'>
          <div className='grid grid-cols-2 sm:grid-cols-4 md:flex gap-16 md:gap-24 sm:text-center dark:text-white text-black'>
            {hero.features.map((feature, index) => (
              <div key={index} className='flex flex-col sm:items-center gap-3'>
                <Image
                  src={getIconPath(feature.icon)}
                  alt={feature.label}
                  width={32}
                  height={32}
                  className='block dark:hidden'
                  unoptimized={true}
                />
                <Image
                  src={getIconPath(feature.icon, true)}
                  alt={feature.label}
                  width={32}
                  height={32}
                  className='hidden dark:block'
                  unoptimized={true}
                />
                <p className='text-sm sm:text-base font-normal text-inherit'>
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

