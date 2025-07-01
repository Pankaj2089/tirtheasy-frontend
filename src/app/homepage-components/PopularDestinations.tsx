'use client'
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import { log } from 'console';

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
    
      useEffect(() => {
        async function fetchData() {
          try {
            const data = sessionStorage.getItem('popularDestinations'+type);
            if (data) {
              let sliderData = JSON.parse(data);
              setData(sliderData);
            }else{
                let postRec: { type: number; property_type: string | null } = { type: type,property_type: localStorage.getItem('property_type')}; 
                const res = await postData('popular-destinations', postRec);        
                setData(res.records);
                sessionStorage.setItem("popularDestinations"+type, JSON.stringify(res.records));
            }
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
            <p>Most popular choices for travellers from India</p>
          </div>

          <div className="top-destination wow fadeInUp">
            <div className="row">
            {promotions.map((data, index) => (
              <>
              { index <= 4 &&
                  <div className= {`wow fadeInUp mb-4 ${index > 1 ? 'col-4' : 'col-6'}`} >
                    <a href="#" className="destination-box rounded-4" title={data.heading}>
                      <img src={data.image} alt={data.heading} title={data.heading} />
                      <span className="overlay-box"></span>
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
              <div className="d-flex text-center align-items-center justify-content-center wow fadeInUp pt-3 pt-lg-4">
                <a href="#" className="btn btn-primary">View More</a>
            </div>
            }
        </div>
      </div>
    }
</>
  );
}