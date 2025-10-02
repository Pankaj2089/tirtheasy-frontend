'use client'
import { useEffect, useState  } from 'react';
import { postData } from '../../utils/api';
import React from 'react';
import { useInView } from "react-intersection-observer";

import { toast } from 'react-toastify';
import InnerSearch from '../../components/InnerSearch';
import HotelImages from './HotelImages';
import HotelCircuit from './HotelCircuit';
import HotelFaqs from './HotelFaqs';
import RecommendedHotels from './RecommendedHotels';
import TermsConditionsServices from './TermsConditionsServices';
import HotelFacilities from './HotelFacilities';
import HotelAmenities from './HotelAmenities';

import HotelOtherDetails from './HotelOtherDetails';
import HotelLandmark from './HotelLandmark';
import HotelRooms from './HotelRooms';
import HotelReviews from './HotelReviews';
import Signin from '@/app/components/Signin';
import InnerMobileSearch from '@/app/components/InnerMobileSearch';
import { log } from 'console';

type PropertyDetailsProps = {
  hotelData: any;
};


export default function PropertyDetails({ hotelData }: PropertyDetailsProps) {

  const [records, setRecords] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView(); // triggers when the ref is visible
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [propertyType, setPropertyType] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [opneDetailsModal, setOpneDetailsModal] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<any>([]);
  const [activeDetailTab, setActiveDetailTab] = useState('');
  const [is_wishlist, setIsWishlist] = useState('');
  
  const [userloggedin, setUserLogin] = useState(false);
  const [hotelFacilitiesList, setHotelFacilities] = useState([]);
  
  const [sendWishlistRequest, setSendWishlistRequest] = useState(false);
  
  const maxLength = 800;
  const setHotelFacilitiesList = (list:any) =>{
    setHotelFacilities(list);
  }

  const isMobile = window.innerWidth < 780;
  const isiPad = /iPad/.test(navigator.userAgent) || (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document);
  
  const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    persons: 0,
    sortby:'',
    priceRange:[0,1000],
  });

    useEffect(() => {
      if(searchData.keywords !== '' || searchData.start_date !== '' || searchData.end_date !== ''){
        localStorage.setItem("searchData", JSON.stringify(searchData));      
      }   
  }, [searchData]);

  const handleChange = (name:any,value:any) => {    
    const updatedData = { ...searchData, [name]: value };
    setSearchState(updatedData);

    if (updatedData.keywords !== '' || updatedData.start_date !== '' || updatedData.end_date !== '') {
      localStorage.setItem("searchData", JSON.stringify(updatedData));
    }

    searchProperties();
  };

   // Get array from localStorage
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('searchData');
    if (data) {
      let serData = JSON.parse(data);
      setSearchState(serData);      
      setStartDate(serData.start_date);
      setEndDate(serData.end_date);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("accessToken")){        
      setUserLogin(true);
      checkIsWishlist();
    } 
    loadFromLocalStorage();
    localStorage.setItem("hotelData", JSON.stringify(hotelData));
  }, [])

   async function checkIsWishlist() {
        let postRec: { hotel_id: number} = { hotel_id: hotelData.id}; 
        const res = await postData('get-is-wishlist', postRec); 
        if(res.success && res.record){
            setIsWishlist(res.record);
        } 
    }


  useEffect(() => {
     const data:any = localStorage.getItem('property_type');
     setPropertyType(data);
    loadFromLocalStorage();
  }, []);

  
    const searchProperties =() => {      
      window.location.href = '/porperty-list';
    } 

    // Helper: Strip HTML and trim to maxLength
  const getPreview = (html:any, length:any) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.slice(0, length) + (text.length > length ? '...' : '');
  };

  const handleToggle = (e:any) => {
    e.preventDefault();
    setExpanded(!expanded);
  };
  const handleOpneDetailsModalCancel = () => {
    setOpneDetailsModal(false);
  }
  const OpneDetailsModal = (activeTab:any) => {
    setOpneDetailsModal(true);
    setActiveDetailTab(activeTab);
  }

  //map
  const fullAddress = hotelData.address+', '+hotelData.city+', '+hotelData.state;
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const detailsContantsList = (records:any) => {
    setHotelDetails(records);
  }

   const unWishlist = () => {
        manageMyWishlists();
  };

  async function manageMyWishlists() {
        if(!sendWishlistRequest){
            setSendWishlistRequest(true);
            let postRec: { hotel_id: number} = { hotel_id: hotelData.id}; 
            const res = await postData('manage-my-wishlist', postRec); 
            if(res.success){
                toast.success(res.message, {
                    position: "bottom-center",
                    toastId: "unique_toast", // ✅ same id prevents duplicates
                });
                setIsWishlist(res.record);
            } else{
                toast.error(res.message);
            }
            setTimeout(() => {
                setSendWishlistRequest(false);
            }, 2000);
        }
    }
  
  
return <> 
<InnerSearch searchAction={searchProperties} loading = {loading}/>

<div className="container">
    <div className="breadcrumb-main">
       <nav
        style={
          {
            ['--bs-breadcrumb-divider']: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`
          } as any
        }
        aria-label="breadcrumb"
      >
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="/porperty-list">Hotel in {hotelData.city}</a></li>
            <li className="breadcrumb-item active" aria-current="page">{hotelData.title}</li>
        </ol>
        </nav>
    </div>
    <hr className="mb-2"/>
</div>

<div className="hotel-detail-main wow fadInUp">
    <div className="container">
            <div className="hotel-title pb-2 wow fadeInUp">
                <h1>{hotelData.title}</h1>
                <p>{hotelData.address}, {hotelData.city}, {hotelData.state}</p>
            </div>
        <div className="hotel-images">
            <div className="row">
                <div className={"mb-2 mb-md-0 wow fadeInUp " + (hotelData.additional_images.length == 0 ? 'col-md-12':'col-md-6 ')}>
                    <div className="big-img-box">
                        <img src={hotelData.image} alt={hotelData.title} title={hotelData.title} />
                        {userloggedin ? 
                            <a className="heat-btn cursor-pointer" onClick={unWishlist}>
                                { is_wishlist ?
                                    <img src="/img/heart_select.svg"/>
                                :
                                    <img src="/img/heart_liner.svg"/>
                                }
                            </a>
                        :
                        <a className="heat-btn cursor-pointer" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><img src="/img/heart_liner.svg"/></a>
                        }

                        <a href="#" className="see-all-photos see-all-photos_absolute" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See All Photos</a>

                    </div>
                </div>
                {hotelData.additional_images.length > 0 && 
                    <div className="col-md-6 wow fadeInUp">
                        <div className="row" >
                            {hotelData.additional_images.slice(0, 4).map((imgrec: any, index: number) => (
                                <div className={index == 3 && isMobile ?"col-3 col-md-6 ps-1 ps-md-2 mb-0 mb-md-0": "col-3 col-md-6 pe-1 ps-md-2 pe-md-2 mb-0 mb-md-3"} key={index}>
                                    <div className="samll-img-thumb">
                                        <img src={imgrec.image} alt={`thumb-${index}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
        
        <div className="row align-items-center">
            <div className="col-md-8">
                 <div className="details-sticy-tabs">
                    <ul>
                        { (hotelData.description != '' &&  hotelData.description != null) && 
                            <li><a href="#overview">Overview</a></li>
                        }
                        { (hotelData.amenities && hotelData.amenities.length !== '')  &&
                            <li><a href="#highlights">Amenities</a></li>
                        }
                        { (hotelData.facilities && hotelData.facilities.length !== '')  &&
                            <li><a href="#facilites">Facilities</a></li>
                        }

                        <li><a href="#reviews">Reviews</a></li>
                        <li><a href="#rooms">Rooms</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-md-4 wow fadeInUp">
                <div className="detail-price-box wow fadeInUp">
                    <div className="new-price d-flex text-end align-items-center justify-content-end wow fadeInUp">
                        <p className="me-2 wow fadeInUp pt-2">From</p>
                        <p className="new-price-big red-text fw-semibold wow fadeInUp"><span className="rs">Rs.</span> {hotelData.price}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row wow fadInUp">
            <div className="col-md-8">
                { (hotelData.description != '' &&  hotelData.description != null) && 
                    <div className="overview-section maxHeight230 border rounded p-3 mb-2 wow fadeInUp mob-none" id="overview">
                        <h5 className="pb-2">Overview</h5>
                        <p
                        className="overview-pra"
                        dangerouslySetInnerHTML={{
                            __html: expanded ? hotelData.description : getPreview(hotelData.description, maxLength),
                        }}
                        ></p>
                        {hotelData.description && hotelData.description.length > maxLength && (
                        <a href="#" className="read-more" onClick={handleToggle}>
                            {expanded ? 'Read Less' : 'Read More'}
                        </a>
                        )}
                    </div>
                }

                { (hotelData.amenities && hotelData.amenities != '')  &&
                    <div className="highlights-section border rounded p-2 pb-0 pb-md-3 p-md-3 mb-2 wow fadeInUp" id="highlights">
                        <HotelAmenities hotelAmenities={hotelData.amenities} hotelId={hotelData.id}   />
                    </div>
                }

                { (hotelData.facilities && hotelData.facilities != '')  &&
                    <div className="highlights-section border rounded p-2 pb-0 pb-md-3 p-md-3 p-md-3 mb-2 wow fadeInUp" id="facilites">
                        <HotelFacilities hotelFacilities={hotelData.facilities} hotelId={hotelData.id} hotelFacilitiesList={setHotelFacilitiesList}   />
                    </div>
                }

                { hotelDetails.length > 0 && 
                    <div className="high-demand-section d-flex align-items-center justify-content-between rounded py-2 py-md-3 px-2 mb-3">
                    <div className="left-btns-section me-end">
                        {
                            hotelDetails.slice(0,(isMobile ? 2:3)).map((hotelDetail:any, index:number) =>(
                                <a onClick={() => OpneDetailsModal('tab-'+index)} className="me-2 white-bg-btn cursor-pointer">{hotelDetail.heading}</a>
                            ))
                        }
                    </div>
                    <a onClick={() => OpneDetailsModal('tab-0')} className="white-bg-btn view-result cursor-pointer">View More Results</a>
                </div>
                }
                

            </div>

            <div className="col-md-4">
                <div className="overview-section border rounded p-3 mb-4 wow fadeInUp">
                    <div className="rating-section bg-white p-0 d-flex align-item-center justify-content-between">
                        <div className="total-review-section mt-0">
                            <div className="overall-rating">7.3</div>
                            <div className="rating-overview">
                                <h6>Very Good</h6>
                                <p>4634 Reviews</p>
                            </div>
                        </div>

                        <div className="star-rating">
                            <img src="/img/star_icon.svg" />
                            <img src="/img/star_icon.svg" />
                            <img src="/img/star_icon.svg" />
                            <img src="/img/star_icon.svg" />
                            <img src="/img/star_gray.svg" />
                        </div>
                    </div>
                    <hr/>
                        <div className="d-flex justify-content-between">        
                            <HotelLandmark hotelId={hotelData.id} />
                            <div className="mob-map">
                                <div className="hotel-locaion position-relative rounded wow fadInUp">
                                    <iframe className="rounded" src={mapUrl} width="100%" height="100" 
                                    style={{border:0}} loading="lazy"></iframe>
                                    <div className="see-on-map">
                                        <a href={externalMapUrl} target='_blank' className="see-map">View Map »</a>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    
                    <div className="location-details mt-2">

                        <div className="check-in-check-out-scetion">
                            <div className="checkin-box">
                                <img src="/img/hotel_check_in.svg" className="me-3"/>
                                <div className="check-in-label">
                                    <label className="checkin-text">Check-In</label>
                                    <div className="check-in-time">{hotelData.check_in_time}</div>
                                </div>
                            </div>
                             <div className="checkin-box">
                                <img src="/img/hotel_check_out.svg" className="me-3"/>
                                <div className="check-in-label">
                                    <label className="checkin-text">Check-Out</label>
                                    <div className="check-in-time">{hotelData.check_out_time}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <hr className="d-none d-md-block"/>
                    <div className="circuit-section d-none d-md-block">
                        <h6 className="fw-semibold text-dark pb-2">{hotelData.city} Circuit</h6>
                        <HotelCircuit hotelState={hotelData.state} handleChange={handleChange} />
                    </div>
                </div>
            </div>

        </div>
               
        <HotelRooms hotelId={hotelData.id} hotelFacilities={hotelFacilitiesList} />
        <HotelReviews />
        <HotelFaqs hotelId={hotelData.id} />
        <RecommendedHotels hotelId={hotelData.id} hotelCity={hotelData.city} />        
        <TermsConditionsServices hotelId={hotelData.id} />
        
        <div className="terms_conditions d-block d-md-none py-50 wow fadeInUp">
            <div className="section-title mb-2 wow fadeInUp">
                <h4 className="mb-0">{hotelData.city} Circuit</h4>
            </div>
            <div className="circuit-section">
                <HotelCircuit hotelState={hotelData.state} handleChange={handleChange} />
            </div>
        </div>
    </div>
</div>

<div className="offcanvas offcanvas-end search-modelbox p-0" tabIndex={-1} id="offcanvasSearchbox" aria-labelledby="offcanvasSearchboxLabel">
  <div className="offcanvas-header p-2">
    <button type="button" className="back-btn me-2" data-bs-dismiss="offcanvas" aria-label="Close"><img src="/img/back_search.svg"/></button>
    <span className="popup-title">Edit Search</span>
  </div>
  <InnerMobileSearch searchAction={searchProperties} loading = {loading} />
</div>

    <div className="modal fade view-all-phots-popup z-index-big" id="staticBackdrop" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">See All Photos</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    <HotelImages hotelData={hotelData} />
                    
                </div>
            </div>
        </div>
    </div>

   <div className="modal fade view-all-phots-popup z-index-big" id="viewmoreresult" aria-hidden="true" aria-labelledby="viewmoreresultLabel" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">About Hotel</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    
                    
                </div>
            </div>
        </div>
    </div>

    <Signin request_title={"hotel"}/>

    <HotelOtherDetails  
    hotelId={hotelData.id}
    opneDetailsModal={opneDetailsModal}
    handleOpneDetailsModalCancel={handleOpneDetailsModalCancel}
    detailsContantsList={detailsContantsList}
    activeDetailTab={activeDetailTab}
    hotelName={hotelData.title}
    />

  </>;
}