"use client";
import DashboardNav from "../components/DashboardNav";
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { Skeleton } from 'antd';

export default function MyWishlist() {
    const [records, setRecords] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){     
            router.push("/");
        } else{
            setLoading(true);
            fetchMyWishList();
        }
    }, []);



     async function fetchMyWishList() {
        try {
            const res = await getData('my-wishlist'); 
            if(res.success){  
                setRecords(res.records);
                setLoading(false);
            }else{
                router.push("/");
            }
        } catch (err) {
            console.error(err);
        }
    }
    
   
  return <>
<div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container"> 
            <div className="d-flex align-items-center">
                <h1 className="text-center d-flex align-items-center justify-content-start">My Wishlist</h1> 
            </div>             
        </div>
  </div>
   
</div>

<div className="my-account-page mt-2 mt-lg-4">
    <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <DashboardNav page={"wishlist"} />
            </div>
            <div className="col-lg-9">
                <div className="my-account-right my-bookings-main">

                    {loading ?
                        <div style={{ width: "100%" }}>
                            <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                            <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                            <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                            <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                        </div> 
                        :
                            <div className="row">
                                {records.length > 0 && records.map((record:any, index:number) => (
                                <div className="col-12 position-relative">
                                    <div className="share-button">
                                    <a href="#"><img src="img/share-2.svg"/></a>
                                    </div>
                                    <Link href={"/property/" + record.hotel.slug} className="hotel-list-box wishlist-box">
                                        <span className="hotel-thumb">
                                            <img src={record.hotel.image}/>
                                        </span>
                                        <span className="wishlist-item-detials">
                                            <span className="title-main h5">{record.hotel.title}</span>
                                            <p className="location-box d-flex align-items-center"><img src="img/location_pin.svg" className="me-1"/> {record.hotel.city}, {record.hotel.state}</p>
                                            
                                            <div className="benefits-section w-100">
                                                <ul className=" w-100">
                                                    {record.hotel.facilities_list.length > 0 && record.hotel.facilities_list.slice(0,5).map((facility:any, index:number) => (
                                                        <li><img src="img/gray_tick.svg" /> {facility.title}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <span className="price-view-detials">
                                                <span className="new-price d-flex text-start align-items-center justify-content-start">
                                                    <p className="me-2">Price</p>
                                                    <p className="new-price-big red-text fw-bold">Rs. {record.hotel.price}</p>
                                                </span>
                                                <Link href={"/property/" + record.hotel.slug} className="red-text">View Details</Link>
                                            </span>
                                        </span>
                                        
                                    </Link>

                                </div>
                                ))}

                                { (records.length == 0 && !loading) &&
                                    <div className="col-12 position-relative">
                                        <div className="alert alert-danger">Data not found.</div>
                                    </div>
                                }

                            </div>
                        }
                   
                        
                    </div>
                </div>

        </div>
    </div>
</div>
  </>
}