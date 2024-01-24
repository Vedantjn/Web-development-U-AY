import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = new pg.Client({
  user : "nirmohi",
  host : "localhost",
  database : "world",
  password : "1234567",
  port : 5432
});

db.connect();

app.get("/", async (req, res) => {
  let countries = [];
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country)=>{
    countries.push(country.country_code);
  });
  console.log(result);
  console.log(result.rows);
  res.send("index.ejs", {countries : countries, total : countries.length});
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
