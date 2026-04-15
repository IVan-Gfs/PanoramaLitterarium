import { Module } from "@nestjs/common";
import { ConcursoControllerFindAll } from "./controllers/concurso.controller.findall";
import { ConcursoServiceFindAll } from "./services/concurso.service.findall";
import { concursoControllerFindOne } from "./controllers/concurso.controller.findone";
import { concursoServiceFindOne } from "./services/concurso.service.findone";


const controllers = [ConcursoControllerFindAll, concursoControllerFindOne]
const services = [ConcursoServiceFindAll, concursoServiceFindOne]
@Module({
    controllers: [...controllers],
    providers: [...services]
    
})
export class ConcursoModule {}