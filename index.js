const express = require("express");
const app = express();

let port = 8080;

const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id  : uuidv4(),
        username : "Shantanu",
        content : "I love my passion (unless defined)"
    },
    {
        id : uuidv4(),
        username : "Aman",
        content : "I am runing a startup. Any one intrested can join us...."
    },
    {
        id : uuidv4(),
        username  : "ApnaCollege",
        content : "We provide the best experience for the codinf journey!!!"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});



