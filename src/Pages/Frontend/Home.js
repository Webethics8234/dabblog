import React from 'react'
import Header2 from '../../Component/Header2'
import { Footer } from '../../Component/Footer'

const Home = () => {
  return (
    <div>
      <Header2/>

       <div className='home' >
         {/* <h1> THIS IS A HOME PAGE </h1>  */}

         <div className='container body ' style={{width:'80vh' ,height:'40vh' }} >

          <div className='circle' > <h1> Your </h1> </div>
          <div className='circle' > <h1> Home </h1> </div>
          <div className='circle' > <h1> Page </h1>  </div>
          {/* <div className='shadow' > </div>
          <div className='shadow' > </div>
          <div className='shadow' > </div> */}

         </div>

       </div>


      <Footer/>
      
    </div>
  )
}

export default Home