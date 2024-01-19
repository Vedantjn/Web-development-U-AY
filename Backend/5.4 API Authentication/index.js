import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Narendra";
const yourPassword = "123456";
const yourAPIKey = "deca524c-3398-4e36-88f8-6e9536284ebe";
const yourBearerToken = "1153024a-0f5b-4c88-94ed-0ca7987d608f";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.

  try {
    const response = await axios.get(API_URL + "/random")
    result = JSON.stringify(response);
    res.render("index.ejs", {content : result.data});
  } catch (error) {
    res.status(404).send("Error : ", error.message);
  }
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    
  try {
    const response = await axios.get(API_URL + "/all?pages=2", {
      auth : {
        username : yourUsername,
        password : yourPassword
      },
    });
    const result = JSON.stringify(response);
    res.render("index.ejs", {content : result.data})

  } catch (error) {
    res.status(404).send("Error : ", error.message);
  }

    res.render(result);
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  try {
    const response = axios.get(API_URL + "/filter", {
      params : {
        score : 5,
        apiKey : yourAPIKey,
      }
    });
    const result = JSON.stringify(response);
    res.render("index.ejs", {content : result.data})

  } catch (error) {
    res.status(404).send("Error : ", error.message);
  }
    
});

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }

  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
