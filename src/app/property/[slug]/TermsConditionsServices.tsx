'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
type hotelDataProps = {
  hotelId:any;
};

interface ListData {
  title: string;
  description: string;
}

export default function TermsConditionsServices({ hotelId }: hotelDataProps) {

    const [records, setData] = useState<ListData[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [showAll, setShowAll] = useState<boolean>(false);

    useEffect(() => {
    async function fetchData() {
        try {
            let postRec: { hotel_id: number } = { hotel_id: hotelId}; 
            const res = await postData('get-hotel-rules', postRec);       
            setData(res.records);
        } catch (err) {
        console.error(err);
        }
    }
    setTimeout(() => {
        fetchData();
    }, 500);

    }, [hotelId]); 

    const toggleShow = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 4 : records.length);
    };

  return (
    <>
    {records.length > 0 && 
     <div className="terms_conditions py-50 wow fadeInUp">
        <div className="container">
            <div className="section-title wow fadeInUp">
                <h4 className="mb-2">Terms & Conditions Services</h4>
            </div>

            <div className="terms_condition_section">
                {records.slice(0, visibleCount).map((record, index) => (
                    <div className="terms mb-4">
                        <h6 className="mb-2">{index+1}. {record.title}</h6>
                        <p>{record.description}</p>
                    </div>
                ))}

                {records.length > 4 && (
                    <div className="d-flex align-items-center justify-content-center" onClick={toggleShow}>
                        <div className="read-more" id="show-more"><a href="javascript:void(0)">{showAll ? 'View Less...' : 'Load More...'}</a></div>
                    </div>
                )}
            </div>
        </div>
    </div>
    }
    </>
  );
}