import { PartialType } from "@nestjs/mapped-types";
import { UsuarioCreateDTO } from "./usuario.create.dto";

export class UpdateAuthDto extends PartialType(UsuarioCreateDTO) {}