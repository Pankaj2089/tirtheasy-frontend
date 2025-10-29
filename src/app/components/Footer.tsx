'use client'
import {  useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData } from '../utils/api';

export default function Footer() {

  const [email, setEmail] = useState('');
const [processing, setProcessing] = useState(false);

  const isValidEmail = (email:any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

    const handleSubmit = async (e:any) => {
      e.preventDefault();
      if(email == ""){
        toast.error('Please enter email address');
      }else if(!isValidEmail(email)){
        toast.error('Please enter valid email address');
      }else{
        setProcessing(true);
        try {
          let data = {email};
          const res = await postData('save-newsletter', data);
          if(res.success){
            toast.success(res.msg);
            setEmail('');
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

  return (
    <footer className="footer">
    <div className="our-newsletter-section">
      <div className="container">
        <div className="our-newsletter">
          <h3 className="text-center mb-3">Subscribe our <span className="red-text">Newsletter</span></h3>
          <div className="newsletter-form col-lg-7 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center justify-content-center">
                <input className="form-control" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary ms-0 ms-lg-3 d-none d-md-block">{ processing ? 'Processing' :'Subscribe'}</button>
                <button type="submit" className="ms-2 d-block d-md-none"><img src="/img/send.svg"/></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-main">
      <div className="container">
          <div className="row">
            <div className="col-lg-3 mb-4 mb-lg-0 ">
                <div className="foot-about">
                   <div className="footer-logo mb-3">
                     <img src="/img/footer_logo.svg"/>
                   </div>
                   <p className="text-white">Introducing India's first Religious travel platform  Dedicated to Booking verified Dharmshala, Guest house, and Travel Tickets with  Real time availability, and effortless booking, all in one place.</p>
                </div>
            </div>

            <div className="col-lg-6 col-md-12 d-none d-md-block ">
                <div className="row">
                  <div className="col-lg-4 col-md-6 ">
                        <div className="footer-links">
                          <h4 className="mb-4">Help Center</h4>
                          <ul className="foot-link">
                              <li><Link href="/faqs">FAQs</Link></li>
                              <li><Link href="/privacy-policy">Privacy policy</Link></li>
                              <li><a href="#">Cookie policy</a></li>
                              <li><Link href="/terms-of-use">Terms of use</Link></li>
                              <li><a href="#">User Agreement</a></li>
                              <li><Link href="/help-center">Help center</Link></li>
                          </ul>
                        </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                        <div className="footer-links">
                          <h4 className="mb-4">Company</h4>
                          <ul className="foot-link">
                              <li><Link href="/about">About us</Link></li>
                              <li><a href="#">Careers</a></li>
                              <li><a href="#">Press</a></li>
                              <li><a href="/blogs">Blogs</a></li>
                          </ul>
                        </div>
                  </div>

                  <div className="col-lg-4 ">
                        <div className="footer-links">
                          <h4 className="mb-4">Partner with us</h4>
                          <ul className="foot-link">
                              <li><a className="cursor-pointer" data-bs-target="#addDharmshalaModal" data-bs-toggle="modal">Add Your Dharmshala</a></li>
                          </ul>
                        </div>
                  </div>
                </div>
            </div>

            <div className="col-lg-3 col-md-12 d-none d-md-block">
              <div className="row">
                 <div className="col-md-6 col-lg-12">
                      <div className="footer-links mb-5">
                        <h4 className="mb-4">Get the App</h4>
                        <ul className="foot-link">
                            <li><a href="#">IOS App</a></li>
                            <li><a href="#">Android App</a></li>
                        </ul>
                      </div> 
                 </div>

                 <div className="col-md-6 col-lg-12">
                  <div className="footer-links">
                    <h4>Follow us</h4>
                    <ul className="social-meida">
                      <li><a href="#"><img src="/img/youtube.svg"/></a></li>
                      <li><a href="#"><img src="/img/linkedin.svg"/></a></li>
                      <li><a href="#"><img src="/img/instagram.svg"/></a></li>
                      <li><a href="#"><img src="/img/facebook.svg"/></a></li>
                      <li><a href="#"><img src="/img/whatsapp.svg"/></a></li>
                      <li><a href="#"><img src="/img/twitter.svg"/></a></li>
                    </ul>
                  </div>
                 </div>
              </div>
            </div>

            <div className="d-block d-md-none footer-mobile-ver">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h4 className="accordion-button collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Help</h4>
                      <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                          <div className="footer-links">
                            <ul className="foot-link">
                              <li><Link href="/help-center">Help center</Link></li>
                                <li><Link href="/faqs">FAQs</Link></li>
                              <li><Link href="/privacy-policy">Privacy policy</Link></li>
                              <li><a href="#">Cookie policy</a></li>
                              <li><Link href="/terms-of-use">Terms of use</Link></li>
                              <li><a href="#">User Agreement</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                     
                      <h4 className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Company</h4>
                      <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <ul className="foot-link">
                                <li><Link href="/about">About us</Link></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Press</a></li>
                                <li><a href="/blogs">Blog</a></li>
                            </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h4 className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Destinations</h4>
                      <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <ul className="foot-link">
                                <li><a className="cursor-pointer" data-bs-target="#addDharmshalaModal" data-bs-toggle="modal">Add Your Dharmshala</a></li>
                            </ul>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h4 className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapsefourth" aria-expanded="false" aria-controls="collapsefourth">Destinations</h4>
                      <div id="collapsefourth" className="accordion-collapse collapse" aria-labelledby="headingfourth" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <ul className="foot-link">
                                <li><a href="#">Countries/Territories</a></li>
                                <li><a href="#">All Flight Routes</a></li>
                            </ul>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="col-12 mt-4">
                  <div className="footer-links">
                    <h4 className="mb-0">Follow us</h4>
                    <ul className="social-meida mb-5 mt-2">
                      <li><a href="#"><img src="/img/youtube.svg"/></a></li>
                      <li><a href="#"><img src="/img/linkedin.svg"/></a></li>
                      <li><a href="#"><img src="/img/instagram.svg"/></a></li>
                      <li><a href="#"><img src="/img/facebook.svg"/></a></li>
                      <li><a href="#"><img src="/img/whatsapp.svg"/></a></li>
                      <li><a href="#"><img src="/img/twitter.svg"/></a></li>
                    </ul>
                  </div>
                 </div>
            </div>
          </div>
      </div>
    </div>
    <div className="footer-bottom pt-3">
       <div className="container">
         <p className="text-center w-100">© {new Date().getFullYear()} Tirthesay. All rights reserved.</p>
       </div>
    </div>
  </footer>
  );
}