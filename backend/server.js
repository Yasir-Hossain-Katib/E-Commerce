const express=require("express")
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productRoutes")
const mailRoutes=require("./routes/mailRoutes")
const protectedRoutes=require("./routes/protectedRoutes")
const orderRoutes=require("./routes/orderRoutes")
const connectDB=require("./dbconfig.js")
require("dotenv").config();
const cors= require("cors");


const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));


app.use("/api/auth",authRoutes);
app.use("/api",productRoutes);
app.use("/api",mailRoutes);
app.use("/api",protectedRoutes);
app.use("/api",orderRoutes);

connectDB();




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

})






