const express = require('express');
const app = express();
const hbs = require('hbs');
const StudentRegistration = require('./models/register')

const path = require("path");
require("./db/conn");
const port = 5000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);
app.use(express.urlencoded({ extended: false }));

app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/",(req,res) => {
    res.render("index")
})
app.post("/register", async (req, res) => {
    try {

        const password = req.body.password;
        const rpassword = req.body.repeatpassword;
        if (password === rpassword) {
            const student = new StudentRegistration({
                name: req.body.name,
                email: req.body.email,
                password: password
            });
            const studentData = await student.save();

            res.status(201).render("index");

        }
        else {
            res.status(400).send("pasword is not match")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
       const useremail=await StudentRegistration.findOne({email:email});
       console.log(useremail.password);
       if (useremail.password == password) {
        res.status(201).render("index");
       
       }
       else{
        res.send("please type correct password or email")

       }
    } catch (error) {
        res.status(400).send("invalid email");
    }
})
app.listen(port, () => {
    console.log(`app is running on ${port}`);
})