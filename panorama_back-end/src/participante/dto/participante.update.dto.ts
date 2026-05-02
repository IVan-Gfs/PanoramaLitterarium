import { PartialType } from "@nestjs/mapped-types";
import { ParticipanteCreateDTO } from "./participante.create.dto";

export class ParticipanteUpdateDTO extends PartialType(ParticipanteCreateDTO){}