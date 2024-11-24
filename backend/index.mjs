import express from 'express'

let app = express();


app.get("/test",(req,res)=>{
  res.send("tost")
})

app.listen(3000,()=>{
  console.log("http://localhost:3000");
})