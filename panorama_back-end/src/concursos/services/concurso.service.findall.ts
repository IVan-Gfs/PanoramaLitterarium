import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConcursoMapper } from "../mapper/concurso.mapper";
import { ConcursoListParticDTO } from "../dto/response/concurso.list.partic.dto";
import { Pageable } from "src/commons/pagination/page.response";
import { fieldsConcurso } from "../constants/concurso.constants";
import { Page } from "src/commons/pagination/page.sistema";


@Injectable()
export class ConcursoServiceFindAll {

    constructor(private readonly prismaService: PrismaService){}

    async findAll(//Parâmetros de paginação vindo do controlller.
        page: number,
        pageSize: number,
        props: string,
        order: 'ASC' | 'DESC',
        search?: string
    ): Promise<Page<ConcursoListParticDTO>> {

    //Instancia o objeto Pageable, que encapsula as informações de paginação e ordenação, validando os campos permitidos    
    const pageable = new Pageable(page, pageSize, props, order, fieldsConcurso); 

    //Prepara a cláusula WHERE para busca, usando o campo especificado em pageable.props
    const where = search ? { 
    [pageable.props]: {
        contains: search,
    },
   } : undefined;

   //Executa as consultas para obter os concursos e contar o total de itens, usando Promise.all para otimizar a performance
   const [concursos, totalitems] = await Promise.all([
    this.prismaService.concurso.findMany({
        skip: pageable.offset,
        take: pageable.limit,
        include: { organizacao: true },
        where,
        orderBy: { 
            [pageable.props]: pageable.order.toLowerCase(),
        }
    }),
    this.prismaService.concurso.count({ where })
   ])

   //Converte os resultados obtidos para o formato DTO usando o mapper da listagens de concursos
   const concursosDTO = ConcursoMapper.toDTOList(ConcursoListParticDTO, concursos);
  
   //Retorna os resultados paginados encapsulados em um objeto Page, que inclui os dados e as informações de paginação
   return Page.of(concursosDTO, totalitems, pageable);
}

}