'use client'
import { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from 'date-fns';
import { Button } from 'antd';
import { postData } from '../utils/api';
type InnerSearchProps = {
  searchAction: any;
  loading:any;
};
export default function InnerSearch({ searchAction, loading }: InnerSearchProps) {

const defaultStartDate = new Date(); // Today
const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 1); // 7 days from today

const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
 const [propertyType, setPropertyType] = useState<String | null>('dharmshala');
const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    adult: 1,
    rooms: 1,
    childerns: 0,
    sortby: ''
  });

  useEffect(() => {
    if(searchData.keywords !== '' || searchData.start_date !== '' || searchData.end_date !== ''){
      localStorage.setItem("searchData", JSON.stringify(searchData));      
    }
    
}, [searchData]);

const inputRef = useRef<any>(null);
  const endDateDiv = useRef<any>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [isRoomPerson, setRoomPerson] = useState(false);
  const [isSearchKeywords, setSearchKeywords] = useState(false);
  const [citiesList, setSearchCities] = useState([]);
    const [hotelsList, setSearchHotels] = useState([]);

  const toggleRoomPerson = () => {
    setRoomPerson(prev => !prev); // toggles between true/false
  };
  const toggleSearchKeywords = () => {
    setSearchKeywords(prev => !prev); // toggles between true/false
  };

  const handleDivClick = () => {
    setIsOpen(true);
    inputRef.current?.onInputClick(); // Trigger the input click
  };
  const handleEndDateClick = () => {
    setIsEndOpen(true);
    endDatePickerRef.current?.onInputClick(); // Trigger the input click
  };

  const handleChange = (name:any,value:any) => {
    setSearchState((prev) => ({ ...prev, [name]: value }));
  };

   const handleCitySlect = (name:any,value:any) => {
    setSearchState((prev) => ({ ...prev, [name]: value }));
    setSearchKeywords(false);
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
      setStartDate(serData.start_date);
      setEndDate(serData.end_date);
    }
  };

 useEffect(() => {
    loadFromLocalStorage();

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

const endDatePickerRef = useRef<DatePicker>(null);;
const handleStartDateChange = (date:any) => { 
  setStartDate(date);
  // Focus the end date input and open calendar
  if (endDatePickerRef.current) {
    setIsEndOpen(true);
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
  handleChange('start_date',startDate);
  setIsOpen(false);
}, [startDate]);
  
  useEffect(() => {
    setIsEndOpen(false);
  }, [endDate]);

const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleIncrement = (field:any) => {
    setSearchState((prev:any) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));
  };

  const handleDecrement = (field:any) => {
    setSearchState((prev:any) => ({
      ...prev,
      [field]: Math.max(field === 'childerns' ? 0 : 1, prev[field] - 1),
    }));
  };

  const getCitieisList = async () =>  {
    setSearchCities([]);
    setSearchHotels([]);
    let postRec: { keywords: String | null, property_type:String | null } = { keywords: searchData.keywords, property_type:propertyType}; 
      const res = await postData('get-cities', postRec);        
      setSearchCities(res.records);
      setSearchHotels(res.recHotels);
  }

  const [monthsToShow, setMonthsToShow] = useState(2);
  const [isMobile, setpopperPlacement] = useState(false);
  useEffect(() => {
    const updateMonths = () => {
      if (window.innerWidth < 768) {
        setMonthsToShow(1); // mobile
        setpopperPlacement(true);
      } else {
        setMonthsToShow(2); // desktop
      }
    };

    updateMonths(); // run on mount
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return (
    <div className="hero-section pb-10">
  <div className="inner-page-banner inner-page-search gray_bg">
     <div className="container">    
        <form className="main-search-form d-none d-md-flex" action="" method="post">
               <div className="input-group search-main-box">
                  <input onClickCapture={toggleSearchKeywords} 
                  type="search" 
                  className="form-control search-box" 
                  placeholder="Search" 
                  value={searchData.keywords}  
                  onChange={(e) => handleChange('keywords', e.target.value)} 
                  onClick={() => setRoomPerson(false)} 
                  onKeyUp={getCitieisList}
                  />

                  <div className={`search-popup multi-collapse member-addon collapse ${(isSearchKeywords && (citiesList.length > 0 || hotelsList.length > 0)) ? 'show' : 'multi-collapse'}`} 
                     style={{ maxHeight: '200px', minHeight: 'auto', overflow: 'auto' }}
                    >
                      {hotelsList.map((hotelRow:any, index) => (
                        <div className="select-city-row" key={index} onClick={(e) => handleCitySlect('keywords', hotelRow.title)}>
                          <span className="left-label">
                           <i className=''></i> {hotelRow.title}
                          </span>
                        </div>
                      ))}
                      {citiesList.map((citiRow:any, index) => (
                        <div className="select-city-row" key={index} onClick={(e) => handleCitySlect('keywords', citiRow.title)}>
                          <span className="left-label">
                           <i className=''></i> {citiRow.title}, <span className='country_name'>India</span>
                           <span className='city-lable'>city</span>
                          </span>
                        </div>
                      ))}
                    </div>
                </div>

                <div className="start-end-date" onClick={() => {setRoomPerson(false); setSearchKeywords(false);}}>
                    <div className="start-date" onClick={handleDivClick}>
                      <span className="date-picker-icon"><img src="/img/date.svg"/></span>
                       <div className='dateBox'>
                      <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                            if (date) {
                                handleStartDateChange(date);
                                setStartDate(date);
                                if (endDate && date > endDate) {
                                  setEndDate(null); // reset end if before start
                                }
                            } else {
                                setStartDate(null);
                            }
                            }}
                            minDate={today}
                            monthsShown={monthsToShow}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Select start date"
                            ref={inputRef}
                            open={isOpen}
                            onClickOutside={() => setIsOpen(false)}
                            isClearable={true}
                            
                            popperPlacement={!isMobile ? "bottom-start" : "bottom-end"}
                            
                            //withPortal // Optional: good for mobile
                        /> 
                        </div>     
                      <div className="selected-date-day" >
                          <div className="date"> {startDate ? format(startDate, 'dd MMM yyyy') : ''}</div>
                          <div className="day">{startDate ? format(startDate, 'EEEE') : ''}</div>
                      </div>
                              
                    </div>

                    <div className="start-date end-date" ref={endDateDiv}  onClick={handleEndDateClick} >
                      <span className="date-picker-icon"><img src="/img/date.svg"/></span>
                      <div className="selected-date-day">
                          <div className="date"> {endDate ? format(endDate, 'dd MMM yyyy') : ''}</div>
                          <div className="day">{endDate ? format(endDate, 'EEEE') : ''}</div>
                      </div>
                      <div className='dateBox'>
                      <DatePicker
                            selected={endDate}
                            onChange={(date) => {setEndDate(date); handleChange('end_date',date); }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Select end date"
                            monthsShown={monthsToShow}
                            ref={endDatePickerRef}
                            minDate={startDate ? addDays(startDate, 1) : today}
                            disabled={!startDate}
                            open={isEndOpen}
                            onClickOutside={() => setIsEndOpen(false)}
                            isClearable={true}
                            popperPlacement={!isMobile ? "bottom-start" : "bottom-end"}
                        /> 
                    </div>           
                    </div>
                </div>

                <div className="slect-audience" >
                    <div className="select-member" role="button" onClick= {() =>{toggleRoomPerson(); setSearchKeywords(false);}}>
                      <span className="date-picker-icon"><img src="/img/user.svg"/></span>
                      <div className="selected-date-day">
                            <div className="date">{searchData.adult} Adult,</div>
                            <div className="day">{searchData.rooms} Room{searchData.childerns > 0 ? ', '+searchData.childerns+' Child' : '' }</div>
                      </div>
                    </div>
                    <div className={`multi-collapse member-addon collapse ${isRoomPerson ? 'show' : 'multi-collapse'}`}>
                      {['adult', 'childerns', 'rooms'].map((field, index) => (
                        <div className="select-adult" key={index}>
                          <span className="left-label">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </span>
                          <span className="qty-price">
                            <span className="number cont-ad-name">
                              <span className="minus" onClick={() => handleDecrement(field)}><span>-</span></span>
                              <input
                                type="text"
                                value={searchData[field as keyof typeof searchData]}
                                readOnly
                              />
                              <span className="plus" onClick={() => handleIncrement(field)}><span>+</span></span>
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                      
                </div>
                <div className="search-btn-box">
                  <Button
                  onClick={searchAction}
                  className="btn btn-primary search-btn"
                  loading={loading}
                  disabled={loading}
                >
                  Search
                </Button>
            </div>
        </form> 
        <div className="moible-search-box d-block d-md-none">
          <div className="search-box-mob" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearchbox" aria-controls="offcanvasSearchbox">
            <span className="search-title">{searchData.keywords}</span>
            <span className="search-member-date">{startDate ? format(startDate, 'dd MMM') : ''} - {endDate ? format(endDate, 'dd MMM') : ''} <span className="dot"></span> {searchData.adult} Guests</span>
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
              <select className="form-select" aria-label="Default select example" value={searchData.sortby} onChange={(e) => handleChange('sortby', e.target.value)}>
                <option selected value="">Sort by</option>
                <option value="best_match"  >Best Match</option>
                <option value="top_reviewed" >Top Reviewed</option>
                <option value="lowest_price">Lowest Price First</option>
                <option value="distance" >Distance</option>
              </select>
              
            </div>
            <a href="" className="map-view-btn">Map View</a>
        </div>
        
      </div>
  </div>
</div>

  );
}