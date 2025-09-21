import Carousel from "react-bootstrap/Carousel"
// import ExampleCarouselImage from 'components/ExampleCarouselIe';

function UncontrolledExample() {
  return (
    <Carousel className='h-[800px] flex items-center overflow-hidden object-cover'>
      <Carousel.Item>
        <img src='/images/earbuds.webp' className='w-full' />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='/images/phone.webp' className='w-full' />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='/images/medku.webp' className='w-full h-[760px]' />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default UncontrolledExample
