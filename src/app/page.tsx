
import Slider from './homepage-components/Slider';
import PopularDestinations from './homepage-components/PopularDestinations';
import Promotions from './homepage-components/Promotions';
import PopularDestinationsOutsideIndia from './homepage-components/PopularDestinationsOutsideIndia';
import Facilities from './homepage-components/Facilities';
import Hotels from './homepage-components/Hotels';
import GuestReviews from './homepage-components/GuestReviews';

export default function Home() {
  return (
    <>
      <Slider />
      <PopularDestinations title="Popular Destinations" type={1} />
      <Promotions title="Promotions on Flights, Tours & Tickets" type={1} />
      <PopularDestinationsOutsideIndia  title="Popular Destinations Outside India" type={2}  />
      <Facilities />
      <Hotels title="Browse Top Hotels" type="hotel"/>
      <Promotions title="Accommodation Promotions" type={2}/>
      <Hotels title="Browse Top Dharmshalas" type="dharmshala"/>
      <GuestReviews />    
    </>
  );
}