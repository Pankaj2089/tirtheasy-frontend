'use client'
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HomeSearch from './HomeSearch';
import dynamic from 'next/dynamic';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../page.module.css' 
import { Skeleton, Modal, Spin } from "antd";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    async function fetchData() {
      
      try {
        const data = sessionStorage.getItem('sliderList');
       setTimeout(() => { setIsModalOpen(true);}, 100);
        if (data) {
          let sliderData = JSON.parse(data);
          setShowLoader(false);
          setData(sliderData);
          setTimeout(() => {
              setIsModalOpen(false);
            }, 2000);
        }else{
            
            const res = await getData('sliders');        
            setData(res.records);
            sessionStorage.setItem("sliderList", JSON.stringify(res.records));
            setShowLoader(false);
            setTimeout(() => {
              setIsModalOpen(false);
            }, 2000);
            
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
            {showLoader ?
              <div className="item">
                    <Skeleton.Image active={true} style={{height:'558px', width:'1920px'}}  />
                </div>
                :
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
            }

            
        </div>
        <HomeSearch/>
      </div>
      {isModalOpen ? 
       <Modal
          open={isModalOpen}
          footer={null}
          closable={false}
          centered
          maskClosable={false}
          width={300}
          transitionName=""
          bodyStyle={{ textAlign: "center", padding: "20px 0"}}
        >
          <p>
            <DotLottieReact
            src="https://lottie.host/70e7865e-43b7-49ba-9616-19b69f5731d4/XTnkhFxdp0.lottie"
            loop
            autoplay
            style={{ width: "250px" }}
            className='text-center'
            />
          </p>
        </Modal>
      // <div className='loading-image'>
      //   <div className='image-section'>
      //     
      //     </div>
      //  </div>
       :null}
    </>
  );
}