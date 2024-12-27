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
import {motion} from 'framer-motion'
import { fadeIn } from '../utils/variants'
function Productsmain() {


    const data = [
    { image1: 'bann.jpg'},
    { image1: 'Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_3 (1).jpg'},
    { image1: 'Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_0.jpg'},
    { image1: 'Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_1 (2).jpg'},
    ]

    
  return (

    <div className='w-full max-w-7xl mx-auto px-4'>

    <div

    className='flex-col md:flex-row sm:flex-col px-10 py-10 flex justify-around items-center gap-10 font-zahid'>
        <motion.div
                 variants={fadeIn('right', 0.2)}
                 initial="hidden"
                 whileInView={"show"}
                 viewport={{ once: false, amount : 0.2 }}
        >

      <div className='flex justify-center items-center mb-6 md:mb-0 text-center	'>
        <h2 className=' font-zahid text-3xl font-bold hover:subpixel-antialiased'>
        SCENTED CANDLES
        </h2>
      </div>
      <div className='mt-9 font-zahid tracking-wide text-center line-clamp-4 font-medium	'>

        <span> Transform your space with the elegance of our hand-poured,
           eco-friendly soy-beeswax 
            infused with signature scents  <br/> 
        crafted to elevate every moment. Discover captivating fragrances sourced globally, designed to create a soothing and stylish atmosphere</span>
        </div>
        <div className='text-center mt-9'>

        <Link to="/products/1">
        VIEW ALL SCENTED CANDLES
        </Link>
       </div>
        </motion.div>
      
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full max-w-4xl" // Increased max-width
      >
        <CarouselContent>
          {data.map((_, index) => (
            <CarouselItem key={index} className="md:basis-full lg:basis-full overflow-hidden">
              <motion.div
                       variants={fadeIn('left', 0.2)}
                       initial="hidden"
                       whileInView={"show"}
                       viewport={{ once: false, amount : 0.2 }}
              className="p-1">
                                <Link to={`/products/1`}>
                                    <img 
                                        className='w-full h-[400px] object-cover'
                                        src={data[index % data.length].image1}
                                        alt={`Product ${index + 1}`}
                                    />
                                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </div>


  )
}

export default Productsmain