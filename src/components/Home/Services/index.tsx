import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { services } from "@/app/api/services";

const Categories = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-0 top-0">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-10">
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon icon="ph:house-simple-fill" className="text-2xl text-primary " />
              {services.tag}
            </p>
            <h2 className="lg:text-52 text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white">
              {services.title}
            </h2>
            <p className="text-dark/50 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              {services.description}
            </p>
            <Link href={services.ctaLink} className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300">
              {services.ctaText}
            </Link>
          </div>
          {services.categories.map((category, index) => {
            const colSpan = index === 0 ? "lg:col-span-6" : index > 1 ? "lg:col-span-3" : "lg:col-span-6";
            return (
              <div key={index} className={`${colSpan} col-span-6 ${index === 0 ? "col-span-12" : ""} ${index > 1 ? "col-span-6" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden group">
                  <Link href={category.link}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={index === 0 ? 680 : 320}
                      height={386}
                      className="w-full"
                      unoptimized={true}
                    />
                  </Link>
                  <Link href={category.link} className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 top-full flex flex-col justify-between pl-10 pb-10 group-hover:top-0 duration-500">
                    <div className="flex justify-end mt-6 mr-6">
                      <div className="bg-white text-dark rounded-full w-fit p-4">
                        <Icon icon="ph:arrow-right" width={24} height={24} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-white text-2xl">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-base leading-6">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;

