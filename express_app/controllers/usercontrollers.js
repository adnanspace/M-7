
function userHomeController(req, res) {
    res.send("<h1> This is Users /home </h1>");
}


function userAboutController(req, res) {
    res.send("<h1> This is Users /about </h1>");
}

function userContactController(req, res) {
    res.send("<h1> This is Users /contact </h1>");
}

export {
    userHomeController,
    userAboutController,
    userContactController
}