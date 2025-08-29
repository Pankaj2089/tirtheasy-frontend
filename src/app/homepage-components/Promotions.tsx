'use client'
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import { log } from 'console';

import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface BannerData {
  title: string;
  banner: string;
  id: string;
  // Add other fields if needed
}

type PromotionsProps = {
  title: string,
  type:number
};

const options = {
  loop: true,
  margin: 20,
  autoplay: false,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1.1,
    },
    480: {
      items: 1.3,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
    1000: {
      items: 3,
    },
    1400: {
      items: 3,
    },
  },
};

export default function Promotions({ title, type }: PromotionsProps) {
  const [promotions, setData] = useState<BannerData[]>([]);
    
    useEffect(() => {
      async function fetchData() {
        try {
            const data = sessionStorage.getItem('promotions'+type);
            if (data) {
              let sliderData = JSON.parse(data);
              setData(sliderData);
            }else{
                let postRec: { type: number; promotion_for: string | null } = { type: type,promotion_for: localStorage.getItem('property_type')}; 
                const res = await postData('promotions', postRec);         
                setData(res.records);
                sessionStorage.setItem("promotions"+type, JSON.stringify(res.records));
            }
        } catch (err) {
          console.error(err);
        }
      }
  
      fetchData();
    }, [promotions.length == 0]); 
    
  return (
    <>
    {(promotions.length > 0) && (
        <div className="popular-destination py-50 wow fadeInUp">
          <div className="container">
            <div className="section-title text-center wow fadeInUp">
              <h2 className="mb-0">{title}</h2>
            </div>
            <div className="promotions-sldier show-nav">
              <OwlCarousel {...options} key={'promotion'+promotions.length}>
                {promotions.map((data) => (
                    <div className="item" key={data.id}>
                      <a className="promotion-img" href="#">
                        <img src={data.banner} alt={data.title} title={data.title} />
                      </a>
                    </div>
                  )
                )}
              </OwlCarousel>
            </div>
          </div>
        </div>
      )}
    </>
  );
}