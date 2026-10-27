import Carousel from './Carousel/Carousel';
import HoursOfOperations from './HoursOfOperations/HoursOfOperations';
import Subscribe from './Subscribe/Subscribe';
import Company from './Company/Company';
import NextEvent from './NextEvent/NextEvent';
import StaffPicks from './StaffPicks/StaffPicks';
import FunFacts from './FunFacts/FunFacts';
import Instagram from './Instagram/Instagram';

export default function HomePage({
  carouselSlides,
  hoursOfOperations,
  funFacts,
  staffPicks,
  nextEvent,
}) {
  return (
    <>
      <Carousel slides={carouselSlides} />
      <HoursOfOperations hoursOfOperations={hoursOfOperations} />
      {/* <Subscribe /> */}
      <Company />
      <NextEvent event={nextEvent} />
      <StaffPicks picks={staffPicks} />
      <FunFacts funFacts={funFacts} />
      <Instagram />
    </>
  );
}
