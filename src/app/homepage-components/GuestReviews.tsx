
'use client'
import dynamic from 'next/dynamic';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const options = {
  loop: true,
  margin: 20,
  autoplay: false,
  nav: true,
  items: 3,
  dots: false,
  responsive: {
    0: { items: 1, margin: 10 },
    480: { items: 1, margin: 10 },
    768: { items: 2, margin: 0 },
    992: { items: 2, margin: 15 },
    1200: { items: 3, margin: 15 },
  },
};
export default function GuestReviews() {
  return (
    <div className="guest_reviews py-50 wow fadeInUp">
      <div className="container">
        <div className="section-title text-center wow fadeInUp">
          <h2 className="mb-1 mb-md-2 mb-lg-2">Guest Reviews</h2>
          <p>What Our Satisfied Guests Are Saying</p>
        </div>

        <div className="guest_reviews-sldier show-nav">
          <OwlCarousel {...options} key={'guest-review1'}>
            <div className="item">
              <div className="guest-review-content-main">
                {/* <div className="rating-star d-flex align-items-center mb-2 mb-lg-4">
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                </div> */}
                <h4 className="mb-2 mb-lg-4">Professional and Friendly</h4>
                <p className="mb-2 mb-lg-5">Great location, easy to get in and out of the city. The hotel is well-maintained and has a safe and secure environment. The hotel spa and wellness facility will give you extra comfort. Besides  this, the rooms are spacious, and the services are excellent. They are  highly recommended</p>
                  <div className="client-info">
                    <div className="client-thumb">
                        <img src="img/client_1.png"/>
                    </div>
                    <div className="client-details">
                      <h5>Jenny Wilson</h5>
                      <p className="fs-14">Happy Guest</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="item">
              <div className="guest-review-content-main">
                {/* <div className="rating-star d-flex align-items-center mb-2 mb-lg-4">
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                </div> */}
                <h4 className="mb-2 mb-lg-4">Professional and Friendly</h4>
                <p className="mb-2 mb-lg-5">Great location, easy to get in and out of the city. The hotel is well-maintained and has a safe and secure environment. The hotel spa and wellness facility will give you extra comfort. Besides  this, the rooms are spacious, and the services are excellent. They are  highly recommended</p>
                  <div className="client-info">
                    <div className="client-thumb">
                        <img src="img/client_1.png"/>
                    </div>
                    <div className="client-details">
                      <h5>Jenny Wilson</h5>
                      <p className="fs-14">Happy Guest</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="item">
              <div className="guest-review-content-main">
                {/* <div className="rating-star d-flex align-items-center mb-2 mb-lg-4">
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                  <span className="star-icon me-1"><img src="img/star_icon.svg"/></span>
                </div> */}
                <h4 className="mb-2 mb-lg-4">Professional and Friendly</h4>
                <p className="mb-2 mb-lg-5">Great location, easy to get in and out of the city. The hotel is well-maintained and has a safe and secure environment. The hotel spa and wellness facility will give you extra comfort. Besides  this, the rooms are spacious, and the services are excellent. They are  highly recommended</p>
                  <div className="client-info">
                    <div className="client-thumb">
                        <img src="img/client_1.png"/>
                    </div>
                    <div className="client-details">
                      <h5>Jenny Wilson</h5>
                      <p className="fs-14">Happy Guest</p>
                    </div>
                  </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
}