"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { format,differenceInDays  } from 'date-fns';
import { postData } from '../../utils/api';
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
        
    const isFutureDate = (check_in_date:any) => {
        const today = new Date();  
        today.setHours(0, 0, 0, 0); // remove time for accurate comparison

        const checkIn = new Date(check_in_date);
        checkIn.setHours(0, 0, 0, 0);

        return checkIn > today;
    };


return (
  <>

  <div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container">  
            <div className="d-flex align-items-center">
                <h1 className="text-center d-flex align-items-center justify-content-start">Booking Details</h1> 
            </div>             
            
        </div>
  </div>
   
</div>
<div className="checkout-page booking-confirm booking-confirm-detals mt-md-4 mt-2">
    <div className="container">

        <div className="confirm-booking-message text-center mb-3 mb-lg-4">
            <div className="booking-id d-flex flex-column flex-lg-row align-items-center justify-content-center mt-3">
                <p>Booking ID: <span className="text-dark">#{orderData.invoice_id}</span></p> <span className="d-none d-lg-block">|</span> <p>Booked On: <span className="text-dark">{orderData.booking_date}</span></p>
            </div>
        </div>
        <div className="col-lg-10 mx-auto">
            <div className="button-set-top d-flex align-items-center justify-content-end gap-3 mb-2 mb-lg-3">
                <a href="#" className="d-flex align-items-center gap-2" onClick={handleDownload}><img src="/img/download.svg" /> Download Invoice</a>
            </div>
            <div className="checkout-card customer-overview border rounded-3 p15 mb-2">
                   <div className="booking-customer position-relative">
                        <ul>
                            <li className="mb-3">
                                <label>Name</label>
                                <p>{orderData.other_details?.userDetails?.name}</p>
                            </li>

                            <li className="mb-3">
                                <label>Email Address </label>
                                <p>{orderData.other_details?.userDetails?.email}</p>
                            </li>


                            <li className="mb-3">
                                <label>Phone No.</label>
                                <p>+91 {orderData.other_details?.userDetails?.mobile}</p>
                            </li>
                            <li className="mb-3 mb-lg-0">
                                <label>State</label>
                                <p>{orderData.other_details?.userDetails?.state}</p>
                            </li>

                             <li className="mb-0 mb-lg-0">
                                <label>City</label>
                                <p>{orderData.other_details?.userDetails?.city}</p>
                            </li>                             
                        </ul>
                        
                   </div>
                </div>

                <div className="checkout-card overview-section border rounded-3 p-2 mb-2">
                    <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                        <div className="check-hotal-info mb-2 mb-md-0">
                            <div className="chec-thumbnail pic-80">
                                <img src={orderData.other_details?.roomDetails?.hotel_details?.image} alt={orderData.other_details?.roomDetails?.hotel_details?.title} title={orderData.other_details?.roomDetails?.hotel_details?.title} />
                            </div>
                            <div className="check-hotal-tile">
                                <h5 className="fw-semibold">{orderData.other_details?.roomDetails?.hotel_details?.title}</h5>
                                <p className="small-text">From {orderData.other_details?.roomDetails?.hotel_details?.state}</p>
                            </div>                                
                        </div>
                        <div className="hor-divider"></div>

                        <div className="check-hotal-tile">
                            <p className="text-dark">Room Type</p>
                            <h5 className="fw-semibold">{orderData.other_details?.roomDetails?.room_details?.title}</h5>
                        </div>
                    </div>
                </div>

                <div className="booking_summary_section flex-lg-row justify-content-between d-lg-flex align-items-center gap-2">
                        <div className="checkin-checkout mb-2 mb-lg-0">
                            <div className="checkin-time">
                                <div className="label-title">
                                    <img src="/img/calendar_1.svg"/> <span className="fs11">Check-In</span>
                                </div>
                                <div className="date-time fw-medium">{orderData.check_in_date ? format(orderData.check_in_date, 'dd MMM yyyy') : ''}<br className="d-block d-lg-none" />{orderData.other_details?.roomDetails?.hotel_details?.check_in_time ? format(checkInTime, 'hh:mm a') : '10:00 am'}</div>
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
                                <div className="date-time fw-medium text-end">{orderData.check_out_date ? format(orderData.check_out_date, 'dd MMM yyyy') : ''}<br className="d-block d-lg-none"/>{orderData.other_details?.roomDetails?.hotel_details?.check_in_time ? format(checkOutTime, 'hh:mm a') : '12:00 pm'}</div>
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



                <div className="payment-list grand-total rounded-3 d-none d-lg-block my-2">
                    <ul>
                        <li className="payment-type flex-lg-row justify-content-between w-100">
                            <dd className="fw-normal mb-lg-0 d-flex gap-2">Total Amount Paid: <span className="red-text fw-bold">Rs. {numberFormat(orderData.grand_total)}</span></dd>
                            {(orderData.other_details?.roomDetails?.hotel_details?.cancellation_policy == 2 && isFutureDate(orderData.check_in_date)) &&
                                <dt className="text-end fw-normal justify-content-lg-end">
                                    <a href="#" className="btn btn-primary">Cancel Booking</a>
                                </dt>
                            }

                        </li>
                    </ul>
                    
                </div>
                <div className="payment-list grand-total rounded-3 d-lg-none my-2">
                        <ul>
                            <li className="payment-type text-end w-100">
                                <dt className="text-end w-100 fw-normal d-flex gap-2 justify-content-end">Total Amount Paid: <span className="red-text fw-bold">{numberFormat(orderData.grand_total)}</span></dt>
                            </li>
                        </ul>
                    </div>
                    {(orderData.other_details?.roomDetails?.hotel_details?.cancellation_policy == 2 && isFutureDate(orderData.check_in_date)) &&
                        <div className="d-flex-inline d-lg-none mb-2 text-center">
                            <a href="#" className="btn btn-primary">Cancel Booking</a>
                        </div>  
                    }  
                

                <div className="d-flex align-items-center justify-content-center my-3">
                    <a className="need-help-section mt-2 mt-lg-3 w-100" href="#">
                        <span className="neet-help-content d-flex flex-column align-items-center justify-content-center w-100">
                            <span className="fw-bold h6 text-dark mb-1">Facing any issue <span className="red-text">Need help?</span></span>
                            <p>We will help you with it.</p>
                        </span>
                    </a>
                </div>

                <div className="faq-section mt-5 wow fadeInUp">
                    <h4 className="mb-4">FAQs</h4>

                    <div className="faq-section-accordion">                
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h6 className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                     Booking Cancellation FAQ
                                </h6>
                                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q1:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>

                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q2:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>


                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q3:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h6 className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Booking Category name 2
                                </h6>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q1:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>

                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q2:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>


                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q3:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h6 className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Booking Category name 3
                                </h6>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                     <div className="accordion-body">
                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q1:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>

                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q2:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>


                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q3:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h6 className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Booking Category name 4
                                </h6>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q1:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>

                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q2:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>


                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q3:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h6 className="accordion-header collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Booking Category name 5
                                </h6>
                                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q1:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>

                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q2:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>


                                        <div className="question-answer mb-3">
                                            <h6 className="mb-2">Q3:  How can I cancel my booking?</h6>
                                            <p><b>Ans.</b> You can cancel your booking by clicking the "Cancel Booking" button in your confirmation email, or by logging in to our website/app.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>

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