"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { addDays, format,differenceInDays  } from 'date-fns';
import { getData, postData, } from '../../utils/api';
import {Select, Button, Input, TimePicker, DatePicker   } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { log } from 'console';
const { Option } = Select;
import { useRouter } from "next/navigation";
import CheckoutFooter from '@/app/components/CheckoutFooter';

export default function PaymentReviewPage({ initialTime = 600 }) {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [record, setRecords] = useState<any>([]);
  const [roomTotalPrice, setRoomTotalPrice] = useState<any>('0.00');
  const [mattressTotalPrice, setMattressTotalPrice] = useState<any>('0.00');
  const [grandTotal, setGrandTotal] = useState<any>('0.00');
  const [processing, setProcessing] = useState(false);
  
  const [lastOrderID, setLastOrderID] = useState(0);
  
  const [hotelData, setHotelData] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [appliedOffer, setApliedOffer] = useState<any>({});

  const router = useRouter();

  const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    adult: 1,
    rooms: 1,
    childerns: 0,
    sortby: '' ,
    roomID: 0,
    roomPriceID: 0,
    extra_mattress: 0,
  });

    async function fetchData(serData:any) {
        setShowLoader(true);
        try {
            let postRec: { room_id: number, room_price_id:number } = { room_id: serData.roomID, room_price_id:serData.roomPriceID}; 
            const res = await postData('get-room-price-details', postRec);  
            setShowLoader(false);     
            setRecords(res.records);
            
            //extra mattress price
            const totalNights:number = serData.start_date && serData.end_date ? differenceInDays(serData.end_date, serData.start_date) : 0;             
            let mattressTotalPriceVal:any = parseFloat(res.records.extra_mattress_price)*serData.extra_mattress;
            mattressTotalPriceVal = parseFloat(mattressTotalPriceVal)*totalNights;
            setMattressTotalPrice(mattressTotalPriceVal);

            // room price            
            const roomTotalPriceVal:any = parseFloat(res.records.room_price.price)*serData.rooms*totalNights;
            setRoomTotalPrice(roomTotalPriceVal);
            
            let setGrandTotalVal:any = parseFloat(roomTotalPriceVal)+parseFloat(mattressTotalPriceVal);

            const offerData = localStorage.getItem('appliedOffer');
            if(offerData){
                let oData = JSON.parse(offerData);
                if(Object.keys(oData).length > 0 && oData.amount > 0){            
                    setApliedOffer(oData);
                    setGrandTotalVal = parseFloat(setGrandTotalVal)-parseFloat(oData.amount);
                }
            }

            setGrandTotal(setGrandTotalVal);

        } catch (err) {
            console.error(err);
            setShowLoader(false);
        }
    }

    useEffect(() => {
    //extra mattress price
      if(record && record.room_price){
         const totalNights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
        const mattressTotalPriceVal:any = parseFloat(record.extra_mattress_price)*searchData.extra_mattress*totalNights;
        setMattressTotalPrice(mattressTotalPriceVal); 
        const roomTotalPriceVal:any = parseFloat(record.room_price.price)*searchData.rooms*totalNights;
        let setGrandTotalVal:any = parseFloat(roomTotalPriceVal)+parseFloat(mattressTotalPriceVal);

        const offerData = localStorage.getItem('appliedOffer');
        if(offerData){
            let oData = JSON.parse(offerData);
            if(Object.keys(oData).length > 0 && oData.amount > 0){            
                setApliedOffer(oData);
                setGrandTotalVal = parseFloat(setGrandTotalVal)-parseFloat(oData.amount);
            }
        }
        setGrandTotal(setGrandTotalVal);
      }
  }, [searchData]);
      
   // Get array from localStorage
const loadFromLocalStorage = () => {
    if(!localStorage.getItem("userDetails")){
        router.push("/checkout/user-information");
    }
    const data = localStorage.getItem('searchData');
    if (data) {
      let serData = JSON.parse(data);
      setSearchState(serData); 
      setStartDate(serData.start_date);
      setEndDate(serData.end_date);        
      setTimeout(() => {
          fetchData(serData);
      }, 1000);

    const user_data = localStorage.getItem('userData');
    if (user_data) {
        let uData = JSON.parse(user_data);
        setUserData(uData);
    }

    if(!data){
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
}

const hotel_data = localStorage.getItem("hotelData");
    if (hotel_data) {
        let setData = JSON.parse(hotel_data);
        setHotelData(setData); 
    }
};

useEffect(() => {
    if(!localStorage.getItem("accessToken")){        
      router.push("/checkout/user-information");
    } 
    loadFromLocalStorage();  
}, []);

const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
const numberFormat = (amt:any) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amt);
}

//counter
const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    // Prevent multiple intervals
    if (remainingTime <= 0) {
        if(localStorage.getItem('appliedOffer')){ localStorage.removeItem('appliedOffer');}

        const updatedData = { ...searchData, roomID: 0, roomPriceID: 0,extra_mattress: 0   };
        setSearchState(updatedData);

        if(lastOrderID > 0){
            deleteTempOrder(lastOrderID);
            setTimeout(() => {
                router.push("/checkout/booking-cancel");
            }, 1000);
        }else{
            router.push("/checkout/booking-cancel");
        }
        return;
    }

    const timerInterval = setInterval(() => {
      setRemainingTime((prev:any) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval); // cleanup on unmount
  }, [remainingTime]);


  async function deleteTempOrder(lastOrderID:any) {
    try {
         const postRec = {o_id:lastOrderID};
         const orderRes = await postData('delete-temp-order', postRec);  
        
    } catch (err) {
        console.error(err);
    }
}

  // Format minutes and seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

 // Razorpay Checkout Start
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // 1️⃣ Create order from Laravel API

    let data:any = localStorage.getItem('searchData');
    let user_data:any = localStorage.getItem('userData');

    let searData = JSON.parse(data);
    let usrData = JSON.parse(user_data);

    let couponCode = '';
    let couponCodeAmt = 0;
    const offerData = localStorage.getItem('appliedOffer');
    if(offerData){
        let oData = JSON.parse(offerData);
        if(Object.keys(oData).length > 0 && oData.amount > 0){  
            couponCode =oData.name;
            couponCodeAmt = parseFloat(oData.amount);
        }
    }

    let postDataArr={ 
        adults: searData.adult, 
        childerns: searData.childerns, 
        rooms: searData.rooms, 
        end_date: searData.end_date, 
        start_date: searData.start_date,
        extra_mattress: searData.extra_mattress,
        room_id: searData.roomID,
        room_price_id: searData.roomPriceID,
        user_name: usrData.name,
        user_email: usrData.email,
        user_mobile: usrData.mobile,
        user_data: usrData,
        coupon_code: couponCode,
        coupon_amtount: couponCodeAmt
    };

    const orderRes = await postData("create-order", postDataArr);
    if(orderRes.success){
        const orderData = orderRes.data;
        setLastOrderID(orderData.o_id);

        // 2️⃣ Initialize Razorpay Checkout        
        const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Tirtheasy",
        description: hotelData.title+' Booking',
        order_id: orderData.order_id,
        handler: async function (response: any) {
            // 3️⃣ Verify payment with Laravel backend
            response['o_id'] = orderData.o_id;
            const verifyRes = await postData("verify-payment", response);

            const verifyData = verifyRes;
            if (verifyData.success) {

                const updatedData = { ...searchData, roomID: 0, roomPriceID: 0,extra_mattress: 0   };
                setSearchState(updatedData);
                localStorage.setItem("searchData", JSON.stringify(updatedData));
                if(localStorage.getItem('appliedOffer')){ localStorage.removeItem('appliedOffer');}

                const orderNo = btoa(orderData.invoice_id);
                router.push("/checkout/confirm-booking/"+orderNo);
                setLoading(false);
            } else {
               if(orderData.id > 0){
                deleteTempOrder(orderData.id);
                setTimeout(() => {
                    router.push("/checkout/booking-cancel");
                }, 1000);
            }else{
                router.push("/checkout/booking-cancel");
                setLoading(false);
            }
                
            }
        },
        prefill: {
            name: userData.name,
            email: userData.email,
            contact: '+91 '+userData.mobile,
        },
        theme: { color: "#CC484A" },
        };

        // @ts-ignore
        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        setLoading(false);
    }else{
        toast.error(orderRes.message);        
        setLoading(false);
    }
  };
return (
  <>
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
                    <div className="step-card end-step">
                    <div className="step-icon mb-2">3</div>
                    <p className="">Booking is <br className="d-md-none" />Confirmed!</p>
                    </div>
                </div>
            </div>  
        </div>
  </div>
</div>

<div className="container">
    <div className="session-timer col-md-8 mx-auto">
    This session will timeout within <span className="timer-text" id="session-timer">{remainingTime > 0 ? formattedTime : "00:00"}</span> Minutes
    </div>
</div>
<div className="checkout-page mt-md-4 mt-2">
    <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-6 mb-4 mb-md-0">
                <h5 className="checkout-tile mb-2 mb-md-3">Booking Review</h5>
                <div className="checkout-card customer-overview border rounded-3 p15 mb-3">
                   <div className="booking-customer position-relative">
                        <ul>
                            <li className="mb-3">
                                <label>Name</label>
                                <p>{userData.name}</p>
                            </li>
                            <li className="mb-3">
                                <label>Email Address </label>
                                <p>{userData.email}</p>
                            </li>
                            <li className="mb-3">
                                <label>Phone No.</label>
                                <p>+91 {userData.mobile}</p>
                            </li>
                            <li className="mb-3 mb-lg-0">
                                <label>State</label>
                                <p>{userData.state}</p>
                            </li>
                             <li className="mb-0 mb-lg-0">
                                <label>City</label>
                                <p>{userData.city}</p>
                            </li>
                        </ul>
                        <Link href="/checkout/user-information" className="edit-text">Edit</Link>
                   </div>
                </div>

                <div className="checkout-card overview-section border rounded-3 p-2 mb-3">
                    <div className="d-flex flex-column flex-lg-row justify-content-between">
                        <div className="check-hotal-info mb-2 mb-md-0">
                            <div className="chec-thumbnail">
                                <img src={hotelData.image} alt={hotelData.title} title={hotelData.title} />
                            </div>
                            <div className="check-hotal-tile">
                                <h5 className="fw-semibold">{hotelData.title}</h5>
                                <p className="small-text">From {hotelData.state}</p>
                                <p className="cancelation-policy"><b>Cancellation Policy:</b> This hotel not refundable in cancellation.</p>
                            </div>                                
                        </div>
                        <div className="hor-divider"></div>

                        <div className="check-hotal-tile position-relative">
                            <p className="text-dark mb-2">Room Type</p>
                            <h5 className="fw-semibold">{record.title}</h5>
                            <Link href="/porperty-list" className="edit-text">Change Room</Link>
                        </div>
                    </div>
                </div>

                <div className="booking_summary_section d-flex flex-lg-row flex-column payment-page column-gap-3">
                    <div className="checkin-checkout">
                        <div className="checkin-time">
                            <div className="label-title">
                                <img src="/img/calendar_1.svg"/> <span className="fs11">Check-In</span>
                            </div>
                            <div className="date-time fw-medium">{startDate ? format(startDate, 'dd MMM yyyy') : ''}</div>
                        </div>
                        <div className="position-relative night-content">
                            <div className="one-night">
                                <div className="moon-icon"><img src="/img/moon.svg"/></div>
                                <span className="fw-medium date-time">{nights} N</span>                                    
                            </div>
                            <div className="after"></div>
                        </div>

                        <div className="checkin-time align-items-end">
                            <div className="label-title">
                                <img src="/img/calendar_1.svg"/> <span className="fs11">Check-out</span>
                            </div>
                            <div className="date-time fw-medium">{endDate ? format(endDate, 'dd MMM yyyy') : ''}</div>
                        </div>
                    </div>

                    <div className="checkin-checkout mb-0">
                        <div className="checkin-time">
                            <div className="label-title">
                                <img src="/img/no_rooms.svg"/> <span className="fs11">No of Room</span>
                            </div>
                            <div className="date-time fw-medium">{searchData.rooms} Rooms</div>
                        </div>
                        <div className="position-relative night-content no-room">
                            <div className="after"></div>
                        </div>

                        <div className="checkin-time align-items-end">
                            <div className="label-title">
                                <img src="/img/guest.svg"/> <span className="fs11">Guests Per Room</span>
                            </div>
                            <div className="date-time fw-medium">{searchData.adult} Audults{searchData.childerns > 0  && ', '+ searchData.childerns+' childs' }</div>
                        </div>
                    </div>
                    
                </div>

                <div className="align-items-start mt-1">
                    <span className="checkbox-text">Accept the <a href="#">terms and conditions</a></span>
                </div>
            </div>

           <div className="col-lg-4 col-md-6">
                <h5 className="mb-2 mb-md-3 checkout-tile">Payment Review</h5> 
              
                <div className="booking-review overview-section border rounded-3 mb-2">
                    <div className="payment-list px-15 pt-2 pb-0">
                        <ul>
                            <li className="payment-type">
                                <dd>{searchData.rooms} Rooms x {nights} Night</dd>
                                <dt className="text-end">{numberFormat(roomTotalPrice)}</dt>
                            </li>
                            { searchData.extra_mattress > 0 &&
                              <li className="payment-type">
                                  <dd>{searchData.extra_mattress} Extra Mattress x {nights} Night</dd>
                                  <dt className="text-end">{numberFormat(mattressTotalPrice)}</dt>
                              </li>
                          }
                            <li className="payment-type">
                                <dd>Convenience Fee (All inc.)</dd>
                                <dt className="text-end">₹0.00</dt>
                            </li>

                          { Object.keys(appliedOffer).length > 0 ?
                            <li className="payment-type" style={{color:'#1d8f00'}}>
                                <dd>Offer Applied ({appliedOffer.name})</dd>
                                <dt className="text-end">- {numberFormat(appliedOffer.amount)}</dt>
                            </li>
                          :
                            null
                          }
                                                        
                        </ul>                        
                    </div>
                    
                    <div className="payment-list grand-total">
                        <ul>
                            <li className="payment-type">
                                <dd>Grand Total:</dd>
                                <dt className="text-end red-text">{numberFormat(grandTotal)}</dt>
                            </li>
                        </ul>
                    </div>
                    <div className="px-15 mb-3">  
                        <Button 
                        onClick={handlePayment}
                        className="btn btn-primary w-100"
                        disabled={loading}
                        loading={loading}
                         >Make Payment</Button>
                    </div>
                </div>
                <div className="warning-message">Message here for warning and other things</div>
            </div>
        </div>
    </div>
</div>

    <CheckoutFooter />
  </>
  );
}