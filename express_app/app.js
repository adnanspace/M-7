//completed
import express from "express"; // it has already access to http
import url from 'url';
import basicAuth from "express-basic-auth";
import serveIndex from "serve-index";

const app = express();

const port = process.env.PORT || 8080;

//Import Router 
import { userRouter, adminRouter, deliveryAgentRouter, restaurantRouter } from "./routes/index.js";

// app.use(basicAuth({
//     users: { 'admin': 'supersecret', 'hanzala': 'pass' },
//     challenge : true
// }))

//root page - static page
app.use(express.static("views")); //this folder must contain index.html / //express.static by default look for index.html

//built-in middleware
app.use(express.json()); //body parser
app.use(express.urlencoded({ extended : true })) //read the form data body parser


//the function is executed everytime the app receives a request
app.use((req, res, next) => {
    console.log("Hey It's me");
   if(req.method === "PATCH") res.send("Everybody thinks I have a girlfriend, what a joke");
    else next();
});


app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use('/agent', deliveryAgentRouter);
app.use("/restaurant", restaurantRouter);

//next()middleware

var a = (req, res, next) => {
    try {
        console.log('first');
        const obj = { aa: 11, bb: 22 };
        req.obj = obj;
        next();
    }
    catch (error) { 
        console.log("error");
    }
}

var b = function (req, res, next) {
    console.log("Second", req.obj);
    next();
}

var c = function (req, res) {
    console.log("I am hanzala");
    res.send("Morning..");
}
app.get("/good", [a, b], c);

app.get('/logger', (req, res) => { //sttatic endpoint
    try {
        const logger = {
            path : req.url, //end point that we have (/logger)
            ip : req.ip, //accessing remote address
            userAgent : req.get("User-Agent"),
            method : req.method, // HTTP method
            queryParams : url.parse(req.url, true).query
        }
        console.log(logger);
        console.log(hi); // it's an intentionally created error
        res.status(200).json({sucess : "All is well"});
    } catch (error) {
        console.log(error.stack); //.stack for debugging
        res.status(500).json({error : `${error.name} : ${error.message}`});
    }
})

app.get('/bootcamp/:batch/:year', (req, res) => { //dynamic endpoint
    try {
        let {batch, year} = req.params;
        console.log(`Batch : ${batch} Year : ${year}`);
        console.log(req.params);
        res.status(200).json({sucess : "All is well"});
    } catch (error) {
        res.status(500).json({error : "Something went wrong.."});

    }
})

app.get("/hyd*/:place", (req, res) => {
    res.status(200).json(req.params);
})

app.post('/contact', (req, res) => {
    try {
        console.log(req.body); //client body payload
        res.redirect('/success.html');
    } catch (error) {
        res.status(500).json({error : "Something went wrong.."});

    }
})

app.get("/admin", basicAuth({
    users: { 'admin': 'super' },
    challenge: true
}), (req, res) => {
    try {
        res.send('I m admin');   
    } catch (error) {
        res.status(500).json({error : "Something went wrong.."});
    }
})

app.use('/library', serveIndex('library', {'icons' : true}), express.static("library"));

//Not found API
app.get('/*', (req, res) => {
    res.status(404).json({error : "Hey its not available, Not Found"})
})
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});



  