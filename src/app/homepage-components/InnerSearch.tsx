'use client'
import { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from 'date-fns';
import { log } from 'console';

export default function InnerSearch() {

const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    persons: 0
  });

  const handleChange = (name:any,value:any) => {
    setSearchState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if(searchData.keywords !== '' || searchData.start_date !== '' || searchData.end_date !== ''){
      localStorage.setItem("searchData", JSON.stringify(searchData));      
    }
    
}, [searchData]);

 // Get array from localStorage
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('searchData');
    if (data) {
      let serData = JSON.parse(data);
      setSearchState(serData);
      console.log(serData.start_date);
      
      setStartDate(serData.start_date);
      setEndDate(serData.end_date);
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, [])


const endDatePickerRef = useRef<DatePicker>(null);;
const handleStartDateChange = (date:any) => {  

    setStartDate(date);
    // Focus the end date input and open calendar
    if (endDatePickerRef.current) {
      endDatePickerRef.current.setFocus(); // react-datepicker exposes setFocus()
    }
  };
  useEffect(() => {
    if (startDate && !endDate) {
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay); // Pass Date object directly
      handleChange('end_date',nextDay);
    }
    handleChange('start_date',startDate)
  }, [startDate]);

const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div className="hero-section pb-10">
  <div className="inner-page-banner inner-page-search gray_bg">
     <div className="container">    
        <form className="main-search-form d-none d-md-flex" action="" method="post">
               <div className="input-group search-main-box">
                  <input type="search" className="form-control search-box" placeholder="Search" value={searchData.keywords}  onChange={(e) => handleChange('keywords', e.target.value)} />
                </div>

                <div className="start-end-date">
                   <div className="start-date">
                     <span className="date-picker-icon"><img src="img/date.svg"/></span>
                     <div className="selected-date-day">
                          <div className="date"> {startDate ? format(startDate, 'dd MMM yyyy') : ''}</div>
                          <div className="day">{startDate ? format(startDate, 'EEEE') : ''}</div>
                     </div>
                   </div>

                   <div className="start-date end-date">
                     <span className="date-picker-icon"><img src="img/date.svg"/></span>
                     <div className="selected-date-day">
                          <div className="date"> {endDate ? format(endDate, 'dd MMM yyyy') : ''}</div>
                          <div className="day">{endDate ? format(endDate, 'EEEE') : ''}</div>
                     </div>
                   </div>
                </div>

                <div className="slect-audience" >
                    <div className="select-member" data-bs-toggle="collapse"  role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                      <span className="date-picker-icon"><img src="img/user.svg"/></span>
                      <div className="selected-date-day">
                            <div className="date">1 Adult,</div>
                            <div className="day">2 Room, 2 Child</div>
                      </div>
                    </div>
                      <div className="collapse multi-collapse member-addon" id="multiCollapseExample1">
                          <div className="select-adult">
                              <span className="left-label">Room</span>
                              <span className="qty-price">
                                <span className="number cont-ad-name">
                                  <span className="minus"><span>-</span></span>
                                  <input type="text" value="1"/>
                                  <span className="plus"><span>+</span></span>
                                </span>
                              </span>
                          </div>

                          <div className="select-adult">
                              <span className="left-label">Adult</span>
                              <span className="qty-price">
                                <span className="number cont-ad-name">
                                  <span className="minus"><span>-</span></span>
                                  <input type="text" value="1"/>
                                  <span className="plus"><span>+</span></span>
                                </span>
                              </span>
                          </div>


                          <div className="select-adult">
                              <span className="left-label">Children</span>
                              <span className="qty-price">
                                <span className="number cont-ad-name">
                                  <span className="minus"><span>-</span></span>
                                  <input type="text" value="1"/>
                                  <span className="plus"><span>+</span></span>
                                </span>
                              </span>
                          </div>

                          
                      </div>
                      
                </div>
                
                <div className="search-btn-box">
                   <button type="submit" className="btn btn-primary">Search</button>
                </div>
        </form> 
        <div className="moible-search-box d-block d-md-none">
          <div className="search-box-mob" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearchbox" aria-controls="offcanvasSearchbox">
            <span className="search-title">New Delhi</span>
            <span className="search-member-date">28 Jun - 5 Jul <span className="dot"></span> 2 Guests</span>
          </div>
        </div>        
        <div className="mobile-filter-view d-md-none pb-2">
            <a href="#" className="map-view-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_871_52)">
                  <path d="M13.3333 24H18.6667V21.3333H13.3333V24ZM4 8V10.6667H28V8H4ZM8 17.3333H24V14.6667H8V17.3333Z" fill="#696969"/>
                </g>
                <defs>
                  <clipPath id="clip0_871_52">
                    <rect width="32" height="32" fill="white"/>
                  </clipPath>
                </defs>
              </svg> Filters
            </a>
             <div className="select-box-mob">
              <select className="form-select" aria-label="Default select example">
                <option selected>Sort by</option>
                <option value="1">Best Match</option>
                <option value="2">Top Reviewed</option>
                <option value="3">Lowest Price First</option>
                <option value="4">Distance</option>
              </select>
            </div>
            <a href="" className="map-view-btn">Map View</a>
        </div>
        
      </div>
  </div>
</div>

  );
}