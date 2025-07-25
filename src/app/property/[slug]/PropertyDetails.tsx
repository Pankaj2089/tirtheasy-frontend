'use client'
import { useEffect, useState, useRef  } from 'react';
import { getData, postData } from '../../utils/api';
import React from 'react';
import { useInView } from "react-intersection-observer";
import { log } from 'console';
import InnerSearch from '../../components/InnerSearch';
import { Form, Slider,Skeleton } from 'antd';
import HotelImages from './HotelImages';
import HotelCircuit from './HotelCircuit';
import HotelFaqs from './HotelFaqs';
import RecommendedHotels from './RecommendedHotels';
import TermsConditionsServices from './TermsConditionsServices';
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

  const maxLength = 800;

  const isMobile = window.innerWidth < 480;
  const isiPad = /iPad/.test(navigator.userAgent) || (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document);

  
  const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    persons: 0,
    sortby:'',
    priceRange:[0,1000]
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
    loadFromLocalStorage();
  }, [])


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

  //map
  const fullAddress = hotelData.address+', '+hotelData.city+', '+hotelData.state;
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

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
                <div className="col-md-6 mb-2 mb-md-0 wow fadeInUp">
                    <div className="big-img-box">
                        <img src={hotelData.image} alt={hotelData.title} title={hotelData.title} />
                        <a href="#" className="heat-btn"><img src="/img/heart_liner.svg"/></a>

                        <a href="#" className="see-all-photos see-all-photos_absolute" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See All Photos</a>

                    </div>
                </div>

                <div className="col-md-6 wow fadeInUp">
                    <div className="row" >
                        {hotelData.additional_images.slice(0, 4).map((imgrec: any, index: number) => (
                          <div className="col-3 col-md-6 pe-1 ps-md-2 pe-md-2 mb-0 mb-md-3" key={index}>
                            <div className="samll-img-thumb">
                              <img src={imgrec.image} alt={`thumb-${index}`} />
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        <div className="row align-items-center">
            <div className="col-md-8">
                 <div className="details-sticy-tabs">
                    <ul>
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#highlights">Highlights</a></li>
                        <li><a href="#facilites">Facilities</a></li>
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
                <div className="overview-section max-height230 border rounded p-3 mb-2 wow fadeInUp mob-none" id="overview">
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

                <div className="highlights-section border rounded p-2 pb-0 pb-md-3 p-md-3 mb-2 wow fadeInUp" id="highlights">
                    <h5 className="pb-2">Highlights</h5>
                    <div className="highlight-items">
                        <ul>
                            <li>
                                <span className="high-icon">
                                    <img src="/img/location_1.svg"/>
                                </span>
                                <span className="highlit-item-name">Ideal Location</span>
                            </li>

                            <li>
                                <span className="high-icon">
                                    <img src="/img/like.svg"/>
                                </span>
                                <span className="highlit-item-name">Low-rise Building</span>
                            </li>


                            <li>
                                <span className="high-icon">
                                    <img src="/img/croissant.svg"/>
                                </span>
                                <span className="highlit-item-name">Varied Breakfast</span>
                            </li>


                            <li>
                                <span className="high-icon">
                                    <img src="/img/car_parking-1.svg"/>
                                </span>
                                <span className="highlit-item-name">Free Parking</span>
                            </li>

                            <li>
                                <span className="high-icon">
                                    <img src="/img/to_do.svg"/>
                                </span>
                                <span className="highlit-item-name">Lots To Do</span>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="highlights-section border rounded p-2 pb-0 pb-md-3 p-md-3 p-md-3 mb-2 wow fadeInUp" id="facilites">
                    <h5 className="pb-2">Facilities</h5>
                    <div className="highlight-items">
                        <ul>
                            <li>
                                <span className="high-icon">
                                    <img src="/img/swimming-pool.svg"/>
                                </span>
                                <span className="highlit-item-name">Swimming Pool</span>
                            </li>

                            <li>
                                <span className="high-icon">
                                    <img src="/img/wifi_1.svg"/>
                                </span>
                                <span className="highlit-item-name">Free Wi-Fi</span>
                            </li>


                            <li>
                                <span className="high-icon">
                                    <img src="/img/fitness_1.svg"/>
                                </span>
                                <span className="highlit-item-name">Fitness Center</span>
                            </li>


                            <li>
                                <span className="high-icon">
                                    <img src="/img/spa_1.svg"/>
                                </span>
                                <span className="highlit-item-name">Spa</span>
                            </li>

                            <li>
                                <span className="high-icon">
                                    <img src="/img/pick_up.svg"/>
                                </span>
                                <span className="highlit-item-name">Airport Shuttle</span>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="high-demand-section d-flex align-items-center justify-content-between rounded py-2 py-md-3 px-2 mb-3">
                    <div className="left-btns-section me-end">
                        <a href="#" className="me-2 white-bg-btn">YD Vishesh</a>
                        <a href="#" className="me-2 white-bg-btn">Cancellation policy</a>
                        <a href="#" className="me-2 white-bg-btn d-none d-lg-inline-flex">Must Note</a>
                    </div>
                    <a href="#" className="white-bg-btn view-result" data-bs-target="#viewmoreresult" data-bs-toggle="modal">View More Results</a>
                </div>
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
                            <div className="filter-sidebar hotel-detail-filter">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Walkable Places</div>
                                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body pt-0">
                                                <ul className="excellent-place mt-0">
                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/plarliyament.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">Parliament House - 70 m</span>
                                                        </span>
                                                    </li>

                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/shopping_cart.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">Khadi Gramodyog Bhawan - 200 m</span>
                                                        </span>
                                                    </li>

                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/near_by.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">The Shop - 200 m</span>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Popular Landmarks
                                        </div>
                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body pt-0">
                                                <ul className="excellent-place mt-0">
                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/plarliyament.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">Parliament House</span>
                                                        </span>

                                                        <span className="locaiton-right text-end text-light-emphasis">70 m</span>
                                                    </li>

                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/shopping_cart.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">Khadi Gramodyog Bhawan</span>
                                                        </span>

                                                        <span className="locaiton-right text-end text-light-emphasis">200 m</span>
                                                    </li>

                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/near_by.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">The Shop</span>
                                                        </span>

                                                        <span className="locaiton-right text-end text-light-emphasis">200 m</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Closest Landmarks
                                        </div>
                                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body pt-0">
                                                <ul className="excellent-place mt-0">
                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/plarliyament.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">Parliament House</span>
                                                        </span>

                                                        <span className="locaiton-right text-end text-light-emphasis">70 m</span>
                                                    </li>

                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/shopping_cart.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">Khadi Gramodyog Bhawan</span>
                                                        </span>

                                                        <span className="locaiton-right text-end text-light-emphasis">200 m</span>
                                                    </li>

                                                    <li className="py-0">
                                                        <span className="location-highlight-left">
                                                            <span className="lh-icon">
                                                                <img src="/img/near_by.svg"/>
                                                            </span>
                                                            <span className="overview-pra text-dark">The Shop</span>
                                                        </span>

                                                        <span className="locaiton-right text-end text-light-emphasis">200 m</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
               
            <div className="select-your-rooms">
                <h5 className="mb-3">Select Your Room</h5>
                <div className="overview-section room-overview border rounded p-3 mb-4 wow fadeInUp d-none d-md-block" id="rooms">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between pb-3">
                        <h5 className="">Luxury King Room</h5>
                        <div className="bed-preference">
                                <p className="fw-normal">Bed preference (if available)</p>
                                <div className="d-flex">
                                    <label className="custom-radio me-2">
                                        <input type="radio" name="option" checked />
                                        <span className="radio-mark"></span>
                                        1 Single Beds
                                    </label>

                                    <label className="custom-radio">
                                        <input type="radio" name="option" />
                                        <span className="radio-mark"></span>
                                        1 Double Bed
                                    </label>
                                </div>
                                
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row rooms-img-section">
                                <div className="col-md-6 mb-2 mb-md-0 full-img position-relative">
                                    <div className="big-img-box">
                                        <img src="/img/hotel-big-img.png" className="rounded h-100"/>
                                        <a href="#" className="see-all-photos see-all-photos_absolute" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See All Photos</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb"><img src="/img/hotel-img-2.png" className="rounded"/></div>
                                        </div>
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb"><img src="/img/hotel-img-2.png" className="rounded"/></div>
                                        </div>
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb"><img src="/img/hotel-img-2.png" className="rounded"/></div>
                                        </div>
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb">
                                                <img src="/img/hotel-img-2.png" className="rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        
                        </div>
                        <div className="col-md-3 mob-padLR">
                            <div className="room-facilities border rounded p-2 p-lg-3">
                                <h6 className="fw-semibold text-dark pb-2">Room Facilities</h6>

                                <ul className="bed-pref-list">
                                    <li><img src="/img/room_size.svg" className="me-2"/> Room Size: 23 m²/248 ft²</li>
                                    <li><img src="/img/no_smoking.svg" className="me-2"/> Non-Smoking</li>
                                    <li><img src="/img/city_view.svg" className="me-2"/> City View</li>
                                    <li><img src="/img/refrigerator.svg" className="me-2" /> Refrigerator</li>
                                    <li className="mb-0"><a href="#" className="read-more">View More Facilities</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded mb-3 mob-padLR">
                        <div className="row">
                            <div className="col-md-4 border-end mob-padLR">
                                <ul className="bed-pref-list p-3 mt-0">
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                    <li><a href="#">See All</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 border-end align-items-center justify-content-center">
                                <ul className="adult-room-child-list py-3">
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> 1 Adults
                                    </li>
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> 2 Child
                                    </li>
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> 1 Room
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 border-end mob-padLR">
                                <div className="py-3">
                                    <div className="price-box-section">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text mt-1"><span className="rs">Rs.</span> 5,154</div>
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
                    </div>

                     <div className="border rounded mb-3 mob-padLR">
                        <div className="row">
                            <div className="col-md-4 border-end mob-padLR">
                                <ul className="bed-pref-list p-3 mt-0">
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                    <li><a href="#">See All</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 border-end align-items-center justify-content-center">
                                <ul className="adult-room-child-list py-3">
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> 1 Adults
                                    </li>
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> 2 Child
                                    </li>

                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> 1 Room
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 border-end mob-padLR">
                                <div className="py-3">
                                    <div className="price-box-section">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text mt-1"><span className="rs">Rs.</span> 5,154</div>
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
                    </div>


                     <div className="border rounded mb-3 mob-padLR">
                        <div className="row">
                            <div className="col-md-4 border-end mob-padLR">
                                <ul className="bed-pref-list p-3 mt-0">
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                    <li><a href="#">See All</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 border-end align-items-center justify-content-center">
                                <ul className="adult-room-child-list py-3">
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> 1 Adults
                                    </li>
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> 2 Child
                                    </li>

                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> 1 Room
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 border-end mob-padLR">
                                <div className="py-3">
                                    <div className="price-box-section">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text mt-1"><span className="rs">Rs.</span> 5,154</div>
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
                    </div>

                    <div className="load-more-btn d-flex align-items-center justify-content-center">
                        <a href="#" className="btn btn-outline-primary">Load More</a>
                    </div>
                </div>
                
                <div className="overview-section room-overview border rounded p-3 mb-4 wow fadeInUp d-none d-md-block" id="rooms">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between pb-3">
                        <h5 className="">Deluxe Triple Room</h5>
                        <div className="bed-preference d-none">
                                <p className="fw-normal">Bed preference (if available)</p>
                                <div className="d-flex">
                                    <label className="custom-radio me-2">
                                        <input type="radio" name="option" checked />
                                        <span className="radio-mark"></span>
                                        1 Single Beds
                                    </label>

                                    <label className="custom-radio">
                                        <input type="radio" name="option" />
                                        <span className="radio-mark"></span>
                                        1 Double Bed
                                    </label>
                                </div>
                                
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row rooms-img-section">
                                <div className="col-md-6 mb-3 mb-md-0 full-img position-relative">
                                    <div className="big-img-box">
                                        <img src="/img/hotel-big-img.png" className="rounded h-100"/>
                                        <a href="#" className="see-all-photos see-all-photos_absolute" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See All Photos</a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb">
                                                <img src="/img/hotel-img-2.png" className="rounded"/>
                                            </div>
                                        </div>
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                             <div className="samll-img-thumb">
                                                <img src="/img/hotel-img-2.png" className="rounded"/>
                                            </div>
                                        </div>
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb">
                                                <img src="/img/hotel-img-2.png" className="rounded"/>
                                            </div>
                                        </div>
                                        <div className="col-3 col-md-6 mb-3 px-1 px-md-2">
                                            <div className="samll-img-thumb">
                                                <img src="/img/hotel-img-2.png" className="rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        
                        </div>
                        <div className="col-md-3">
                            <div className="room-facilities border rounded p-2 p-lg-3">
                                <h6 className="fw-semibold text-dark pb-2">Room Facilities</h6>

                                 <ul className="bed-pref-list">
                                    <li><img src="/img/room_size.svg" className="me-2"/> Room Size: 23 m²/248 ft²</li>
                                    <li><img src="/img/no_smoking.svg" className="me-2"/> Non-Smoking</li>
                                    <li><img src="/img/city_view.svg" className="me-2"/> City View</li>
                                    <li><img src="/img/refrigerator.svg" className="me-2" /> Refrigerator</li>
                                    <li className="mb-0"><a href="#" className="read-more">View More Facilities</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded mb-3 mob-padLR">
                        <div className="row">
                            <div className="col-md-4 border-end mob-padLR">
                                <ul className="bed-pref-list p-3 mt-0">
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                    <li><a href="#">See All</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 border-end align-items-center justify-content-center">
                                <ul className="adult-room-child-list py-3">
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> 1 Adults
                                    </li>
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> 2 Child
                                    </li>

                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> 1 Room
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 border-end mob-padLR">
                                <div className="py-3">
                                    <div className="price-box-section">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text mt-1"><span className="rs">Rs.</span> 5,154</div>
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
                    </div>


                     <div className="border rounded mb-3 mob-padLR">
                        <div className="row">
                            <div className="col-md-4 border-end mob-padLR">
                                <ul className="bed-pref-list p-3 mt-0">
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                    <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                    <li><a href="#">See All</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 border-end align-items-center justify-content-center">
                                <ul className="adult-room-child-list py-3">
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/single.svg"/></span> 1 Adults
                                    </li>
                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/child.svg"/></span> 2 Child
                                    </li>

                                    <li>
                                        <span className="adult-icon-box me-2"><img src="/img/room_bad.svg"/></span> 1 Room
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 border-end mob-padLR">
                                <div className="py-3">
                                    <div className="price-box-section">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text mt-1"><span className="rs">Rs.</span> 5,154</div>
                                        <em>Per night before taxes and fees</em>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-3">
                                <div className="py-3">
                                    <div className="no-risk-section">
                                        <div className="no-risk-content">
                                            <a href="#" className="btn btn-primary w-100">Book Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>        
                        </div>              
                    </div>

                </div>
                
                <div className="overview-section room-overview border rounded p-2 mb-3 wow fadeInUp d-block d-md-none" id="rooms">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between pb-3">
                        <h5 className="">Luxury King Room</h5>
                        <div className="bed-preference">
                            <p className="fw-normal">Bed preference (if available)</p>
                            <div className="d-flex">
                                <label className="custom-radio me-2">
                                    <input type="radio" name="option" checked />
                                    <span className="radio-mark"></span>
                                    1 Single Beds
                                </label>

                                <label className="custom-radio">
                                    <input type="radio" name="option" />
                                    <span className="radio-mark"></span>
                                    1 Double Bed
                                </label>
                            </div>
                                
                        </div>
                    </div>
                    
                     <div className="room-images position-relative"> 
                        <a href="#" className="see-all-photos see-all-photos_absolute" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See All Photos</a>                    
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="/img/hotel-4.png" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/hotel-3.png" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/hotel-2.png" className="d-block w-100" alt="..." />
                                </div>

                                <div className="carousel-item">
                                    <img src="/img/hotel-1.png" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>  

                    <div className="border-top mt-3 mb-3">
                         <div className="room-facility">
                            <div className="row">
                                <div className="col-7">
                                    <ul className="bed-pref-list pt-2">
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                        <li><a href="#">See All</a></li>
                                        
                                    </ul>
                                   
                                </div>
                                <div className="col-5 justify-content-end">
                                     <div className="price-box-section py-2">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text"><span className="rs">Rs.</span> 5,154</div>
                                        <em>Per night before taxes and fees</em>
                                    </div>
                                </div>
                            </div>

                             <div className="adult-rooms">
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> 2 Adult, 1 Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> 1 Room</div>
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
                                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                                    </div>
                                </div>
                            </div>        
                        </div>              
                    </div>

                   <div className="border-top mt-3 mb-3">
                         <div className="room-facility">
                            <div className="row">
                                <div className="col-7">
                                    <ul className="bed-pref-list pt-2">
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                        <li><a href="#">See All</a></li>
                                        
                                    </ul>
                                   
                                </div>
                                <div className="col-5 justify-content-end">
                                     <div className="price-box-section py-2">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text"><span className="rs">Rs.</span> 5,154</div>
                                        <em>Per night before taxes and fees</em>
                                    </div>
                                </div>
                            </div>

                             <div className="adult-rooms">
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> 2 Adult, 1 Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> 1 Room</div>
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
                                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                                    </div>
                                </div>
                            </div>        
                        </div>              
                    </div>

                    <div className="border-top mt-3 mb-3">
                         <div className="room-facility">
                            <div className="row">
                                <div className="col-7">
                                    <ul className="bed-pref-list pt-2">
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                        <li><a href="#">See All</a></li>
                                        
                                    </ul>
                                   
                                </div>
                                <div className="col-5 justify-content-end">
                                     <div className="price-box-section py-2">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text"><span className="rs">Rs.</span> 5,154</div>
                                        <em>Per night before taxes and fees</em>
                                    </div>
                                </div>
                            </div>

                             <div className="adult-rooms">
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> 2 Adult, 1 Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> 1 Room</div>
                            </div>
                         </div>                   
                        <div className="row">                            
                            <div className="col-12">
                                <div className="no-risk-section">
                                    <div className="no-risk-content">
                                        <a href="#" className="btn btn-primary w-100 mx-auto">Book Now</a>
                                    </div>
                                </div>
                            </div>        
                        </div>              
                    </div>

                    <div className="load-more-btn d-flex align-items-center justify-content-center">
                        <a href="#" className="btn btn-outline-primary">Load More</a>
                    </div>
                </div>
                
                <div className="overview-section room-overview border rounded p-2 mb-3 wow fadeInUp d-block d-md-none" id="rooms">
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between pb-3">
                        <h5 className="">Deluxe Triple Room</h5>
                        <div className="bed-preference d-none">
                            <p className="fw-normal">Bed preference (if available)</p>
                            <div className="d-flex">
                                <label className="custom-radio me-2">
                                    <input type="radio" name="option" checked />
                                    <span className="radio-mark"></span>
                                    1 Single Beds
                                </label>

                                <label className="custom-radio">
                                    <input type="radio" name="option" />
                                    <span className="radio-mark"></span>
                                    1 Double Bed
                                </label>
                            </div>
                                
                        </div>
                    </div>
                    
                     <div className="room-images position-relative"> 
                        <a href="#" className="see-all-photos see-all-photos_absolute" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See All Photos</a>                    
                        <div id="carouselExampleIndicators2" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="/img/hotel-4.png" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/hotel-3.png" className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src="/img/hotel-2.png" className="d-block w-100" alt="..." />
                                </div>

                                <div className="carousel-item">
                                    <img src="/img/hotel-1.png" className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators2" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>  

                    <div className="border-top mt-3 mb-3">
                         <div className="room-facility">
                            <div className="row">
                                <div className="col-7">
                                    <ul className="bed-pref-list pt-2">
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                        <li><a href="#">See All</a></li>
                                        
                                    </ul>
                                   
                                </div>
                                <div className="col-5 justify-content-end">
                                     <div className="price-box-section py-2">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text"><span className="rs">Rs.</span> 5,154</div>
                                        <em>Per night before taxes and fees</em>
                                    </div>
                                </div>
                            </div>

                             <div className="adult-rooms">
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> 2 Adult, 1 Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> 1 Room</div>
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
                                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                                    </div>
                                </div>
                            </div>        
                        </div>              
                    </div>

                   <div className="border-top mt-3 mb-3">
                         <div className="room-facility">
                            <div className="row">
                                <div className="col-7">
                                    <ul className="bed-pref-list pt-2">
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Breakfast available (Rs. 500 / person)</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Free cancellation before 23:59 on June 04, 2025</li>
                                        <li><img src="/img/tick_icon.svg" className="me-2"/> Book and pay now</li>
                                        <li><a href="#">See All</a></li>
                                        
                                    </ul>
                                   
                                </div>
                                <div className="col-5 justify-content-end">
                                     <div className="price-box-section py-2">
                                        <del><span className="rs">Rs.</span> 25,529</del>
                                        <div className="room-price red-text"><span className="rs">Rs.</span> 5,154</div>
                                        <em>Per night before taxes and fees</em>
                                    </div>
                                </div>
                            </div>

                             <div className="adult-rooms">
                                <div className="adult-section"><img src="/img/adult_user.svg" className="me-1"/> 2 Adult, 1 Child</div> | <div className="adult-section"><img src="/img/double_bed_icon.svg" className="me-1"/> 1 Room</div>
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
                                        <a href="#" className="btn btn-primary w-100">Book Now</a>
                                    </div>
                                </div>
                            </div>        
                        </div>              
                    </div>
                </div>
            </div>
        <div className="review-rating-section wow fadeInUp">
            <h5 className="mb-3">Review of Hotels</h5>
            
            <div className="star-rating-section rounded border">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <div className="reviews_hotel_rating">
                            <div className="five-star">5.0 <img src="/img/star_icon.svg" className="ms-2"/></div>
                            <div className="very-good-section">
                                <h5 className="">Very Good</h5>
                                <a href="#reviews" className="read-more">186 Reviews</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 border-start">
                        <div className="row align-items-center py-3">
                            <div className="col-md-8">
                                <div className="rating-distrubution">
                                    <div className="five-start-prograss">
                                        <div className="five">5 <img src="/img/start-gray.svg" className="ms-1"/></div>
                                         <div
                                          className="progress"
                                          role="progressbar"
                                          aria-label="Basic example"
                                          aria-valuenow={90}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        >
                                          <div className="progress-bar" style={{ width: "90%" }}></div>
                                        </div>

                                        <div className="five">90%</div>

                                    </div>

                                    <div className="five-start-prograss">
                                        <div className="five">4 <img src="/img/start-gray.svg" className="ms-1"/></div>
                                         <div
                                          className="progress"
                                          role="progressbar"
                                          aria-label="Basic example"
                                          aria-valuenow={90}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        >
                                          <div className="progress-bar" style={{ width: "50%" }}></div>
                                        </div>

                                        <div className="five">50%</div>

                                    </div>

                                    <div className="five-start-prograss">
                                        <div className="five">3 <img src="/img/start-gray.svg" className="ms-1"/></div>
                                         <div
                                          className="progress"
                                          role="progressbar"
                                          aria-label="Basic example"
                                          aria-valuenow={25}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        >
                                          <div className="progress-bar" style={{ width: "0%" }}></div>
                                        </div>

                                        <div className="five">0%</div>

                                    </div>

                                    <div className="five-start-prograss">
                                        <div className="five">2 <img src="/img/start-gray.svg" className="ms-1"/></div>
                                         <div
                                          className="progress"
                                          role="progressbar"
                                          aria-label="Basic example"
                                          aria-valuenow={25}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        >
                                          <div className="progress-bar" style={{ width: "0%" }}></div>
                                        </div>

                                        <div className="five">0%</div>

                                    </div>

                                    <div className="five-start-prograss mb-0">
                                        <div className="five">1 <img src="/img/start-gray.svg" className="ms-1"/></div>
                                         <div
                                          className="progress"
                                          role="progressbar"
                                          aria-label="Basic example"
                                          aria-valuenow={25}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        >
                                          <div className="progress-bar" style={{ width: "2%" }}></div>
                                        </div>

                                        <div className="five">2%</div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center">
                                <a href="#" className="btn btn-primary">Write a Review</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reviews-seciton mt-4 wow fadeInUp" id="reviews">
                <div className="row">
                    <div className="col-md-4">
                        <div className="reviews-section p-2 p-lg-4 rounded border">
                            <div className="client-detials-top">
                                    <div className="client-detials">
                                        <div className="client-thumb"><img src="/img/client-thumb.svg"/></div>
                                        <div className="client-text-box">
                                            <b>Sumit Sharma</b>
                                            <p>India</p>
                                        </div>
                                    </div>
                                    <div className="date-posted text-end">August 02, 2023</div>
                            </div>

                            <h5 className="fst-italic fw-bold mb-3">“Contrary to popular belief, Lorem Ipsum is text.”</h5>
                            <p className="fw-normal">Seriously I m surprised that agoda is hosting these kind of property. Like cleanless they don't know what exactly it is their are many cockroaches in wash room dust on floor.</p>

                            <div className="rating-section bg-transparent p-0 mt-4 d-flex align-item-center justify-content-between">
                                <div className="total-review-section mt-0">
                                    <div className="overall-rating">7.3</div>
                                    <div className="rating-overview">
                                        <h6>Very Good</h6>
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
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="reviews-section p-2 p-lg-4 rounded border">
                            <div className="client-detials-top">
                                    <div className="client-detials">
                                        <div className="client-thumb"><img src="/img/client-thumb.svg"/></div>
                                        <div className="client-text-box">
                                            <b>Sumit Sharma</b>
                                            <p>India</p>
                                        </div>
                                    </div>
                                    <div className="date-posted text-end">August 02, 2023</div>
                            </div>

                            <h5 className="fst-italic fw-bold mb-3">“Contrary to popular belief, Lorem Ipsum is text.”</h5>
                            <p className="fw-normal">Seriously I m surprised that agoda is hosting these kind of property. Like cleanless they don't know what exactly it is their are many cockroaches in wash room dust on floor.</p>

                            <div className="rating-section bg-transparent p-0 mt-4 d-flex align-item-center justify-content-between">
                                <div className="total-review-section mt-0">
                                    <div className="overall-rating">7.3</div>
                                    <div className="rating-overview">
                                        <h6>Very Good</h6>
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
                        </div>
                    </div>


                    <div className="col-md-4 d-none d-md-block">
                        <div className="reviews-section p-2 p-lg-4 rounded border">
                            <div className="client-detials-top">
                                    <div className="client-detials">
                                        <div className="client-thumb"><img src="/img/client-thumb.svg"/></div>
                                        <div className="client-text-box">
                                            <b>Sumit Sharma</b>
                                            <p>India</p>
                                        </div>
                                    </div>
                                    <div className="date-posted text-end">August 02, 2023</div>
                            </div>

                            <h5 className="fst-italic fw-bold mb-3">“Contrary to popular belief, Lorem Ipsum is text.”</h5>
                            <p className="fw-normal">Seriously I m surprised that agoda is hosting these kind of property. Like cleanless they don't know what exactly it is their are many cockroaches in wash room dust on floor.</p>

                            <div className="rating-section bg-transparent p-0 mt-4 d-flex align-item-center justify-content-between">
                                <div className="total-review-section mt-0">
                                    <div className="overall-rating">7.3</div>
                                    <div className="rating-overview">
                                        <h6>Very Good</h6>
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
                        </div>
                    </div>
                </div>

                <div className="col-12 text-center pb-4 pb-mb-5 py-md-5">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link">«</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="#">»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        
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
  <div className="offcanvas-body filter-accordion">
      <form className="main-search-form" action="" method="post">
               <div className="input-group search-main-box">
                  <input type="search" className="form-control search-box" placeholder="Search" />
                </div>

                <div className="start-end-date">
                   <div className="start-date">
                     <span className="date-picker-icon"><img src="/img/date.svg"/></span>
                     <div className="selected-date-day">
                          <div className="date">19 Jun 2025</div>
                          <div className="day">Thursday</div>
                     </div>
                   </div>

                   <div className="start-date end-date">
                     <span className="date-picker-icon"><img src="/img/date.svg"/></span>
                     <div className="selected-date-day">
                          <div className="date">19 Jun 2025</div>
                          <div className="day">Thursday</div>
                     </div>
                   </div>
                </div>

                <div className="slect-audience" >
                    <div className="select-member" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                      <span className="date-picker-icon"><img src="/img/user.svg"/></span>
                      <div className="selected-date-day">
                            <div className="date">1 Adult,</div>
                            <div className="day">2 Room, 2 Child</div>
                      </div>
                    </div>
                      <div className="collapse multi-collapse member-addon" id="multiCollapseExample1">
                          <div className="select-adult">
                              <span className="left-label">Room</span>
                              <span className="qty-price">
                                <span className="number cont-ad-name">
                                  <span className="minus"><span>-</span></span>
                                  <input type="text" value="1"/>
                                  <span className="plus"><span>+</span></span>
                                </span>
                              </span>
                          </div>

                          <div className="select-adult">
                              <span className="left-label">Adult</span>
                              <span className="qty-price">
                                <span className="number cont-ad-name">
                                  <span className="minus"><span>-</span></span>
                                  <input type="text" value="1"/>
                                  <span className="plus"><span>+</span></span>
                                </span>
                              </span>
                          </div>


                          <div className="select-adult">
                              <span className="left-label">Children</span>
                              <span className="qty-price">
                                <span className="number cont-ad-name">
                                  <span className="minus"><span>-</span></span>
                                  <input type="text" value="1"/>
                                  <span className="plus"><span>+</span></span>
                                </span>
                              </span>
                          </div>

                          
                      </div>
                      
                </div>
                
                <div className="search-btn-box">
                   <button type="submit" className="btn btn-primary">Search</button>
                </div>
        </form> 
  
  </div>
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

  </>;
}