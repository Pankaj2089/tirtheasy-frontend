'use client'
import { log } from 'console';
import { useEffect, useState, useRef } from 'react';

type hotelDataProps = {
  record:any;
  hotelFacilities:any;
};

export default function RoomPrices({ record, hotelFacilities }: hotelDataProps) {

    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [showAll, setShowAll] = useState<boolean>(false);

    const toggleShow = () => {
        setShowAll(!showAll);
        setVisibleCount(showAll ? 4 : record.room_prices.length);
    };
      
  return (
    <>
     { record.room_prices.length > 0 && record.room_prices.slice(0,visibleCount).map((recPrice:any, index:any) => (
            <div className="border rounded mb-3 mob-padLR">
                <div className="row">
                    <div className="col-md-4 border-end mob-padLR">
                        <ul className="bed-pref-list p-3 mt-0">
                            { recPrice.amenities && recPrice.amenities.slice(0,3).map((amenity:any) => (
                                <li><img src="/img/tick_icon.svg" className="me-2"/> {amenity}</li>
                            ))}
                            { recPrice.amenities.length > 3 && 
                                <li><a className='cursor-pointer' data-bs-toggle="modal" data-bs-target={`#viewmoreamenities${recPrice.id}`}  >See All</a></li>
                            }
                        </ul>
                    </div>
                    <div className="col-md-2 border-end align-items-center justify-content-center">
                        { record.bedPreference == 'double' ?

                            <ul className="adult-room-child-list py-3">
                                <li>
                                    <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> {record.no_of_guest_in_double_room} Adults
                                </li>
                                { record.no_of_child_in_room > 0 &&
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> {record.no_of_child_in_double_room} Child
                                    </li>
                                }
                                <li>
                                    <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> {record.no_of_double_rooms} Room
                                </li>
                            </ul>
                            :
                            <ul className="adult-room-child-list py-3">
                                <li>
                                    <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> {record.no_of_guest_in_room} Adults
                                </li>
                                { record.no_of_child_in_room > 0 &&
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> {record.no_of_child_in_room} Child
                                    </li>
                                }
                                <li>
                                    <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> {record.no_of_single_rooms} Room
                                </li>
                            </ul>

                        }
                        
                    </div>
                    <div className="col-md-3 border-end mob-padLR">
                        <div className="py-3">
                            <div className="price-box-section">
                                {(parseFloat(record.price) > parseFloat(recPrice.price)) && <del><span className="rs">Rs.</span> {record.price}</del>}
                                <div className="room-price red-text mt-1"><span className="rs">Rs.</span> {recPrice.price}</div>
                                <em>Per night before taxes and fees</em>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3">
                        <div className="py-3">
                            <div className="no-risk-section">
                                <div className="no-risk-content">
                                    <h3 className="fw-medium mt-0">No Risk!</h3>
                                    <p>No cancellation fee</p>
                                    <p className="limited-offer red-text mt-1 mb-2">Limited availability</p>
                                    <a href="#" className="btn btn-primary w-100">Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div> 
                <div className="modal fade view-all-amenities z-index-big" id={`viewmoreamenities${recPrice.id}`} aria-hidden="true" aria-labelledby="viewmoreresultLabel" tabIndex={-1}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {recPrice.amenities.length > 0 &&
                            <>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{record.title}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
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
        
        { record.room_prices.length > 4 &&
            <div className="load-more-btn d-flex align-items-center justify-content-center" onClick={toggleShow}>
                <a className="btn btn-outline-primary cursor-pointer">{showAll ? 'View Less' : 'Load More'}</a>
            </div>
        }
    </>
  );
}