import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, Usuario } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsuarioService{
    constructor(private readonly prisma: PrismaService) {}

    // 1. BUSCA POR EMAIL
    async findOneByEmail(email: string): Promise<Usuario | null> {
        return this.prisma.usuario.findUnique({
            where: { email },
        });
    }

    // 2. BUSCA PELO TOKEN DE RECUPERAÇÃO / CONFIRMAÇÃO
    async findOneByResetToken(token: string): Promise<Usuario | null> {
        if (!token) return null;

        return this.prisma.usuario.findUnique({
            where: { recovery_token: token },
        });
    }

    // 3. BUSCA POR ID (Convertendo number para BigInt de forma segura)
    async findOneById(id: number): Promise<Usuario> {
        const user = await this.prisma.usuario.findUnique({
            where: { id: BigInt(id) }, // Prisma exige BigInt() para campos declarados como BigInt
        });

        if (!user) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }

        return user;
    }

    // 4. ATUALIZAÇÃO DINÂMICA DOS CAMPOS
    async update(id: number | bigint, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
        try {
            return await this.prisma.usuario.update({
                where: { id: BigInt(id.toString()) }, // Garante a conversão correta de BigInt
                data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Incapaz de atualizar: Usuário não existe`);
            }
            throw new BadRequestException('Erro ao atualizar os dados do usuário');
        }
    }
}