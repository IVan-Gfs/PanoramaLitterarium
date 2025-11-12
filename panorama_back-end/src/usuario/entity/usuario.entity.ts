import { BaseEntity } from "src/commons/entity/base.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('CON_USUARIO')
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'ID_USUARIO',
        type: 'number',
    })
    idUsuario?: number;

    @Column({name: 'NOME', type: 'string', length: 50})
    nomeUsuario: string = '';

    @Column({name: 'EMAIL_USUARIO', type: 'string', length: 100})
    emailUsuario: string = '';

    @Column({name: 'SENHA_USUARIO', type: 'string', length: 100})
    senhaUsurio: string = '';

    @Column({name: 'FOTO_USUARIO', type: 'string', length: 255})
    fotoUsuario: string = '';

    @Column({name: 'TIPO_USUARIO', type: 'number'})
    tipoUsuario: number = 0;

    @Column({name: 'CPF_USUARIO', type: 'string', length: 14})
    cpfUsuario: string = '';

    @Column({name: 'CNPJ_USUARIO', type: 'string', length: 14})
    cnpjUsuario: string = '';

    @Column({name: 'TEL_USUARIO', type: 'string', length: 15})
    telUsuario: string = '';

    constructor(data: Partial<Usuario> = {}){
        super();
        Object.assign(this, data)

    }
}