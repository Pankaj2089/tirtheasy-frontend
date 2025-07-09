// components/Header.js
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname , useRouter } from 'next/navigation';
export default function Header() {

 const action = usePathname();
 const [propertyType, setPropertyType] = useState<String | null>('dharmshala');

 
  const router = useRouter();

  useEffect(() => {
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
        window.location.href = '/';
      }
    };

  return (
    <header>
      <div className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
              <Link href="/" className="navbar-brand comp-logo">
                <img src="/img/logo.svg" className="img-fluid" alt="" />
              </Link>
              
            <div className="header-start d-flex align-items-center">
                <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header">
                          <button type="button" className="btn-close me-auto ms-0" data-bs-dismiss="offcanvas" aria-label="Close">
                            <img src="/img/close_menu.svg"/>
                          </button>
                      </div>
                      <div className="d-flex flex-column flex-lg-row align-lg-items-center justify-content-between">
                        <ul className="navbar-nav mx-lg-auto">
                           <li className="px-3 d-block d-lg-none user-profile">
                            <a href="" type="button" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Sign in / Create Account</a>
                            <span className="profile-details d-none">
                              <span className="profile-thumb">
                                <img src="/img/user_icon.svg"/>
                              </span>
                              <span className="user-details">Shankar Shankar</span>
                            </span>
                          </li>                           
                            <li className="nav-item">
                              <a  onClick={() => updatePage('hotel')} className={`nav-link cursor-pointer ` +(propertyType =='hotel' && (action == null || action == '/' || action == '/porperty-list') ? 'active':'')}>Hotels</a>
                            </li>
                            <li className="nav-item">
                              <a  onClick={() => updatePage('dharmshala')} className={`nav-link  cursor-pointer ` +(propertyType =='dharmshala' && (action == null || action == '/' || action == '/porperty-list') ? 'active':'')}>Dharamshala</a>
                            </li>
                            <li className="nav-item">
                              <a href="/about" className="nav-link">About Us</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#">Blog</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#">Contact Us</a> 
                            </li>
                        </ul>
                      </div> 
                </div>             
            </div>                  
              

              <div className="header-end d-flex align-items-center">

                <a href="#" className="me-3 me-lg-4 cart-icon"><img src="/img/cart.svg"/></a>
                                      
                <a href="" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" className="btn btn-primary d-none d-lg-block">Sign in / Create Account</a>
                <a href="#" className="navbar-toggler m-usericon" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><img src="/img/user_icon.svg" className="user-icon"/></a>

                <button className="navbar-toggler d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <img src="/img/user_icon.svg" className="user-icon"/>
                </button>
              </div>
          </div>
        </nav>    
      
    </div>
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header align-items-start">
                <div className="d-flex flex-column">
                <h1 className="modal-title fs-5">Sign in or create an account</h1>
                <p className="fs-6">Sign up for free or log in to access amazing deals and benefits!</p>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="needs-validation">
                   <div className="email-signin">                    

                    <div className="mb-3">
                      <label htmlFor="validationCustom01" className="form-label">Email</label>
                      <input type="email" className="form-control" id="validationCustom01" placeholder="Enter your email id" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="validationCustom02" className="form-label">Password</label>
                      <input type="password" className="form-control" id="validationCustom02" placeholder="Enter password" />
                    </div>

                    <div className="mb-3 d-flex align-items-center justify-content-center">
                      <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </div>

                   </div>
                </form>

                <div className="or-saprator"><div className="left-line"></div><p>or</p><div className="left-line"></div></div>

                <div className="login-with-social">
                   <a href="#"className="signin-with-social google-signup"><img src="/img/signup_google.svg"/></a>
                   <a href="#"className="signin-with-social facebook-signup"><img src="/img/signup-fb.svg"/></a>
                   <a href="#"className="signin-with-social apple-signup"><img src="/img/signup-apple.svg"/></a>
                </div>
                <p className="by-signup mb-4 text-center">By signing in, I agree to tirtheasy's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy.</a></p>
                
                <div className="create-an-account">Don't have an account? <a href="#">Create Account.</a></div>
              </div>
             
            </div>
          </div>
      </div>
    </header>
  );
}