// components/Header.js
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname , useRouter } from 'next/navigation';
import Signin from './Signin';
import { Dropdown, Menu } from "antd";
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
      <Link href="/profile">Profile</Link>
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
                            <Link href="" type="button" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Sign in / Create Account</Link>
                            <span className="profile-details ">
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
                              <Link href="/about" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" href="#">Blog</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" href="#">Contact Us</Link> 
                            </li>
                        </ul>
                      </div> 
                </div>             
            </div>              

              <div className="header-end d-flex align-items-center">

                <a className=" cursor-pointer me-3 me-lg-4 cart-icon"><img src="/img/cart.svg"/></a>

                { (userDetails) ?
                  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
                  <span className="profile-details" style={{ cursor: "pointer" }}>
                    <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                    <span className="user-details">{userDetails?.name?.length > 8 
                      ? userDetails?.name.substring(0, 8) + "..." 
                      : userDetails?.name}</span>
                  </span>
                </Dropdown>
                :
                <>
                  <a  data-bs-target="#exampleModalToggle" onClick={() => setRequestTitle('header')} data-bs-toggle="modal" className="cursor-pointer btn btn-primary d-none d-lg-block">Sign in / Create Account</a>
                  <a className="cursor-pointer navbar-toggler m-usericon" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><img src="/img/user_icon.svg" className="user-icon"/></a>

                </>
                }
                <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <img src="/img/user_icon.svg" className="user-icon"/>
                </button>
              </div>
          </div>
        </nav>    

    </div>
      <Signin request_title={request_title} />
    </header>
  );
}