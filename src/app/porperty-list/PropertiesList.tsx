'use client'
import { useEffect, useState } from 'react';
import { getData, postData } from '../utils/api';
import React from 'react';
import { useInView } from "react-intersection-observer";
import { log } from 'console';
import InnerSearch from '../components/InnerSearch';
import { Form, Slider,Skeleton } from 'antd';
import Link from 'next/link';

export default function propertiesList() {

  const [records, setRecords] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView(); // triggers when the ref is visible
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [propertyType, setPropertyType] = useState(false);

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
  }, [])

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {

      let searchDataArr = [];
      const storatgeData = localStorage.getItem('searchData');
      if (storatgeData) {
        searchDataArr = JSON.parse(storatgeData);
      }
      searchDataArr['property_type'] = localStorage.getItem('property_type');
      const res = await postData(`get-property-list?page=${page}`, searchDataArr);
      const data = await res.records;

      setRecords((prev:any) => [...prev, ...data.data]);
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
  }

return <> 
<InnerSearch searchAction={searchProperties} loading = {loading}/>
<div className="popular-destination py-50 pt-0 wow fadeInUp">
  <div className="container">
    <div className="hotel-listing-main">
       <div className="row">
          <div className="col-lg-3 d-none d-lg-block wow fadeInUp">
            <div className="map-view mb-4">
               <h6 className="mb-3">Map View</h6>
               <div className="map-thumb">
                 <img src="img/map-img.png"/>
               </div>
            </div>
              <h6 className="mb-3">Filters</h6>
              <div className="filter-sidebar">
                 <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <div className="accordion-header" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Popular Benefits</div>
                      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <ul>
                            <li>                               
                               <label htmlFor="check-1" className="checkbox">
                                <input type="checkbox" id="check-1"/><span className="checkmark"></span> Breakfast included</label> 
                            </li>
                            <li>                               
                               <label htmlFor="check-2" className="checkbox">
                                <input type="checkbox" id="check-2"/><span className="checkmark"></span> Pay now</label> 
                            </li>
                            <li>                               
                               <label htmlFor="check-3" className="checkbox">
                                <input type="checkbox" id="check-3"/><span className="checkmark"></span> Free cancellation</label> 
                            </li>
                            <li>                               
                               <label htmlFor="check-4" className="checkbox">
                                <input type="checkbox" id="check-4"/><span className="checkmark"></span> Coffee/tea maker</label> 
                            </li>
                            <li>                              
                               <label htmlFor="check-5" className="checkbox"> 
                                <input type="checkbox" id="check-5"/><span className="checkmark"></span> Heating</label> 
                            </li>
                            <li>                               
                               <label htmlFor="check-6" className="checkbox">
                                <input type="checkbox" id="check-6"/><span className="checkmark"></span> Internet access</label> 
                            </li>
                            <li>                               
                               <label htmlFor="check-7" className="checkbox">
                                <input type="checkbox" id="check-7"/><span className="checkmark"></span> Guest rating: 6+ Good</label> 
                            </li>
                            <li>                               
                               <label htmlFor="check-8" className="checkbox">
                                <input type="checkbox" id="check-8"/><span className="checkmark"></span> Location: 8+ Excellent</label> 
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                    <div className="accordion-item">
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
                        <div className="accordion-item">
                          <div className="accordion-header" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Popular Benefits</div>
                          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                              <ul>
                                <li>
                                  <label htmlFor="check-20" className="checkbox">
                                    <input type="checkbox" id="check-20"/> <span className="checkmark"></span> Breakfast included</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-21" className="checkbox">
                                    <input type="checkbox" id="check-21"/> <span className="checkmark"></span> Pay now</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-22" className="checkbox">
                                    <input type="checkbox" id="check-22"/> <span className="checkmark"></span> Free cancellation</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-23" className="checkbox">
                                    <input type="checkbox" id="check-23"/> <span className="checkmark"></span> Coffee/tea maker</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-24" className="checkbox">
                                    <input type="checkbox" id="check-24"/> <span className="checkmark"></span> Heating</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-25" className="checkbox">
                                    <input type="checkbox" id="check-25"/> <span className="checkmark"></span> Internet access</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-26" className="checkbox">
                                    <input type="checkbox" id="check-26"/> <span className="checkmark"></span> Guest rating: 6+ Good</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-27" className="checkbox">
                                    <input type="checkbox" id="check-27"/> <span className="checkmark"></span> Location: 8+ Excellent</label> 
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Price
                          </div>
                          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                              <ul>
                                <li>
                                  <label htmlFor="check-28" className="checkbox">
                                    <input type="checkbox" id="check-28"/><span className="checkmark"></span> - 1000k</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-29" className="checkbox">
                                    <input type="checkbox" id="check-29"/><span className="checkmark"></span> 1000k-5000k</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-30" className="checkbox">
                                    <input type="checkbox" id="check-30"/><span className="checkmark"></span> 5000k-10,000k</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-31" className="checkbox">
                                    <input type="checkbox" id="check-31"/><span className="checkmark"></span> 10,000k-15,000k</label> 
                                </li>
                                <li>
                                  <label htmlFor="check-32" className="checkbox">
                                    <input type="checkbox" id="check-32"/><span className="checkmark"></span> 15,000k-20,000k</label> 
                                </li>
                                <li>
                                    <label htmlFor="check-33" className="checkbox">
                                    <input type="checkbox" id="check-33"/><span className="checkmark"></span> + 20,000k</label> 
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div className="col-lg-9 wow fadeInUp">
            <div className="d-flex align-items-center justify-content-between mb-3 text-center wow fadeInUp">
              <h1 className="ucfirst">{propertyType+'s'} in {searchData.keywords}</h1>
              <div className="shotby-dropdown align-items-center d-none d-md-flex">
                <p className="me-2 d-flex" style={{whiteSpace:"nowrap"}}>Sort by:</p>
                <select className="form-select" aria-label="Default select example" name='sortby' value={searchData.sortby} onChange={(e) => handleChange('sortby', e.target.value)}>
                  <option selected value="">Clear</option>
                  <option value="best_match"  >Best Match</option>
                  <option value="top_reviewed" >Top Reviewed</option>
                  <option value="lowest_price">Lowest Price First</option>
                  <option value="distance" >Distance</option>
                </select>
              </div>
            </div>
            {records.map((record:any) => (
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

                    <div className="view-details mt-3 d-block d-md-none text-end w-100%">
                      <Link href={"/property/" + record.slug}>View Details</Link>
                    </div>
                  </div>

                 <div className="col-md-8 col-7">
                    <div className="row">
                      <div className="col-md-8">
                        <h5 className="mb-1"><Link href={"/property/" + record.slug}>{record.title}</Link></h5>
                        <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1"/> {record.city}, {record.state}</p>

                        { (record?.facilities_list && record?.facilities_list?.length > 0) &&
                        <div className="benefits-section">
                          <ul>
                             {record.facilities_list.map((facilityRow:any) => (
                              <li><img src="img/gray_tick.svg"/> {facilityRow.title}</li>
                             ))}
                          </ul>
                        </div>
                        }
                      </div>

                      <div className="col-md-4 d-none d-md-block">
                        <div className="rating-section">
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
                        </div>
                        <div className="view-details mt-2 mt-md-5 text-end w-100%">
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

                    <div className="rating-section d-block d-md-none">
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
                    </div>
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
            { (!hasMore && records.length == 0)  &&
                <div className="text-center py-4 mt-4 pt-4">
                  Records Not found
              </div>            }
            {hasMore && (
            <div ref={ref} className="text-center py-4">
              {loading ? "Loading..." : "Scroll down to load more"}
              {loading && 
                <div style={{ width: '100%', maxWidth: '1000px' }}>
                <Skeleton.Input active={true} style={{height:200,  width: '90dvw', marginTop:20, maxWidth:isiPad ? 680 : 980 }}  />
                <Skeleton.Input active={true} style={{height:200,  width: '90dvw', marginTop:20, maxWidth:isiPad ? 680 : 980 }}  />
                <Skeleton.Input active={true} style={{height:200,  width: '90dvw', marginTop:20, maxWidth:isiPad ? 680 : 980 }}  />
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
  <div className="offcanvas-body filter-accordion">
      <form className="main-search-form" action="" method="post">
               <div className="input-group search-main-box">
                  <input type="button" className="form-control search-box" placeholder="Search" />
                </div>
                <div className="start-end-date">
                   <div className="start-date">
                     <span className="date-picker-icon"><img src="img/date.svg"/></span>
                     <div className="selected-date-day">
                          <div className="date">19 Jun 2025</div>
                          <div className="day">Thursday</div>
                     </div>
                   </div>
                   <div className="start-date end-date">
                     <span className="date-picker-icon"><img src="img/date.svg"/></span>
                     <div className="selected-date-day">
                          <div className="date">19 Jun 2025</div>
                          <div className="day">Thursday</div>
                     </div>
                   </div>
                </div>
                <div className="slect-audience" >
                    <div className="select-member" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                      <span className="date-picker-icon"><img src="img/user.svg"/></span>
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
                   <button type="button" className="btn btn-primary">Search</button>
                </div>
        </form> 
  </div>
</div>

  </>;
}