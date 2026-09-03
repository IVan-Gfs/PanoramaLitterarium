import { Module } from "@nestjs/common";
import { CategoriaControllerFindAll } from "./controllers/categoria.controller.findAll";
import { categoriaServiceFindAll } from "./services/categoria.service.findAll";

const controllers = [CategoriaControllerFindAll]
const services = [categoriaServiceFindAll]

@Module({
    controllers: [...controllers],
    providers: [...services]
    
})
export class CategoriaModule {}