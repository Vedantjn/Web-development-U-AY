import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    // console.log(req.rawHeaders);
    res.send("<h1>Hello World!</h1>")
})

app.get("/contact", (req, res)=>{
    res.send("<h2>Contacts Page</h2><p>My phone number is +912334567891</p>")
})

app.get("/about", (req, res)=>{
    res.send("<h2>About Me</h2><p>My name is Vedant</p>")
})

app.listen(port, ()=>{
    console.log(`Success started on port ${port}`);
})
