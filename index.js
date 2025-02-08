const express = require('express');
const bodyParser = require('body-parser'); // Add body-parser middleware
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(methodOverride("_method")); // Add method-override middleware

let posts = [
    { id: uuidv4(), userName: "subodhsingh", content: "I Love coding" },
    { id: uuidv4(), userName: "shivamsingh", content: "Hard work is the key to success" },
    { id: uuidv4(), userName: "adityasingh", content: "Only trips can make my mind calm, Go trip" },
];

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params; //here we are getting the id from the url which is passed by the user 
    // console.log(id);

    const post = posts.find((p) => p.id === id);
    res.render("show", { post }); // Render the show.ejs page and pass the post object to it 
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const newContent = req.body.content;
    const post = posts.find((p) => p.id === id);//here we are finding the post with the id which we want to update and 
    // then we are updating the content of that post with the new content 
    // which we got from the form and then we are redirecting to the posts page so that we can see the updated post. 
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

app.post("/posts", (req, res) => {
    let { userName, content } = req.body;
    let id = uuidv4();
    if (!id || !userName || !content) {
        return res.status(400).send("Username and content are required.");
    }
    posts.push({ id, userName, content });
    res.redirect("/posts"); // Redirect to posts page after submission
});
