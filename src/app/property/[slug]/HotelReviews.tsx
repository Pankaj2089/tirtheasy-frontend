'use client'
import { useEffect, useState, useRef } from 'react';

export default function HotelReviews() {

return (
<>
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
    </>
  );
}