'use client'
import { useEffect, useState, useRef } from 'react';
import { postData, } from '../../utils/api';
import { Skeleton } from 'antd';
import HotelImages from './HotelImages';
import RoomPrices from './RoomPrices';
import MobileRoomPrices from './MobileRoomPrices';

type hotelDataProps = {
  hotelId:any;
  hotelFacilities:any;
};
type BedPreference = 'single' | 'double' | null;
interface ListData {
    id:any,
    title:any,
    image:any,
    additional_images:[]
    room_size:any,
    room_prices:[{price:any}],
    price:any,
    no_of_single_rooms:any,
    no_of_double_rooms:any,
    no_of_guest_in_room:any,
    no_of_child_in_room:any,
    no_of_guest_in_double_room:any,
    no_of_child_in_double_room:any,
    bedPreference:BedPreference,
    amenities_list:[]
}
export default function HotelRooms({ hotelId, hotelFacilities }: hotelDataProps) {

    const [records, setRecords] = useState<ListData[]>([]);
    const [showLoader, setShowLoader] = useState(false); 
    const [imagesData, setImagesData] = useState<ListData[]>([]);

    useEffect(() => {
        async function fetchData() {
            setShowLoader(true);
            try {
                const data = localStorage.getItem('searchData');
                let start_date = '';
                let end_date = '';
                let rooms = '';
                if (data) {
                    let serData = JSON.parse(data);
                    start_date = serData.start_date; 
                    end_date = serData.end_date;       
                    rooms = serData.rooms;        
                }
                let postRec = { hotel_id: hotelId, start_date : start_date, end_date : end_date, rooms:rooms}; 
                const res = await postData('get-hotel-rooms', postRec);  
                setShowLoader(false);     
                setRecords(res.records);
            } catch (err) {
                console.error(err);
                setShowLoader(false);
            }
        }
        setTimeout(() => {
            fetchData();
        }, 500);

    }, [hotelId]); 


    const handleBedPreferenceChange = (index: number, preference: BedPreference) => {
        setRecords(prev => {
            const updated = [...prev];
            updated[index].bedPreference = preference;
            return updated;
        });
    };

    const isMobile = window.innerWidth < 480;
    const isiPad = /iPad/.test(navigator.userAgent) || (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document);


return (
    <>
        {(records.length > 0 ||showLoader) &&
            <div className="select-your-rooms">
                <h5 className="mb-3">Select Your Room</h5>

                { showLoader && 
                    <>
                        <Skeleton.Input active={true} style={{height:'200px', width:'81rem'}}  className='mb-2' />
                        <Skeleton.Input active={true} style={{height:'200px', width:'81rem'}}  className='mb-2' />
                        <Skeleton.Input active={true} style={{height:'200px', width:'81rem'}} className='mb-4'  />
                        <Skeleton.Input active={true} style={{height:'200px', width:'81rem'}} className='mb-4'  />
                    </>
                }

                {(records.length > 0) &&
                <>
                    {/* Desktop View */}
                    {!isMobile && records.length > 0 && records.map((record, index) => ( 
                        <div className="overview-section room-overview border rounded p-3 mb-4 wow fadeInUp d-none d-md-block" id="rooms">
                        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between pb-3">
                            <h5 className="">{record.title}</h5>
                            { (record.no_of_single_rooms > 0 && record.no_of_double_rooms > 0 && record.room_prices.length > 0) &&
                                <div className="bed-preference">
                                    <p className="fw-normal">Bed preference (if available)</p>
                                    <div className="d-flex">
                                        <label className="custom-radio me-2" htmlFor={"singleBed"+index}>
                                            <input type="radio" name={`bed-${index}`} id={"singleBed"+index} value={1} 
                                            checked={record.bedPreference === 'single'}
                                            onChange={() => handleBedPreferenceChange(index, 'single')} 
                                            />
                                            <span className="radio-mark"></span>
                                            Single Beds
                                        </label>

                                        <label className="custom-radio" htmlFor={"doubleBed"+index}>
                                            <input type="radio" name={`bed-${index}`} value={2} id={"doubleBed"+index} 
                                            checked={record.bedPreference === 'double'}
                                            onChange={() => handleBedPreferenceChange(index, 'double')} 
                                            />
                                            <span className="radio-mark"></span>
                                            Double Bed
                                        </label>
                                    </div>
                            </div>
                            }
                            
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <div className="row rooms-img-section">
                                    <div className={` mb-3 full-img position-relative ${record.additional_images.length >= 1 ? 'col-md-6' :'col-md-12'}`}>
                                        <div className="big-img-box">
                                            { (record.image && record.image != '') ?
                                                <img src={record.image} alt={record.title} title={record.title} className="rounded h-100" />
                                            :
                                                <Skeleton.Image active={true} style={{height:'200px', width:'60rem'}}  className="rounded h-100" />
                                            }
                                            
                                            { record.additional_images.length >= 1 && 
                                                <a className="see-all-photos see-all-photos_absolute cursor-pointer" data-bs-toggle="modal" onClick={() => {setImagesData([record])}} data-bs-target="#staticImageBackdrop">See All Photos</a>
                                            }
                                        </div>
                                    </div>
                                    {record.additional_images.length > 0 && 
                                        <div className="col-md-6">
                                            <div className="row" >
                                                {record.additional_images.slice(0, 4).map((imgrec: any, index: number) => (
                                                <div className="col-3 col-md-6 mb-3 px-1 px-md-2" key={index}>
                                                    <div className="samll-img-thumb">
                                                    <img src={imgrec.image} alt={`thumb-${index}`} className="rounded" />
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                            
                            </div>
                            <div className="col-md-3 mob-padLR">
                                <div className="room-facilities border rounded p-2 p-lg-3">
                                    <h6 className="fw-semibold text-dark pb-2">Room Facilities</h6>

                                    <ul className="bed-pref-list">
                                        <li><img src="/img/room_size.svg" className="me-2"/>Room Size: {record.room_size}</li>
                                        {record.amenities_list.length > 0 &&  record.amenities_list.slice(0, 3).map((facility: any) => (
                                            <li><img src={facility.icon} className="me-2" width={24}/> {facility.title}</li>
                                        ))}
                                        {record.amenities_list.length > 3 && 
                                            <li className="mb-0"><a  className="read-more cursor-pointer" data-bs-toggle="modal" data-bs-target={`#viewAmenities${record.id}`} >View More Facilities</a></li>
                                        }
                                    </ul>
                                </div>

                                <div className="modal fade view-all-amenities z-index-big" id={`viewAmenities${record.id}`} aria-hidden="true" aria-labelledby="viewmoreresultLabel" tabIndex={-1}>
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            {record.amenities_list.length > 0 &&
                                            <>
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" >{record.title}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <h6 className='mt-2'>Amenities</h6>
                                                    <ul className='bed-pref-list p-3 mt-0'>
                                                        { record.amenities_list.map((amenityRow:any) => (
                                                            <li><img src={amenityRow.icon} className="me-2" width={24}/> {amenityRow.title}</li>
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
                        </div>
                        
                       <RoomPrices record={record} hotelFacilities={hotelFacilities} />
                       </div>
                    ))}
                
                    {/* Mobile View */}     
                    {isMobile && records.length > 0 && records.map((record, index) => (         
                        <div className="overview-section room-overview border rounded p-2 mb-3 wow fadeInUp d-block d-md-none" id="rooms">
                            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between pb-3">
                                <h5 className="">{record.title}</h5>
                                { (record.no_of_single_rooms > 0 && record.no_of_double_rooms > 0 && record.room_prices.length > 0) &&
                                    <div className="bed-preference">
                                        <p className="fw-normal">Bed preference (if available)</p>
                                        <div className="d-flex">
                                            <label className="custom-radio me-2" htmlFor={"singleBed"+index}>
                                                <input type="radio" name={`bed-${index}`} id={"singleBed"+index} value={1} 
                                                checked={record.bedPreference === 'single'}
                                                onChange={() => handleBedPreferenceChange(index, 'single')} 
                                                />
                                                <span className="radio-mark"></span>
                                                Single Beds
                                            </label>

                                            <label className="custom-radio" htmlFor={"doubleBed"+index}>
                                                <input type="radio" name={`bed-${index}`} value={2} id={"doubleBed"+index} 
                                                checked={record.bedPreference === 'double'}
                                                onChange={() => handleBedPreferenceChange(index, 'double')} 
                                                />
                                                <span className="radio-mark"></span>
                                                Double Bed
                                            </label>
                                        </div>
                                    </div>
                                }

                            </div>
                            
                            <div className="room-images position-relative"> 
                                {record.additional_images.length > 1 &&
                                    <a className="see-all-photos see-all-photos_absolute cursor-pointer" data-bs-toggle="modal" onClick={() => {setImagesData([record])}} data-bs-target="#staticImageBackdrop">See All Photos</a>
                                }
                                <div id={`carouselExampleIndicators${index}`} className="carousel slide">
                                    <div className="carousel-inner">
                                        <div className={`carousel-item active`} key={0}>
                                            <img src={record.image} alt={record.title} title={record.title} className="d-block w-100" />
                                        </div>
                                        {record.additional_images.slice(0, 4).map((imgrec: any, imgindex: number) => (
                                            <div className={`carousel-item `} key={imgindex+1}>
                                                <img src={imgrec.image} alt={`thumb-${imgindex}`} className="d-block w-100" />
                                            </div>
                                        ))}
                                    </div>
                                    {record.additional_images.length > 1 &&
                                        <>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </>
                                    }

                                </div>
                            </div>  
                            
                            <MobileRoomPrices record={record} hotelFacilities={hotelFacilities} />
                        </div>
                    ))}

                    <div className="modal fade view-all-phots-popup z-index-big" id="staticImageBackdrop" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">See All Photos</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {imagesData.length > 0 && 
                                        <HotelImages hotelData={imagesData[0]} />
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
        }
    </>
  );
}