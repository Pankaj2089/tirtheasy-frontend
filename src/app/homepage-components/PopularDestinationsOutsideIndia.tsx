'use client'
import { useEffect, useState } from 'react';
import { postData } from '../utils/api';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface BannerData {
  heading: string;
  image: string;
  id: string;
}

type DestinationsProps = {
  title: string;
  type: number;
};

const options = {
  loop: true,
  margin: 20,
  autoplay: true,
  nav: false,
  items: 5,
  dots: false,
  slideTransition: 'linear',
  autoplaySpeed: 10000,
  smartSpeed: 10000,
  responsive: {
    0: { items: 1.2 },
    480: { items: 1.5 },
    768: { items: 3 },
    992: { items: 4 },
    1000: { items: 5 },
  },
};

export default function Destinations({ title, type }: DestinationsProps) {
  const [promotions, setData] = useState<BannerData[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // wait until client side render
  useEffect(() => {
    setMounted(true);
  }, []);

  // fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const data = sessionStorage.getItem('popularDestinations' + type);
        if (data) {
          setData(JSON.parse(data));
        } else {
          const postRec = {
            type,
            property_type: localStorage.getItem('property_type'),
          };
          const res = await postData('popular-destinations', postRec);
          setData(res.records);
          sessionStorage.setItem(
            'popularDestinations' + type,
            JSON.stringify(res.records)
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [type]);

  return (
    <>
      {promotions.length > 0 && (
        <div className="popular-destination py-50 wow fadeInUp">
          <div className="container">
            <div className="section-title text-center wow fadeInUp">
              <h2 className="mb-1 mb-md-2 mb-lg-2">{title}</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>

          <div className="container-fluid">
            <div className="outside-india-sldier">
              {mounted && (
                <OwlCarousel {...options} key={'promotionsp'+promotions.length}>
                  {promotions.map((data, index) => (
                    <div className="item" key={data.id || index}>
                      <a
                        className="destination-box rounded-4 cursor-pointer"
                        title={data.heading}
                      >
                        <img
                          src={data.image}
                          alt={data.heading}
                          title={data.heading}
                        />
                        <span className="overlay-box"></span>
                        <span className="address-box text-white">
                          <img
                            src="img/location.svg"
                            className="me-2"
                            alt="location"
                          />{' '}
                          {data.heading}
                        </span>
                      </a>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}