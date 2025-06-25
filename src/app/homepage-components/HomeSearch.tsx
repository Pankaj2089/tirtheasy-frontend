'use client'
import { useEffect, useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

export default function HomeSearch() {

const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);

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
    }
  }, [startDate]);

const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div className="main-search-box">
          <div className="container">
            <h1 className="text-white mb-3 mb-lg-4">Find Your Next Stay</h1>
            <div className="find-next-stay">           
              <form className="search-box" action="" method="post">
                <div className="d-flex align-items-center row normal-view">
                    <div className="col-md-5 pe-lg-1">
                      <label className="mb-1">Search</label>
                      <div className="input-group search-main-box mb-3">
                          <input type="search" className="form-control search-box" placeholder="Search"/>
                  {/* <button type="submit" className="submit-btn"><img src="img/search-icon.svg"/></button> */}
                      </div>
                    </div>

                    <div className="col-md-4 pe-lg-2">

                      <div className="row">
                          <div className="col-lg-6 col-6 pe-lg-1">
                              <label className="mb-1">Start Date</label>
                              <div className="input-group calendar-view mb-3">
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

                          <div className="col-lg-6 col-6 pe-lg-2">
                              <label className="mb-1">End Date</label>
                              <div className="input-group calendar-view mb-3">
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
                                  disabled={!startDate}
                                />                     
                              </div>
                          </div>
                      </div>
                      
                    </div>

                    <div className="col-md-3">
                      <label className="mb-1">Members</label>
                      <div className="input-group search-main-box mb-3">
                          <select className="member-select">
                            <option>2 Adult, 2 Room, 2 Child</option>
                            <option>2 Adult, 2 Room, 2 Child</option>
                          </select>                    
                      </div>
                    </div>
                    <div className="btn-set">
                        <div className="input-group">
                              <button className="btn btn-primary w-100" type="submit">Search</button>                   
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center row sticky-view">
                    <div className="col-md-3 pe-1">
                      <label className="mb-1">Search</label>
                      <div className="input-group search-main-box">
                          <input type="search" className="form-control search-box" placeholder="Search"/>
                          {/* <!-- <button type="submit" className="submit-btn"><img src="img/search-icon.svg"/></button> --> */}
                      </div>
                    </div>

                    <div className="col-md-4 pe-2">

                      <div className="row">
                          <div className="col-lg-6 col-6 pe-1">
                              <label className="mb-1">Start Date</label>
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

                          <div className="col-lg-6 col-6 pe-2">
                              <label className="mb-1">End Date</label>
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
                                    disabled={!startDate}
                                />                   
                              </div>
                          </div>
                      </div>
                      
                    </div>

                    <div className="col-md-3 pe-1">
                      <label className="mb-1">Members</label>
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