'use client'
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import { log } from 'console';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface BannerData {
  heading: string;
  image: string;
  id: string;
}

type DestinationsProps = {
  title: string,
  type:number
};
const options = {
  loop:true,
  margin:20,
  autoplay:true,
  nav:false,
  items:5,
  dots:false,
  slideTransition: 'linear',
  autoplaySpeed: 10000,
  smartSpeed: 10000,
  responsive : {
    0 : {
        items:1.2,
    },
    
    480 : {
      items:1.5,
    },
    
    768 : {
      items:3,
    },
    992:{
      items:4,
    },
    1000:{
      items:5,
    },
  },
};
export default function ({ title, type }: DestinationsProps) {
    const [promotions, setData] = useState<BannerData[]>([]);
    const router = useRouter();
    const [searchData, setSearchState] = useState({
        keywords: '',
        start_date: '',
        end_date: '',
        persons: 0,
        sortby:'',
        priceRange:[0,1000]
      });
    
        useEffect(() => {
          if(searchData.keywords !== '' || searchData.start_date !== '' || searchData.end_date !== ''){
            localStorage.setItem("searchData", JSON.stringify(searchData));      
          }   
      }, [searchData]);
    
      const handleChange = (name:any,value:any) => {    
        const updatedData = { ...searchData, [name]: value };
        setSearchState(updatedData);
    
        if (updatedData.keywords !== '' || updatedData.start_date !== '' || updatedData.end_date !== '') {
          localStorage.setItem("searchData", JSON.stringify(updatedData));
        }
    
        searchProperties();
      };
    
       // Get array from localStorage
      const loadFromLocalStorage = () => {
        const data = localStorage.getItem('searchData');
        if (data) {
          let serData = JSON.parse(data);
          setSearchState(serData); 
        }
      };
    
    
      useEffect(() => {
        loadFromLocalStorage();
      }, [])

      const searchProperties =() => {      
        router.push('/porperty-list', { scroll: false });
      } 
    
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

      </div>
      <div className="container-fluid">
        <div className="outside-india-sldier ">
          <OwlCarousel {...options}>
            {promotions.map((data, index) => (
                <div className="item">
                  <a className="destination-box rounded-4 cursor-pointer" title={data.heading} onClick={() => {handleChange('keywords', data.heading)}}>
                      <img src={data.image} alt={data.heading} title={data.heading} />
                      <span className="overlay-box"></span>
                      <span className="address-box text-white">
                        <img src="img/location.svg" className="me-2"/> {data.heading} 
                      </span>
                    </a>
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