"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { format,differenceInDays  } from 'date-fns';
import { postData } from '../../../utils/api';
import {Select} from "antd";

import { log } from 'console';
import { useRouter } from "next/navigation";
import CheckoutFooter from '@/app/components/CheckoutFooter';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintInvoice from './PrintInvoice';

export  default function BookingConfirmPage({ params }: { params: { slug: string } }) {

    const resolvedParams = params;
    const router = useRouter();
    const [orderData, setOrderData] = useState<any>([]);
    const [checkInTime, setCheckInTime] = useState<any>();
    const [checkOutTime, setCheckOutTime] = useState<any>();
    const [numberofNights, setNumberOfNights] = useState<any>();
    const [printInvoice, setPrintInvoice] = useState<any>(false);

    //console.log(resolvedParams.slug);
    const [headingCounter, setHeadingCounter] = useState(true);

    const invoiceRef = useRef<any>(null);

    const handleDownload = () => {
        setPrintInvoice(true);
        setTimeout(() => {
            
           const input = invoiceRef.current;
            html2canvas(input, { scale: 4 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");

                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save("booking-invoice.pdf");
            });
        }, 300);
        setTimeout(() => {
            setPrintInvoice(false);
        }, 2000);
    };


    
    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            router.push("/");
        }

        const orderID = resolvedParams.slug ? atob(resolvedParams.slug) : "";
            if(parseInt(orderID) > 0){
                setTimeout(() => {
                    setHeadingCounter(false);
                }, 3000);
                //get offers
                getOrderData(orderID);
                
            }else{
                router.push("/");
            }
    }, [resolvedParams.slug]);

    async function getOrderData(orderID:any) {
        try {
            let postRec: { o_id: number} = { o_id: orderID}; 
            const res = await postData('get-order-data',postRec); 
            const o_data = res.record; 
            if(o_data){ 
                setOrderData(o_data);

                const checkInTime:any = o_data.check_in_date+'T'+o_data.other_details?.roomDetails?.hotel_details?.check_in_time;
                setCheckInTime(checkInTime);            

                const checkOutTime:any = o_data.check_in_date+'T'+o_data.other_details?.roomDetails?.hotel_details?.check_out_time;
                setCheckOutTime(new Date(checkOutTime));

                const nights = o_data.check_in_date && o_data.check_out_date ? differenceInDays(o_data.check_out_date, o_data.check_in_date) : 0;            
                setNumberOfNights(nights);

            }else{
                 router.push("/");
            }

        } catch (err) {
            router.push("/");
        }
    }

    const numberFormat = (amt:any) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amt);
    }
        


return (
  <>
{headingCounter && 
    <div className="hero-section pb-3">
    <div className="inner-page-banner py-2 gray_bg">
        <div className="container">    
            <div className="row">
                <div className="col-4 px-0">
                    <div className="step-card active first-step">
                    <div className="step-icon mb-2">1</div>
                    <p className="">Customer <br className="d-md-none" />Information</p>
                    </div>
                </div>
                <div className="col-4 px-0">
                    <div className="step-card active">
                    <div className="step-icon mb-2">2</div>
                    <p className="">Payment <br className="d-md-none" />Information</p>
                    </div>
                </div>
                <div className="col-4 px-0">
                    <div className="step-card end-step active">
                    <div className="step-icon mb-2">3</div>
                    <p className="">Booking is <br className="d-md-none" />Confirmed!</p>
                    </div>
                </div>
            </div>  
        </div>
    </div>

    </div>
}

<div className="checkout-page booking-confirm mt-md-4 mt-2">
    <div className="container">

        <div className="confirm-booking-message text-center mb-4 mb-lg-5">
            <div className="successfully-message"><img src="/img/success.gif"/></div>
            <h3>Booking Confirmed!</h3>
            <div className="booking-id d-flex flex-column flex-lg-row align-items-center justify-content-center mt-3">
                <p>Booking ID: <span className="red-text">{orderData.invoice_id}</span> </p> <span className="d-none d-lg-block">|</span> <p>Booked On: <span className="red-text">{orderData.booking_date}</span></p>
            </div>
        </div>
        

        <div className="row" >
            <div className="col-lg-12">
                 <div className="button-set-top d-flex align-items-center justify-content-end gap-3 mb-2 mb-lg-3">
                    <a href="#" className="d-flex align-items-center gap-2"><img src="/img/pro_location.svg"/> Property Location</a>
                    <a className="d-flex align-items-center gap-2 cursor-pointer" onClick={handleDownload}><img src="/img/download.svg"/> Download Invoice</a>
                </div>
            </div>

            <div className="col-lg-8 col-md-6 mb-0 mb-md-0">
               
                <div className="checkout-card overview-section border rounded-3 p-2 p-lg-3 mb-3">
                    <div className="d-flex flex-column flex-lg-row justify-content-between">
                        <div className="check-hotal-info mb-2 mb-md-0 w-100">
                            <div className="chec-thumbnail">
                                <img src={orderData.other_details?.roomDetails?.hotel_details?.image} alt={orderData.other_details?.roomDetails?.hotel_details?.title} title={orderData.other_details?.roomDetails?.hotel_details?.title} />
                            </div>
                            <div className="check-hotal-tile">
                                <h5 className="fw-semibold">{orderData.other_details?.roomDetails?.hotel_details?.title}</h5>
                                <p className="small-text">From {orderData.other_details?.roomDetails?.hotel_details?.state}</p>
                               <div className="check-hotal-tile mt-1 mt-md-2 mt-lg-3">
                                    <p className="text-dark">Room Type</p>
                                    <h5 className="fw-semibold">{orderData.other_details?.roomDetails?.room_details?.title}</h5>
                                </div>

                                 <div className="check-hotal-tile mt-3 d-none d-md-block">
                                    <p className="text-dark">Who's the lead guest?</p>
                                    <h5 className="fw-semibold">{orderData.other_details?.userDetails?.name}, +91 {orderData.other_details?.userDetails?.mobile} </h5>
                                </div>
                            </div>                             
                          
                        </div>

                        <div className="check-hotal-tile mt-2 d-block d-md-none">
                            <p className="text-dark">Who's the lead guest?</p>
                            <h5 className="fw-semibold">{orderData.other_details?.userDetails?.name}, +91 {orderData.other_details?.userDetails?.mobile}</h5>
                        </div>

                       
                    </div>
                </div>

                { (orderData.other_details?.roomDetails?.hotel_details?.cancellation_policy && orderData.other_details?.roomDetails?.hotel_details?.cancellation_policy > 1) ?
                    <>
                    <div className="cancellation-policy text-red d-none d-lg-flex align-items-center gap-2 mb-4">
                        <span className="cancel-icon"><img src="/img/cancelled_icon_2.svg"/></span> <b>Cancellation Policy:</b> 
                        { orderData.other_details?.roomDetails?.hotel_details?.cancellation_policy == 2 ?
                            <> This hotel is refundable in cancellation. </>
                            :
                            <> This hotel not refundable in cancellation. </>
                        }
                        
                    </div>
                    </>
                :
                null


                }

                

                <div className="important-notes d-none d-lg-block">
                    <h5>Important Notes:</h5>
                    <ul>
                        <li>ID Proof Requirement</li>
                        <li>Children & Extra Bed Policy</li>
                        <li>Pets Policy</li>
                        <li>Payment Policy</li>
                        <li>Special Requests</li>
                    </ul>
                </div>
            </div>

           <div className="col-lg-4 col-md-6">
                <div className="warning-message d-block d-lg-none">Message here for warning and other things</div> 
                <div className="booking-review overview-section mb-2">
                    <div className="booking_summary_section">
                        <div className="checkin-checkout mb-2">
                            <div className="checkin-time">
                                <div className="label-title">
                                    <img src="/img/calendar_1.svg"/> <span className="fs11">Check-In</span>
                                </div>
                                <div className="date-time fw-medium">{orderData.check_in_date ? format(orderData.check_in_date, 'dd MMM yyyy') : ''}<br/>{orderData.other_details?.roomDetails?.hotel_details?.check_in_time ? format(checkInTime, 'hh:mm a') : '10:00 am'}</div>
                            </div>
                            <div className="position-relative night-content">
                                <div className="one-night">
                                    <div className="moon-icon"><img src="/img/moon.svg"/></div>
                                    <span className="date-time">{numberofNights} N</span>                                    
                                </div>
                                <div className="after"></div>
                            </div>

                            <div className="checkin-time align-items-end">
                                <div className="label-title">
                                    <img src="/img/calendar_1.svg"/> <span className="fs11">Check-out</span>
                                </div>
                                <div className="date-time fw-medium text-end">{orderData.check_out_date ? format(orderData.check_out_date, 'dd MMM yyyy') : ''}<br/>{orderData.other_details?.roomDetails?.hotel_details?.check_in_time ? format(checkOutTime, 'hh:mm a') : '12:00 pm'}</div>
                            </div>
                        </div>

                        <div className="checkin-checkout">
                            <div className="checkin-time">
                                <div className="label-title">
                                    <img src="/img/no_rooms.svg"/> <span className="fs11">No of Room</span>
                                </div>
                                <div className="date-time fw-medium">{orderData.rooms} Rooms</div>
                            </div>
                            <div className="position-relative night-content no-room">
                                <div className="after"></div>
                            </div>

                            <div className="checkin-time align-items-end">
                                <div className="label-title">
                                    <img src="/img/guest.svg"/> <span className="fs11">Guests Per Room</span>
                                </div>
                                <div className="date-time fw-medium text-end">{orderData.adults} Audults{orderData.orderData > 0  && ', '+ orderData.orderData+' childs' }</div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="payment-list grand-total rounded-3 my-2">
                        <ul>
                            <li className="payment-type text-end w-100">
                                <dt className="text-end w-100 fw-normal d-flex gap-2 justify-content-end">Total Amount Paid: <span className="red-text fw-bold">{numberFormat(orderData.grand_total)}</span></dt>
                            </li>
                        </ul>
                        
                    </div>
                </div>

                <div className="warning-message d-none d-lg-block">Message here for warning and other things</div>  

                <div className="cancellation-policy text-red d-flex d-lg-none align-items-start gap-2 mb-4 mt-3">
                    <span className="cancel-icon"><img src="/img/cancelled_icon_2.svg"/></span> 
                    <span><b>Cancellation Policy:</b>This hotel not refundable in cancellation.</span>
                </div>

                <div className="important-notes d-block d-lg-none">
                    <h5>Important Notes:</h5>
                    <ul>
                        <li>ID Proof Requirement</li>
                        <li>Children & Extra Bed Policy</li>
                        <li>Pets Policy</li>
                        <li>Payment Policy</li>
                        <li>Special Requests</li>
                    </ul>
                </div>

                <a className="need-help-section mt-5 mt-lg-3" href="#">
                    <img src="/img/customer_service_center.svg"/>
                    <span className="neet-help-content">
                        <span className="fw-bold h6 text-dark">Facing any issue <span className="red-text">Need help?</span></span>
                        <p>We will help you with it.</p>
                    </span>
                </a>
                

               
                
            </div>


        </div>
    </div>
    <hr className="my-5"/>
</div>
    <CheckoutFooter />
    { printInvoice ? 
        <div ref={invoiceRef}>
        <PrintInvoice orderData = {orderData} checkInTime={checkInTime} nights={numberofNights}  checkOutTime={checkOutTime} />
    </div>
    :
    null

    }
    
  </>
  );
}