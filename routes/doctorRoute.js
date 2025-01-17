const express = require('express')
const router = express.Router();
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");

router.post('/get-doctor-info-by-user-id', authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Doctor info fetched Successfully",
            data: doctor,
        })
        
    } catch (error) {
     console.log(error)
    return res.status(500).send({ message: "Error getting doctor info", success: false, error })

}

})

router.post('/get-doctor-info-by-id', authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.findOne({ _id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: "Doctor info fetched Successfully",
            data: doctor,
        })
        
    } catch (error) {
     console.log(error)
    return res.status(500).send({ message: "Error getting doctor info", success: false, error })

}

})

router.post('/update-doctor-profile', authMiddleware, async (req, res) => {

    try {

        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId },
            req.body
        );
        res.status(200).send({
            success: true,
            message: "Doctor info updated Successfully",
            data: doctor,
        })
        
    } catch (error) {
     console.log(error)
    return res.status(500).send({ message: "Error getting doctor info", success: false, error })

}

})

router.get('/get-appointments-by-doctor-id', authMiddleware , async(req,res)=>{

    try {
        const doctor = await Doctor.findOne({userId: req.body.userId})
        const appointments = await Appointment.find({doctorId: doctor._id})
        res.status(200).send({
           
            message: "Appointments fetched Successfully",
            success: true,
            data: appointments,

        })

    } catch (error) {

        console.log(error)
        res.status(500).send({
            message: 'Error in fetching Appointments Lists',
            success:false,
            error,
        })
        
    }
})

router.post('/change-appointment-status', authMiddleware , async(req,res)=>{

    try {
       const {appointmentId, status} = req.body;
       const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
        status,
       })
    
       const user = await User.findOne({_id: appointment.userId})
       const unseenNotification = user.unseenNotification
        unseenNotification.push({
        type: "appointment-status-changed",
        message: `Your appointment has been ${status}`,
        
        onClickPath : '/appointments',
       })
       
       await user.save()
      
       res.status(200).send({
         message: "Appointment Status Changed Successfully",
         success: true,
       
      });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in update appointment status ", 
            error,
        });
        
    }
})

module.exports = router



