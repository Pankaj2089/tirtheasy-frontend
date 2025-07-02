'use client'
import React,{ useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from 'date-fns';
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
    persons: 0
  });

  const inputRef = useRef<any>(null);
  const endDateDiv = useRef<any>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

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

  return (
    <div className="main-search-box" >
      <div className="container">
        <h1 className="text-white mb-3 mb-lg-4">Find Your Next Stay</h1>
        <div className="find-next-stay">           
            <form className="main-search-form pb-6" action="porperty-list" method="post">
               <div className="input-group search-main-box">
                  <input type="search" className="form-control search-box" placeholder="Search" value={searchData.keywords}  onChange={(e) => handleChange('keywords', e.target.value)} />
                </div>

                <div className="start-end-date">
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

                   <div className="start-date end-date" ref={endDateDiv}  onClick={handleEndDateClick}>
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
        </div>

      </div>
   </div>
  );
}