import { Router } from "express";
import { testeRouter } from "./teste/testeRouter";

const routerV1 = Router()

routerV1.use('/teste', testeRouter)

export { routerV1 }
