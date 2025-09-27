"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import RecommendedHotels from '@/app/property/[slug]/RecommendedHotels';

export default function BookingCancel() {
  const [hotelData, setHotelData] = useState<any>([]);
  const router = useRouter();
      
   // Get array from localStorage
const loadFromLocalStorage = () => {
    if(!localStorage.getItem("userDetails")){
        router.push("/checkout/user-information");
    }
    const data = localStorage.getItem('searchData');
    if (data) {
    const user_data = localStorage.getItem('userData');    if(!data){
        router.push("/porperty-list");
    }else if(!user_data){
        router.push("/checkout/user-information");
    }else{
        let searData = JSON.parse(data);
        let usrData = JSON.parse(user_data);
        if(!searData.start_date || !searData.end_date || searData.rooms <= 0 || searData.adult <= 0 || searData.roomID <= 0 || searData.roomPriceID <= 0 ){
            router.push("/porperty-list");
        }else if(!usrData.name || !usrData.email || !usrData.mobile ){
            router.push("/checkout/user-information");
        }
    }

    const hotel_data = localStorage.getItem("hotelData");
    if (hotel_data) {
        let setData = JSON.parse(hotel_data);
        setHotelData(setData); 
    }
};
}



useEffect(() => {
    if(!localStorage.getItem("accessToken")){        
      router.push("/checkout/user-information");
    } 
    loadFromLocalStorage();  
}, []);

return (
  <>
<div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2">
        
  </div>
</div>

<div className="cancellation-box">
    <div className="container">
        <div className="row">
            <div className="col-lg-9 mb-5 mx-auto text-center d-flex flex-column align-items-center justify-content-center">
                <div className="cancellation-icon mb-2">
                    <img src="/img/canceled.gif"/>
                </div>
                <div className="cancellation-content">
                    <h2 className="mb-3">Your Payment Has Been Cancelled</h2>
                    <p className="mb-4">It looks like you cancelled your payment. No problem! Your order is secure and ready. complete your payment anytime, or contact us it you need our assistance!</p>
                    <div className="btn-set-links mt-4 mb-2">
                        <a href="#" className="red-text fw-bold">Find your perfect stay in ayodhya!</a>
                    </div>
                    <div className="btn-set-link text-center">
                        <Link href="/porperty-list" className="btn btn-primary">Book Again</Link>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

    <div className="cancel-booking-section py-50 mb-4">
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h5 className="fw-semibold mb-2">Booking Details</h5>
                    <div className="hotel-cancell-booking p-3 rounded-3 bg-white mb-3 mb-lg-0">
                        <div className="row align-items-center">
                            <div className="col-lg-4">
                                <div className="hotal-thumb">
                                    <img src={hotelData.image} alt={hotelData.title} title={hotelData.title} />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="hotel-detail-list mt-3 mt-lg-0">
                                    <h5 className="mb-2">{hotelData.title}</h5>
                                    <p dangerouslySetInnerHTML={{ __html: hotelData.description }} ></p>
                                    <div className="location d-flex align-items-center">
                                        <img src="/img/location_pin_fill.svg" className="me-2"/> {hotelData.city}, {hotelData.state}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="help-support">
                        <h5 className="fw-semibold mb-2">Help & Support </h5>
                        <div className="row align-items-center contant-info">
                            <div className="col-lg-12 mb-2">
                                <a href="tel:+91 96640 40225" className="contact-info-box contact-info-link bg-white">
                                    <span className="call-us-icon">
                                        <img src="/img/call_us_red.svg"/>
                                    </span>
                                    <span className="contact-info">
                                        <span className="contact-label">Call Us</span>
                                        <span className="mob-no">+91 96640 40225</span>
                                    </span>
                                </a>
                            </div>

                            <div className="col-lg-12 mb-2">
                                <a href="mailto:support@tirtheasy.com" className="contact-info-box contact-info-link bg-white">
                                    <span className="call-us-icon">
                                        <img src="/img/mail_red.svg"/>
                                    </span>
                                    <span className="contact-info">
                                        <span className="contact-label">Email Us</span>
                                        <span className="mob-no">support@tirtheasy.com</span>
                                    </span>
                                </a>
                            </div>

                            <div className="col-lg-12 mb-3">
                                <a href="https://wa.me/9664040225" target='_blank' className="contact-info-box contact-info-link bg-white">
                                    <span className="call-us-icon">
                                        <img src="/img/whatsapp_red.svg"/>
                                    </span>
                                    <span className="contact-info">
                                        <span className="contact-label">Chat With Us</span>
                                        <span className="mob-no">WhatApp</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <RecommendedHotels hotelId={hotelData.id} hotelCity={hotelData.city} />
  </>
  );
}