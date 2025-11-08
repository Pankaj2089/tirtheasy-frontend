'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import { Skeleton, Modal, Row, Col  } from 'antd';

type hotelDataProps = {
  hotelId:any;
  hotelFacilities:any;
  hotelFacilitiesList:any;
  isMobile:any
};

interface HotelFacilityData {
  title: string;
  icon: string;
}

export default function HotelFacilities({ hotelId, hotelFacilities, hotelFacilitiesList, isMobile }: hotelDataProps) {

    const [records, setData] = useState<HotelFacilityData[]>([]);
    const [showLoader, setShowLoader] = useState(false);  
    const [viewMoreFacilities, setViewMoreFacilities] = useState(false);

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
      <h5 className="pb-2 d-flex justify-content-between align-items-center">
            <span>Facilities</span>
            { records.length > 5 &&
                <a className="read-more cursor-pointer" onClick={() => setViewMoreFacilities(true)} style={{fontWeight:"400"}}>See all</a>
            }
        </h5>
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
            {records.length > 0 && records.slice(0,isMobile ? 6 : 5).map((record:any, index:number) => (
                <li>
                    <span className="high-icon">
                        <img src={record.icon}/>
                    </span>
                    <span className="highlit-item-name">{record.title}</span>
                </li>
            ))}
        </ul>
        <Modal
            open={viewMoreFacilities}
            footer={null}
            centered
            onCancel={() => setViewMoreFacilities(false)}
            width={600}
            title="Room Facilities"
            >
            <Row gutter={[32, 32]} justify="start" align="middle" className='mt-4'>
              {records.length > 0 && records.map((record:any, index:number) => (
                <>
                  <Col xs={12} xl={6} className="text-center">
                   <img src={record.icon} width={32} style={{margin: '0px auto'}} />
                   <span className="highlit-item-name">{record.title}</span>
                  </Col>
                  </>
              ))}
            </Row>
            </Modal>
    </div>
    }
    </>
  );
}