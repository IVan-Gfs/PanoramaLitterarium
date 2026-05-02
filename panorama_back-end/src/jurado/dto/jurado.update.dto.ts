import { PartialType } from "@nestjs/mapped-types";
import { JuradoCreateDTO } from "./jurado.create.dto";

export class JuradoUpdateDTO extends PartialType(JuradoCreateDTO){}