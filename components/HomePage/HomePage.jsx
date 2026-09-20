import Wrapper from '../shared/Wrapper/Wrapper';
import Carousel from './Carousel/Carousel';
import HoursAndOperations from './HoursAndOperations/HoursAndOperations';
import Subscribe from './Subscribe/Subscribe';
import Company from './Company/Company';
import NextEvent from './NextEvent/NextEvent';
import StaffPicks from './StaffPicks/StaffPicks';
import FunFacts from './FunFacts/FunFacts';
import Instagram from './Instagram/Instagram';

export default function HomePage({ entries }) {
  const [] = entries;
  return (
    <Wrapper>
      <Carousel />
      <HoursAndOperations />
      <Subscribe />
      <Company />
      <NextEvent />
      <StaffPicks />
      <FunFacts />
      <Instagram />
    </Wrapper>
  );
}
