
import { Metadata } from 'next';
import { getData, postData } from '../../utils/api';
import React from 'react';
import { log } from 'console';
import PropertyDetails from './PropertyDetails';

async function getHotelData(slug: string) {
  const res = await getData(`get-property-data/${slug}`);
  return res.record;
}

// ✅ Dynamic SEO meta using slug
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const hotelData = await getHotelData(resolvedParams.slug);
  return {
    title: hotelData.seo_title,
    description: hotelData.seo_description,
    keywords: hotelData.seo_keyword,
  };
}

// ✅ Page Component
export default async function HotelPage({ params }: { params: { slug: string } }) {
  const hotelData = await getHotelData(params.slug); // same fetch used above
  

return <> 
 <PropertyDetails hotelData={hotelData}  />
</>;
}