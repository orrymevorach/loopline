import Wrapper from '../shared/Wrapper/Wrapper';
import Carousel from './Carousel/Carousel';
import HoursAndOperations from './HoursAndOperations/HoursAndOperations';
import Subscribe from './Subscribe/Subscribe';
import Company from './Company/Company';

export default function HomePage({ entries }) {
  const [] = entries;
  return (
    <Wrapper>
      <Carousel />
      <HoursAndOperations />
      <Subscribe />
      <Company />
    </Wrapper>
  );
}
