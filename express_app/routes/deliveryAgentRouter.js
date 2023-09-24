import express from "express";

const router = express.Router();

router.get('/home', (req, res) => {
    res.send('<h1> delivery Agent /home </h1>');
});

router.get('/about', (req, res) => {
    res.send('<h1> delivery Agent /about </h1>');
});

router.get('/contact', (req, res) => {
    res.send('<h1> delivery Agent /contact </h1>');
});
export default router;