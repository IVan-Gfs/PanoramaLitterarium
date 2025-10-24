import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
   @CreateDateColumn({ name: 'data_criacao' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'data_atualizacao' })
    updatedAt!: Date;

    constructor(data: Partial<BaseEntity> = {}){
        Object.assign(this, data);
    }
}