// components/Header.js
"use client";
import Link from 'next/link';
type Props = {
  page: any;
};
export default function DashboardNav({ page }: Props) {
     const LogOut = () => {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('accessToken');
        window.location.href= '/';
    }

  return (
    <>
        <div className="my-account-links-left d-none d-lg-block">
            <div className="my-account-links border-bottom">
                <h6 className="mb-2">Account</h6>
                <ul>
                    <li className={page=='profile'?"active":''}><Link href="my-profile" className="dropdown-item"><span className="my-account-icon"><img src="img/user_profile.svg"/></span> My Profile</Link></li>
                    <li className={page=='bookings'?"active":''}><Link href="/my-bookings" className="dropdown-item"><span className="my-account-icon"><img src="img/my_booking.svg"/></span> My Bookings</Link></li>
                    <li className={page=='wishlist'?"active":''}><Link href="/my-wishlist" className="dropdown-item"><span className="my-account-icon"><img src="img/wishlist_icon.svg"/></span> My Wishlist</Link></li>                                          
                </ul>
            </div>

            <div className="my-account-links border-bottom">
                <h6 className="mb-2">Settings</h6>
                <ul>
                    <li><Link href="/help-center" className="dropdown-item">Help Center</Link></li>
                    <li><Link href="/privacy-policy" className="dropdown-item">Privacy Policy</Link></li>
                    <li><Link href="/terms-of-use" className="dropdown-item">Terms & Condition</Link></li>
                </ul>
            </div>
            <div className="my-account-links mb-0 pb-0">
                <ul>
                    <li><a onClick={() => LogOut()} className="dropdown-item cursor-pointer"><span className="my-account-icon"><img src="img/logout.svg"/></span> Logout</a></li> 
                </ul>
            </div>
        </div>
    </>
  );
}