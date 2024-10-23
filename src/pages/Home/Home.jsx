// eslint-disable-next-line no-unused-vars
import Slider from '../../components/Slider/Slider'
import FeaturedProduct from '../../components/featuredProduct/FeaturedProduct'
import Productsmain from '../../components/Productsmain/Productsmain'
import Category from '../../components/Category/Category'
import BestProducts from '../../components/BestProducts/BestProducts'
import Mood from '../../components/Mood/Mood'
function Home() {
  return (
    <div className=''>
      <Slider/>
       <div>
        <FeaturedProduct type='bestselling'/>
        
       </div>

       <div>
       <Productsmain/>
       </div>

       <div>
        <BestProducts/>
       </div>


       <div>
        <Category/>
       </div>

       <div>
        <Mood/>
       </div>

       

       <div>
        </div>



    
    </div>



    
)
}


export default Home