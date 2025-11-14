import { BaseEntity } from "src/commons/entity/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('CON_USUARIO')
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'ID_USUARIO',
        type: 'number',
    })
    idUsuario?: number;

    @Column({name: 'NOME_USUARIO', type: 'varchar2', length: 50})
    nomeUsuario: string = '';

    @Column({name: 'EMAIL_USUARIO', type: 'varchar2', length: 255})
    emailUsuario: string = '';

    @Column({name: 'SENHA_USUARIO', type: 'varchar2', length: 32})
    senhaUsurio: string = '';

    @Column({name: 'FOTO_USUARIO', type: 'varchar2', length: 255, nullable: true})
    fotoUsuario: string = '';

    @Column({name: 'TIPO_USUARIO', type: 'number'})
    tipoUsuario: number = 0;

    @Column({name: 'CPF_USUARIO', type: 'varchar2', length: 14, nullable: true})
    cpfUsuario: string = '';

    @Column({name: 'CNPJ_USUARIO', type: 'varchar2', length: 14, nullable: true})
    cnpjUsuario: string = '';

    @Column({name: 'TEL_USUARIO', type: 'varchar2', length: 15})
    telUsuario: string = '';

    constructor(data: Partial<Usuario> = {}){
        super();
        Object.assign(this, data)

    }
}