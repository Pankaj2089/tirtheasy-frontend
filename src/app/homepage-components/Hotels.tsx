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

interface HotelData {
  title: string;
  image: string;
  state: string;
  id: string;
}

type HotelsProps = {
  title: string,
  type:string
};
 const options = {
    loop: true,
    margin: 20,
    autoplay: false,
    nav: true,
    items:4,
    dots: false,
    responsive: {
      0 : {
        items:1.2,
    },
    480 : {
      items:1.5,
    },
    768 : {
      items:2,
    },
    992:{
      items:3,
    },
    1000:{
      items:4,
    },
    },
  };

export default function Hotels({ title, type }: HotelsProps) {
  const [hotels, setData] = useState<HotelData[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
           const data = sessionStorage.getItem('hotels'+type);
              if (data) {
                let sliderData = JSON.parse(data);
                setData(sliderData);
              }else{
                  const res = await getData('hotels/'+type);        
                  setData(res.records);
                  sessionStorage.setItem("hotels"+type, JSON.stringify(res.records));
              }
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
  }, [type]); 
  return (
    <>
      {hotels.length > 0 &&
        <div className="popular-destination py-50 wow fadeInUp">
          <div className="container">
            <div className="section-title text-center wow fadeInUp">
              <h2 className="mb-0">{title}</h2>
            </div>
            <div className="top-hotels-sldier">
              <OwlCarousel {...options}>
              {hotels.map((data, index) => (
                <div className="item">
                  <div className="hotal-detail-box">
                      <a href="#" className="hotel-thumbnail">
                          <img src={data.image} alt={data.title} title={data.title} />
                      </a>
                      <div className="hotel-description">
                        <h4><a href="#">{data.title}</a></h4>
                        { type === 'hotel' && 
                          <p className="fs-14">{data.state}</p>
                        }
                      </div>
                  </div>
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