import { Module } from "@nestjs/common";
import { ConcursoControllerFindAll } from "./controllers/concurso.controller.findall";
import { ConcursoServiceFindAll } from "./services/concurso.service.findall";
import { concursoControllerFindOne } from "./controllers/concurso.controller.findone";
import { concursoServiceFindOne } from "./services/concurso.service.findone";
import { ConcursoControllerCreate } from "./controllers/concurso.controller.create";
import { ConcursoServiceCreate } from "./services/concurso.service.create";


const controllers = [
    ConcursoControllerCreate,
    ConcursoControllerFindAll, 
    concursoControllerFindOne
]
const services = [
    ConcursoServiceCreate,
    ConcursoServiceFindAll, 
    concursoServiceFindOne
]
@Module({
    controllers: [...controllers],
    providers: [...services]
    
})
export class ConcursoModule {}