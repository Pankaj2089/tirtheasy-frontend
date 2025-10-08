"use client";
import { useEffect, useState } from 'react';
import {Select, Button, Input} from "antd";
import {toast } from 'react-toastify';
import { getData, postData, } from '../utils/api';

const { Option } = Select;
export default function ContactUs() {

  const [processing, setProcessing] = useState(false);
  const [formType, setFormType] = useState('Contact');
  const [bookingprocessing, setBookingProcessing] = useState(false);
  const [destinations, setDestinations] = useState([
    { destination: "", checkIn: "" },
  ]);
  
  const [states, setStates] = useState<any>([]);

  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    email: '',
    message:'',
  });

  const [bookingFormData, setBookingFormData] = useState({
    booking_type: 'New Inquiry',
    booking_number: '',
    booking_mobile: '',
    booking_name: '',
    booking_email: '',
    booking_total_guest: 0,
    booking_message:'',
  });

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
    }else if(formData.message == ""){
        toast.error('Please enter your message');
    }else{
        setProcessing(true);
        const formPost = await postData("save-contact-us", formData);
        if(formPost.success){
            toast.success('Your request has been sent successfully.');
            setFormData({
            mobile: "",
            name: "",
            email: "",
            message: "",
          });
          setProcessing(false);
        }else{
          toast.error(formPost.message);
        }
    }
};

const handleBookingSubmit = async (e:any) => {

    // booking form validations
  if (bookingFormData.booking_type === "Existing Booking" && bookingFormData.booking_number === "") {
    toast.error("Please enter booking number");
  } else if (bookingFormData.booking_name === "") {
    toast.error("Please enter your full name");
  } else if (bookingFormData.booking_email === "") {
    toast.error("Please enter your email address");
  } else if (!isValidEmail(bookingFormData.booking_email)) {
    toast.error("Please enter a valid email address");
  } else if ( bookingFormData.booking_type === "New Inquiry" && 
   ( destinations.some((d) => d.destination === "" || d.checkIn === ""))
  ) {
    toast.error("Please select all destinations and check-in dates");
  }  else if (bookingFormData.booking_mobile === "") {
    toast.error("Please enter your mobile number");
  } else if (!isValidMobile(bookingFormData.booking_mobile)) {
    toast.error("Please enter a valid mobile number");
  } else if (bookingFormData.booking_total_guest <= 0) {
    toast.error("Please enter number of total guest");
  } else if (isNaN(bookingFormData.booking_total_guest)) {
    toast.error("Total guests must be a number");
  } else if (bookingFormData.booking_message === "") {
    toast.error("Please enter tour description");
  } else {
        setBookingProcessing(true);

        let finalData:any = {
            ...bookingFormData, destinations: []};
        if (bookingFormData.booking_type === "New Inquiry") {
            finalData = { ...bookingFormData, destinations, booking_number : ''};
        } 

        const formPost = await postData("save-booking-enquiry", finalData);
        if(formPost.success){
            toast.success('Your request has been sent successfully.');
            setBookingFormData({
            booking_type: 'New Inquiry',
            booking_number: '',
            booking_mobile: '',
            booking_name: '',
            booking_email: '',
            booking_total_guest: 0,
            booking_message:'',
          });
          setBookingProcessing(false);
        }else{
          toast.error(formPost.message);
          setBookingProcessing(false);
        }
        
          setBookingProcessing(false);
    }
};
const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // allow only numbers if field is mobile
  const newValue = name === "mobile" ? value.replace(/\D/g, "") : value;

  setFormData(prev => ({
    ...prev,
    [name]: newValue
  }));
};

const handleBookingFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // allow only numbers if field is mobile
  const newValue = name === "booking_mobile" ? value.replace(/\D/g, "") : value;

  setBookingFormData(prev => ({
    ...prev,
    [name]: newValue
  }));
};

  // add another destination
  const addDestination = () => {
    setDestinations([...destinations, { destination: "", checkIn: "" }]);
  };

  // remove destination
  const removeDestination = (index:any) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

   // handle changes
  const handleChange = (index:any, field:any, value:any) => {
    const newDestinations:any = [...destinations];
    newDestinations[index][field] = value;
    setDestinations(newDestinations);
  };

  async function fetchStates() {
        try {
            const res = await getData('get-states');   
            setStates(res.records);
            
        } catch (err) {
            console.error(err);
        }
    }

useEffect(() => {
    fetchStates();  
}, []);

  return <>
  <div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container">  
           <h1 className="text-center d-flex align-items-center justify-content-center">Contact Us</h1>    
        </div>
  </div>
</div>
<div className="contact-us-section">
    <div className="container">
      
        <div className="row mt-3">
            <div className="col-lg-8 border-end">
                    <div className="contact-us-page-tabs">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" onClick={() => setFormType('Contact')} data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">General Enquiry</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" onClick={() => setFormType('Booking')} data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Booking Enquiry</button>
                            </li>                        
                        </ul>

                        {formType == 'Contact' ?
                          <div className="tab-content contact-form-section" id="myTabContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                <div className="form-container mt-3">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-2 mb-lg-3">
                                                <label htmlFor="firstName" className="form-label">Full Name<em>*</em></label>
                                                <input type="text" className="form-control" id="firstName" placeholder="" 
                                                value={formData.name}
                                                name="name"
                                                  onChange={handleFieldChange} 
                                                  />
                                            </div>
                                            <div className="col-md-6 mb-2 mb-lg-3">
                                                <label htmlFor="email" className="form-label">Email Address<em>*</em></label>
                                                <input type="email"  name="email" className="form-control" id="email" placeholder="" value={formData.email}
                                                onChange={handleFieldChange}/>
                                            </div>
                                        </div>

                                        <div className="row">                                            
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
                                            <div className="col-md-12 mb-2 mb-lg-3">
                                                <label htmlFor="phone" className="form-label">Message<em>*</em></label>
                                                <textarea className="form-control" placeholder=""
                                                 onChange={handleFieldChange} 
                                                 name="message" 
                                                 id="floatingTextarea2" 
                                                 style={{height: "100px", resize:"none"}} 
                                                 value={formData.message} />
                                            </div>
                                        </div>

                                        <div className="row">                                            
                                            <div className="col-md-12 mb-2 mb-lg-3">
                                                <Button 
                                                htmlType="button" 
                                                disabled={processing}
                                                loading={processing}
                                                onClick={handleSubmit}
                                                className="btn btn-primary">Submit</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div>
                            :
                            <>
                            <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0} >
                                <div className="form-container mt-3">
                                    <form>
                                        <div className="radio-section">
                                            <div className="d-flex">
                                                <label className="custom-radio me-5">
                                                    <input type="radio" onChange={handleBookingFieldChange} name='booking_type'  
                                                    value="New Inquiry"
                                                    checked={bookingFormData.booking_type === "New Inquiry"}
                                                    />
                                                    <span className="radio-mark"></span>
                                                    New Inquiry
                                                </label>

                                                <label className="custom-radio">
                                                    <input type="radio" onChange={handleBookingFieldChange} name='booking_type'  
                                                    value="Existing Booking"
                                                    checked={bookingFormData.booking_type === "Existing Booking"}
                                                    />
                                                    <span className="radio-mark"></span>
                                                    Existing Booking
                                                </label>
                                            </div>
                                        </div>
                                        
                                        { bookingFormData.booking_type === "Existing Booking" ?
                                                <div className="row">
                                                    <div className="col-md-6 mb-2 mb-lg-3">
                                                        <label htmlFor="booking_number" className="form-label">Booking Number<em>*</em></label>
                                                        <input type="text" className="form-control" id="booking_number" placeholder="" onChange={handleBookingFieldChange} name='booking_number'  value={bookingFormData.booking_number} />
                                                    </div>
                                            </div>
                                        :
                                            null

                                        }
                                        
                                        <div className="row">
                                            <div className="col-md-6 mb-2 mb-lg-3">
                                                <label htmlFor="booking_name" className="form-label">Full Name<em>*</em></label>
                                                <input type="text" className="form-control" id="booking_name" placeholder="" onChange={handleBookingFieldChange} name='booking_name'  value={bookingFormData.booking_name} />
                                            </div>
                                            <div className="col-md-6 mb-2 mb-lg-3">
                                                <label htmlFor="booking_email" className="form-label">Email Address<em>*</em></label>
                                                <input type="email" className="form-control" id="booking_email" placeholder="" onChange={handleBookingFieldChange} name='booking_email'  value={bookingFormData.booking_email} />
                                            </div>
                                        </div>

                                         { bookingFormData.booking_type === "New Inquiry" ?
                                         <>

                                         {destinations.map((item, index) => (
                                            <div className="row mb-3" key={index}>
                                            {/* Destination */}
                                            <div className="col-md-6 d-flex flex-column">
                                                <label className="form-label">Travel Destination<em>*</em></label>
                                                <Select
                                                showSearch
                                                placeholder="Select a state"
                                                optionFilterProp="children"
                                                onChange={(e:any) =>
                                                    handleChange(index, "destination", e.target.value)
                                                }
                                                value={item.destination}
                                                filterOption={(input, option) =>
                                                (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                                }   
                                            >
                                                <option value="" disabled>
                                                    Select Destination
                                                </option>
                                                {states.map((state:any) => (
                                                <Option key={state.id} value={state.title} >
                                                    {state.title}
                                                </Option>
                                                ))}
                                            </Select>
                                            </div>

                                            {/* Check-In Date */}
                                            <div className="col-md-6 d-flex flex-column">
                                                <label className="form-label">Check-In<em>*</em></label>
                                                <input
                                                type="date"
                                                className="form-control"
                                                value={item.checkIn}
                                                onChange={(e) => handleChange(index, "checkIn", e.target.value)}
                                                />
                                            </div>

                                            {/* Remove button */}
                                            {index > 0 && (
                                                <div className="mt-2" style={{textAlign:'right'}}>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-xs"
                                                    onClick={() => removeDestination(index)}
                                                    style={{ padding: '5px 10px', height: 'auto', lineHeight: 'normal', fontSize:'12px'}}
                                                >
                                                    Remove
                                                </button>
                                                </div>
                                            )}
                                            </div>
                                        ))}
                                            <div className="mb-3">
                                                <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={addDestination}
                                                >
                                                + Add Another Destination
                                                </button>
                                            </div>
                                            </>
                                            : 
                                            null
                                        }

                                         <div className="row">
                                            <div className="col-md-6 mb-2 mb-lg-3">
                                                <label htmlFor="phone" className="form-label">Contact No.<em>*</em></label>
                                                <Input
                                                addonBefore="+91"
                                                value={bookingFormData.booking_mobile}
                                                onChange={handleBookingFieldChange}
                                                placeholder=""
                                                maxLength={10}
                                                className='login-mobile'
                                                name='booking_mobile'
                                                />
                                            </div>
                                            <div className="col-md-6 mb-2 mb-lg-3">
                                                <label htmlFor="booking_total_guest" className="form-label">Number of guests<em>*</em></label>
                                                <input type="text" className="form-control" id="booking_total_guest" placeholder="Enter Number of gues" onChange={handleBookingFieldChange} name='booking_total_guest'  value={bookingFormData.booking_total_guest}/>
                                            </div>
                                        </div>

                                        <div className="row">                                            
                                            <div className="col-md-12 mb-2 mb-lg-3">
                                                <label htmlFor="booking_message" className="form-label">Tour Description <em>*</em></label>
                                                <textarea className="form-control" placeholder="" id="booking_message" style={{height: "100px", resize:"none"}}
                                                onChange={handleBookingFieldChange} name='booking_message'  value={bookingFormData.booking_message} />
                                            </div>
                                        </div>

                                        <div className="row">                                            
                                            <div className="col-md-12 mb-2 mb-lg-3">
                                                <Button 
                                                htmlType="button" 
                                                disabled={bookingprocessing}
                                                loading={bookingprocessing}
                                                onClick={handleBookingSubmit}
                                                className="btn btn-primary">Submit</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> 
                          </>
                        }
                        </div>
                        
   </div>
            <div className="col-lg-4 mt-3 mt-lg-0">
                <div className="p-lg-3">
                    <div className="row align-items-center contant-info">
                        <div className="col-lg-12 mb-3">
                           <a href="tel:+91 96640 40225" className="contact-info-box contact-info-link ">
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
                              <a href="mailto:support@tirtheasy.com" className="contact-info-box contact-info-link ">
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
                              <a href="https://wa.me/9664040225" target='_blank' className="contact-info-box contact-info-link">
                                  <span className="call-us-icon">
                                      <img src="/img/whatsapp_red.svg"/>
                                  </span>
                                  <span className="contact-info">
                                      <span className="contact-label">Chat With Us</span>
                                      <span className="mob-no">WhatApp</span>
                                  </span>
                              </a>
                          </div>

                        <div className="col-lg-12">
                            <div className="contact-info-box">
                                <span className="call-us-icon">
                                    <img src="img/map-pin.svg"/>
                                </span>
                                <span className="contact-info ">
                                    <span className="contact-label">Visit Us</span>
                                    <span className="mob-no"> 501, Ram Avenue, Vijayraj Nagar, Jaipur, India, 302018</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
        <div className="terms_conditions mt-4 mt-lg-5">
            <img src="img/map.png"/>
        </div>
        
            {/* <div className="terms_conditions py-50 wow fadeInUp">
                <div className="container">
                    <div className="section-title wow fadeInUp">
                        <h4 className="mb-2">Terms & Conditions Services</h4>
                    </div>

                    <div className="terms_condition_section">
                        <div className="terms mb-4">
                            <h6 className="mb-2">1. Conditions of Use</h6>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>

                         <div className="terms mb-4">
                            <h6 className="mb-2">2. Privacy Policy</h6>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>


                         <div className="terms mb-4">
                            <h6 className="mb-2">3. Copyright</h6>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                        <div id="show-more-content">
                            <div className="terms mb-4">
                                <h6 className="mb-2">4. Conditions of Use</h6>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            </div>

                            <div className="terms mb-4">
                                <h6 className="mb-2">5. Privacy Policy</h6>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            </div>


                            <div className="terms mb-4">
                                <h6 className="mb-2">6. Copyright</h6>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                            </div>

                            
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                            <div className="read-more" id="show-more"><a href="javascript:void(0)">Load More...</a></div>
                            <div className="read-more" style={{display:"none"}} id="show-less"><a href="javascript:void(0)">View Less...</a></div>
                        </div>

                    </div>

                </div>
            </div> */}
    </div>
    </div>
  </>
}