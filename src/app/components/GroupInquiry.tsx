"use client";
import { useEffect, useState } from 'react';
import {Select, Button, Input} from "antd";
import {toast } from 'react-toastify';
import { getData, postData, } from '../utils/api';

const { Option } = Select;

export default function GroupInquiry() {

    const [processing, setProcessing] = useState(false);
  const [formType, setFormType] = useState('Contact');
  const [bookingprocessing, setBookingProcessing] = useState(false);
  const [destinations, setDestinations] = useState([
    { bookingPlace: "", checkIn: "", checkOut: "" },
  ]);
  
  const [bookingFormData, setBookingFormData] = useState({
    booking_mobile: '',
    booking_alternative_mobile: '',
    booking_name: '',
    booking_total_guest: 0,
    booking_total_room: 0,
    booking_room_type_1: "1",
    booking_room_type_2: "Single Bed",
    booking_room_type_3: "Non Ac Room",
    estimate_budget:'',
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

const handleBookingSubmit = async (e:any) => {

    // booking form validations
  if (bookingFormData.booking_name === "") {
    toast.error("Please enter your full name");
  }else if (bookingFormData.booking_mobile === "") {
    toast.error("Please enter your mobile number");
  } else if (!isValidMobile(bookingFormData.booking_mobile)) {
    toast.error("Please enter a valid mobile number");
  }else if (bookingFormData.booking_total_guest <= 0) {
    toast.error("Please enter number of total guest");
  } else if (isNaN(bookingFormData.booking_total_guest)) {
    toast.error("Total guests must be a number");
  }  else if (bookingFormData.booking_total_room <= 0) {
    toast.error("Please enter number of total room");
  } else if (isNaN(bookingFormData.booking_total_room)) {
    toast.error("Total rooms must be a number");
  } else if (
   ( destinations.some((d) => d.bookingPlace === "" || d.checkIn === "" || d.checkOut === ""))
  ) {
    console.log(destinations);
    
    toast.error("Please select all place, check-in and check-out dates");
  }  else {
        setBookingProcessing(true);

        let finalData:any = {
            ...bookingFormData, destinations: []};
            finalData = { ...bookingFormData, destinations, booking_number : ''};
       

        const formPost = await postData("save-group-inquiry", finalData);
        if(formPost.success){
            toast.success('Your request has been sent successfully.');
            setBookingFormData({
            booking_mobile: '',
            booking_alternative_mobile: '',
            booking_name: '',
            booking_total_guest: 0,
            booking_total_room: 0,
            booking_room_type_1: "",
            booking_room_type_2: "",
            booking_room_type_3: "",
            estimate_budget:'',
          });
          setBookingProcessing(false);
        }else{
          toast.error(formPost.message);
          setBookingProcessing(false);
        }
        
          setBookingProcessing(false);
    }
};

const handleBookingFieldChange = (
  eOrName: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
  value?: any
) => {
  if (typeof eOrName === "string") {
    // Select change
    setBookingFormData(prev => ({
      ...prev,
      [eOrName]: eOrName === "booking_mobile" ? value.replace(/\D/g, "") : value
    }));
  } else {
    // Input/TextArea change
    const { name, value } = eOrName.target;
    const newValue = name === "booking_mobile" ? value.replace(/\D/g, "") : value;

    setBookingFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  }
};

  // add another destination
  const addDestination = () => {
    setDestinations([...destinations, { bookingPlace: "", checkIn: "", checkOut: "" }]);
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

  return (
    <>
    <div className="modal fade" id="groupInquiryModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-dialog-centered w-800" >
            <div className="modal-content">
              <div className="modal-header align-items-start">
                <div className="d-flex flex-column text-center">
                <h1 className="modal-title fs-5">Group Inquiry</h1>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="email-signin"> 
                    <form>
                    
                    <div className="row">
                        <div className="col-md-6 mb-2 mb-lg-3">
                            <label htmlFor="booking_name" className="form-label">Full Name<em>*</em></label>
                            <input type="text" className="form-control" id="booking_name" placeholder="" onChange={handleBookingFieldChange} name='booking_name'  value={bookingFormData.booking_name} />
                        </div>
                        <div className="col-md-6 mb-2 mb-lg-3">
                            <label htmlFor="phone" className="form-label">Mobile No.<em>*</em></label>
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
                    </div>
                    <div className="row">
                    <div className="col-md-6 d-flex flex-column">
                            <label className="form-label">Room Type<em>*</em></label>
                             <div className="row">
                                <div className="col-md-3 d-flex flex-column">
                                    <Select
                                    showSearch
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    className='booking_room_type_1'
                                    onChange={(value) => handleBookingFieldChange("booking_room_type_1", value)}
                                    value={bookingFormData.booking_room_type_1}
                                    filterOption={(input, option) =>
                                    (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                    }   
                                >
                                    {[...Array(20)].map((_, i) => (
                                        <Option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </Option>
                                    ))}
                                </Select>
                                </div>
                                <div className="col-md-4 d-flex flex-column booking_room_type_2" >
                                    <Select
                                    showSearch
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    className='booking_room_type_2'
                                     onChange={(value) => handleBookingFieldChange("booking_room_type_2", value)}
                                    value={bookingFormData.booking_room_type_2}
                                    filterOption={(input, option) =>
                                    (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                    }   
                                >
                                    <Option value="Single Bed">Single Bed</Option>
                                    <Option value="Double Bed">Double Bed</Option>
                                    <Option value="Dormitory">Dormitory</Option>
                                    <Option value="Hall">Hall</Option>
                                </Select>
                                </div>
                                <div className="col-md-5 d-flex flex-column">
                                    <Select
                                    showSearch
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    className='booking_room_type_3'
                                     onChange={(value) => handleBookingFieldChange("booking_room_type_3", value)}
                                    value={bookingFormData.booking_room_type_3}
                                    filterOption={(input, option) =>
                                    (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                    }   
                                >
                                    <Option value="Single Bad">Ac Room</Option>
                                    <Option value="Double Bad">Non Ac Room</Option>
                                </Select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-2 mb-lg-3">
                            <label htmlFor="booking_alternative_mobile" className="form-label">Alternative Mobile No.</label>
                            <Input
                            addonBefore="+91"
                            value={bookingFormData.booking_alternative_mobile}
                            onChange={handleBookingFieldChange}
                            placeholder=""
                            maxLength={10}
                            className='login-mobile'
                            name='booking_alternative_mobile'
                            />
                        </div>
                    </div>
                    <div className="row">
                        
                            <div className="col-md-6 mb-2 mb-lg-3">
                                <label htmlFor="booking_total_guest" className="form-label">Number of guests<em>*</em></label>
                                <input type="text" className="form-control" id="booking_total_guest" placeholder="Enter Number of gues" onChange={handleBookingFieldChange} name='booking_total_guest'  value={bookingFormData.booking_total_guest}/>
                            </div>
                            <div className="col-md-6 mb-2 mb-lg-3">
                                <label htmlFor="booking_total_room" className="form-label">Number of Room<em>*</em></label>
                                <input type="text" className="form-control" id="booking_total_room" placeholder="Enter Number of room" onChange={handleBookingFieldChange} name='booking_total_room'  value={bookingFormData.booking_total_room}/>
                            </div>
                        </div>

                        {destinations.map((item, index) => (
                        <div className="row mb-3" key={index}>
                                               
                        <div className="col-md-6 mb-2 mb-lg-3">
                            <label htmlFor="booking_place" className="form-label">Place<em>*</em></label>
                            <input type="text" 
                            className="form-control" id="bookingPlace" placeholder="" 
                            name='bookingPlace'  
                            value={item.bookingPlace}
                            onChange={(e) => handleChange(index, "bookingPlace", e.target.value)}
                             />
                        </div>

                        {/* Check-In Date */}
                        <div className="col-md-3 d-flex flex-column">
                            <label className="form-label">Check-In<em>*</em></label>
                            <input
                            type="date"
                            className="form-control"
                            value={item.checkIn}
                            name='checkIn'
                            id='checkIn'
                            onChange={(e) => handleChange(index, "checkIn", e.target.value)}
                            />
                        </div>
                         <div className="col-md-3 d-flex flex-column">
                            <label className="form-label">Check-Out<em>*</em></label>
                            <input
                            type="date"
                            className="form-control"
                            value={item.checkOut}
                            name='checkOut'
                            id='checkOut'
                            onChange={(e) => handleChange(index, "checkOut", e.target.value)}
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
                            style={{ padding: '5px 10px', height: 'auto', lineHeight: 'normal', fontSize:'12px'}}
                            >
                            + Add Place
                            </button>
                        </div>
                        
                        

                    <div className="row">                                            
                        <div className="col-md-12 mb-2 mb-lg-3">
                            <label htmlFor="estimate_budget" className="form-label">Your Estimate Budget</label>
                            <input className="form-control" id="estimate_budget" onChange={handleBookingFieldChange} name='estimate_budget'  value={bookingFormData.estimate_budget} />
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
            </div>
          </div>
      </div>
    </>
  );
}

