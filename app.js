const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt=require("bcryptjs")//for ciphertext
const {blogmodel}=require("./models/blog")
const app =express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://annatheresv:annatheresv2002@cluster0.ger1ije.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")
const generateHashedPassword =async(password) =>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)

}

app.post("/signUp",async(req,res)=>{
    let input=req.body
    let hashedPassword =await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password=hashedPassword
    let blog= new blogmodel(input)
    blog.save()
 res.json({"status":"success"})
})
//api for signin
app.post("/signin",(req,res)=>{
    let input=req.body
    blogmodel.find({"emailid":req.body.emailid}).then((response)=>{
        console.log(response)}
    ).catch()

})
app.listen(8080,()=>{
  console.log("Server running")
})