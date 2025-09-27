'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';

type hotelDataProps = {
  hotelId:any;
};

interface HotelLankmarkData {
  title: string;
  icon: string;
  category_id: string;
  description: string;
}

export default function HotelLandmark({ hotelId }: hotelDataProps) {

    const [records, setData] = useState<HotelLankmarkData[]>([]);
    const [LandmarksList, setLandmarksList] = useState([]);  
    const [LandmarkHeading, setLandmarksHeading] = useState(1);  

    useEffect(() => {
        async function fetchData() {
            try {
                let postRec: { hotel_id:any } = { hotel_id: hotelId}; 
                const res = await postData('get-hotel-landmarks', postRec);      
                setData(res.records);
            } catch (err) {
            }
        }
        fetchData();
    }, [hotelId]); 


    const updateLandmarksList = (landmarkRecords:any, categoryID:any) => {        
        setLandmarksList(landmarkRecords);
        setLandmarksHeading(categoryID);
    }
    
 
  return (
    <>
     {(Object.keys(records).length > 0 ) && 
        <div className="filter-sidebar hotel-detail-filter">
            <div className="accordion" id="accordionExample">
                {Object.values(records).map((record:any, index:number) => (
                    <div className="accordion-item">
                        <div className="accordion-header collapsed cursor-pointer" data-bs-target="#landmarkPopup" data-bs-toggle="modal" onClick={() => {updateLandmarksList(record, index)}} >{index == 1 ? 'Walkable Places' : (index == 2 ? 'Popular Landmarks' : 'Closest Landmarks')}</div>
                        
                    </div>
                ))}

            </div>

            <div className="modal fade view-all-phots-popup z-index-big" id="landmarkPopup" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
                    <div className="modal-dialog modal-xs">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">{LandmarkHeading == 1 ? 'Walkable Places' : (LandmarkHeading == 2 ? 'Popular Landmarks' : 'Closest Landmarks')}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                
                            <div className='landmarks-list' >
                                <div className="pt-0">
                                    <ul className="mt-0">
                                        {LandmarksList.map((record:any, index:number) => (
                                        <li className="py-0">
                                            <span className="location-highlight-left">
                                                <span className="lh-icon">
                                                    <img src={record.icon}/>
                                                </span>
                                                <span className="overview-pra text-dark">{record.title} - {record.description}</span>
                                            </span>
                                        </li>
                                        ))}
                                        
                                    </ul>
                                </div>
                            </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

        </div>

        
     }
    </>
  );
}