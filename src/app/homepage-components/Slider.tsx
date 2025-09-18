'use client'
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import { log } from 'console';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HomeSearch from './HomeSearch';
import dynamic from 'next/dynamic';

//import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../page.module.css' 
//import { Skeleton } from 'antd';

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
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    async function fetchData() {
      
      try {
        const data = sessionStorage.getItem('sliderList');
        if (data) {
          let sliderData = JSON.parse(data);
          setShowLoader(false);
          setData(sliderData);
        }else{
            const res = await getData('sliders');        
            setData(res.records);
            sessionStorage.setItem("sliderList", JSON.stringify(res.records));
            setShowLoader(false);
        }
      } catch (err) {
        console.error(err);
      }
    } 
      setTimeout(() => {
        fetchData();
      }, 200);
  }, [banners.length == 0]); 
  
  return (
    <>
      <div className="hero-section">
        <div className="hero-banner">
            {/* <>
              {showLoader &&
                <div className="item">
                    <div className="overlay-box"></div>
                      <Skeleton.Image active={true} style={{height:'558px', width:'1920px'}}  />
                  </div>
              }
            </> */}

            <OwlCarousel {...options}>
              {banners.length > 0 &&  banners.map(data => (
                <>
                  {(data.id > 0) &&
                  <div className="item" key={data.id}>
                    {/* <div className="overlay-box"></div> */}
                      <img src={data.banner} alt={data.title} title={data.title}/>
                  </div>
                }
                </>
              ))}
          </OwlCarousel>
        </div>
        <HomeSearch/>
      </div>
       {/* <DotLottieReact
            src="https://lottie.host/0073ec4e-2e80-453c-a1d6-9b57c4a210bb/H1416U8Fso.lottie"
            loop
            autoplay
            style={{height:'100px'}}
          /> */}
    </>
  );
}