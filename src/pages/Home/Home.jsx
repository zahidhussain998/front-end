// eslint-disable-next-line no-unused-vars
import React, { Suspense } from 'react'
import Slider from '../../components/Slider/Slider'
const FeaturedProduct = React.lazy(() => import('../../components/featuredProduct/FeaturedProduct'))
const Productsmain = React.lazy(() => import('../../components/Productsmain/Productsmain'))
const Category = React.lazy(() => import('../../components/Category/Category'))
const BestProducts = React.lazy(() => import('../../components/BestProducts/BestProducts'))
const Mood = React.lazy(() => import('../../components/Mood/Mood'))
// import Scrooler from '../../components/Scrooler'
// eslint-disable-next-line react/prop-types
function CenteredSuspense({ children }) {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        Loading...
      </div>
    }>
      {children}
    </Suspense>
  )
}

function Home() {
  return (
    <div className='scroll-smooth md:scroll-auto focus:scroll-auto'>
      <Slider />
      
      <div>
        <CenteredSuspense>
          <FeaturedProduct />
        </CenteredSuspense>
      </div>

      <div>
        <CenteredSuspense>
          <Productsmain />
        </CenteredSuspense>
      </div>

      <div>
        <CenteredSuspense>
          <BestProducts />
        </CenteredSuspense>
      </div>

      <div>
        <CenteredSuspense>
          <Category />
        </CenteredSuspense>
      </div>

      <div>
        <CenteredSuspense>
          <Mood />
        </CenteredSuspense>
      </div>

      <div>
        {/* <Scrooler/> */}
      </div>
    </div>
  )
}

export default Home
