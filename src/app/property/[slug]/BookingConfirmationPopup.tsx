'use client'
import { log } from 'console';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Row, Col, Button, Select, InputNumber   } from "antd";
import { addDays, format, startOfDay  } from 'date-fns';
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
const { Option } = Select;

type BookingDataProps = {
  selectedRoom:any;
  record:any;
};
export default function BookingConfirmationPopup({ selectedRoom, record }: BookingDataProps) {
const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 1);

const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
const [extraMattress, setExtraMattress] = useState(false);
const [extraMattressValue, setExtraMattressValue] = useState(0);
const [searchData, setSearchState] = useState({
    keywords: '',
    start_date: '',
    end_date: '',
    adult: 1,
    rooms: 1,
    childerns: 0,
    sortby: '' ,
    roomID: record.id,
    roomPriceID: selectedRoom,
    extra_mattress: 0,
  });
  const router = useRouter();

  const inputRef = useRef<any>(null);
  const endDateDiv = useRef<any>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [metressPrice, setMetressPrice] = useState(false);
  
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if(searchData.start_date !== '' || searchData.end_date !== ''){

       const searchDataObj: any = { ...searchData };
        searchDataObj.extra_mattress = 0;
        searchDataObj.roomID = record.id;
        searchDataObj.roomPriceID = selectedRoom;
        searchDataObj.extra_mattress = extraMattressValue;
        localStorage.setItem("searchData", JSON.stringify(searchDataObj));      
    }    
}, [searchData]);

useEffect(() => {  
    const updatedData = { ...searchData, ['extra_mattress']: extraMattressValue };
    setSearchState(updatedData);  
}, [extraMattressValue]);

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
    setTimeout(() => {
           handleChange('roomID',record.id);
           handleChange('roomPriceID',selectedRoom);           
      }, 200);
  }, [selectedRoom, extraMattressValue]);

   useEffect(() => {
    loadFromLocalStorage();  
    const extMatress:any = parseFloat(record.extra_mattress_price) * extraMattressValue;  
    setMetressPrice(extMatress);
  }, [extraMattressValue]);

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

    const handleChange = (name:any,value:any) => {
      setSearchState((prev) => ({ ...prev, [name]: value }));
    };

    const handleDivClick = () => {
    setIsOpen(true);
    inputRef.current?.onInputClick(); // Trigger the input click
  };
  const handleEndDateClick = () => {
    setIsEndOpen(true);
    endDatePickerRef.current?.onInputClick(); // Trigger the input click
  };

  const handleMattressChange = (e:any) => {
    setExtraMattress(e.target.checked);
  };

  const handleSubmit = async (e:any) => {
      e.preventDefault();      
      if(startDate == null){
        toast.error('Please enter check-in date');
      }else if(endDate == null){
        toast.error('Please select check-out date');
      }else if(startDate > endDate){
        toast.error('Please select valid check-in or check-out date');
      } else if (startOfDay(startDate) < startOfDay(new Date())) {
        toast.error("Check-in date cannot be before today");
      }else{
         // simulate button click
        closeBtnRef.current?.click();

        const searchDataObj: any = { ...searchData };
        searchDataObj.roomID = record.id;
        searchDataObj.roomPriceID = selectedRoom;
        searchDataObj.extra_mattress = extraMattressValue;
        localStorage.setItem("searchData", JSON.stringify(searchDataObj)); 
        
        // navigate after short delay (allow modal animation to run)
        setTimeout(() => {
          if(localStorage.getItem('appliedOffer')){ localStorage.removeItem('appliedOffer');}
          router.push("/checkout/user-information");
        }, 300);
      }
  }
  
  return (
    <>
    <div className="modal fade" id={"bookingConfirmPopup"+selectedRoom} aria-hidden="true" aria-labelledby={"bookingConfirmPopup"+selectedRoom}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header align-items-start">
                <div className="d-flex flex-column text-center">
                <h1 className="modal-title fs-5">Booking Confirmation</h1>
                </div>
                <button type="button" className="btn-close" ref={closeBtnRef} data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-left">
                   <div className="email-signin">     
                        <>
                            <form className="needs-validation mobile-section" onSubmit={handleSubmit}>
                                <Row justify={'space-between'}>
                                    <Col xs={18} lg={10} xl={10} xxl={10}>
                                    <div className="mb-3">
                                        <label htmlFor="validationCustom02" className="form-label">Check-in Time</label>
                                        <div className='' onClick={handleDivClick}>
                                            <DatePicker
                                             className="form-control" 
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
                                                isClearable={false}
                                            /> 
                                            </div> 
                                    </div>
                                    </Col>
                                    <Col xs={18} lg={10} xl={10} xxl={10}>
                                    <div className="mb-3">
                                        <label htmlFor="validationCustom02" className="form-label">Check-out Time</label>
                                        <div className='' onClick={handleEndDateClick}>
                                            <DatePicker
                                                    className="form-control" 
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
                                                    isClearable={false}
                                                /> 
                                            </div> 
                                    </div>
                                    </Col>
                                    </Row>
                                    <Row justify={'space-between'} className='mb-4'>
                                        <Col xs={18} lg={10} xl={10} xxl={10}>
                                            <label htmlFor="validationCustom02" className="form-label" style={{width:'100%'}}>Rooms</label>                             
                                           <InputNumber
                                                min={1}
                                                max={100}
                                                value={searchData.rooms}
                                                onChange={(val) => handleChange('rooms',val)}
                                            />
                                        </Col>
                                        <Col xs={18} lg={10} xl={10} xxl={10}>
                                            <label htmlFor="validationCustom02" className="form-label" style={{width:'100%'}}>Adults</label> 
                                                <InputNumber
                                                min={1}
                                                max={100}
                                                value={searchData.adult}
                                                onChange={(val) => handleChange('adult',val)}
                                            />
                                        </Col>
                                    </Row>
                                    {record.extra_mattress == 1 &&
                                        <Row className='mb-4 pb-4'  justify={'space-between'}>
                                            <Col xs={18} lg={10} xl={10} xxl={10}>                          
                                                <label htmlFor={"check-"+selectedRoom} className="checkbox">
                                                <input type="checkbox"
                                                checked={extraMattress}
                                                onChange={handleMattressChange}  
                                                id={"check-"+selectedRoom}
                                                />
                                                <span className="checkmark"></span> Extra Mattress</label> 
                                            </Col>
                                            <Col xs={18} lg={10} xl={10} xxl={10}>
                                                { extraMattress && 
                                                    <>
                                                        <Select
                                                        placeholder="Select Mattress"
                                                        value={extraMattressValue}
                                                        onChange={(val) => setExtraMattressValue(val)}
                                                        style={{ width: '50%' }}
                                                        >
                                                        {[1, 2, 3, 4, 5].map((num) => (
                                                            <Option key={num} value={num}>
                                                            {num}
                                                            </Option>
                                                        ))}
                                                        </Select>
                                                        { (extraMattressValue > 0) && 
                                                        <p style={{fontSize:'14px'}}>Extra Mattress  -  <strong>₹ {metressPrice}</strong> </p>
                                                        }
                                                    </>
                                                }
                                            </Col>
                                        </Row>
                                    }
                                    <div className="warning-message mb-2">Message here for warning and other things</div>
                                    <div className="mb-3 d-flex align-items-center justify-content-center">
                                        <Button 
                                        htmlType="submit" 
                                        className="btn btn-primary w-100">Submit</Button>
                                    </div>
                            </form>
                        </>

                   </div>
              </div>
            </div>
          </div>
      </div>
    </>

  );
}

