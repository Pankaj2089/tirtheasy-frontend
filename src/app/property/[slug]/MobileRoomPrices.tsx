'use client'
import {  useState } from 'react';

import BookingConfirmationPopup from './BookingConfirmationPopup';
import {Button} from "antd";

type hotelDataProps = {
  record:any;
  hotelFacilities:any;
};

export default function MobileRoomPrices({ record, hotelFacilities }: hotelDataProps) {

    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [selectedRoom, setSelectRoom] = useState(0);

    const toggleShow = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 4 : record.room_prices.length);
    };
    
    const bookNowConfirmation =(priceID:any ) => {
        setSelectRoom(priceID);
    }
      
  return (
    <>
     { record.room_prices  &&  record.room_prices.length > 0 && record.room_prices.slice(0,visibleCount).map((recPrice:any, index:any) => (


    <div className="border-top mt-3 mb-3">
            <div className="room-facility">
            <div className="row">
                <div className="col-7">
                    <ul className="bed-pref-list pt-2">
                        { recPrice.amenities && recPrice.amenities.slice(0,3).map((amenity:any) => (
                            <li><img src="/img/tick_icon.svg" className="me-2"/> {amenity}</li>
                        ))}
                        { recPrice.amenities && recPrice.amenities.length && recPrice.amenities.length > 3 && 
                            <li><a className='cursor-pointer' data-bs-toggle="modal" data-bs-target={`#viewmoreamenities${recPrice.id}`}  >See All</a></li>
                        }
                    </ul>
                    
                </div>
                <div className="col-5 justify-content-end">
                        <div className="price-box-section py-2">
                         {(parseFloat(record.price) > parseFloat(recPrice.price)) && <del><span className="rs">Rs.</span> {record.price}</del>}
                        <div className="room-price red-text"><span className="rs">Rs.</span> {recPrice.price}</div>
                        <em>Per night before taxes and fees</em>
                    </div>
                </div>
            </div>

                <div className="adult-rooms">
                    { record.bedPreference == 'double' ?
                            <>
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> {record.no_of_guest_in_double_room} Adult, {record.no_of_child_in_double_room} Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> {record.no_of_double_rooms} Room</div>
                            </>
                        :
                            <>
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> {record.no_of_guest_in_room} Adult, {record.no_of_child_in_room} Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> {record.no_of_single_rooms} Room</div>
                            </>
                    }
                
            </div>
            </div>                   
            <div className="row">                            
                <div className="col-12">
                    <div className="no-risk-section">
                        <div className="no-risk-content">
                            <div className="d-flex flex-column w-50">
                                <h3 className="fw-medium mt-0">No Risk!</h3>
                                <p>No cancellation fee</p>
                                <p className="limited-offer red-text mt-0 mb-0">Limited availability</p>
                            </div>
                            { recPrice.room_available ? 
                                <a className="btn btn-primary w-100 cursor-pointer" data-bs-target={"#bookingConfirmPopup"+recPrice.id} data-bs-toggle="modal" onClick={() => bookNowConfirmation(recPrice.id)} >Book Now</a>

                            :
                                <Button disabled={true} className="btn btn-primary w-100 cursor-pointer" >Already Booked</Button>

                            }
                        </div>
                    </div>
                </div> 
                <BookingConfirmationPopup selectedRoom={recPrice.id} record={record} key={recPrice.id} />       
            </div> 
            <div className="modal fade view-all-amenities z-index-big" id={`viewmoreamenities${recPrice.id}`} aria-hidden="true" aria-labelledby="viewmoreresultLabel" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {recPrice.amenities && recPrice.amenities.length > 0 &&
                        <>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">{record.title}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h6 className='mt-2'>Amenities</h6>
                                <ul className='bed-pref-list p-3 mt-0'>
                                { recPrice.amenities.map((amenityList:any) => (
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> {amenityList}</li>
                                ))}
                                </ul> 
                                { hotelFacilities.length > 0 && 
                                    <>
                                        <h6 className='mt-4'>Facilities</h6>
                                        <ul className='bed-pref-list p-3 mt-0'>
                                            { hotelFacilities.map((facility:any) => (
                                                <li><img src={facility.icon} className="me-2" width={24}/> {facility.title}</li>
                                            ))}
                                        </ul> 
                                    </>
                                }
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>              
        </div>
        ))}
        
        { record.room_prices  &&   record.room_prices.length > 4 &&
            <div className="load-more-btn d-flex align-items-center justify-content-center" onClick={toggleShow}>
                <a className="btn btn-outline-primary cursor-pointer">{showAll ? 'View Less' : 'Load More'}</a>
            </div>
        }
    </>
  );
}