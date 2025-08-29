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

export default function UserInformationPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [record, setRecords] = useState<any>([]);
  const [roomTotalPrice, setRoomTotalPrice] = useState<any>('0.00');
  const [mattressTotalPrice, setMattressTotalPrice] = useState<any>('0.00');
  const [grandTotal, setGrandTotal] = useState<any>('0.00');
  const [processing, setProcessing] = useState(false);
  
  const [hotelData, setHotelData] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [states, setStates] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);

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
            // room price
            const roomTotalPriceVal:any = parseFloat(res.records.room_price.price)*serData.rooms;
            setRoomTotalPrice(roomTotalPriceVal);

            //extra mattress price
            const mattressTotalPriceVal:any = parseFloat(res.records.extra_mattress_price)*serData.extra_mattress;
            setMattressTotalPrice(mattressTotalPriceVal);

            const setGrandTotalVal = parseFloat(roomTotalPriceVal)+parseFloat(mattressTotalPriceVal);
            setGrandTotal(setGrandTotalVal);

        } catch (err) {
            console.error(err);
            setShowLoader(false);
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
        const mattressTotalPriceVal:any = parseFloat(record.extra_mattress_price)*searchData.extra_mattress;
        setMattressTotalPrice(mattressTotalPriceVal); 

        const roomTotalPriceVal:any = parseFloat(record.room_price.price)*searchData.rooms;

        const setGrandTotalVal = parseFloat(roomTotalPriceVal)+parseFloat(mattressTotalPriceVal);
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
    }

}

const hotel_data = localStorage.getItem("hotelData");
    if (hotel_data) {
        let setData = JSON.parse(hotel_data);
        setHotelData(setData); 
    }
};

useEffect(() => {
    loadFromLocalStorage();  
}, []);

const handleChange = (name:any,value:any) => {    
    const updatedData = { ...searchData, [name]: value };
    setSearchState(updatedData);

    if (updatedData.keywords !== '' || updatedData.start_date !== '' || updatedData.end_date !== '') {
        localStorage.setItem("searchData", JSON.stringify(updatedData));
    }
};

const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
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
        setTimeout(() => {
            setProcessing(false);
            router.push("/checkout/payment-review");
        }, 300);

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
const handleDateChange = (date: dayjs.Dayjs | null, dateString: any) => {
setFormData((prev) => ({
    ...prev,
    arrival_date: dateString, // saves date as string (e.g. "2025-08-28")
}));
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
                                    style={{height:40}}
                                    format="DD/MM/YYYY" 
                                    value={formData.arrival_date ? dayjs(formData.arrival_date, "DD/MM/YYYY") : undefined}
                                    disabledDate={disabledDate}
                                    onChange={handleDateChange} 
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
                                    <span className="fw-bold date-time">{nights} N</span>                                    
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
                                <div className="date-time fw-medium">{searchData.adult} Audults{searchData.childerns > 0  && ', '+ searchData.childerns+' childs' } </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="warning-message mb-2">Message here for warning and other things</div>
                <div className="booking-review overview-section border rounded-3 p15 mb-2">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item border-0">
                            <h5 className="mb-0 checkout-tile offer-accordion collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Offers</h5>

                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                              <div className="offer-list">
                                 <ul>
                                     <li>
                                        <span className="offer-name">FLAT 25% OFF</span>
                                        <a href="#" className="apply-link">Apply</a>
                                     </li>
                                      <li className="applied">
                                        <span className="offer-name">FLAT 25% OFF</span>
                                        <span className="apply-link">Applied</span>
                                     </li>
                                 </ul>
                              </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                
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
                                      <input type="checkbox" id="check-4" checked />
                                      <span className="checkmark"></span> <span className="checkbox-text">Add Extra Mattress</span>
                                  </label>
                              </div>
                              <div className="col-5 mattress_drop">
                                  <Select
                                      placeholder="Select Mattress"
                                      value={searchData.extra_mattress}
                                      onChange={(val) => handleChange('extra_mattress', val)}
                                      style={{ width: '50%' }}
                                      >
                                      {[0, 1, 2, 3, 4, 5].map((num) => (
                                          <Option key={num} value={num}>
                                          {num}
                                          </Option>
                                      ))}
                                      </Select>
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
                        <Button 
                        htmlType="button" 
                        disabled={processing}
                        loading={processing}
                        onClick={handleSubmit}
                        className="btn btn-primary w-100">Book Now</Button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
<div className="contact-support-section pt-5">
    <div className="container">
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="checkout-review">
                    <div className="review-bot-icon">
                        <img src="/img/check_review.svg"/>
                    </div>
                    <div className="review-content">
                        <h6>103 + Million Verified Review</h6>
                        <p>Find the perfect place to stay. Read honest reviews from the Tirtheasy travel community.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="checkout-review">
                    <div className="review-bot-icon">
                        <img src="/img/check_best_price.svg"/>
                    </div>
                    <div className="review-content">
                        <h6>Best Price Gurantee</h6>
                        <p>Nobody work harder to get you the best price. And if you find one lower, we'll you the difference.</p>
                    </div>
                </div>
            </div>

             <div className="col-md-4 mb-4">
                <div className="checkout-review">
                    <div className="review-bot-icon">
                        <img src="/img/check_customer.svg"/>
                    </div>
                    <div className="review-content">
                        <h6>FREE 24/7 Customer Service</h6>
                        <p>All day, every day, we're here to help you.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


  </>);
}