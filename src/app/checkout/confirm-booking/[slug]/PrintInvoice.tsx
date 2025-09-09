'use client'

import { useEffect, useState, useRef } from 'react';
import { format,differenceInDays  } from 'date-fns';

type OrderProps = {
  orderData: any;
  checkInTime:any,
  checkOutTime:any,
  nights:number
};
export default function PrintInvoice({ orderData, checkInTime, nights, checkOutTime }: OrderProps) {


const numberFormat = (amt:any) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amt);
    }



  return (
    <div className="py-4" style={{width:"85%", margin:'0px auto'}}>
    <div className="invoice-card p-4">
      <div className="row align-items-center mb-4 no-break">
        <div className="col-md-6 d-flex align-items-center gap-3">
            
          <div className="logo-placeholder" aria-hidden="true">Tirtheasy</div>
          <div>
            <div className="invoice-title">Tirtheasy</div>
            <div className="small-muted">Luxury Seaside Hotel</div>
            <div className="small-muted">501, Ram Avenue, Vijayraj Nagar, Jaipur, India, 302018</div>
            <div className="small-muted">Phone: +91 96640 40225</div>
          </div>
        </div>

        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <div className="small-muted">Invoice # <strong>{orderData.invoice_id}</strong></div>
          <div className="small-muted">Invoice date: <strong>{orderData.booking_date}</strong></div>
        </div>
      </div>

      <hr />

      <div className="row mb-4 no-break">
        <div className="col-md-6">
          <h6 className="mb-2">Billed To</h6>
          <div><strong>{orderData.other_details?.userDetails?.name}</strong></div>
          <div className="small-muted">{orderData.other_details?.userDetails?.email}</div>
          <div className="small-muted">+91 {orderData.other_details?.userDetails?.mobile}</div>
          <div className="small-muted">Address: {orderData.other_details?.userDetails?.city}, {orderData.other_details?.userDetails?.state}, India</div>
        </div>

        <div className="col-md-6 text-md-end">
          <h6 className="mb-2">Booking Details</h6>
          <table className="table table-borderless small-muted mb-0 custom-table">
            <tbody>
              <tr><td className="ps-0">Check-in</td><td className="text-end pe-0"><strong>{orderData.check_in_date ? format(orderData.check_in_date, 'dd MMM yyyy') : ''} {orderData.other_details?.roomDetails?.hotel_details?.check_in_time ? format(checkInTime, 'hh:mm a') : '10:00 am'}</strong></td></tr>
              <tr><td className="ps-0">Check-out</td><td className="text-end pe-0"><strong>{orderData.check_out_date ? format(orderData.check_out_date, 'dd MMM yyyy') : ''} {orderData.other_details?.roomDetails?.hotel_details?.check_out_time ? format(checkOutTime, 'hh:mm a') : '10:00 am'}</strong></td></tr>
              <tr><td className="ps-0">Nights</td><td className="text-end pe-0"><strong>{nights}</strong></td></tr>
              <tr><td className="ps-0">Room</td><td className="text-end pe-0"><strong>{orderData.other_details?.roomDetails?.room_details?.title} ({orderData.adults} Adult{orderData.orderData > 0  && ', '+ orderData.orderData+' childs' }) </strong></td></tr>
              <tr><td className="ps-0">Payment method</td><td className="text-end pe-0"><strong>{orderData.payment_method_type}</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="table-responsive no-break">
        <table className="table align-middle">
          <thead>
            <tr>
              <th style={{width:"55%"}}>Description</th>
              <th className="text-end">Room</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div><strong>{orderData.other_details?.roomDetails?.hotel_details?.title} — {orderData.check_in_date ? format(orderData.check_in_date, 'MMM dd') : ''} - {orderData.check_out_date ? format(orderData.check_out_date, 'MMM dd') : ''}</strong></div>
                <div className="small-muted">{nights} nights × {orderData.other_details?.roomDetails?.room_details?.title}</div>
              </td>
              <td className="text-end">{orderData.rooms}</td>
              <td className="text-end">{numberFormat(orderData.sub_total)}</td>
            </tr>

                        <tr>
              <td colSpan={3}><hr /></td>
            </tr>

            <tr>
              <td></td>
              <td className="text-end small-muted">Convenience Fee</td>
              <td className="text-end">₹0.00</td>
            </tr>
            { orderData.extra_mattress_price > 0 ?
            <tr>
              <td></td>
              <td className="text-end small-muted">Extra Mattress({orderData.extra_mattress})</td>
              <td className="text-end">− {numberFormat(orderData.extra_mattress_price)}</td>
            </tr>
            :
            null
          }
          { orderData.discount > 0 ?
            <tr>
              <td></td>
              <td className="text-end small-muted">Discount</td>
              <td className="text-end">− {numberFormat(orderData.discount)}</td>
            </tr>
            :
            null
          }

            <tr className="fw-bold">
              <td></td>
              <td className="text-end">Total</td>
              <td className="text-end">{numberFormat(orderData.grand_total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row mt-4 no-break">
        <div className="col-md-8">
          <h6>Notes</h6>
          <p className="small-muted mb-1">
            Thank you for choosing Tirtheasy. Check-in is from 2:00 PM — early check-in requests are subject to availability. Please carry a government issued ID at arrival.
          </p>
          <p className="small-muted mb-0">If you need any changes to your booking or invoice, contact support@tirtheasy.com or +91 96640 40225.</p>
        </div>

        <div className="col-md-4 text-md-end">
          <h6 className="mb-1">Amount Paid</h6>
          <div className="fs-5 fw-semibold">{numberFormat(orderData.grand_total)}</div>
        </div>
      </div>

      <div className="row mt-4 no-print">
        <div className="col-12 text-end">
          <small className="text-muted">Generated by Tirtheasy Hotel Booking System</small>
        </div>
      </div>
    </div>
  </div>
  );
}