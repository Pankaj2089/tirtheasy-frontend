'use client'
import React, { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import { Modal, Tabs  } from 'antd';

type hotelDataProps = {
  hotelId:any;
  opneDetailsModal:any,
  handleOpneDetailsModalCancel:any,
  detailsContantsList:any,
  activeDetailTab:any,
  hotelName:any,
};

interface HotelFacilityData {
}
const { TabPane } = Tabs;

export default function HotelOtherDetails({ hotelId, opneDetailsModal, handleOpneDetailsModalCancel, detailsContantsList, activeDetailTab, hotelName }: hotelDataProps) {



    const [records, setData] = useState<HotelFacilityData[]>([]);
    const [activeKey, setActiveKey] = React.useState('tab-0');
    const tabsRef = React.createRef<HTMLDivElement>();
        
      const handleTabChange = (key: string) => {
        setActiveKey(key);
    
        // Auto-scroll to the active tab
        setTimeout(() => {
          const tabNode = document.querySelector(
            `.ant-tabs-tab-active`
          ) as HTMLElement;
          tabNode?.scrollIntoView({ behavior: "smooth", inline: "center" });
        }, 100); // Slight delay to allow render
      };
    
      useEffect(() => {
        setActiveKey(activeDetailTab);
      },[activeDetailTab]);

    useEffect(() => {
        async function fetchData() {
            try {
                let postRec: { hotel_id:number } = { hotel_id:hotelId}; 
                const res = await postData('get-hotel-details', postRec);      
                setData(res.records);  
                detailsContantsList(res.records);                             
            } catch (err) {
            }
        }
        setTimeout(() => {
          fetchData();
        }, 500);
    }, [hotelId]); 

  return (
    <>
    <Modal
        title={hotelName}
        open={opneDetailsModal}
        onCancel={handleOpneDetailsModalCancel}
        width={700}
        footer={false}
      >
        <div style={{ overflowX: 'auto' }} ref={tabsRef} className="tab-scroll-container">
        <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        tabPosition="top"
        type="line"
        className="custom-scroll-tabs"
      >
        {records.map((record:any, index) => (
          <TabPane tab={record.heading} key={"tab-" + index} >
           <div style={{ maxHeight: '60dvh', overflowY: 'auto' }}
              dangerouslySetInnerHTML={{ __html: record.details }}>
          </div>
          </TabPane>
        ))}
      </Tabs>

      <style jsx>{`
        .custom-scroll-tabs .ant-tabs-nav-wrap {
          overflow-x: auto !important;
        }
        .custom-scroll-tabs .ant-tabs-nav-list {
          display: flex;
          flex-wrap: nowrap;
        }
        .custom-scroll-tabs .ant-tabs-tab {
          white-space: nowrap;
          flex-shrink: 0;
        }
      `}</style>
        </div>
      </Modal>
    </>
  );
}