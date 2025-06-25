'use client'
import { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
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
<div className="hero-section">
        <div className="inner-page-banner inner-page-search gray_bg py-4">
          <div className="container">  
              <form className="search-box" action="" method="post">
                  <div className="d-flex align-items-center row sticky-view">
                      <div className="col-md-3 pe-md-1 mb-3 mb-md-0">
                        <div className="input-group search-main-box">
                            <input type="search" className="form-control search-box" placeholder="Search"  value={searchData.keywords}  onChange={(e) => handleChange('keywords', e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-4 pe-md-2 mb-3 mb-md-0">
                        <div className="row">
                            <div className="col-lg-6 col-6 pe-md-1">
                                <div className="input-group calendar-view ">
                                    <DatePicker
                                        className="form-control date-picker-input"
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
                                        
                                    />                                           
                                </div>
                            </div>

                            <div className="col-lg-6 col-6 pe-md-2">
                                <div className="input-group calendar-view">
                                    <DatePicker
                                    className="form-control date-picker-input"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Select end date"
                                    monthsShown={2}
                                    ref={endDatePickerRef}
                                    minDate={startDate ? addDays(startDate, 1) : today}
                                    />                   
                                </div>
                            </div>
                        </div>
                      </div>
                      <div className="col-md-3 pe-md-1 mb-3 mb-md-0">
                        <div className="input-group search-main-box">
                            <select className="member-select">
                              <option>2 Adult, 2 Room, 2 Child</option>
                              <option>2 Adult, 2 Room, 2 Child</option>
                            </select>                    
                        </div>
                      </div>
                      <div className="col-md-2">
                          <div className="input-group">
                                <button className="btn btn-primary w-100" type="submit">Search</button>                   
                          </div>
                      </div>
                  </div>
              </form>
          </div>
      </div>
    </div>
  );
}