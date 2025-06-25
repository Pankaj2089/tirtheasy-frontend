'use client'
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import { log } from 'console';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HomeSearch from './HomeSearch';
import dynamic from 'next/dynamic';
import '../page.module.css' 

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
const options = {
    loop: true,
    margin: 0,
    nav: false,
    items: 1,
    autoplay: true,
    dots: false,
    autoplayTimeout: 5000,
  };

  interface BannerData {
    banner: string;
    title: string;
    id: number;
}

export default function Slider() {

  const [banners, setData] = useState<BannerData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = sessionStorage.getItem('sliderList');
        if (data) {
          let sliderData = JSON.parse(data);
          setData(sliderData);
        }else{
            const res = await getData('sliders');        
            setData(res.records);
            sessionStorage.setItem("sliderList", JSON.stringify(res.records));
        }
      } catch (err) {
        console.error(err);
      }
    } 
      fetchData();
  }, []); 
  return (
    <>
    {banners.length > 0 && 
      <div className="hero-section">
        <div className="hero-banner">
          <OwlCarousel {...options}>
            {banners.map(data => (
              <>
                {(data.id > 0) &&
                <div className="item" key={data.id}>
                  <div className="overlay-box"></div>
                    <img src={data.banner} alt={data.title} title={data.title}/>
                </div>
              }
              </>
            ))}
          </OwlCarousel>
        </div>
        <HomeSearch/>
      </div>
      }
    </>
  );
}