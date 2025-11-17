'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SafeOwlCarousel from '../../components/SafeOwlCarousel';
import Link from 'next/link';
type hotelDataProps = {
  hotelId:any;
  hotelCity:any;
};

interface HotelData {
  title: string;
  image: string;
  state: string;
  id: string;
  slug: string;
}
 const options = {
    loop: false,
    margin: 20,
    autoplay: false,
    nav: true,
    items:4,
    dots: false,
    infinite:false,
    slideTransition: 'linear',
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

export default function RecommendedHotels({ hotelId, hotelCity }: hotelDataProps) {

   const [hotels, setData] = useState<HotelData[]>([]);
   const [type, setPropertyType] = useState<String | null>('dharmshala');
    
        useEffect(() => {
        async function fetchData() {
            try {
                window.scroll(0,0);
                let postRec: { hotel_id: number, hotel_city: string, type:any } = { hotel_id: hotelId, hotel_city: hotelCity, type : localStorage.getItem('property_type')}; 
                const res = await postData('recommended-hotels', postRec);        
                setData(res.records);
                
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();

        setPropertyType(localStorage.getItem('property_type'));
    }, [hotelId]); 

  return (
    <>
    {hotels.length > 0 && 
     <div className="popular-destination py-50 wow fadeInUp">
        <div className="container">
            <div className="section-title wow fadeInUp">
                <h4 className="mb-2">Recommended Hotels</h4>
            </div>

            <div className="top-hotels-sldier">
              <SafeOwlCarousel {...options}>
              {hotels.map((data, index) => (
                <div className="item" key={index}>
                  <div className="hotal-detail-box">
                      <Link href={"/property/" + data.slug} className="hotel-thumbnail">
                          <img src={data.image} alt={data.title} title={data.title} />
                      </Link>
                      <div className="hotel-description">
                        <h4><Link href={"/property/" + data.slug}>{data.title}</Link></h4>
                        { type === 'hotel' && 
                          <p className="fs-14">{data.state}</p>
                        }
                      </div>
                  </div>
                </div>
                )
              )}
            </SafeOwlCarousel>
            </div>
        </div>
    </div>
    }
    </>

  );
}