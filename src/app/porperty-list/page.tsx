import PropertiesList from "./PropertiesList";
import { Metadata } from 'next';
import { getData } from '../utils/api';
import React from 'react';

// Simulate dynamic data fetch (could be API/db call)
async function getHotelData() {
    const res = await getData('get-page-data/6');  
    return res.record;
}

// ✅ Dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {

  const hotel = await getHotelData();

  return {
    title: hotel.seo_title,
    description: hotel.seo_description,
    keywords: hotel.seo_keyword,
    // openGraph: {
    //   title: hotel.name,
    //   description: hotel.description,
    //   images: [
    //     {
    //       url: hotel.image,
    //       width: 800,
    //       height: 600,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: hotel.seo_title,
    //   description: hotel.seo_description,
    //   images: [hotel.image],
    // },
  };
}

export default function hotelsPage() {

return <> 
  <PropertiesList />
</>;
}