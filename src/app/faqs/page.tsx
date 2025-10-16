"use client";
import { useEffect, useState, useRef } from 'react';
import { getData } from '../utils/api';
import { Skeleton } from 'antd';

export default function MyProfile() {

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
    
   // Create refs for each right-side accordion section
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
  const el = sectionRefs.current[activeCategory];
  if (el) {
    // small delay to wait for collapse animation
    const timer = setTimeout(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300); // 300–400ms works well with Bootstrap’s collapse speed

    return () => clearTimeout(timer);
  }
}, [activeCategory]); 

  return <>
<div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container"> 
            <div className="d-flex align-items-center">
                <h1 className="text-center d-flex align-items-center justify-content-start">My FAQs</h1> 
            </div>             
        </div>
  </div>
</div>


<div className="my-account-page mt-2 mt-lg-4">
    <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <div className="my-account-links-left d-none d-lg-block sticky-top" style={{ top: '100px' }}>
            <div className="my-account-links">
                {loading ?
                    <div style={{ width: "100%" }}>
                        <Skeleton.Input active block style={{ height: "20px" }} className="mb-2" />
                        <Skeleton.Input active block style={{ height: "20px" }} className="mb-2" />
                        <Skeleton.Input active block style={{ height: "20px" }} className="mb-2" />
                        <Skeleton.Input active block style={{ height: "20px" }} className="mb-2" />
                    </div> 
                :

                <ul>
                    {categories && categories.length > 0 && categories.map((record:any, index:number) => (
                        <li className={activeCategory==index?"active cursor-pointer":"cursor-pointer"} onClick={()=> setActiveCategory(index)}  ><a className="dropdown-item">{record}</a></li>
                    ))}
                                                     
                </ul>
                }
            </div>
            </div>
            </div>

            <div className="col-lg-9">
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
                                        <div className="accordion-item"  ref={(el) => {
                                                sectionRefs.current[index] = el;
                                            }}>
                                            <h6  className={"accordion-header "+(activeCategory == index ? ' ':'collapsed')} data-bs-toggle="collapse" data-bs-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne">
                                                {record2[0]} FAQ
                                            </h6>
                                            <div  id={"collapse"+index} className={"accordion-collapse collapse "+(activeCategory == index ? ' show':'')} data-bs-parent="#accordionExample">
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
        </div>
    </div>
</div>

  </>
}