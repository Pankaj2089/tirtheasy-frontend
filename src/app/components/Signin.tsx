'use client'
import { log } from 'console';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Row, Col, Button } from "antd";

import type { InputRef } from "antd";
import 'react-toastify/dist/ReactToastify.css';
import { postData } from '../utils/api';


export default function Signin() {

const [mobile, setMobile] = useState('');
const [activeStep, setActiveStep] = useState(1);
const [processing, setProcessing] = useState(false);
const [resendProcessing, setResendProcessing] = useState(false);
const [verifyOTPProcessing, setVerifyOTPProcessing] = useState(false);
const [name, setName] = useState('');
const [email, setEmail] = useState('');

const [otp, setOtp] = useState(Array(6).fill(""));
const inputRefs = useRef<(InputRef | null)[]>([]);

  const isValidMobile = (mobile: any) => {
    // Only digits, length 10 (common in India for example)
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
    };

    const handleSignInSubmit = async (e:any) => {
      e.preventDefault();
      if(mobile == ""){
        toast.error('Please enter your mobile number');
      }else if(!isValidMobile(mobile)){
        toast.error('Please enter valid mobile number');
      }else{
        setProcessing(true);
        try {
          let data = {mobile};
          const res = await postData('sign-in', data);
          if(res.success){
            toast.success("OTP send successfully.");
            setActiveStep(2);
            // toast.success(res.msg);
            // localStorage.setItem("accessToken", res.accessToken);
            // localStorage.setItem("userDetails", JSON.stringify(res.userDetails));
            // window.location.reload();
          }else{
            toast.error(res.msg);
          }
          setProcessing(false);
        } catch (err:any) {
          toast.error(err);
          setProcessing(false);
        }
      }
    };

    const isOtpValid = () => {
        return otp.every((digit) => digit !== "" && /^\d$/.test(digit));
    };

    const isValidEmail = (email:any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    
    const handleOTPSubmit = async (e:any) => {
      e.preventDefault();
      const otpValue = otp.join("");
      if(otpValue == ""){
        toast.error('Please enter OTP');
      }else if (!isOtpValid()) {
        toast.error('Invalid OTP, please fill all 6 digits');
      }else{
        setVerifyOTPProcessing(true);
        try {
          let data = {otp: otpValue, mobile:mobile};
          const res = await postData('verify-otp', data);
          if(res.success){
            if(res.register){
                setActiveStep(3);
            }else{
                toast.success(res.msg);
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("userDetails", JSON.stringify(res.userDetails));
                window.location.reload();
            }
          }else{
            toast.error(res.msg);
          }
          setVerifyOTPProcessing(false);
        } catch (err:any) {
          toast.error(err);
          setVerifyOTPProcessing(false);
        }
      }
    };
    
    const handleRegisterSubmit = async (e:any) => {
      e.preventDefault();
      if(name == ""){
        toast.error('Please enter your full name');
      }else if(email == ""){
        toast.error('Please enter your email address');
      }else if (!isValidEmail(email)) {
        toast.error('please enter valid email address');
      }else{
        setVerifyOTPProcessing(true);
        try {
          const otpValue = otp.join("");
          let data = {name, email, mobile, otp:otpValue};
          const res = await postData('user-register', data);
          if(res.success){
            toast.success(res.msg);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("userDetails", JSON.stringify(res.userDetails));
            window.location.reload();
          }else{
            toast.error(res.msg);
          }
          setVerifyOTPProcessing(false);
        } catch (err:any) {
          toast.error(err);
          setVerifyOTPProcessing(false);
        }
      }
    };
    
    const otpResend = async () => {
        if(!resendProcessing){
            if(mobile == ""){
                toast.error('Please enter your mobile number');
            }else if(!isValidMobile(mobile)){
                toast.error('Please enter valid mobile number');
            }else{
                setResendProcessing(true);
                try {
                let data = {mobile};
                const res = await postData('sign-in', data);
                if(res.success){
                    toast.success("OTP resend successfully.");
                }else{
                    toast.error(res.msg);
                }
                setResendProcessing(false);
                } catch (err:any) {
                toast.error(err);
                setResendProcessing(false);
                }
            }
        }
    };

    

    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Allow only digits
        if (!/^\d?$/.test(value)) return;

        // Move to next input if value entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Move to previous input on delete
        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

    };

  return (
    <>
    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header align-items-start">
                <div className="d-flex flex-column text-center">
                <h1 className="modal-title fs-5">Sign in or create an account</h1>
                <p className="fs-6">Sign up or log in to access amazing deals and benefits!</p>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                
                   <div className="email-signin">                    

                    { activeStep == 1 &&
                        <>
                            <form className="needs-validation mobile-section" onSubmit={handleSignInSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="validationCustom01" className="form-label">Mobile Number</label>
                                    <Input
                                        addonBefore="+91"
                                        value={mobile}
                                        onChange={(e) => {
                                            // remove non-numeric values
                                            const onlyNumbers = e.target.value.replace(/\D/g, "");
                                            setMobile(onlyNumbers);
                                        }}
                                        placeholder="Enter mobile number"
                                        maxLength={10}
                                        className='login-mobile'
                                        />
                                    </div>
                                    {/* <div className="mb-3">
                                    <label htmlFor="validationCustom02" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="validationCustom02" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div> */}
                                    <div className="mb-3 d-flex align-items-center justify-content-center">
                                    <Button 
                                    htmlType="submit" 
                                    disabled={processing}
                                    loading={processing}
                                    className="btn btn-primary w-100">Send OTP</Button>
                                </div>
                            </form>
                        </>
                    }

                    { activeStep == 2 &&
                        <>
                         <form className="needs-validation otp-section" onSubmit={handleOTPSubmit}>
                            <div className="mb-3">
                                <div className="form-phone text-center">
                                    <a href="javascript:void(0)" className="edit_mobile text-white fw-bold" onClick={() => setActiveStep(1)}>+91 {mobile} <img src="/img/edit.svg" alt="" />
                                    </a>
                                </div>
                                    
                               <Row gutter={32} justify="center">
                                {otp.map((ref:any, index) => (
                                        <Col key={index}>
                                        <Input
                                            ref={(el) => {
                                                if (el) inputRefs.current[index] = el;
                                            }}
                                            maxLength={1}
                                            onChange={(e) => handleOTPChange(e, index)}
                                            style={{
                                            width: "50px",
                                            height: "50px",
                                            textAlign: "center",
                                            fontSize: "20px",
                                            }}
                                        />
                                        </Col>
                                    ))}
                                    </Row>
                                    <div className="mt-4">
                                        <span className="read-title">Don’t receive the OTP? <a href="javascript:void(0)" id="ResendOTPBtn" className="prcy-title" onClick={() => otpResend()}>{resendProcessing ? 'Process':'Resend OTP'}</a></span>
                                    </div>
                                 </div>
                                <div className="mb-3 d-flex align-items-center justify-content-center">
                                <Button htmlType="submit" loading={verifyOTPProcessing} disabled={verifyOTPProcessing} className="btn btn-primary w-100">Submit</Button>
                            </div>
                           </form>
                        </>
                    }
                    { activeStep == 3 &&
                        <>
                         <form className="needs-validation" onSubmit={handleRegisterSubmit}>
                            <div className="email-signin">                    

                                <div className="mb-3">
                                <label htmlFor="validationCustom01" className="form-label">Name</label>
                                <input type="text" className="form-control" id="validationCustom01" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                <label htmlFor="validationCustom02" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="validationCustom02" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3 d-flex align-items-center justify-content-center">
                                <Button htmlType="submit" className="btn btn-primary w-100">Submit</Button>
                                </div>
                            </div>
                            </form>
                        </>
                    }

                   </div>

                {/* <div className="or-saprator"><div className="left-line"></div><p>or</p><div className="left-line"></div></div>

                <div className="login-with-social">
                   <a href="#"className="signin-with-social google-signup"><img src="/img/signup_google.svg"/></a>
                   <a href="#"className="signin-with-social facebook-signup"><img src="/img/signup-fb.svg"/></a>
                   <a href="#"className="signin-with-social apple-signup"><img src="/img/signup-apple.svg"/></a>
                </div> */}
                <p className="by-signup mb-4 text-center">By signing in, I agree to tirtheasy's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></p>
                
                {/* <div className="create-an-account">Don't have an account? <a href="#">Create Account.</a></div> */}
              </div>
             
            </div>
          </div>
      </div>
    </>

  );
}

