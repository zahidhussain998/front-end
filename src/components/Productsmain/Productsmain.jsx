// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Container from '../container/Container'
import { Link } from 'react-router-dom'
function Productsmain() {


    const data = [
     { image1: 'https://hunzacandle.com/cdn/shop/files/Home_Scented_Candle_sizes_420x.jpg?v=1719667336'}
    ]

    
  return (
    <Container>

    <div className='flex-col md:flex-row sm:flex-col px-10 py-10 flex justify-around items-center gap-10'>
        <div>

      <div className='flex justify-center items-center mb-6 md:mb-0 text-center	'>
        <h2 className=' font-zahid text-3xl font-bold hover:subpixel-antialiased'>
        SCENTED CANDLES
        </h2>
      </div>
      <div className='mt-9 font-zahid tracking-wide text-center line-clamp-4 font-medium	'>

        <span>Immerse yourself in the allure of organic<br/> bees-soy wax, harmonized with world-class fragrances from around the world tailored<br/> to elevate your atmosphere</span>
        </div>
        <div className='text-center mt-9'>

        <Link to="/#">
        VIEW ALL SCENTED CANDLES
        </Link>
       </div>
        </div>
      
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-4xl" // Increased max-width
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-full lg:basis-full overflow-hidden">
              <div className="p-1">
                                <Link to={`/products/1`}>
                                    <img 
                                        className='w-full h-[400px] object-cover'
                                        src={data[index % data.length].image1}
                                        alt={`Product ${index + 1}`}
                                    />
                                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </Container>

  )
}

export default Productsmain