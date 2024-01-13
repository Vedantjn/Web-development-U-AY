import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.get("/", (req, res) => {
    const today = new Date();
    let day = today.getDay();

    // console.log(day);

    if(day == "0" || day == "6"){
        res.render("index.ejs", { dayType: "a weekend", advice: "it's time to enjoy" });
    }
    else{
        res.render("index.ejs", { dayType: "a weekday", advice: "it's time to work hard" });
    }
})

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})