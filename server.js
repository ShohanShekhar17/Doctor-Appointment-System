const express = require('express');
const app = express();

require('dotenv').config();
const dbConfig = require("./config/dbconfig");
const port = process.env.PORT || 5000;

app.use(express.json());

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");

app.use('/api/user' , userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);

console.log(process.env.MONGODB_URL);
app.listen(port, () => console.log(`Server is running on port ${port}`))
