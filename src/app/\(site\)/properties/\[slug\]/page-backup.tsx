import React from 'react';
import { propertyHomes } from '@/app/api/propertyhomes';
import { testimonials } from '@/app/api/testimonial';
import DetailsClient from './details-client';

export async function generateStaticParams() {
    return propertyHomes.map((property) => ({
        slug: property.slug,
    }))
}

type Props = {
    params: { slug: string };
};

export default function Details({ params }: Props) {
    const { slug } = params;
    const item = propertyHomes.find((item) => item.slug === slug);

    if (!item) {
        return <div>Property not found</div>;
    }

    return <DetailsClient item={item} testimonials={testimonials} />;
}
