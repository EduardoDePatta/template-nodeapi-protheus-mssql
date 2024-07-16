import { Router } from "express";
import { TesteService } from "./get";
import { ServiceFactory } from "#/BaseService/ServiceFactory";

const testeRouter = Router()

testeRouter.get('/', ServiceFactory.getHandler(TesteService))

export { testeRouter }
