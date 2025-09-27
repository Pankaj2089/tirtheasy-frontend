'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import { Skeleton } from 'antd';
type hotelDataProps = {
  hotelId:any;
};

interface ListData {
  answer: string;
  question: string;
}

export default function HotelFaqs({ hotelId }: hotelDataProps) {

    const [records, setData] = useState<ListData[]>([]);

          useEffect(() => {
            async function fetchData() {
              try {
                  let postRec: { hotel_id: number } = { hotel_id: hotelId}; 
                  const res = await postData('get-hotel-faqs', postRec);       
                  setData(res.records);
              } catch (err) {
                console.error(err);
              }
            }
            setTimeout(() => {
              fetchData();
            }, 500);

          }, [hotelId]); 

  return (
    <>
    {records.length > 0 && 
     <div className="faq-section wow fadeInUp">
        <h4 className="mb-4">Frequently Asked Questions</h4>
        <div className="faq-section-accordion">
            <div className="accordion" id="accordionExample">
                {records.map((record, index) => ( 
                <div className="accordion-item">
                    <h6 className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne">
                        {record.question}
                    </h6>
                    <div id={"collapse"+index} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {record.answer}
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    }
    </>

  );
}