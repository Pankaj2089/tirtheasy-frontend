'use client'
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { getData, postData, } from '../utils/api';
import { Input, Row, Col, Button, Select } from "antd";

import type { InputRef } from "antd";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { CheckCircleFilled } from '@ant-design/icons';

const { Option } = Select;

export default function AddDharmshala() {

    const [states, setStates] = useState<any>([]);
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        mobile: '',
        name: '',
        email: '',
        state:'',
        city:'',
        owner_name:''
    });

    useEffect(() => {
        fetchStates();
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

    async function fetchStates() {
        try {
            const res = await getData('get-states');   
            setStates(res.records);
        } catch (err) {
            console.error(err);
        }
    }

    const handleStateFieldChange = (value: any, option: any) => {
        setFormData(prev => ({
            ...prev,
            state: option.children,
            state_id:value
        }));
    };

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
        toast.error('Please enter property name');
    }else if(formData.city == ""){
        toast.error('Please enter city name');
    }else if(formData.state == ""){
        toast.error('Please enter state name');
    }else if(formData.owner_name == ""){
        toast.error('Please enter owner name');
    }else if(formData.mobile == ""){
        toast.error('Please enter your mobile number');
    }else if (!isValidMobile(formData.mobile)) {
        toast.error('please enter valid mobile number');
    }else{
        setProcessing(true);
        const orderRes = await postData("add-dharmasala", formData);
        if(orderRes.success){
            toast.success("Information sent successfully.");
            setProcessing(false);
            setFormData({
                mobile: '',
                name: '',
                email: '',
                state: '',
                city: '',
                owner_name: ''
            });
        }else{
            toast.error(orderRes.message);
            setProcessing(false);
        }
    }
};

  return (
    <>
    <div className="modal fade" id="addDharmshalaModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header align-items-start">
                <div className="d-flex flex-column text-center">
                <h1 className="modal-title fs-5">Add Dharmshala</h1>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                    <form>
                        <div className="email-signin"> 
                                <div className="row mb-3">
                                <label htmlFor="propertyName" className="col-sm-4 form-label">Property Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="propertyName" name="name" value={formData.name} onChange={handleFieldChange} />
                                </div>
                                </div>

                                <div className="row mb-3">
                                <label htmlFor="city" className="col-sm-4 form-label">City</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleFieldChange} />
                                </div>
                                </div>

                                <div className="row mb-3">
                                <label htmlFor="state" className="col-sm-4 form-label" >State</label>
                                <div className="col-sm-8 selectBox">
                                    <Select
                                        showSearch
                                        placeholder="Select a state"
                                        optionFilterProp="children"
                                        onChange={handleStateFieldChange}
                                        value={formData.state ? formData.state : undefined}
                                        filterOption={(input, option) =>
                                        (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                        }   

                                    >
                                        {states.map((state:any) => (
                                        <Option key={state.id} value={state.title} >
                                            {state.title}
                                        </Option>
                                        ))}
                                    </Select>
                                </div>
                                </div>

                                <div className="row mb-3">
                                <label htmlFor="ownerName" className="col-sm-4 form-label">Owner Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="ownerName" name="owner_name" value={formData.owner_name} onChange={handleFieldChange} />
                                </div>
                                </div>

                                <div className="row mb-3">
                                <label htmlFor="contactNo" className="col-sm-4 form-label">Contact No</label>
                                <div className="col-sm-8">
                                    <Input
                                        addonBefore="+91"
                                        value={formData.mobile}
                                        onChange={handleFieldChange}
                                        placeholder=""
                                        maxLength={10}
                                        className='login-mobile'
                                        name='mobile'
                                        style={{ height: '35px'}}
                                        />
                                </div>
                                </div>

                                <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-4 form-label">Email ID</label>
                                <div className="col-sm-8">
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleFieldChange} />
                                </div>
                                </div>

                                <div className="row">
                                <div className="col-sm-8 offset-sm-4">
                                    <Button 
                                    htmlType="button" 
                                    disabled={processing}
                                    loading={processing}
                                    onClick={handleSubmit}
                                    className="btn btn-primary">Submit</Button>
                                </div>
                                </div>
                        </div>
                   </form>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

