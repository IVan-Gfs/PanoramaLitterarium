import { BaseEntity, Column, Entity, ForeignKey, PrimaryGeneratedColumn } from "typeorm";

@Entity('CON_ORGANIZACAO')
export class Organizacao extends BaseEntity{

    @PrimaryGeneratedColumn('increment', {name: 'ID_ORG', type: 'number'})
    IdOrg?: number;

    @Column({name: 'NOME_FANTASIA', type:'varchar2', length: 255})
    nomeFantasia?: string;

    @Column({name:'RAZAO_SOCIAL',type:'varchar2', length: 255})
    razaoSocial?: string;

    @Column({name: 'TIPO_ORG', type: 'varchar2', length: 50})
    tipoOrg?: number;

    @Column({name: 'CEP_ORG', type: 'number', length: 11  })
    cepOrg?: string;

    @Column({name: 'ENDERECO_ORG', type: 'varchar2', length: 255  })
    enderecoOrg?: string;

    @Column({name: 'MUNICIPIO_ORG', type: 'varchar2', length: 45  })
    municipioOrg?: string;

    @Column({name: 'UF_ORG', type: 'char', length: 2  })
    ufOrg?: string;

    @Column({name: 'ID_USUARIO', type: 'number'})
    idUsuario?: string;
}