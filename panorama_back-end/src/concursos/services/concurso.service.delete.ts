import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ConcursoServiceDelete {

    constructor(private readonly prismaService: PrismaService) {}

    async delete(id: number): Promise<void> {

        const concurso = await this.prismaService.concurso.findUnique({
            where: {
                id: BigInt(id)
            }
        });

        if (!concurso) {
            throw new NotFoundException("Concurso não encontrado");
        }

        if (concurso.status !== "RASCUNHO") {
            throw new BadRequestException(
                "Não é possível excluir concursos publicados, cancelados ou encerrados."
            );
        }

        await this.prismaService.$transaction(async (tx) => {

            await tx.categoriaConcurso.deleteMany({
                where: {
                    concursoId: BigInt(id)
                }
            });

            await tx.concurso.delete({
                where: {
                    id: BigInt(id)
                }
            });

        });
    }
}