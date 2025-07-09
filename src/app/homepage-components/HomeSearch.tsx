'use client'
import React,{ useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from 'date-fns';
import { postData } from '../utils/api';
import { log } from 'console';

export default function HomeSearch() {

const defaultStartDate = new Date(); // Today
const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 1); // 7 days from today

const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    adult: 1,
    rooms: 1,
    childerns: 0,
    sortby:''
  });
  
  const inputRef = useRef<any>(null);
  const endDateDiv = useRef<any>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [isRoomPerson, setRoomPerson] = useState(false);
  const [isSearchKeywords, setSearchKeywords] = useState(false);
  const [citiesList, setSearchCities] = useState([]);
  

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
  }, [])

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
    let postRec: { keywords: string | null } = { keywords: searchData.keywords}; 
      const res = await postData('get-cities', postRec);        
      setSearchCities(res.records);
  }

  return (
    <div className="main-search-box"  >
      <div className="container">
        <h1 className="text-white mb-3 mb-lg-4">Find Your Next Stay</h1>
        <div className="find-next-stay">           
            <form className="main-search-form pb-6" action="porperty-list" method="post">
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

                  <div className={`multi-collapse member-addon collapse ${(isSearchKeywords && citiesList.length > 0) ? 'show' : 'multi-collapse'}`} 
                     style={{ maxHeight: '200px', minHeight: 'auto', overflow: 'auto' }}
                    >
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
                     <span className="date-picker-icon"><img src="img/date.svg"/></span>
                     <div className="selected-date-day" >
                          <div className="date"> {startDate ? format(startDate, 'dd MMM yyyy') : ''}</div>
                          <div className="day">{startDate ? format(startDate, 'EEEE') : ''}</div>
                     </div>
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
                            monthsShown={2}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Select start date"
                            ref={inputRef}
                            open={isOpen}
                            onClickOutside={() => setIsOpen(false)}
                            isClearable={true}
                            
                            //withPortal // Optional: good for mobile
                        /> 
                        </div>              
                   </div>

                   <div className="start-date end-date" ref={endDateDiv}  onClick={handleEndDateClick} >
                     <span className="date-picker-icon"><img src="img/date.svg"/></span>
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
                            monthsShown={2}
                            ref={endDatePickerRef}
                            minDate={startDate ? addDays(startDate, 1) : today}
                            disabled={!startDate}
                            open={isEndOpen}
                            onClickOutside={() => setIsEndOpen(false)}
                            isClearable={true}
                        /> 
                    </div>           
                   </div>
                </div>

                <div className="slect-audience" >
                    <div className="select-member" role="button" onClick= {() =>{toggleRoomPerson(); setSearchKeywords(false);}}>
                      <span className="date-picker-icon"><img src="img/user.svg"/></span>
                      <div className="selected-date-day">
                            <div className="date">{searchData.adult} Adult,</div>
                            <div className="day">{searchData.rooms} Room{searchData.childerns > 0 ? ', '+searchData.childerns+' Child' : '' }</div>
                      </div>
                    </div>
                    <div className={`multi-collapse member-addon collapse ${isRoomPerson ? 'show' : 'multi-collapse'}`}>
                      {['rooms', 'adult', 'childerns'].map((field, index) => (
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
                   <button type="submit" className="btn btn-primary" onClick={() => setRoomPerson(false)}>Search</button>
                </div>
            </form>
        </div>

      </div>
   </div>
  );
}