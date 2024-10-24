import React from 'react'
import {useNavigate} from 'react-router-dom'

function Doctor({doctor}) {
    const navigate = useNavigate()
  return (
    <div className='card p-2 cursor-pointer' onClick={()=>navigate(`/book-appointment/${doctor._id}`)}>
        <h1 className='card-tittle'>{doctor.firstName}{doctor.lastName} </h1>
        
        <p ><b>Phone Number: </b>{doctor.phoneNumber}</p>
        <p ><b>Address: </b>{doctor.address}</p>
        <p ><b>Fee Per Visit: </b>{doctor.FeePerConsultant}</p>
        <p ><b>Timing: </b>{doctor.timing[0]} - {doctor.timing[1]}</p>
    </div>
  )
}

export default Doctor