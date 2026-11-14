import { Module } from "@nestjs/common";
import { ConcursoControllerFindAll } from "./controllers/concurso.controller.findall";
import { ConcursoServiceFindAll } from "./services/concurso.service.findall";
import { ConcursoControllerFindOne } from "./controllers/concurso.controller.findone";
import { ConcursoServiceFindOne } from "./services/concurso.service.findone";
import { ConcursoControllerCreate } from "./controllers/concurso.controller.create";
import { ConcursoServiceCreate } from "./services/concurso.service.create";
import { ConcursoControllerOrgFindAll } from "./controllers/concurso.controller.org.findall";
import { ConcursoServiceOrgFindAll } from "./services/concurso.service.org.findall";
import { ConcursoControllerUpdate } from "./controllers/concurso.controller.update";
import { ConcursoServiceUpdate } from "./services/concurso.service.update";


const controllers = [
    ConcursoControllerCreate,
    ConcursoControllerFindAll, 
    ConcursoControllerFindOne,
    ConcursoControllerOrgFindAll,
    ConcursoControllerUpdate
]
const services = [
    ConcursoServiceCreate,
    ConcursoServiceFindAll, 
    ConcursoServiceFindOne,
    ConcursoServiceOrgFindAll,
    ConcursoServiceUpdate
]
@Module({
    controllers: [...controllers],
    providers: [...services]
    
})
export class ConcursoModule {}