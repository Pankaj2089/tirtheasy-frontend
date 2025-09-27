// components/Header.js
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname , useRouter } from 'next/navigation';
import Signin from './Signin';
import { Menu } from "antd";
export default function Header() {

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
}
const menu = (
  <Menu>
    <Menu.Item key="1">
      <Link href="/my-profile">Profile</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link href="/settings">Settings</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <a className='cursor-pointer' onClick={() => LogOut()} >Logout</a>
    </Menu.Item>
  </Menu>
);
 const action = usePathname();
 const [propertyType, setPropertyType] = useState<String | null>('dharmshala');
 const [request_title, setRequestTitle] = useState('');

 const router = useRouter();

 const LogOut = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('accessToken');
    window.location.href= '/';
 }
 const [userDetails, setUserDetails] = useState<UserData  | null>(null);
  useEffect(() => {

    if(localStorage.getItem("accessToken")){
       let userData = JSON.parse(localStorage.getItem("userDetails") ?? "{}");;
      setUserDetails(userData as UserData);
    } 

      async function fetchData() {
        try {
          const data = localStorage.getItem('property_type');
          if (data) {
            setPropertyType(localStorage.getItem('property_type'));
          }else{
              localStorage.setItem('property_type','dharmshala');
              setPropertyType('dharmshala');
          }
        } catch (err) {
          console.error(err);
        }
      }
      fetchData();
    }, []);  

    const updatePage = (pageName:any) => {
      sessionStorage.removeItem('popularDestinations1');
      sessionStorage.removeItem('popularDestinations2');
      sessionStorage.removeItem('premiumFacilities');
      sessionStorage.removeItem('promotions1');
      sessionStorage.removeItem('promotions2');
      localStorage.setItem('property_type',pageName);
      setPropertyType(pageName);
      if(action == null || action == '/' || action == '/porperty-list'){
        window.location.reload()
      }else{
        router.push('/', { scroll: false });
        //window.location.href = '/';
      }
    };

  return (
    <header>
      <div className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="logo-left d-flex align-items-center gap-2">
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft" id="offcanvasCloseBtn">
                    <img src="/img/hemburger.svg"/>
                </button>
                <Link href="/" className="navbar-brand comp-logo">
                  <img src="/img/logo.svg" className="img-fluid" alt="" />
                </Link>
              </div>

             
              <div className="offcanvas offcanvas-start d-lg-none" data-bs-scroll="true" tabIndex={-1} id="offcanvasLeft" aria-labelledby="offcanvasleftLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close-back me-auto ms-0" data-bs-dismiss="offcanvas" aria-label="Close">
                            <img src="/img/close_profile_offcancvas.svg"/>
                        </button>

                    </div>
                    <div className="d-flex flex-column flex-lg-row align-lg-items-center justify-content-between">
                      <div className="header-links px-2">
                        <h6 className="mb-2">Menu</h6>
                        <ul>
                          <li><a href="#" className="dropdown-item" onClick={() => updatePage('hotel')} >
                            <span className="my-account-icon"><img src="/img/hotel.svg"/></span> Hotels 
                            <span className="arrow-right ms-auto" ><img src="/img/arrow_right_menu.svg"/></span></a></li>
                          <li><a className="dropdown-item" onClick={() => updatePage('dharmshala')}><span className="my-account-icon"><img src="/img/dharamshala.svg"/></span> Dharamshala <span className="arrow-right ms-auto"><img src="/img/arrow_right_menu.svg"/></span></a></li>
                          <li><Link href="/about"  className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn")?.click(); }}><span className="my-account-icon"><img src="/img/about_us.svg"/></span> About Us <span className="arrow-right ms-auto"><img src="/img/arrow_right_menu.svg"/></span></Link></li>   
                          <li><Link href="#" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn")?.click(); }}><span className="my-account-icon"><img src="/img/blog.svg"/></span> Blog <span className="arrow-right ms-auto"><img src="/img/arrow_right_menu.svg"/></span></Link></li>   
                          <li><Link href="/contact-us" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn")?.click(); }}><span className="my-account-icon"><img src="/img/contact_us.svg"/></span> Contact Us <span className="arrow-right ms-auto"><img src="/img/arrow_right_menu.svg"/></span></Link></li>
                        </ul>
                      </div>
                    </div> 
              </div>

            <div className="header-start d-flex align-items-center">
                {/* <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header">
                          <button type="button" className="btn-close me-auto ms-0" data-bs-dismiss="offcanvas" aria-label="Close">
                            <img src="/img/close_menu.svg"/>
                          </button>
                      </div>
                      <div className="d-flex flex-column flex-lg-row align-lg-items-center justify-content-between">
                        <ul className="navbar-nav mx-lg-auto">
                           <li className="px-3 d-block d-lg-none user-profile">
                            { (userDetails) ?
                              <>
                                <Link onClick={() => LogOut()} href={'/'}>Log Out</Link> 
                                <span className="profile-details mt-3 ">
                                <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                                <span className="user-details">{userDetails?.name}</span>
                              </span>
                              </>
                            :
                              <Link href="" type="button" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Sign in / Create Account</Link>
                            }

                          </li>                           
                            <li className="nav-item">
                              <a  onClick={() => updatePage('hotel')} className={`nav-link cursor-pointer ` +(propertyType =='hotel' && (action == null || action == '/' || action == '/porperty-list') ? 'active':'')}>Hotels</a>
                            </li>
                            <li className="nav-item">
                              <a  onClick={() => updatePage('dharmshala')} className={`nav-link  cursor-pointer ` +(propertyType =='dharmshala' && (action == null || action == '/' || action == '/porperty-list') ? 'active':'')}>Dharamshala</a>
                            </li>
                            <li className="nav-item">
                              <Link href="/about" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" href="#">Blog</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" href="/contact-us">Contact Us</Link> 
                            </li>
                            
                        </ul>
                      </div> 
                </div>              */}

                <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                          <div className="offcanvas-header my-account-header">
                              <button type="button" className="btn-close-back me-auto ms-0" data-bs-dismiss="offcanvas" aria-label="Close"  id="offcanvasCloseBtn2">
                                <img src="/img/close_profile_offcancvas.svg"/>
                              </button>

                              <div className="profile-info">
                                <span className="username">{userDetails?.name}</span>
                                <span className="mobile-no">+91 {userDetails?.mobile}</span>
                              </div>
                          </div>
                          <div className="d-flex flex-column flex-lg-row align-lg-items-center justify-content-between">
                            <ul className="navbar-nav mx-lg-auto">
                              <li className="px-2 pt-0 d-block d-lg-none user-profile">
                                <div className="profile-dropdown">
                                      <div className="header-links border-bottom">
                                        <h6 className="mb-2">Account</h6>
                                        <ul>
                                          <li><Link href="/my-profile" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn2")?.click(); }}><span className="my-account-icon"><img src="/img/user_profile.svg"/></span> My Profile</Link></li>
                                          <li><Link href="/my-bookings" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn2")?.click(); }}><span className="my-account-icon"><img src="/img/my_booking.svg"/></span> My Bookings</Link></li>
                                          <li><Link href="/my-wishlist" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn2")?.click(); }}><span className="my-account-icon"><img src="/img/wishlist_icon.svg"/></span> My Wishlist</Link></li>                                          
                                        </ul>
                                      </div>
                                      <div className="header-links border-bottom">
                                        <h6 className="mb-2">Settings</h6>
                                        <ul>
                                            <li><Link href="/help-center" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn2")?.click(); }}>Help Center</Link></li>
                                            <li><Link href="/privacy-policy" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn2")?.click(); }}>Privacy Policy</Link></li>
                                            <li><Link href="/terms-of-use" className="dropdown-item" onClick={() => {  document.getElementById("offcanvasCloseBtn2")?.click(); }}>Terms & Condition</Link></li>
                                        </ul>
                                      </div>
                                      <div className="header-links">
                                        <ul>
                                          <li><a onClick={() => LogOut()} className="dropdown-item cursor-pointer"><span className="my-account-icon"><img src="/img/logout.svg"/></span> Logout</a></li> 
                                        </ul>
                                      </div>
                                    </div>  
                              </li>                            
                                
                               <li className="nav-item">
                                  <a  onClick={() => updatePage('hotel')} className={`nav-link cursor-pointer ` +(propertyType =='hotel' && (action == null || action == '/' || action == '/porperty-list') ? 'active':'')}>Hotels</a>
                                </li>
                                <li className="nav-item">
                                  <a  onClick={() => updatePage('dharmshala')} className={`nav-link  cursor-pointer ` +(propertyType =='dharmshala' && (action == null || action == '/' || action == '/porperty-list') ? 'active':'')}>Dharamshala</a>
                                </li>

                                <li className="nav-item">
                                  <Link href="/about" className="nav-link">About Us</Link>
                                </li>

                                <li className="nav-item">
                                  <a className="nav-link" href="#">Blog</a>
                                </li>

                                <li className="nav-item">
                                  <Link className="nav-link" href="/contact-us">Contact Us</Link> 
                                </li>
                              
                            </ul>
                            
                          </div> 
                </div> 
            </div>              

              <div className="header-end d-flex align-items-center">

                <a className=" cursor-pointer me-3 me-lg-4 cart-icon"><img src="/img/cart.svg"/></a>

                { (userDetails) ?
                //   <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                //   <span className="profile-details" style={{ cursor: "pointer" }}>
                //     <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                //     <span className="user-details">{userDetails?.name?.length > 8 
                //       ? userDetails?.name.substring(0, 8) + "..." 
                //       : userDetails?.name}</span>
                //   </span>
                // </Dropdown>
                <>
                  <div className="dropdown userprofile">
                    <a href="#" className="profile-icon dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                        <span className="username-desk d-none d-lg-block">{userDetails?.name?.length > 8 
                          ? userDetails?.name.substring(0, 8) + "..." 
                          : userDetails?.name}
                        </span>
                    </a>
                    <div className="dropdown-menu profile-dropdown dropdown-menu-end">
                      <div className="profile-info">
                        <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                        <span className="username">{userDetails?.name}</span>
                      </div>
                      <div className="header-links">
                        <ul>
                          <li><Link href="/my-profile" className="dropdown-item"><span className="my-account-icon"><img src="/img/user_profile.svg"/></span> My Profile</Link></li>
                          <li><Link href="/my-bookings" className="dropdown-item"><span className="my-account-icon"><img src="/img/my_booking.svg"/></span> My Bookings</Link></li>
                          <li><Link href="/my-wishlist" className="dropdown-item"><span className="my-account-icon"><img src="/img/wishlist_icon.svg"/></span> My Wishlist</Link></li>
                          <hr/>
                          <li><a onClick={() => LogOut()} className="dropdown-item cursor-pointer"><span className="my-account-icon"><img src="/img/logout.svg"/></span> Logout</a></li>  
                        </ul>
                      </div>
                    </div>                    
                   
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                </button>
                </>
                :
                <>
                  <a  data-bs-target="#exampleModalToggle" onClick={() => setRequestTitle('header')} data-bs-toggle="modal" className="cursor-pointer btn btn-primary d-none d-lg-block">Sign in / Create Account</a>
                  <a className="cursor-pointer navbar-toggler m-usericon" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><img src="/img/user_icon.svg" className="user-icon"/></a>

                </>
                }

                {/* <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <img src="/img/user_icon.svg" className="user-icon"/>
                </button> */}
              </div>
          </div>
        </nav>    

    </div>
      <Signin request_title={request_title} />
    </header>
  );
}