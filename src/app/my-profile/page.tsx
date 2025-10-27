"use client";
import DashboardNav from "../components/DashboardNav";
import { useEffect, useState } from 'react';
import { getData, postData, } from '../utils/api';
import {Select, Button, Input} from "antd";
import { toast } from 'react-toastify';
const { Option } = Select;
import { useRouter } from "next/navigation"
import { CheckCircleFilled } from '@ant-design/icons';

export default function MyProfile() {
    const [states, setStates] = useState<any>([]);
    const [userData, setUserData] = useState<any>([]);
    const [cities, setCities] = useState<any>([]);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        mobile: '',
        name: '',
        email: '',
        state:'',
        state_id:0,
        city:'',
        city_id:0,
        address:'',
        zipcode:''
    });

    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){     
            router.push("/");
        } else{
            fetchUserInfo();
            fetchStates();
        }

    }, []);

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

     async function fetchUserInfo() {
        try {
            const res = await getData('get-user-details'); 
            if(res.success){  
                setUserData(res.details);
                setFormData({
                    mobile: res.details.mobile,
                    name:  res.details.name,
                    email:  res.details.email,
                    state_id:res.details.state_id,
                    city_id:res.details.city_id,
                    state: res.details.state,
                    city: res.details.city,
                    address: res.details.address,
                    zipcode: res.details.zipcode
                }) 
                getCities(res.details.state_id);
            }else{
                router.push("/");
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchStates() {
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
        const orderRes = await postData("update-profile", formData);
        if(orderRes.success){
            toast.success("Profile information updated successfully.");
            localStorage.setItem("userDetails", JSON.stringify(formData)); 
            setProcessing(false);
        }else{
            toast.error(orderRes.message);
            setProcessing(false);
        }
    }
};
  return <>
<div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container"> 
            <div className="d-flex align-items-center">
                <h1 className="text-center d-flex align-items-center justify-content-start">My Profile</h1> 
            </div>             
        </div>
  </div>
   
</div>

<div className="my-account-page mt-2 mt-lg-4">
    <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <DashboardNav page={"profile"} />
            </div>

            <div className="col-lg-9">
                <div className="my-account-right">
                    <h6 className="mb-3">Basic Information</h6>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="user-img">
                                <div className="profile-thumbnail">
                                    <span>{formData.name.substring(0, 1)}</span>
                                </div>                                
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="my-profile">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-2 mb-lg-3">
                                            <label htmlFor="firstName" className="form-label">Name</label>
                                            <input type="text" 
                                                className="form-control" id="firstName" 
                                                placeholder="Enter full name"
                                                name="name" 
                                                value={formData.name}
                                                onChange={handleFieldChange}
                                                
                                                />
                                        </div>
                                         <div className="col-md-6 mb-2 mb-lg-3">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input type="email" 
                                            name="email" 
                                            className="form-control" id="email" 
                                            placeholder="example@email.com" 
                                            value={formData.email}
                                            readOnly
                                            />
                                        </div>
                                        
                                    </div>

                                    <div className="row">
                                       
                                        <div className="col-md-6 mb-2 mb-lg-3">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <Input
                                                addonBefore="+91"
                                                value={formData.mobile}
                                                onChange={handleFieldChange}
                                                placeholder="Enter mobile number"
                                                maxLength={10}
                                                className='login-mobile'
                                                name='mobile'
                                                readOnly
                                                style={{ height: '35px'}}
                                                suffix={
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <CheckCircleFilled style={{ color: '#36a300' }} />
                                                        <span style={{ color: '#36a300', fontSize: '12px' }}>Verified</span>
                                                    </span>
                                                }
                                                />
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="my-account-right">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6 className="">Address</h6>                        
                    </div>
                    <div className="row mb-3 pb-3 border-bottom">
                        <div className="col-lg-12">
                            <div className="my-profile">
                                <form>

                                    <div className="row">
                                        <div className="col-md-6 mb-2 mb-lg-3">
                                            <label htmlFor="email" className="form-label">Address</label>
                                            <input type="text" 
                                                className="form-control" id="address" 
                                                placeholder="Enter full address"
                                                name="address" 
                                                value={formData.address}
                                                onChange={handleFieldChange}
                                                
                                                />
                                        </div>
                                        <div className="col-md-6 mb-2 mb-lg-3 d-flex flex-column">
                                            <label htmlFor="zipcode" className="form-label">Zip Code</label><input type="text" 
                                                className="form-control" id="zipcode" 
                                                placeholder="Enter your zipcode"
                                                name="zipcode" 
                                                value={formData.zipcode}
                                                onChange={handleFieldChange}
                                                
                                                />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2 mb-lg-3 d-flex flex-column">
                                            <label htmlFor="state" className="form-label">State</label>
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
                                            <label htmlFor="city" className="form-label">City</label>
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
                                                <Option key={city.id} value={city.id}>
                                                    {city.title}
                                                </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                        <div className="d-flex align-items-center justify-content-center mb-3">
                        <Button 
                            htmlType="button" 
                            disabled={processing}
                            loading={processing}
                            onClick={handleSubmit}
                            className="btn btn-primary">Submit</Button>
                        </div>

                </div>
            </div>
        </div>
    </div>
</div>
  </>
}