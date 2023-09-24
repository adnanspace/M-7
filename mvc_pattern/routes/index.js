import {RootGetController, HelloGetController, AboutGetController, RootPostController, RootPutController, RootDeleteController} from '../controllers/index.js';

const userRouter = {
    GET: {
        "/":RootGetController,
        "/hello": HelloGetController,
        "/about": AboutGetController
    },
    POST: {
        "/":RootPostController
    },
    PUT: {
        "/": RootPutController
    },
    DELETE: {
        "/": RootDeleteController
    }
}

export default userRouter;