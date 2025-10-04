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
            const res = await getData('get-my-booking'); 
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

     const numberFormat = (amt:any) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amt);
    }
    
  return <>
<div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container"> 
            <div className="d-flex align-items-center">
                <h1 className="text-center d-flex align-items-center justify-content-start">My Bookings</h1> 
            </div>             
        </div>
  </div>
</div>

<div className="my-account-page mt-2 mt-lg-4">
    <div className="container">
        <div className="row">
            <div className="col-lg-3">
                <DashboardNav page={"bookings"} />
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
                        <div className="my-bookings-list">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <span className="active cursor-pointer" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"role="tab" aria-controls="pills-home" aria-selected="true">Upcomming</span>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <span className="cursor-pointer" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Completed</span>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <span className="cursor-pointer" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Cancelled</span>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>

                                    <div className="upcoming-bookings">
                                        {records.upcoming && records.upcoming.length > 0 && records.upcoming.map((record:any, index:number) => (
                                             <Link href={"/booking-details/"+btoa(record.invoice_id)} className="upcoming-booking-listing mb-3">
                                                <span className="top-bar-booking">
                                                    <span className="row">
                                                        <span className="col-6">
                                                            <p>Booking Date</p>
                                                            <p className="fw-bold">{record.booking_date}</p>
                                                        </span>
                                                        <span className="col-6 text-end">
                                                            <p>Booking Price</p>
                                                            <p className="fw-bold text-red">{numberFormat(record.grand_total)}</p>
                                                        </span>
                                                    </span>
                                                </span>

                                                <span className="my-booked-hotal">
                                                    <span className="row mb-2">
                                                        <span className="col-6">Booking Id: <span className="text-dark">#{record.invoice_id}</span></span>
                                                        <span className="col-6 text-end"><u className="text-red">View Details</u></span>
                                                    </span>

                                                    <span className="row align-items-center">
                                                        <span className="col-4 col-lg-3">
                                                            <span className="my-hotal-thumbnail">
                                                                <img src={record.other_details?.roomDetails?.hotel_details?.image} alt={record.other_details?.roomDetails?.hotel_details?.title} title={record.other_details?.roomDetails?.hotel_details?.title} />
                                                            </span>                                                    
                                                        </span>
                                                        <span className="col-8 col-lg-9 ps-0">
                                                            <span className="hotal-detials-right">
                                                                <h6>{record.other_details?.roomDetails?.hotel_details?.title}</h6>
                                                                <p className="address-small">From {record.other_details?.roomDetails?.hotel_details?.state}</p>
                                                                <p className="mt-2"><b>Checked-in:</b> {record.checkedIn},<br className="d-block d-md-none"/> <b>Checked-out:</b> {record.checkedOut}</p>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </Link>
                                        ))}

                                        { records.upcoming && records.upcoming.length == 0 &&
                                            <div className="alert alert-danger mb-4 mt-4 mb-250">Upcoming Bookings not found.</div>
                                        }

                                    </div>
                                </div>

                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                    <div className="upcoming-bookings">
                                       { records.completed && records.completed.length > 0 && records.completed.map((record:any, index:number) => (
                                            <Link href={"/booking-details/"+btoa(record.invoice_id)} className="upcoming-booking-listing mb-3">
                                                <span className="top-bar-booking">
                                                    <span className="row">
                                                        <span className="col-6">
                                                            <p>Booking Date</p>
                                                            <p className="fw-bold">{record.booking_date}</p>
                                                        </span>
                                                        <span className="col-6 text-end">
                                                            <p>Booking Price</p>
                                                            <p className="fw-bold text-red">{numberFormat(record.grand_total)}</p>
                                                        </span>
                                                    </span>
                                                </span>

                                                <span className="my-booked-hotal">
                                                    <span className="row mb-2">
                                                        <span className="col-6">Booking Id: <span className="text-dark">#{record.invoice_id}</span></span>
                                                        <span className="col-6 text-end"><u className="text-red">View Details</u></span>
                                                    </span>

                                                    <span className="row align-items-center">
                                                        <span className="col-4 col-lg-3">
                                                            <span className="my-hotal-thumbnail">
                                                                <img src={record.other_details?.roomDetails?.hotel_details?.image} alt={record.other_details?.roomDetails?.hotel_details?.title} title={record.other_details?.roomDetails?.hotel_details?.title} />
                                                            </span>                                                    
                                                        </span>
                                                        <span className="col-8 col-lg-9 ps-0">
                                                            <span className="hotal-detials-right">
                                                                <h6>{record.other_details?.roomDetails?.hotel_details?.title}</h6>
                                                                <p className="address-small">From {record.other_details?.roomDetails?.hotel_details?.state}</p>
                                                                <p className="mt-2"><b>Checked-in:</b> {record.checkedIn},<br className="d-block d-md-none"/> <b>Checked-out:</b> {record.checkedOut}</p>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </Link>
                                        ))}

                                        { records.completed && records.completed.length == 0 &&
                                            <div className="alert alert-danger mb-4 mt-4 mb-250">Completed bookings not found.</div>
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                    <div className="upcoming-bookings">
                                       { records.canceled && records.canceled.length > 0 && records.canceled.map((record:any, index:number) => (
                                            <Link href={"/booking-details/"+btoa(record.invoice_id)} className="upcoming-booking-listing mb-3">
                                                <span className="top-bar-booking">
                                                    <span className="row">
                                                        <span className="col-6">
                                                            <p>Booking Date</p>
                                                            <p className="fw-bold">{record.booking_date}</p>
                                                        </span>
                                                        <span className="col-6 text-end">
                                                            <p>Booking Price</p>
                                                            <p className="fw-bold text-red">{numberFormat(record.grand_total)}</p>
                                                        </span>
                                                    </span>
                                                </span>

                                                <span className="my-booked-hotal">
                                                    <span className="row mb-2">
                                                        <span className="col-6">Booking Id: <span className="text-dark">#{record.invoice_id}</span></span>
                                                        <span className="col-6 text-end"><u className="text-red">View Details</u></span>
                                                    </span>

                                                    <span className="row align-items-center">
                                                        <span className="col-4 col-lg-3">
                                                            <span className="my-hotal-thumbnail">
                                                                <img src={record.other_details?.roomDetails?.hotel_details?.image} alt={record.other_details?.roomDetails?.hotel_details?.title} title={record.other_details?.roomDetails?.hotel_details?.title} />
                                                            </span>                                                    
                                                        </span>
                                                        <span className="col-8 col-lg-9 ps-0">
                                                            <span className="hotal-detials-right">
                                                                <h6>{record.other_details?.roomDetails?.hotel_details?.title}</h6>
                                                                <p className="address-small">From {record.other_details?.roomDetails?.hotel_details?.state}</p>
                                                                <p className="mt-2"><b>Checked-in:</b> {record.checkedIn},<br className="d-block d-md-none"/> <b>Checked-out:</b> {record.checkedOut}</p>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                            </Link>
                                        ))}
                                        { records.canceled && records.canceled.length == 0 &&
                                            <div className="alert alert-danger mb-4 mt-4 mb-250">Cancelled bookings not found.</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            </div>
                        }
                   
                        
                    </div>
                </div>

        </div>
    </div>
</div>
  </>
}