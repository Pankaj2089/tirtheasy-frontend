'use client';
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import { log } from 'console';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});


const options = {
  loop:true,
  margin:10,
  autoplay:true,
  nav:false,
  items:1.5,
  dots:false,
  slideTransition: 'linear',
  autoplaySpeed: 15000,
  smartSpeed: 15000,
};

interface FacilitiesData {
  title: string;
  description: string;
  icon: string;
  id: string;
}

export default function Facilities() {
  const [facilities, setData] = useState<FacilitiesData[]>([]);
      
        useEffect(() => {
          async function fetchData() {
            try {
              const data = sessionStorage.getItem('premiumFacilities');
              if (data) {
                let sliderData = JSON.parse(data);
                setData(sliderData);
              }else{
                  let postRec: { facility_type: string | null } = { facility_type: localStorage.getItem('property_type')}; 
                  const res = await postData('premium-facilities', postRec);        
                  setData(res.records);
                  sessionStorage.setItem("premiumFacilities", JSON.stringify(res.records));
              }
            } catch (err) {
              console.error(err);
            }
          }
          fetchData();
        }, [facilities.length == 0]); 
  return (
    <>
      {facilities.length > 0 &&
      <div className="relax_with_facilities py-50 wow fadeInUp" >
        <div className="container">
          <div className="section-title text-center wow fadeInUp">
            <h2 className="mb-1 mb-md-2 mb-lg-2">Relax With Premium Facilities</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="facilities-content wow fadeInUp d-none d-lg-block">
            <div className="row">
            {facilities.map((data, index) => (
              <div className="col-lg-4 col-md-6 mb-4 wow fadeInUp" key={'facilities' +index }>
                <div className="facilites-box">
                  <div className={`fac-img ${data.icon !='' ? data.icon : ''}`}></div>
                  <h5>{data.title}</h5>
                  <p>{data.description}</p>
                </div>
              </div>
              )
            )}
            </div>

          </div>

          <div className="facilites-slider-mob  d-block d-lg-none">
            <OwlCarousel {...options}>
              {facilities.map((data, index) => (
                <div className="item">
                    <div className="facilites-box">
                      <div className={`fac-img ${data.icon !='' ? data.icon : ''}`}></div>
                      <h5>{data.title}</h5>
                      <p>{data.description}</p>
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