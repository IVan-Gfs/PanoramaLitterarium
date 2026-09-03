import { PartialType } from '@nestjs/mapped-types';
import { CreateCriterioDTO } from './criterio.request';
import { CreateGrupoCriterioDTO } from '../response/grupo.criterio.request';


export class CriterioUpdateDTO extends PartialType(CreateGrupoCriterioDTO) {}