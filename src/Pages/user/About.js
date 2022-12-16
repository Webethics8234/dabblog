import React from 'react'
import Header2 from '../../Component/Header2'
import {Footer} from '../../Component/Footer'

const About = () => {
  return (
    <div>
      
      <Header2/>

     <div style={{ height:'78vh', display:'flex' ,justifyContent:'center',alignItems:'center' }} >
      
    
    

        <div className='container' >

          <div className='row' >

            <div className='col-12  ' >

              <h1 className='' > About us </h1>
              <p> If you’ve written an RFP, you know that after crafting the perfect document, you STILL have to send it to the right people, review submissions, and select a winner. We knew there was a better way, so we came up with Prosal. Prosal is an open, online marketplace where any organization can freely upload their RFP and qualified consultants come to THEM.

We created Prosal knowing that organizations are more than the sum of their parts and striving to build a community of like-minded changemakers. Because collective action and collaboration achieve more meaningful impact, Prosal prioritizes the merit of organizations while allowing the “differentiator” to stand out.

Across Prosal, we celebrate the fact that organizations represent a diverse coalition of unique humans and that their best results can be achieved by allowing that uniqueness to shine. </p>

            </div>

          </div>

        </div>
 </div>

      <Footer/>
    </div>
  )
}

export default About