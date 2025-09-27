'use client'
import { useEffect, useState, useRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
type hotelDataProps = {
  hotelData:any;
};
const dataItems = "1,2,3,4";
const  dataSlide = 1;
export default function HotelImages({ hotelData }: hotelDataProps) {

    const carouselInnerRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [itemWidth, setItemWidth] = useState(500);
    const [translateX, setTranslateX] = useState(0);
    const fullImgRef = useRef<HTMLImageElement>(null);

    const handleImageClick = (smallImg: HTMLImageElement) => {
        if (fullImgRef.current) {
            fullImgRef.current.src = smallImg.src;
        }
    };
  
    const calculateItemWidth = () => {
      const itemsSplit = dataItems.split(",").map(Number);
      const bodyWidth = window.innerWidth;
      let incno;
  
      if (bodyWidth >= 1200) incno = itemsSplit[3];
      else if (bodyWidth >= 992) incno = itemsSplit[2];
      else if (bodyWidth >= 768) incno = itemsSplit[1];
      else incno = itemsSplit[0];
  
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
      const width = containerWidth / incno;
  
      setItemWidth(width > 0 ? width : 200);
    };
  
    const handleResize = () => {
      calculateItemWidth();
      setTranslateX(0); // Reset scroll on resize
    };
  
    useEffect(() => {
      calculateItemWidth();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  
    const handleSlide = (direction: "left" | "right") => {
      if (!carouselInnerRef.current || !containerRef.current) return;
  
      const slideAmount = itemWidth * dataSlide;
      const maxTranslate =
        carouselInnerRef.current.scrollWidth - containerRef.current.offsetWidth;
  
      let newTranslateX = direction === "left" ? translateX - slideAmount : translateX + slideAmount;
  
      if (newTranslateX < 0) newTranslateX = 0;
      if (newTranslateX > maxTranslate) newTranslateX = maxTranslate;
  
      setTranslateX(newTranslateX);
    };

  return (
    <>
    <div className="gallery-images-slider">
        <div className="card-body">
            <figure className="mx-auto text-center d-flex align-items-center justify-content-center">
                <img src={hotelData.image} alt={hotelData.title} className="img-fluid rounded-4" ref={fullImgRef} id="imgbox" title={hotelData.title} />
            </figure>
            <div className="row">
                <div className="MultiCarousel" data-items={dataItems} data-slide={dataSlide} ref={containerRef} style={{ overflow: "hidden", width: "100%" }}>
                    <div className="MultiCarousel-inner" ref={carouselInnerRef} style={{
                        display: "flex",
                        transform: `translateX(-${translateX}px)`,
                        transition: "transform 0.3s ease",
                        width: `${itemWidth * hotelData.additional_images.length+itemWidth+30}px`
                    }}>
                            <div className="item"  style={{ width: `${itemWidth}px` }}>
                            <figure className="product-img">
                            <img src={hotelData.image} alt={`thumb-0`} className="img-fluid rounded-4"/>
                            </figure>
                        </div>                                        
                        {hotelData.additional_images.map((imgrec: any, index: number) => (
                        <div className="item"  style={{ width: `${itemWidth}px` }}>
                            <figure className="product-img">
                            <img src={imgrec.image} alt={`thumb-${index+1}`} className="img-fluid rounded-4" onClick={(e) => handleImageClick(e.currentTarget)}/>
                            </figure>
                        </div>
                        ))}

                    </div>
                    <button className="btn leftLst" onClick={() => handleSlide("left")}> &lt; </button>
                    <button className="btn rightLst" onClick={() => handleSlide("right")}> &gt; </button>
                </div>
            </div>
        </div>
    </div>
    </>

  );
}