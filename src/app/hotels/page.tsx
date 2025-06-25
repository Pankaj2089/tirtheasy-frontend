import type { Metadata } from "next";
import InnerSearch from "../homepage-components/InnerSearch";
export const metadata: Metadata = {
  title: "Tirtheasy Hotels",
  description: "Introducing India's first Religious travel platform Dedicated to Booking verified Dharmshala, Guest house, and Travel Tickets with Real time availability, and effortless booking, all in one place.",
};

export default function hotelsPage() {
  return <>
      <InnerSearch />

<div className="popular-destination py-50 pt-0 wow fadeInUp" style={{visibility: "visible", animationName: "fadeInUp"}}>
  <div className="container">
    <div className="section-title text-center wow fadeInUp" style={{visibility: "visible", animationName: "fadeInUp"}}>
      <h1 className="">Hotels in New Delhi</h1>
    </div>

    <div className="hotel-listing-main">
       <div className="row">
          <div className="col-lg-3 d-none d-lg-block wow fadeInUp" style={{visibility: "visible", animationName: "fadeInUp"}}>
              <div className="filter-sidebar">
                 <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <div className="accordion-header"  data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Popular Benefits</div>
                      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <ul>
                            <li>
                               <input type="checkbox" id="check-1" />
                               <label htmlFor="check-1"> Breakfast included</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-2" />
                               <label htmlFor="check-2"> Pay now</label> 
                            </li>


                            <li>
                               <input type="checkbox" id="check-3" />
                               <label htmlFor="check-3"> Free cancellation</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-4" />
                               <label htmlFor="check-4"> Coffee/tea maker</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-5" />
                               <label htmlFor="check-5"> Heating</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-6" />
                               <label htmlFor="check-6"> Internet access</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-7" />
                               <label htmlFor="check-7"> Guest rating: 6+ Good</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-8" />
                               <label htmlFor="check-8"> Location: 8+ Excellent</label> 
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
                           <ul>
                            <li>
                               <input type="checkbox" id="check-9" />
                               <label htmlFor="check-9">- 1000k</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-10" />
                               <label htmlFor="check-10">1000k-5000k</label> 
                            </li>


                            <li>
                               <input type="checkbox" id="check-11" />
                               <label htmlFor="check-11">5000k-10,000k</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-12" />
                               <label htmlFor="check-12">10,000k-15,000k</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-13" />
                               <label htmlFor="check-13">15,000k-20,000k</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-14" />
                               <label htmlFor="check-14">+ 20,000k</label> 
                            </li>

                          </ul>
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
                               <input type="checkbox" id="check-15" />
                               <label htmlFor="check-15">0-1 Star</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-16" />
                               <label htmlFor="check-16">1-2 Star</label> 
                            </li>


                            <li>
                               <input type="checkbox" id="check-17" />
                               <label htmlFor="check-17">2-3 Star</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-18" />
                               <label htmlFor="check-18">3-4 Star</label> 
                            </li>

                            <li>
                               <input type="checkbox" id="check-19" />
                               <label htmlFor="check-19">4-5 Star</label> 
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                          Filter Title #4
                      </div>
                      <div id="collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                         
                        </div>
                      </div>
                    </div>



                    <div className="accordion-item">
                      <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                          Filter Title #5
                      </div>
                      <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        
                      </div>
                    </div>



                    <div className="accordion-item">
                      <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                          Filter Title #6
                      </div>
                      <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>

          <div className="filter-mobile d-block d-lg-none">
            
            <div className="mob-filter fixed-bottom">
              <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Filter</a>
            </div>

              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h6 className="modal-title" id="exampleModalLabel">Filter</h6>
                      <button type="button" className="btn-close" style={{fontSize:"14px!important"}} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body filter-sidebar">
                      <div className="accordion" id="accordionExample2">
                        <div className="accordion-item">
                          <div className="accordion-header" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Popular Benefits</div>
                          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                              <ul>
                                <li>
                                  <input type="checkbox" id="check-20" />
                                  <label htmlFor="check-20"> Breakfast included</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-21" />
                                  <label htmlFor="check-21"> Pay now</label> 
                                </li>


                                <li>
                                  <input type="checkbox" id="check-22" />
                                  <label htmlFor="check-22"> Free cancellation</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-23" />
                                  <label htmlFor="check-23"> Coffee/tea maker</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-24" />
                                  <label htmlFor="check-24"> Heating</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-25" />
                                  <label htmlFor="check-25"> Internet access</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-26" />
                                  <label htmlFor="check-26"> Guest rating: 6+ Good</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-27" />
                                  <label htmlFor="check-27"> Location: 8+ Excellent</label> 
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
                                  <input type="checkbox" id="check-28" />
                                  <label htmlFor="check-28">- 1000k</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-29" />
                                  <label htmlFor="check-29">1000k-5000k</label> 
                                </li>


                                <li>
                                  <input type="checkbox" id="check-30" />
                                  <label htmlFor="check-30">5000k-10,000k</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-31" />
                                  <label htmlFor="check-31">10,000k-15,000k</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-32" />
                                  <label htmlFor="check-32">15,000k-20,000k</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-33" />
                                  <label htmlFor="check-33">+ 20,000k</label> 
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
                                  <input type="checkbox" id="check-15" />
                                  <label htmlFor="check-15">0-1 Star</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-16" />
                                  <label htmlFor="check-16">1-2 Star</label> 
                                </li>


                                <li>
                                  <input type="checkbox" id="check-17" />
                                  <label htmlFor="check-17">2-3 Star</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-18" />
                                  <label htmlFor="check-18">3-4 Star</label> 
                                </li>

                                <li>
                                  <input type="checkbox" id="check-19" />
                                  <label htmlFor="check-19">4-5 Star</label> 
                                </li>

                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                              Filter Title #4
                          </div>
                          <div id="collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                            
                            </div>
                          </div>
                        </div>



                        <div className="accordion-item">
                          <div className="accordion-header collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                              Filter Title #5
                          </div>
                          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                            
                          </div>
                        </div>



                        <div className="accordion-item">
                          <div className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                              Filter Title #6
                          </div>
                          <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>




          </div>

          <div className="col-lg-9 wow fadeInUp" style={{visibility: "visible",  animationName: "fadeInUp"}}>
            <div className="hotel-list-box ">
               <div className="row">
                 <div className="col-md-4 mb-3 mb-md-0">
                    <a href="#" className="hotel-thumb">
                      <img src="img/hotel_thumbnail-1.png" />
                    </a>
                 </div>
                 <div className="col-md-8">
                   <div className="row">
                     <div className="col-md-8">
                       <h5 className="mb-1"><a href="#">The Park New Delhi Hotel</a></h5>
                       <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1" /> Central Delhi, New Delhi and NCR</p>

                       <div className="benefits-section">
                         <ul>
                          <li><img src="img/gray_tick.svg" /> Breakfast</li>
                          <li><img src="img/gray_tick.svg" /> Spa Discount</li>

                          <li><img src="img/gray_tick.svg" /> Free Wi-Fi</li>

                          <li><img src="img/gray_tick.svg" /> Parking</li>
                         </ul>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="rating-section">
                         <div className="star-rating">
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                         </div>
                         <div className="total-review-section">
                           <div className="overall-rating">7.3</div>
                           <div className="rating-overview">
                             <h6>Very Good</h6>
                             <p>4634 Reviews</p>
                           </div>
                         </div>
                       </div>
                       <div className="view-details mt-2 mt-md-5 text-end w-100%">
                         <a href="#">View Details</a>
                       </div>
                     </div>
                   </div>
                   
                   <hr />
                    <div className="row align-items-center">
                       <div className="col-md-7 mb-2 mb-md-0">
                          <div className="price-del text-end">
                            <del>Rs.30,596</del>
                          </div>
                          <div className="new-price d-flex text-end align-items-center justify-content-end">
                            <p className="me-2">Avg price per night</p>
                            <p className="new-price-big red-text fw-bold">Rs. 13,567</p>
                          </div>
                        </div>

                        <div className="col-md-5 text-end">
                           <a href="#" className="btn btn-primary">Check Availability</a>
                        </div>


                    </div>

                 </div>
               </div>
            </div>

            <div className="hotel-list-box ">
               <div className="row">
                 <div className="col-md-4 mb-3 mb-md-0">
                  <div id="carouselExampleDark" className=" carousel slide">
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <a href="#" className="hotel-thumb">
                              <img src="img/hotel_thumbnail-1.png" className="d-block" />                           
                            </a> 
                          </div>
                          <div className="carousel-item">
                            <a href="#" className="hotel-thumb">
                              <img src="img/hotel_thumbnail-2.png" className="d-block" />                           
                            </a>
                          </div>

                        </div>
                        
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                          <img src="img/left_arrow_slide.svg" />
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                          <img src="img/right_arrow_slide.svg" />
                        </button>
                  </div>

                 </div>
                 <div className="col-md-8">
                   <div className="row">
                     <div className="col-md-8">
                       <h5 className="mb-1"><a href="#">The Park New Delhi Hotel</a></h5>
                       <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1" /> Central Delhi, New Delhi and NCR</p>

                       <div className="benefits-section">
                         <ul>
                          <li><img src="img/gray_tick.svg" /> Breakfast</li>
                          <li><img src="img/gray_tick.svg" /> Spa Discount</li>

                          <li><img src="img/gray_tick.svg" /> Free Wi-Fi</li>

                          <li><img src="img/gray_tick.svg" /> Parking</li>
                         </ul>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="rating-section">
                         <div className="star-rating">
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                         </div>
                         <div className="total-review-section">
                           <div className="overall-rating">7.3</div>
                           <div className="rating-overview">
                             <h6>Very Good</h6>
                             <p>4634 Reviews</p>
                           </div>
                         </div>
                       </div>
                       <div className="view-details mt-2 mt-md-5 text-end w-100%">
                         <a href="#">View Details</a>
                       </div>
                     </div>
                   </div>
                   
                   <hr />
                    <div className="row align-items-center">
                       <div className="col-md-7 mb-2 mb-md-0">
                          <div className="price-del text-end">
                            <del>Rs.30,596</del>
                          </div>
                          <div className="new-price d-flex text-end align-items-center justify-content-end">
                            <p className="me-2">Avg price per night</p>
                            <p className="new-price-big red-text fw-bold">Rs. 13,567</p>
                          </div>
                        </div>

                        <div className="col-md-5 text-end">
                           <a href="#" className="btn btn-primary">Check Availability</a>
                        </div>
                    </div>
                 </div>
               </div>
            </div>


            <div className="hotel-list-box ">
               <div className="row">
                 <div className="col-md-4 mb-3 mb-md-0">
                    <a href="#" className="hotel-thumb">
                      <img src="img/hotel_thumbnail-1.png" />
                    </a>
                 </div>
                 <div className="col-md-8">
                   <div className="row">
                     <div className="col-md-8">
                       <h5 className="mb-1"><a href="#">The Park New Delhi Hotel</a></h5>
                       <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1" /> Central Delhi, New Delhi and NCR</p>

                       <div className="benefits-section">
                         <ul>
                          <li><img src="img/gray_tick.svg" /> Breakfast</li>
                          <li><img src="img/gray_tick.svg" /> Spa Discount</li>
                          <li><img src="img/gray_tick.svg" /> Free Wi-Fi</li>
                          <li><img src="img/gray_tick.svg" /> Parking</li>
                         </ul>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="rating-section">
                         <div className="star-rating">
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                         </div>
                         <div className="total-review-section">
                           <div className="overall-rating">7.3</div>
                           <div className="rating-overview">
                             <h6>Very Good</h6>
                             <p>4634 Reviews</p>
                           </div>
                         </div>
                       </div>
                       <div className="view-details mt-2 mt-md-5 text-end w-100%">
                         <a href="#">View Details</a>
                       </div>
                     </div>
                   </div>
                   
                   <hr />
                    <div className="row align-items-center">
                       <div className="col-md-7 mb-2 mb-md-0">
                          <div className="price-del text-end">
                            <del>Rs.30,596</del>
                          </div>
                          <div className="new-price d-flex text-end align-items-center justify-content-end">
                            <p className="me-2">Avg price per night</p>
                            <p className="new-price-big red-text fw-bold">Rs. 13,567</p>
                          </div>
                        </div>
                        <div className="col-md-5 text-end">
                           <a href="#" className="btn btn-primary">Check Availability</a>
                        </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="hotel-list-box ">
               <div className="row">
                 <div className="col-md-4 mb-3 mb-md-0">
                    <a href="#" className="hotel-thumb">
                      <img src="img/hotel_thumbnail-1.png" />
                    </a>
                 </div>
                 <div className="col-md-8">
                   <div className="row">
                     <div className="col-md-8">
                       <h5 className="mb-1"><a href="#">The Park New Delhi Hotel</a></h5>
                       <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1" /> Central Delhi, New Delhi and NCR</p>

                       <div className="benefits-section">
                         <ul>
                          <li><img src="img/gray_tick.svg" /> Breakfast</li>
                          <li><img src="img/gray_tick.svg" /> Spa Discount</li>

                          <li><img src="img/gray_tick.svg" /> Free Wi-Fi</li>

                          <li><img src="img/gray_tick.svg" /> Parking</li>
                         </ul>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="rating-section">
                         <div className="star-rating">
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                         </div>
                         <div className="total-review-section">
                           <div className="overall-rating">7.3</div>
                           <div className="rating-overview">
                             <h6>Very Good</h6>
                             <p>4634 Reviews</p>
                           </div>
                         </div>
                       </div>
                       <div className="view-details mt-2 mt-md-5 text-end w-100%">
                         <a href="#">View Details</a>
                       </div>
                     </div>
                   </div>
                   
                   <hr />
                    <div className="row align-items-center">
                       <div className="col-md-7 mb-2 mb-md-0">
                          <div className="price-del text-end">
                            <del>Rs.30,596</del>
                          </div>
                          <div className="new-price d-flex text-end align-items-center justify-content-end">
                            <p className="me-2">Avg price per night</p>
                            <p className="new-price-big red-text fw-bold">Rs. 13,567</p>
                          </div>
                        </div>
                        <div className="col-md-5 text-end">
                           <a href="#" className="btn btn-primary">Check Availability</a>
                        </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="hotel-list-box ">
               <div className="row">
                 <div className="col-md-4 mb-3 mb-md-0">
                  <div id="carouselExampleDark2" className=" carousel slide">
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <a href="#" className="hotel-thumb">
                              <img src="img/hotel_thumbnail-1.png" className="d-block" />                           
                            </a> 
                          </div>
                          <div className="carousel-item">
                            <a href="#" className="hotel-thumb">
                              <img src="img/hotel_thumbnail-2.png" className="d-block" />                           
                            </a>
                          </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="prev">
                          <img src="img/left_arrow_slide.svg" />
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="next">
                          <img src="img/right_arrow_slide.svg" />
                        </button>
                  </div>

                 </div>
                 <div className="col-md-8">
                   <div className="row">
                     <div className="col-md-8">
                       <h5 className="mb-1"><a href="#">The Park New Delhi Hotel</a></h5>
                       <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1" /> Central Delhi, New Delhi and NCR</p>

                       <div className="benefits-section">
                         <ul>
                          <li><img src="img/gray_tick.svg" /> Breakfast</li>
                          <li><img src="img/gray_tick.svg" /> Spa Discount</li>

                          <li><img src="img/gray_tick.svg" /> Free Wi-Fi</li>

                          <li><img src="img/gray_tick.svg" /> Parking</li>
                         </ul>
                       </div>
                     </div>
                     <div className="col-md-4">
                       <div className="rating-section">
                         <div className="star-rating">
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                            <img src="img/star_icon.svg" />
                         </div>
                         <div className="total-review-section">
                           <div className="overall-rating">7.3</div>
                           <div className="rating-overview">
                             <h6>Very Good</h6>
                             <p>4634 Reviews</p>
                           </div>
                         </div>
                       </div>
                       <div className="view-details mt-2 mt-md-5 text-end w-100%">
                         <a href="#">View Details</a>
                       </div>
                     </div>
                   </div>
                   
                   <hr />
                    <div className="row align-items-center">
                       <div className="col-md-7 mb-2 mb-md-0">
                          <div className="price-del text-end">
                            <del>Rs.30,596</del>
                          </div>
                          <div className="new-price d-flex text-end align-items-center justify-content-end">
                            <p className="me-2">Avg price per night</p>
                            <p className="new-price-big red-text fw-bold">Rs. 13,567</p>
                          </div>
                        </div>
                        <div className="col-md-5 text-end">
                           <a href="#" className="btn btn-primary">Check Availability</a>
                        </div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="paggination-section ">
               <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link"><img src="img/left_paggination.svg" /></a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#"><img src="img/right_paggination.svg" /></a>
                    </li>
                  </ul>
                </nav>
            </div>

          </div>
       </div>
    </div>

    <div className="fast-fects-section py-50 pb-0">
       <div className="container">
          <div className="col-md-10 mx-auto">
             <div className="section-title text-center mt-0 mt-md-5 mb-3">
              <h2>Fast Facts About New Delhi, India</h2>
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
  </>;
}