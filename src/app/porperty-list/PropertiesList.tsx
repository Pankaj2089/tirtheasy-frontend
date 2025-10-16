'use client'
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import React from 'react';
import { useInView } from "react-intersection-observer";
import InnerSearch from '../components/InnerSearch';
import { Slider,Skeleton , Select} from 'antd';
import Link from 'next/link';

import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import InnerMobileSearch from '../components/InnerMobileSearch';

const { Option } = Select;

const containerStyle = {
  width: "100%",
  height: "80vh",
};

type Hotel = {
  id: number;
  title?: string;          // optional, if exists
  latitude: number | string;
  longitude: number | string;
  city?: string; 
  state?: string; 
};

export default function propertiesList() {

  const [records, setRecords] = useState<any>([]);
  const [facilities, setFacilities] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView(); // triggers when the ref is visible
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [propertyType, setPropertyType] = useState('');
  const [viewType, setViewType] = useState("list");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  
  const [defaultLat, setDefaultLat] = useState(false);
  const [defaultLong, setDefaultLong] = useState(false);

  //const isMobile = window.innerWidth < 480;
  //const isiPad = /iPad/.test(navigator.userAgent) || (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document);

  const [searchData, setSearchState] = useState({
    keywords: '',
    keywords_type: '',
    start_date: '',
    end_date: '',
    persons: 0,
    sortby:'',
    priceRange:[0,1000],
    facilities: [] as number[],
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
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

  const onSliderChange = (value: number[]) => {
    
    const updatedData = { ...searchData, priceRange: value };
    setSearchState(updatedData);

    if (updatedData.keywords !== '' || updatedData.start_date !== '' || updatedData.end_date !== '') {
      localStorage.setItem("searchData", JSON.stringify(updatedData));
    }
    setTimeout(() => {
      searchProperties();
    }, 500);
    
  };


  useEffect(() => {
    loadFromLocalStorage();
    fetchFacilities();
  }, [])

  async function fetchFacilities() {
    try {
      let postRec: { facility_type: string | null } = { facility_type: localStorage.getItem('property_type')}; 
      const res = await postData('facilities', postRec);        
      setFacilities(res.records);
    } catch (err) {
      console.error(err);
    }
  }

 const fetchPosts = async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    let searchDataArr:any = [];
    const storatgeData = localStorage.getItem('searchData');
    if (storatgeData) {
      searchDataArr = JSON.parse(storatgeData);
    }
    searchDataArr['property_type'] = localStorage.getItem('property_type');

    const res = await postData(`get-property-list?page=${page}`, searchDataArr);
    const data = res.records;

    setRecords((prev:any) => {
      const newRecords = [...prev, ...data.data];
      
      // ✅ set first hotel if not already selected
      if (!selectedHotel && newRecords.length > 0) {
        setSelectedHotel(newRecords[0]);
        setDefaultLat(newRecords[0].latitude);
        setDefaultLong(newRecords[0].longitude);
      }
      return newRecords;
    });

    setHasMore(data.current_page < data.last_page);
    setPage(prev => prev + 1);
  } catch (err) {
    console.error("Error loading records:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    
     const data:any = localStorage.getItem('property_type');
     setPropertyType(data);
    loadFromLocalStorage();
    //fetchPosts(); // Load initial data
  }, []);

  useEffect(() => {
    if (inView) fetchPosts(); // Load more when in view
    window.scroll(0,0);
  }, [inView]);


  const searchProperties =() => {
    loadFromLocalStorage();
    setPage(1);
    setRecords([]);
    setHasMore(true);
    fetchPosts();
    window.location.href = '/porperty-list';
  }

  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value);
  const isChecked = e.target.checked;

  setSearchState((prev) => {
    const facilities = Array.isArray(prev.facilities) ? prev.facilities : [];

    return {
      ...prev,
      facilities: isChecked
        ? [...facilities, value] // ✅ add value safely
        : facilities.filter((id) => id !== value), // ❌ remove value safely
    };
  });
};

  
//if (!isLoaded) return <p>Loading Map...</p>;
return <> 
<InnerSearch searchAction={searchProperties} loading = {loading}/>
<div className="popular-destination py-50 pt-0 wow fadeInUp">
  <div className="container">
    <div className="hotel-listing-main">
       <div className="row">
          <div className="col-lg-3 d-none d-lg-block wow fadeInUp">
            <div className="sticky-top-left sticky-top" style={{ top: '100px' }}>
              <div className="map-view mb-4">
                <h6 className="mb-4 pt-2">Map View</h6>
                <div className="map-thumb" onClick={() => setViewType('map')}>
                  <img src="img/map-img.png"/>
                </div>
              </div>
                <h6 className="mb-3">Filters</h6>
                <div className="filter-sidebar">
                  <div className="accordion" id="accordionExample">
                    {facilities.length > 0 &&
                      <div className="accordion-item">
                        <div className="accordion-header" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Popular Benefits</div>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <ul>
                              { facilities.map((facility:any) => (
                                <li>                               
                                  <label htmlFor={"check-"+facility.id} className="checkbox">
                                    <input type="checkbox" id={"check-"+facility.id} value={facility.id} 
                                    checked={searchData.facilities && searchData.facilities.includes(facility.id)}
                                    onChange={handleFacilityChange}
                                    />
                                    <span className="checkmark"></span> {facility.title}</label> 
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      }

                      <div className="accordion-item">
                        <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Price
                        </div>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                              <Slider
                                range
                                min={1000}
                                max={20000}
                                step={10}
                                value={searchData.priceRange}
                                onChange={onSliderChange}
                              />
                              <div>
                                { searchData.priceRange ? <>₹{searchData.priceRange[0]} - ₹{searchData.priceRange[1]}</> : '₹0-1000' }
                              </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="accordion-item">
                        <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Star Rating
                        </div>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <ul>
                              <li>
                                <label htmlFor="check-15" className="checkbox">
                                  <input type="checkbox" id="check-15"/><span className="checkmark"></span> 0-1 Star</label> 
                              </li>
                              <li>
                                  <label htmlFor="check-16" className="checkbox">
                                  <input type="checkbox" id="check-16"/><span className="checkmark"></span> 1-2 Star</label> 
                              </li>
                              <li>
                                <label htmlFor="check-17" className="checkbox">
                                  <input type="checkbox" id="check-17"/><span className="checkmark"></span> 2-3 Star</label> 
                              </li>
                              <li>
                                <label htmlFor="check-18" className="checkbox">
                                  <input type="checkbox" id="check-18"/><span className="checkmark"></span> 3-4 Star</label> 
                              </li>
                              <li>
                                <label htmlFor="check-19" className="checkbox">
                                  <input type="checkbox" id="check-19"/><span className="checkmark"></span> 4-5 Star</label> 
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                    </div>
                </div>
              </div>
          </div>
          <div className="filter-mobile d-block d-lg-none">
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title" id="exampleModalLabel">Filter</h6>
                      <button className="btn-close" style= {{fontSize: "14px!important"}} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body filter-sidebar">
                      <div className="accordion" id="accordionExample2">
                        {facilities.length > 0 &&
                          <div className="accordion-item">
                            <div className="accordion-header" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Popular Benefits</div>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                              <div className="accordion-body">
                                <ul>
                                  { facilities.map((facility:any) => (
                                <li>                               
                                  <label htmlFor={"check-"+facility.id} className="checkbox">
                                  <input type="checkbox" id={"check-"+facility.id} value={facility.id} 
                                   checked={searchData.facilities && searchData.facilities.includes(facility.id)}
                                  onChange={handleFacilityChange}
                                  />
                                  <span className="checkmark"></span> {facility.title}</label> 
                                </li>
                              ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        }
                        <div className="accordion-item">
                          <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Price
                          </div>
                          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                            <Slider
                              range
                              min={1000}
                              max={20000}
                              step={10}
                              value={searchData.priceRange}
                              onChange={onSliderChange}
                            />
                            <div>
                              { searchData.priceRange ? <>₹{searchData.priceRange[0]} - ₹{searchData.priceRange[1]}</> : '₹0-1000' }
                            </div>
                        </div>
                          </div>
                        </div>
                        {/* <div className="accordion-item">
                          <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              Star Rating
                          </div>
                          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                              <ul>
                                <li>
                                  <label htmlFor="check-34" className="checkbox">
                                    <input type="checkbox" id="check-34"/><span className="checkmark"></span> 0-1 Star</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-35" className="checkbox">
                                    <input type="checkbox" id="check-35"/><span className="checkmark"></span> 1-2 Star</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-36" className="checkbox">
                                    <input type="checkbox" id="check-36"/><span className="checkmark"></span> 2-3 Star</label> 
                                </li>
                                <li>                                  
                                  <label htmlFor="check-37" className="checkbox">
                                    <input type="checkbox" id="check-37"/><span className="checkmark"></span> 3-4 Star</label> 
                                </li>
                                <li>                                  
                                  <label htmlFor="check-38" className="checkbox">
                                  <input type="checkbox" id="check-38"/><span className="checkmark"></span> 4-5 Star</label> 
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="col-lg-9 wow fadeInUp">
            <div className="d-flex align-items-center justify-content-between mb-3 text-center wow fadeInUp">
              <h1 className="ucfirst">
                    {
                      searchData?.keywords_type == 'Hotel' ? '': propertyType+'s '+ (searchData.keywords != '' ? 'in '+searchData.keywords : '')
                    }
                </h1>
              { viewType =='list' ?
                <div className="shotby-dropdown align-items-center d-none d-md-flex">
                  <p className="me-2 d-flex" style={{whiteSpace:"nowrap"}}>Sort by:</p>
                  <Select
                    value={searchData.sortby || ""}
                    placeholder="Select Sort Option"
                    onChange={(value) => handleChange("sortby", value)}
                    className="custom-ant-select"
                    allowClear
                    style={{width:"150px"}}
                  >
                    <Option value="">Clear</Option>
                    <Option value="best_match">Best Match</Option>
                    <Option value="top_reviewed">Top Reviewed</Option>
                    <Option value="lowest_price">Lowest Price First</Option>
                    <Option value="distance">Distance</Option>
                </Select>

                </div>
              :
              null

              }
              
            </div>
            {viewType =='list' && records.map((record:any) => (
            <div className="hotel-list-box">
               <div className="row">
                  <div className="col-md-4 col-5">
                    <Link href={"/property/" + record.slug}>
                      <span className="hotel-thumb">
                        <img src={record.image} alt={record.title} title={record.title} />
                      </span>
                      <span className="thumbnail-list">
                        {record.additional_images.slice(0, 3).map((imgrec: any, index: number) => (
                          <span className="small-thumb" key={index}>
                            <img src={imgrec.image} alt={`thumb-${index}`} />
                            { ((index == 2 && record.additional_images.length > 3)) &&
                              <span className="more-pic">+{record.additional_images.length - 3}</span>
                            }
                          </span>
                        ))}
                      </span>
                    </Link>
                  </div>

                 <div className="col-md-8 col-7">
                    <div className="row">
                      <div className="col-md-8">
                        <h5 className="mb-1"><Link href={"/property/" + record.slug}>{record.title}</Link></h5>
                        <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1"/> {record.city}, {record.state}</p>

                        { (record?.facilities_list && record?.facilities_list?.length > 0) &&
                        <div className="benefits-section">
                          <ul className='pro-facilities-list'>
                             {record.facilities_list.slice(0,6).map((facilityRow:any) => (
                              <li><img src="img/gray_tick.svg"/> {facilityRow.title}</li>
                             ))}
                          </ul>
                        </div>
                        }
                      </div>
                      <div className="view-details mt-1 d-block d-md-none text-end w-100%">
                        <Link href={"/property/" + record.slug}>View Details</Link>
                      </div>

                      <div className="col-md-12 d-none d-md-block">
                        {/* <div className="rating-section">
                          <div className="star-rating">
                              <img src="img/star_icon.svg"/>
                              <img src="img/star_icon.svg"/>
                              <img src="img/star_icon.svg"/>
                              <img src="img/star_icon.svg"/>
                              <img src="img/star_icon.svg"/>
                          </div>
                          <div className="total-review-section ">
                            <div className="overall-rating">7.3</div>
                            <div className="rating-overview">
                              <h6>Very Good</h6>
                              <p>4634 Reviews</p>
                            </div>
                          </div>
                        </div> */}
                        <div className="view-details text-end w-100%">
                          <Link href={"/property/" + record.slug}>View Details</Link>
                        </div>
                      </div>
                      
                    </div>
                   
                    <hr className="d-none d-md-block"/>
                    <div className="row align-items-center d-none d-md-flex">
                       <div className="col-md-7 mb-2 mb-md-0">
                        {record.price > 0 &&
                          <div className="price-del text-end">
                            <del>Rs.{record.price}</del>
                          </div>
                        }
                          <div className="new-price d-flex text-end align-items-center justify-content-end">
                            <p className="me-2">Avg price per night</p>
                            <p className="new-price-big red-text fw-bold">Rs. {record.lowest_price}</p>
                          </div>
                          {record.cancellation_policy > 1 &&
                          <span className="free-cancel justify-content-end w-100 d-flex">+ {record.cancellation_policy == 2 ?'FREE CANCELLATION' :'NO CANCELLATION'}</span>
                          }
                        </div>
                        <div className="col-md-5 d-flex flex-column text-end">
                           <Link href={"/property/" + record.slug} className="btn btn-primary">Check Availability</Link>
                        </div>
                    </div>

                    {/* <div className="rating-section d-block d-md-none">
                         <div className="star-rating">
                            <img src="img/star_icon.svg"/>
                            <img src="img/star_icon.svg"/>
                            <img src="img/star_icon.svg"/>
                            <img src="img/star_icon.svg"/>
                            <img src="img/star_icon.svg"/>
                         </div>
                         <div className="total-review-section ">
                           <div className="overall-rating">7.3</div>
                           <div className="rating-overview">
                             <h6>Very Good</h6>
                             <p>4634 Reviews</p>
                           </div>
                         </div>
                    </div> */}
                 </div>
               </div>

               <hr className="my-2 d-flex d-md-none"/>
               <div className="row d-flex d-md-none">                
                  <div className="col-6">
                    <div className="price-del text-end">
                      <del>Rs.{record.price}</del>
                    </div>
                    <div className="new-price d-flex text-end align-items-center justify-content-end">
                      <p className="new-price-big red-text fw-bold">Rs. {record.lowest_price}</p>
                    </div>
                      {record.cancellation_policy > 1 &&
                        <span className="free-cancel justify-content-end w-100 d-flex">+ {record.cancellation_policy == 2 ?'FREE CANCELLATION' :'NO CANCELLATION'}</span>
                        }
                  </div>
                  <div className="col-6 d-flex flex-column text-end">
                      <Link href={"/property/" + record.slug} className="btn btn-primary">Check Availability</Link>
                  </div>
               </div>
            </div>
            ))}

          {(viewType =='map' && defaultLat) ?
         
          <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedHotel
                ? { lat: Number(selectedHotel.latitude), lng: Number(selectedHotel.longitude) }
                : { lat: Number(defaultLat), lng: Number(defaultLong) }
              }
              zoom={10}
            >
              {records.map((hotel:any) => {
                if (!hotel.latitude || !hotel.longitude) return null; // skip invalid ones

                return (
                  <Marker
                    key={hotel.id}
                    onClick={() =>
                      setSelectedHotel({
                        ...hotel,
                        latitude: Number(hotel.latitude),
                        longitude: Number(hotel.longitude),
                      })
                    }
                    position={{
                      lat: Number(hotel.latitude),
                      lng: Number(hotel.longitude),
                    }}
                    // icon={
                    //   selectedHotel?.id === hotel.id
                    //     ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    //     : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    // }
                  />
                );
              })}

              {selectedHotel && (
                <InfoWindow
                  position={{ lat: Number(selectedHotel.latitude), lng: Number(selectedHotel.longitude) }}
                  onCloseClick={() => setSelectedHotel(null)}
                >
                  <div>
                    <h6 className="font-bold">{selectedHotel.title}</h6>
                    <p>📍{selectedHotel.city}, {selectedHotel.state}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
            :
            null
            }
            
            { (!hasMore && records.length == 0)  &&
                <div className="text-center py-4 mt-4 pt-4">
                  No property found
              </div>            }
            {hasMore && (
            <div ref={ref} className="text-center py-4">
              {loading ? "Loading..." : "Scroll down to load more"}
              {loading && 
                <div style={{ width: '100%', maxWidth: '1000px' }}>
                  <Skeleton.Input active={true} block style={{height:200, marginTop:20}}  />
                  <Skeleton.Input active={true} block style={{height:200, marginTop:20}}  />
                  <Skeleton.Input active={true} block style={{height:200, marginTop:20}}  />
                </div>
               }
            </div>
          )}
            
          </div>
       </div> 
    </div>

    <div className="fast-fects-section py-50 pb-0">
       <div className="container">
          <div className="col-md-10 mx-auto">
             <div className="section-title text-center mt-0 mt-md-5 mb-3">
              <h2>Fast Facts About {searchData.keywords}, India</h2>
             </div>
             <div className="fast-fects-content">
               <dl>
                  <dt>Accommodations</dt>
                  <dd>12,786 Properties</dd>
                </dl>
                <dl>
                  <dt>Popular Hotel</dt>
                  <dd>The LaliT New Delhi</dd>
                </dl>
                <dl>
                  <dt>Popular Area</dt>
                  <dd>Gurgaon</dd>
                </dl>
                <dl>
                  <dt>Nightly Rates Form</dt>
                  <dd>₹429</dd>
                </dl>
                <dl>
                  <dt>Airport</dt>
                  <dd>Indira Gandhi International Airport</dd>
                </dl>
                <dl>
                  <dt>Reasons to Visit</dt>
                  <dd>Sightseeing, Shopping Restaurants</dd>
                </dl>
             </div>
          </div>
       </div>
    </div>
  </div>
</div>
<div className="offcanvas offcanvas-end search-modelbox p-0" tabIndex={-1} id="offcanvasSearchbox" aria-labelledby="offcanvasSearchboxLabel">
  <div className="offcanvas-header p-2">
    <button className="back-btn me-2" data-bs-dismiss="offcanvas" aria-label="Close"><img src="img/back_search.svg"/></button>
    <span className="popup-title">Edit Search</span>
  </div>
  <InnerMobileSearch searchAction={searchProperties} loading = {loading} />
</div>

  </>;
}