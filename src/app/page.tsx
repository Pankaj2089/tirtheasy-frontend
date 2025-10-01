
import Slider from './homepage-components/Slider';
import PopularDestinations from './homepage-components/PopularDestinations';
import Promotions from './homepage-components/Promotions';
import PopularDestinationsOutsideIndia from './homepage-components/PopularDestinationsOutsideIndia';
import Facilities from './homepage-components/Facilities';
import Hotels from './homepage-components/Hotels';
import GuestReviews from './homepage-components/GuestReviews';
import { Metadata } from 'next';
import { getData } from './utils/api';
import Head from "next/head";

// Simulate dynamic data fetch (could be API/db call)
async function getPageData() {
    const res = await getData('get-page-data/1');  
    return res.record;
}

// ✅ Dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData();  

  return {
    title: pageData.seo_title,
    description: pageData.seo_description,
    keywords: pageData.seo_keyword,
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



export default function Home() {

  
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/owl.carousel.css" />
      </Head>
      <Slider />
      <PopularDestinations title="Popular Destinations" type={1} />
      <Promotions title="Promotions on Flights, Tours & Tickets" type={1} />
      <PopularDestinationsOutsideIndia  title="Popular Destinations Outside India" type={2}  />
      <Facilities />
      <Hotels title="Browse Top Hotels" type="hotel"/>
      <Promotions title="Accommodation Promotions" type={2}/>
      <Hotels title="Browse Top Dharmshalas" type="dharmshala"/>
      <GuestReviews />    
    </>
  );
}