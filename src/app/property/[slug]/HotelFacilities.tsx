'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import { Skeleton } from 'antd';

type hotelDataProps = {
  hotelId:any;
  hotelFacilities:any;
  hotelFacilitiesList:any
};

interface HotelFacilityData {
  title: string;
  icon: string;
}

export default function HotelFacilities({ hotelId, hotelFacilities, hotelFacilitiesList }: hotelDataProps) {

    const [records, setData] = useState<HotelFacilityData[]>([]);
    const [showLoader, setShowLoader] = useState(false);  

    useEffect(() => {
        setShowLoader(true);
        async function fetchData() {
            try {
                let postRec: { hotel_facilities:any } = { hotel_facilities: hotelFacilities}; 
                const res = await postData('get-hotel-facilities', postRec); 
                setShowLoader(false);       
                setData(res.records);
                hotelFacilitiesList(res.records);
            } catch (err) {
                setShowLoader(false);
            }
        }
        fetchData();
    }, [hotelId]); 

  return (
    <>
    {(records.length > 0 || showLoader) && 
     <div className="highlight-items">
        <ul>
            {showLoader &&
            <>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'50px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'50px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'50px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'50px'}}  />
              </li>
            </>                    
            }
            {records.length > 0 && records.slice(0,5).map((record:any, index:number) => (
                <li>
                    <span className="high-icon">
                        <img src={record.icon}/>
                    </span>
                    <span className="highlit-item-name">{record.title}</span>
                </li>
            ))}
        </ul>
    </div>
    }
    </>
  );
}