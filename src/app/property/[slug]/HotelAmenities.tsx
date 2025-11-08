'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import { Skeleton, Modal, Row, Col } from "antd";

type hotelDataProps = {
  hotelId:any;
  hotelAmenities:any;
  isMobile:any;
};

interface HotelFacilityData {
  title: string;
  icon: string;
}

export default function HotelAmenities({ hotelId, hotelAmenities, isMobile }: hotelDataProps) {

    const [records, setData] = useState<HotelFacilityData[]>([]);
    const [showLoader, setShowLoader] = useState(false);  
    const [viewMoreAmenities, setViewMoreAmenities] = useState(false);

    useEffect(() => {
        setShowLoader(true);
        async function fetchData() {
            try {
                let postRec: { hotel_amenities:any } = { hotel_amenities: hotelAmenities}; 
                const res = await postData('get-hotel-amenities', postRec); 
                setShowLoader(false);       
                setData(res.records);
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
            <span>Amenities</span>
            { records.length > 5 &&
                <a className="read-more cursor-pointer" onClick={() => setViewMoreAmenities(true)} style={{fontWeight:"400"}} >See all</a>
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
                        <img src={record.icon} width={32}/>
                    </span>
                    <span className="highlit-item-name">{record.title}</span>
                </li>
            ))}
        </ul>
        <Modal
            open={viewMoreAmenities}
            footer={null}
            centered
            onCancel={() => setViewMoreAmenities(false)}
            width={600}
            title="Room Amenities"
            >
            <Row gutter={[32, 32]} justify="start" align="middle" className='mt-4'>
              {records.length > 0 && records.map((record:any, index:number) => (
                <>
                  <Col xs={12} xl={8} className="text-center">
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