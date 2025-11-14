import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
   @CreateDateColumn({ name: 'DATA_CRIACAO', nullable: true })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'DATA_ATUALIZACAO', nullable: true })
    updatedAt!: Date;

    constructor(data: Partial<BaseEntity> = {}){
        Object.assign(this, data);
    }
}