'use client'
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import { log } from 'console';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface BannerData {
  heading: string;
  image: string;
  id: string;
}

type DestinationsProps = {
  title: string,
  type:number
};
const options = {
  loop:true,
  margin:20,
  autoplay:true,
  nav:false,
  items:5,
  dots:false,
  slideTransition: 'linear',
  autoplaySpeed: 10000,
  smartSpeed: 10000,
  responsive : {
    0 : {
        items:1.2,
    },
    
    480 : {
      items:1.5,
    },
    
    768 : {
      items:3,
    },
    992:{
      items:4,
    },
    1000:{
      items:5,
    },
  },
};
export default function ({ title, type }: DestinationsProps) {
    const [promotions, setData] = useState<BannerData[]>([]);
    
      useEffect(() => {
        async function fetchData() {
          try {
            const res = await getData('popular-destinations/'+type);
            setData(res.records);
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchData();
      }, [type]); 
  return (
    <>
    {promotions.length > 0 &&
    <div className="popular-destination py-50 wow fadeInUp">
      <div className="container">
        <div className="section-title text-center wow fadeInUp">
          <h2 className="mb-1 mb-md-2 mb-lg-2">{title}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

      </div>
      <div className="container-fluid">
        <div className="outside-india-sldier ">
          <OwlCarousel {...options}>
            {promotions.map((data, index) => (
            <div className="item">
              <a href="#" className="destination-box rounded-4" title={data.heading}>
                  <img src={data.image} alt={data.heading} title={data.heading} />
                  <span className="overlay-box"></span>
                  <span className="address-box text-white">
                    <img src="img/location.svg" className="me-2"/> {data.heading} 
                  </span>
                </a>
            </div>
            )
            )}
          </OwlCarousel>
        </div>
      </div>
    </div>
}
</>
  );
}