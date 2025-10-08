"use client";
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import { Skeleton } from 'antd';

export default function HelpCenter() {

    const [activeCategory, setActiveCategory] = useState(0);
    const [records, setRecords] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);

     useEffect(() => {
        fetchFAQs();
    }, []);
    async function fetchFAQs() {
        setLoading(true);
        try {
            const res = await getData('get-faqs'); 
            if(res.success){                  
                setRecords(Object.entries(res.records));     
                setCategories(res.categories);
                setLoading(false);                
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

  return <>
  <div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container">  
           <h1 className="d-flex ">Help Center</h1>    
        </div>
  </div>
</div>
<div className="contact-us-section">
    <div className="container">
      
        <div className="row mt-3">
            <div className="col-lg-8 border-end">
                <div className="my-account-right">
                    <div className="row">
                        
                        <div className="col-md-12">
                            <div className="faq-section wow fadeInUp">
                                <div className="faq-section-accordion">        
                                    {loading ?
                                        <div style={{ width: "100%" }}>
                                            <Skeleton.Input active block style={{ height: "100px" }} className="mb-2" />
                                            <Skeleton.Input active block style={{ height: "100px" }} className="mb-2" />
                                            <Skeleton.Input active block style={{ height: "100px" }} className="mb-2" />
                                            <Skeleton.Input active block style={{ height: "100px" }} className="mb-2" />
                                        </div> 
                                    :
        
                                    <div className="accordion" id="accordionExample">
                                        {records.length > 0 && records.map((record2:any, index:number) => (
                                        <div className="accordion-item">
                                            <h6 className={"accordion-header "+(activeCategory == index ? ' ':'collapsed')} data-bs-toggle="collapse" data-bs-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne">
                                                {record2[0]}
                                            </h6>
                                            <div id={"collapse"+index} className={"accordion-collapse collapse "+(activeCategory == index ? ' show':'')} data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    {record2[1] && record2[1].length > 0 && record2[1].map((record_data:any, index_2:number) => (
                                                        <div className="question-answer mb-3">
                                                            <h6 className="mb-2">Q{index_2+1}:  {record_data.question}</h6>
                                                            <p><b>Ans.</b> {record_data.answer}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
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
                              <a href="https://wa.me/9664040225" target='_blank' className="contact-info-box contact-info-link ">
                                  <span className="call-us-icon">
                                      <img src="/img/whatsapp_red.svg"/>
                                  </span>
                                  <span className="contact-info">
                                      <span className="contact-label">Chat With Us</span>
                                      <span className="mob-no">WhatApp</span>
                                  </span>
                              </a>
                          </div>

                        {/* <div className="col-lg-12">
                            <div className="contact-info-box">
                                <span className="call-us-icon">
                                    <img src="img/map-pin.svg"/>
                                </span>
                                <span className="contact-info ">
                                    <span className="contact-label">Visit Us</span>
                                    <span className="mob-no"> 501, Ram Avenue, Vijayraj Nagar, Jaipur, India, 302018</span>
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </>
}