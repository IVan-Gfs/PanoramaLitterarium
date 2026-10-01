import { Module } from "@nestjs/common";
import { GrupoCriterioControllerCreate } from "./controllers/criterio.controller.create";
import { GrupoCriterioServiceCreate } from "./services/criterio.service.create";
import { CriterioControllerFindAll } from "./controllers/criterio.controller.findall";
import { CriterioServiceFindAll } from "./services/criterio.service.findall";
import { GrupoCriterioControllerFindOne } from "./controllers/criterio.controller.findone";
import { GrupoCriterioServiceFindOne } from "./services/criterio.service.findone";
import { CriterioControllerUpdate } from "./controllers/criterio.controller.update";
import { CriterioServiceUpdate } from "./services/criterio.service.update";
import { CriterioControllerDelete } from "./controllers/criterio.controller.delete";
import { CriterioServiceDelete } from "./services/criterio.service.delete";

const controllers = [
    GrupoCriterioControllerCreate, 
    CriterioControllerFindAll,
    GrupoCriterioControllerFindOne,
    CriterioControllerUpdate,
    CriterioControllerDelete,
]
const services = [
    GrupoCriterioServiceCreate, 
    CriterioServiceFindAll,
    GrupoCriterioServiceFindOne,
    CriterioServiceUpdate,
    CriterioServiceDelete
]

@Module({
    controllers: [...controllers],
    providers: [...services]
    
})
export class CriterioModule {}