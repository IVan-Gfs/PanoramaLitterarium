import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConcursoListOrgDTO } from "../dto/response/concurso.list.org.dto";
import { Page } from "src/commons/pagination/page.sistema";
import { Pageable } from "src/commons/pagination/page.response";
import { orderFieldsConcurso, searchFieldsConcurso } from "../constants/concurso.constants";
import { ConcursoMapper } from "../mapper/concurso.mapper";

@Injectable()
export class ConcursoServiceOrgFindAll {

    constructor(private readonly prismaService: PrismaService){}

    async findAllByOrganizacao(//Parâmetros de paginação vindo do controlller.
            organizacaoId: bigint,
            page: number,
            pageSize: number,
            props: string,
            order: 'ASC' | 'DESC',
            search?: string,
            orderBy?: string,
            categorias?: string,
            booleanFlags?: object
        ): Promise<Page<ConcursoListOrgDTO>> {
    
              
            
        //Instancia o objeto Pageable, que encapsula as informações de paginação e ordenação, validando os campos permitidos    
        const pageable = new Pageable(page, pageSize, props, order, orderBy, searchFieldsConcurso, orderFieldsConcurso); 

        const categoriasArray = categorias ? categorias.split(',').map(id => Number(id)).filter(id => !isNaN(id)) : []; 
        const listBooleanFlags = Object.entries(booleanFlags ?? {});

        //Prepara a cláusula WHERE para busca, usando o campo especificado em pageable.props
        const where: any = {}

        where.organizacaoId = organizacaoId;

        if(search){
            where[pageable.props] = {
                contains: search,
            };
        }
    
        if(categoriasArray.length > 0){
            where.categoria = {
                some: {
                    categoriaId: {
                        in: categoriasArray,
                    }
                }
            }
        }
    
        //Padroniza listagem de todos os campos de flags booleanas
        listBooleanFlags.forEach(([key, value]) =>{
            if( value !== undefined){
                where[key] = value
            }
        })
        
       //Executa as consultas para obter os concursos e contar o total de itens, usando Promise.all para otimizar a performance
        const [concursos, totalitems] = await Promise.all([
            this.prismaService.concurso.findMany({
                skip: pageable.offset,
                take: pageable.limit,
                include: { categoriaConcurso: { include: { categoria: true } } },
                where,
                orderBy: { 
                    [pageable.orderBy]: pageable.order.toLowerCase(),
                }
            }),
        this.prismaService.concurso.count({ where })
       ])
       //Converte os resultados obtidos para o formato DTO usando o mapper da listagens de concursos
       const concursosDTO = ConcursoMapper.toDTOList(ConcursoListOrgDTO, concursos);
      
       //Retorna os resultados paginados encapsulados em um objeto Page, que inclui os dados e as informações de paginação
       return Page.of(concursosDTO, totalitems, pageable);
    }

}