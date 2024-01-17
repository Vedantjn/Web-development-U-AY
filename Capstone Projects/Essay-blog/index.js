import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let todoList = [];
let idCounter = 1;

// app.get("/", (req, res)=>{
//     res.render("index.ejs", {displayToDo : todoList.join("<br>")});
// })

app.get("/", (req, res) => {
    res.render("index.ejs", { displayToDo: todoList });
});


app.post("/submit", (req, res)=>{
    const inputData = req.body["input-data"];
    const todoItem = {id: idCounter++, text :inputData};
    todoList.push(todoItem);
    res.redirect("/");
})

app.post("/delete", (req, res)=>{
    const itemId = req.body["delete-id"];
    todoList = todoList.filter(item => item.id !== parseInt(itemId));
    res.redirect("/");
})


app.listen(port, ()=>{
    console.log(`:istening on port ${port}`);
})