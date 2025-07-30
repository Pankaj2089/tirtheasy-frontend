'use client'
import { useEffect, useState, useRef } from 'react';
import { postData } from '../../utils/api';
import { Skeleton } from 'antd';
import { log } from 'node:console';
type hotelDataProps = {
  hotelState:any;
  handleChange:any;
};

interface ListData {
  title: string;
}

export default function HotelCircuit({ hotelState, handleChange }: hotelDataProps) {

    const [records, setData] = useState<ListData[]>([]);
      const [showLoader, setShowLoader] = useState(false);     

          useEffect(() => {
            setShowLoader(true);
            async function fetchData() {
              try {
                  let postRec: { state: string } = { state: hotelState}; 
                  const res = await postData('get-state-cities', postRec);       
                  setShowLoader(false); 
                  setData(res.records);
              } catch (err) {
                console.error(err);
              }
            }
            setTimeout(() => {
              fetchData();
            }, 600);
    
          }, [hotelState]); 

  return (
    <>
    <ul className='circuit-list-section'>
       {showLoader &&
            <>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'380px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'380px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'380px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'380px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'380px'}}  />
              </li>
              <li>
              <Skeleton.Input active={true} style={{height:'20px', width:'380px'}}  />
              </li>
            </>                    
            }
            {records.length > 0 && records.map((record, index) => ( 
              <li><a className='cursor-pointer' onClick={() => {handleChange('keywords', record.title)}}><img src="/img/flag.svg" className="me-1"/> Accommodation in {record.title} </a></li>
        
            ))}
    </ul>
    </>

  );
}