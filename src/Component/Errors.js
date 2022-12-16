import React from 'react'
import { useNavigate } from 'react-router-dom'
import Image6 from '../images/image6.gif'

const Errors = () => {

    const navigate = useNavigate()

    const goHome =()=>{

        navigate('/')

    }


  return (
    <div className='Error' >
        <h1> O     O     P      S  </h1>

        <img style={{borderRadius:'200px'}} src={Image6} />

        <button className='btn btn-success mt-2 ' onClick={()=>goHome()} >  Go to Home  </button>

    </div>
  )
}

export default Errors