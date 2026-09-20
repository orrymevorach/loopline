import Wrapper from '../shared/Wrapper/Wrapper';
import Carousel from './Carousel/Carousel';
import HoursAndOperations from './HoursAndOperations/HoursAndOperations';

export default function HomePage({ entries }) {
  const [] = entries;
  return (
    <Wrapper>
      <Carousel />
      <HoursAndOperations />
    </Wrapper>
  );
}
