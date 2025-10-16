"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { format,differenceInDays,parse, parseISO, differenceInCalendarDays   } from 'date-fns';
import { getData, postData, } from '../../utils/api';
import {Select, Button, Input, TimePicker   } from "antd";
import { toast } from 'react-toastify';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
const { Option } = Select;
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import CheckoutFooter from '@/app/components/CheckoutFooter';
import Signin from '@/app/components/Signin';

export default function UserInformationPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [record, setRecords] = useState<any>([]);
  const [offers, setOffers] = useState<any>([]);
  const [roomTotalPrice, setRoomTotalPrice] = useState<any>('0.00');
  const [mattressTotalPrice, setMattressTotalPrice] = useState<any>('0.00');
  const [grandTotal, setGrandTotal] = useState<any>('0.00');
  const [processing, setProcessing] = useState(false);
  const [userloggedin, setUserLogin] = useState(false);
  const [offerApplyLoader, setOfferApplyLoader] = useState(false);
  
  const [hotelData, setHotelData] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);

  const [request_title, setRequestTitle] = useState('');
  const buttonLoginRef = useRef<any>(null);
  const [nights, setNights] = useState(0);

  const router = useRouter();

  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    email: '',
    state:'',
    state_id:0,
    city:'',
    city_id:0,
    arrival_date:'',
    arrival_time:''
  });

  const [appliedOffer, setAppliedOffer] = useState({
    name: '',
    amount: '',
  });

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
            const totalNights:number = serData.start_date && serData.end_date ? differenceInCalendarDays(parseISO(serData.end_date), parseISO(serData.start_date)) : 0;  
            
            setNights(totalNights);         
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
                    setGrandTotalVal = parseFloat(setGrandTotalVal)-parseFloat(oData.amount);
                }
            }
           
            setGrandTotal(setGrandTotalVal);

            //get offers
            getOffers();

        } catch (err) {
            console.error(err);
            setShowLoader(false);
        }
    }

    async function getOffers() {
        try {
            const res = await getData('get-offers');   
            setOffers(res.records);
            
        } catch (err) {
            console.error(err);
        }
    }
    
    async function fetchStates(serData:any) {
        try {
            const res = await getData('get-states');   
            setStates(res.records);
            
        } catch (err) {
            console.error(err);
        }
    }
    async function getCities(stateId:any) {
        try {
            let postRec: { state_id: number} = { state_id: stateId}; 
            const res = await postData('get-cities-list',postRec);   
            setCities(res.records);
            
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
    //extra mattress price
      if(record && record.room_price){
        const totalNights:number = searchData.start_date && searchData.end_date ? differenceInCalendarDays(parseISO(searchData.end_date), parseISO(searchData.start_date)) : 0; 
        setNights(totalNights);
       

        const mattressTotalPriceVal:any = parseFloat(record.extra_mattress_price)*searchData.extra_mattress*totalNights;         
        setMattressTotalPrice(mattressTotalPriceVal); 

        const roomTotalPriceVal:any = parseFloat(record.room_price.price)*searchData.rooms*totalNights;

        let setGrandTotalVal:any = parseFloat(roomTotalPriceVal)+parseFloat(mattressTotalPriceVal);

        const offerData = localStorage.getItem('appliedOffer');
        if(offerData){
            let oData = JSON.parse(offerData);   
            if(Object.keys(oData).length > 0 && oData.amount > 0){        
                setGrandTotalVal = parseFloat(setGrandTotalVal)-parseFloat(oData.amount);
            }
        }

        setGrandTotal(setGrandTotalVal);
      }
  }, [searchData]);
      
   // Get array from localStorage
const loadFromLocalStorage = () => {
    const data = localStorage.getItem('searchData');
    if (data) {
      let serData = JSON.parse(data);
      setSearchState(serData); 
      setStartDate(serData.start_date);
      setEndDate(serData.end_date);        
      setTimeout(() => {
        const totalNights:number = serData.start_date && serData.end_date ? differenceInCalendarDays(parseISO(serData.end_date), parseISO(serData.start_date)) : 0;             
         setNights(totalNights); 
         
          fetchData(serData);
          fetchStates(serData);
      }, 1000);

    const user_data = localStorage.getItem('userData');
    if (user_data) {
        let uData = JSON.parse(user_data);
        setFormData(uData);
        if(uData.state_id > 0){
            getCities(uData.state_id);
        }
    }else{
        let login_user_data = localStorage.getItem("userDetails");
        if (login_user_data) {
            let uData = JSON.parse(login_user_data);
            setFormData(uData);
            if(uData.state_id > 0){
                getCities(uData.state_id);
            } 
        }
    }

    const offerData = localStorage.getItem('appliedOffer');
    if(offerData){
        let oData = JSON.parse(offerData);
        if(Object.keys(oData).length > 0 && oData.amount > 0){ 
            setAppliedOffer(oData);
        }else{
            localStorage.removeItem('appliedOffer')
        }
    }

    if(!data){
        router.push("/porperty-list");
    }else{
        let searData = JSON.parse(data);
        if(!searData.start_date || !searData.end_date || searData.rooms <= 0 || searData.adult <= 0 || searData.roomID <= 0 || searData.roomPriceID <= 0 ){
            router.push("/porperty-list");
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
    if(localStorage.getItem("accessToken")){        
      setUserLogin(true);
    } 

    loadFromLocalStorage();  
}, []);

const handleChange = (name:any,value:any) => {    
    const updatedData = { ...searchData, [name]: value };
    setSearchState(updatedData);

    if (updatedData.keywords !== '' || updatedData.start_date !== '' || updatedData.end_date !== '') {
        localStorage.setItem("searchData", JSON.stringify(updatedData));
    }
};


const numberFormat = (amt:any) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amt);
}
const isValidEmail = (email:any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
const isValidMobile = (mobile: any) => {    
    // Only digits, length 10 (common in India for example)
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
};

const handleSubmit = async (e:any) => {
        
    if(formData.name == ""){
        toast.error('Please enter your full name');
    }else if(formData.email == ""){
        toast.error('Please enter your email address');
    }else if (!isValidEmail(formData.email)) {
        toast.error('please enter valid email address');
    }else if(formData.mobile == ""){
        toast.error('Please enter your mobile number');
    }else if (!isValidMobile(formData.mobile)) {
        toast.error('please enter valid mobile number');
    }else if(formData.state == ""){
        toast.error('Please select your state');
    }else if(formData.city == ""){
        toast.error('Please enter your city');
    }else{
        setProcessing(true);
        localStorage.setItem("userData", JSON.stringify(formData)); 
        if(!userloggedin){
            setRequestTitle('booking');
            localStorage.setItem('RequestTitle','booking');
            buttonLoginRef.current?.click();
            setTimeout(() => {
                setProcessing(false);
            }, 300);
        }else{
            setTimeout(() => {
                setProcessing(false);
                router.push("/checkout/payment-review");
            }, 300);
        }

    }
};

const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // allow only numbers if field is mobile
  const newValue = name === "mobile" ? value.replace(/\D/g, "") : value;

  setFormData(prev => ({
    ...prev,
    [name]: newValue
  }));
};

const handleStateFieldChange = (value: number, option: any) => {
    getCities(value);
    setFormData(prev => ({
        ...prev,
        state: option.children,
        state_id:value
    }));
};

const handleCityFieldChange = (value: number, option: any) => {
    setFormData(prev => ({
    ...prev,
    city: option.children,
    city_id:value
  }));
};

const setArrivalTime = (time: Dayjs | null, timeString: any) => {
    //console.log( timeString);
    setFormData(prev => ({
    ...prev,
    arrival_time: timeString
  }));
};


const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("day");
};

const handleDateChange = (date: Date | null) => {
  setFormData((prev) => ({
    ...prev,
    arrival_date: date ? dayjs(date).format("YYYY-MM-DD") : "", 
  }));
};

const applyCouponCode = (offerData:any) => {
    if(parseFloat(roomTotalPrice) > 0){
        setOfferApplyLoader(true);

        let amount:any = 0;
        if(offerData.discount_type == "Percent"){
            amount = parseFloat(roomTotalPrice) * (parseFloat(offerData.amount) / 100); 
        }else if(parseFloat(offerData.amount) > parseFloat(roomTotalPrice)){
            amount = parseFloat(offerData.amount); 
        }

        const setGrandTotalVal = (parseFloat(roomTotalPrice)+parseFloat(mattressTotalPrice))-parseFloat(amount);        
        setGrandTotal(setGrandTotalVal);

        setAppliedOffer(prev => ({
            ...prev,
            ['name']: offerData.title
        }));
        setAppliedOffer(prev => ({
            ...prev,
            ['amount']: amount
        }));
        setOfferApplyLoader(false)
        
    }else{
        toast.error('Coupon can not apply with this room');
    }
}

const handleMattressChange = (e:any) => {
    handleChange('extra_mattress', e.target.checked ? 1 : 0)
  };

useEffect(() => {
  if (Object.keys(appliedOffer).length > 0 && appliedOffer.amount != '') {
        localStorage.setItem("appliedOffer", JSON.stringify(appliedOffer));
  }
}, [appliedOffer]);


  const checkinTime = hotelData.check_in_time
    ? dayjs(hotelData.check_in_time, "HH:mm a")
    : null;

  const handleArrivalChange = (time:any) => {
    setFormData({
      ...formData,
      arrival_time: time ? time.format("HH:mm a") : null,
    });
  };

  // disable times before checkinTime
  const disabledTime = () => {
    if (!checkinTime) return {};
    const disabledHours:any = [];
    const disabledMinutes = [];

    const checkinHour = checkinTime.hour();
    const checkinMinute = checkinTime.minute();

    // Disable all hours before check-in hour
    for (let i = 0; i < checkinHour; i++) disabledHours.push(i);

    // If same hour, disable minutes before check-in minute
    return {
      disabledHours: () => disabledHours,
      disabledMinutes: (selectedHour:any) => {
        if (selectedHour === checkinHour) {
          const minutes = [];
          for (let i = 0; i < checkinMinute; i += 1) minutes.push(i);
          return minutes;
        }
        return [];
      },
    };
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
                    <div className="step-card">
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
<div className="checkout-page mt-md-4 mt-2">
    <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-6">
                <div className="checkout-card overview-section border rounded-3 p-2 mb-3">
                    <div className="d-flex flex-column flex-lg-row justify-content-between">
                        <div className="check-hotal-info mb-2 mb-md-0">
                            <div className="chec-thumbnail">
                                <img src={hotelData.image} alt={hotelData.title} title={hotelData.title} />
                            </div>
                            <div className="check-hotal-tile">
                                <h5 className="fw-semibold">{hotelData.title}</h5>
                                <p className="small-text">From {hotelData.state}</p>
                                <p className="cancelation-policy"><b>Cancellation Policy:</b> 
                                    { hotelData.cancellation_policy == 2 ?
                                        <> This hotel is refundable in cancellation. </>
                                        :
                                        <> This hotel not refundable in cancellation. </>
                                    }
                                </p>
                            </div>                                
                        </div>
                        <div className="hor-divider"></div>

                        <div className="check-hotal-tile position-relative">
                            <p className="text-dark mb-2">Room Type</p>
                            <h5 className="fw-semibold">{record.title}</h5>
                            <Link href={"/property/"+hotelData.slug} className="edit-text">Change Room</Link>
                        </div>
                    </div>
                </div>
                <div className="checkout-card overview-section">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="checkout-tile">Who's the Lead Guest?</h5>
                        <em className="red-text">*Required field</em>
                    </div>
                    
                    <div className="form-container mt-3">
                        <form >
                            <div className="row">
                                <div className="col-md-12 mb-2 mb-lg-3">
                                    <label htmlFor="firstName" className="form-label">Name<em>*</em></label>
                                    <input type="text" 
                                    className="form-control" id="firstName" 
                                    placeholder="Enter full name"
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleFieldChange}
                                    
                                    />
                                </div>
                                {/* <div className="col-md-6 mb-2 mb-lg-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Enter last name" />
                                </div> */}
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-2 mb-lg-3">
                                    <label htmlFor="email" className="form-label">Email Address<em>*</em></label>
                                    <input type="email" 
                                    name="email" 
                                    className="form-control" id="email" 
                                    placeholder="example@email.com" 
                                    value={formData.email}
                                    onChange={handleFieldChange}
                                    
                                    />
                                </div>
                                <div className="col-md-6 mb-2 mb-lg-3">
                                    <label htmlFor="phone" className="form-label">Phone Number<em>*</em></label>
                                    <Input
                                        addonBefore="+91"
                                        value={formData.mobile}
                                        onChange={handleFieldChange}
                                        placeholder="Enter mobile number"
                                        maxLength={10}
                                        className='login-mobile'
                                        name='mobile'
                                        />
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-2 mb-lg-3 d-flex flex-column">
                                    <label htmlFor="state" className="form-label">State<em>*</em></label>
                                    <Select
                                        showSearch
                                        placeholder="Select a state"
                                        optionFilterProp="children"
                                        onChange={handleStateFieldChange}
                                        value={formData.state_id ? formData.state_id : undefined}
                                        filterOption={(input, option) =>
                                        (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }   
                                    >
                                        {states.map((state:any) => (
                                        <Option key={state.id} value={state.id} >
                                            {state.title}
                                        </Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="col-md-6 mb-2 mb-lg-3 d-flex flex-column">
                                    <label htmlFor="city" className="form-label">City<em>*</em></label>
                                    <Select
                                        showSearch
                                        placeholder="Select a city"
                                        optionFilterProp="children"
                                        onChange={handleCityFieldChange}
                                        value={formData.city_id ? formData.city_id : undefined}
                                        filterOption={(input, option) =>
                                        (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }   
                                    >
                                        {cities.map((city:any) => (
                                        <Option key={city.title} value={city.title}>
                                            {city.title}
                                        </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-2 mb-lg-3 d-flex flex-column">
                                    <label htmlFor="date" className="form-label">Expt. Arrival Date</label>
                                    
                                    <DatePicker
                                    className="form-control"
                                    selected={formData.arrival_date 
                                    ? parse(formData.arrival_date, "dd/MM/yyyy", new Date()) 
                                    : null}
                                    onChange={(date) =>
                                        setFormData((prev) => ({
                                        ...prev,
                                        arrival_date: date ? format(date, "dd/MM/yyyy") : "",
                                        }))
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    minDate={new Date()}                                   
                                    monthsShown={2}
                                    />
                                </div>
                                <div className="col-md-6 mb-2 mb-lg-3 d-flex flex-column">
                                    <label htmlFor="state" className="form-label">Expt. Arrival Time</label>
                                    <TimePicker 
                                    onChange={setArrivalTime} 
                                    format="HH:mm a" 
                                    
                                    value={formData.arrival_time ? dayjs(formData.arrival_time, "HH:mm a") : undefined}
                                    minuteStep={15}  // interval (e.g., every 15 minutes)
                                    style={{height:40}}
                                    disabledTime={disabledTime}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 mt-3">
                                <h5 className="checkout-tile mb-2">User Permission</h5>
                                <label htmlFor="check-1" className="checkbox align-items-start">
                                    <input type="checkbox" id="check-1" checked />
                                    <span className="checkmark mt-1"></span> <span className="checkbox-text">I agree that Tirtheasy and its Affiliates may send me information about  their products and services by email, telephone, text, WhatsApp and  post.<br/> 
                                    By creating an account, you agree with our <a href="#">terms of use</a>. We will process your details in accordance with our <a href="#">privacy policy</a>.</span>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="booking-review overview-section border rounded-3 p15 mb-2">
                    <h5 className="mb-2 checkout-tile">Booking Summary</h5>                       
                    <div className="booking_summary_section">
                        <div className="checkin-checkout mb-2">
                            <div className="checkin-time">
                                <div className="label-title">
                                    <img src="/img/calendar_1.svg"/> <span className="fs11">Check-In</span>
                                </div>
                                <div className="date-time fw-medium">{startDate ? format(startDate, 'dd MMM yyyy') : ''}</div>
                            </div>
                            <div className="position-relative night-content">
                                <div className="one-night">
                                    <div className="moon-icon"><img src="/img/moon.svg"/></div>
                                    <span className="date-time">{nights} N</span>                                    
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

                        <div className="checkin-checkout">
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
                                <div className="date-time fw-medium">{searchData.adult} Adults{searchData.childerns > 0  && ', '+ searchData.childerns+' childs' } </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="warning-message mb-2">Message here for warning and other things</div>

                {offers.length > 0 ?
                <div className="booking-review overview-section border rounded-3 p15 mb-2">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item border-0">
                            <h5 className="mb-0 checkout-tile offer-accordion collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Offers</h5>

                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                              <div className="offer-list">
                                 <ul>
                                    {offers.map((offer:any) => (
                                        <>
                                        { appliedOffer.name == offer.title ?
                                            <li className="applied">
                                                <span className="offer-name">{offer.title}</span>
                                                <span className="apply-link">Applied</span>
                                            </li>
                                        :
                                            <li>
                                                <span className="offer-name">{offer.title}</span>
                                                <Button onClick={()=> applyCouponCode(offer)} 
                                                className="apply-link bursor-ponter" 
                                                style={{padding:'0px', border:'0px',height: 'auto'}}
                                                disabled={offerApplyLoader} 
                                                loading={offerApplyLoader}>Apply</Button>
                                            </li>
                                        }
                                            
                                        </>
                                    ))}
                                 </ul>
                              </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                : null
                }
                
                <div className="booking-review overview-section border rounded-3 mb-2">
                    <h5 className="p15 checkout-tile">Payment Review</h5> 
                    <div className="payment-list px-15">
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
                        </ul>
                        {record.extra_mattress == 1 &&
                          <div className="row mt-2 align-items-center">
                              <div className="col-7">
                                  <label htmlFor="check-4" className="checkbox align-items-start">
                                      <input type="checkbox" id="check-4" 
                                       checked={searchData.extra_mattress > 0}
                                       onChange={handleMattressChange}  
                                      />
                                      <span className="checkmark"></span> <span className="checkbox-text">Add Extra Mattress</span>
                                  </label>
                              </div>
                              <div className="col-5 mattress_drop">
                                {searchData.extra_mattress > 0 && 
                                  <Select
                                      placeholder="Select Mattress"
                                      value={searchData.extra_mattress}
                                      onChange={(val) => handleChange('extra_mattress', val)}
                                      style={{ width: '50%' }}
                                      >
                                      {Array.from({ length: searchData.rooms }, (_, i) => i+1).map((num) => (
                                          <Option key={num} value={num}>
                                          {num}
                                          </Option>
                                      ))}
                                      </Select>
                                    }
                              </div>
                          </div>
                        }
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
                        {!userloggedin && 
                            <Button 
                            ref={buttonLoginRef}
                            htmlType="button" 
                            data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                            className="d-none"></Button>
                        }

                        <Button 
                        htmlType="button" 
                        disabled={processing}
                        loading={processing}
                        onClick={handleSubmit}
                        className="btn btn-primary w-100">Book Now</Button>
                        
                        
                        <Signin request_title={request_title}/>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>

<CheckoutFooter />


  </>);
}