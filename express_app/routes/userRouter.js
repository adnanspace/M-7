import express from "express";

const router = express.Router();

import { userHomeController, userAboutController, userContactController } from "../controllers/userControllers.js";

//router level middleware
router.use((req, res, next) => {
    console.log("I just met Lady Gaga");
    console.log("I am a Router Level Middleware");
    next();
});


router.get("/", userHomeController);

router.get("/about", userAboutController);

router.get("/contact", userContactController);


export default router;