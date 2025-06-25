'use client';
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import { log } from 'console';
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
              const res = await getData('premium-facilities');
              setData(res.records);
            } catch (err) {
              console.error(err);
            }
          }
      
          fetchData();
        }, []); 
  return (
    <>
      {facilities.length > 0 &&
      <div className="relax_with_facilities py-50 wow fadeInUp">
        <div className="container">
          <div className="section-title text-center wow fadeInUp">
            <h2 className="mb-1 mb-md-2 mb-lg-2">Relax With Premium Facilities</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="facilities-content wow fadeInUp d-none d-lg-block">
            <div className="row">
            {facilities.map((data, index) => (
              <div className="col-lg-4 col-md-6 mb-4 wow fadeInUp">
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

          <div className="facilites-slider-mob owl-carousel d-block d-lg-none">
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
          </div>
        </div>
      </div>
  }
  </>
  );
}