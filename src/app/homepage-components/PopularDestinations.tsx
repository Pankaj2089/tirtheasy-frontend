'use client'
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import { Skeleton } from 'antd';

interface BannerData {
  heading: string;
  image: string;
  id: string;
}

type DestinationsProps = {
  title: string,
  type:number
};

export default function PopularDestinations({ title, type }: DestinationsProps) {
    const [promotions, setData] = useState<BannerData[]>([]);
    const [showLoader, setShowLoader] = useState(false);
      useEffect(() => {
        setShowLoader(true);
        async function fetchData() {
          try {
            const data = sessionStorage.getItem('popularDestinations'+type);
            if (data) {
              let sliderData = JSON.parse(data);
              setShowLoader(false);
              setData(sliderData);
            }else{
                let postRec: { type: number; property_type: string | null } = { type: type,property_type: localStorage.getItem('property_type')}; 
                const res = await postData('popular-destinations', postRec);       
                setShowLoader(false); 
                setData(res.records);
                sessionStorage.setItem("popularDestinations"+type, JSON.stringify(res.records));
            }
          } catch (err) {
            console.error(err);
          }
        }
        setTimeout(() => {
          fetchData();
        }, 300);

      }, [promotions.length == 0]); 

       const [isMobile, setpopperPlacement] = useState(false);
      
        useEffect(() => {
           const updateScreen = () => {
             if (window.innerWidth < 768) {
               setpopperPlacement(true);
             } else {
               setpopperPlacement(false);
             }
           };
           updateScreen(); // run on mount
           window.addEventListener("resize", updateScreen);
           return () => window.removeEventListener("resize", updateScreen);
         }, []);
  return (
    <>
    {(promotions.length > 0 || showLoader)  && 
      <div className="popular-destination py-50 ">
        <div className="container">
          <div className="section-title text-center ">
            <h2 className="mb-1 mb-md-2 mb-lg-2">{title}</h2>
            <p>Most popular choices for travellers from India</p>
          </div>

          <div className="top-destination ">
            <div className="row">
               {showLoader &&
                  <>
                    <div className= {`mb-4 col-6`} >
                     <Skeleton.Input active block style={{ height: isMobile ? "140px" : "250px" }} />
                  </div>
                  <div className= {` mb-4 col-6`} >
                     <Skeleton.Input active block style={{ height: isMobile ? "140px" : "250px" }} />
                  </div>
                  <div className= {!isMobile ? `mb-4 col-4` : 'mb-4 col-6'} >
                     <Skeleton.Input active block style={{ height: isMobile ? "140px" : "200px" }} />
                  </div>
                  <div className= {!isMobile ? `mb-4 col-4` : 'mb-4 col-6'} >
                     <Skeleton.Input active block style={{ height: isMobile ? "140px" : "200px" }} />
                  </div>
                  {!isMobile &&
                  <div className= {!isMobile ? `mb-4 col-4` : 'mb-4 col-6'} >
                     <Skeleton.Input active block style={{ height: isMobile ? "140px" : "200px" }} />
                  </div>
                  }
                </>                    
            }
            {promotions.map((data, index) => (
              <>
              { (index <= 4) &&
                  <div className={` mb-4 ${index > 1 ? 'col-lg-4 col-6' : 'col-6'} ${index === 4 ? 'd-none d-lg-block' : ''}`} >
                    <a href="#" className="destination-box rounded-4" title={data.heading}>
                      <img src={data.image} alt={data.heading} title={data.heading} />
                      {/* <span className="overlay-box"></span> */}
                      <span className="address-box text-white">
                        <img src="img/location.svg" className="me-2"/> {data.heading} 
                      </span>
                    </a>
                  </div>
              }
              </>
              )
            )}
            </div>
          </div>
            {promotions.length > 5 && 
              <div className="d-flex text-center align-items-center justify-content-center  pt-3 pt-lg-4">
                <a href="#" className="btn btn-primary">View More</a>
            </div>
            }
        </div>
      </div>
}
</>
  );
}