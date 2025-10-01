import { Prisma, PrismaClient } from '@prisma/client';
import * as emailsend from './emailServices'

const prisma = new PrismaClient();

const SchemaClient = prisma.user ;
const validColumns = ["id", "name", "login", "roles"];

export const create = async (data: any) => {
    return await SchemaClient.create({ data });
};

export const getAll = async () => {
    return await SchemaClient.findMany({
        orderBy: {
            name: "asc",
        },
        omit: {
            password: true,
        }
    });
};

export const getById = async (id: number) => {
    return await SchemaClient.findUnique({
        where: { id },
        omit: {
            password: true,
        }
    });
};

export const update = async (id: number, data: any) => {
    try {
        const existingRecord = await SchemaClient.findUnique({
            where: { id },
        });

        if (!existingRecord) {
            console.warn(`Registro com ID ${id} não encontrado.`);
            return { message: "Registro não encontrado", success: false };
        }

        const dataResult = await SchemaClient.update({
            where: { id },
            data,
            omit: {
                password: true,
            }
        });

        return dataResult;

    } catch (error: any) {
        console.error("Erro ao alterar o registro:", error.message);

        return { message: "Erro ao alterar", success: false, error: error.message };
    }

};

export const erase = async (id: number) => {
    if (!id) {
        console.warn(`Registro com ID não enviado.`);
        return { message: "ID não encontrado", success: false };
    }
    try {
        // Verifica se o registro existe antes de tentar deletá-lo
        const existingRecord = await SchemaClient.findUnique({
            where: { id },
        });

        if (!existingRecord) {
            console.warn(`Registro com ID ${id} não encontrado.`);
            return { message: "Registro não encontrado", success: false };
        }

        await SchemaClient.delete({
            where: { id },
        });

        return { message: "Registro deletado com sucesso", success: true };
    } catch (error: any) {
        console.error("Erro ao deletar registro:", error.message);

        return { message: "Erro ao deletar", success: false, error: error.message };
    }
};

export const getPagesAll = async (
    page: number = 1,
    pageSize: number = 20,
    orderByColumn: string = "name",
    orderDirection: "asc" | "desc" = "asc"
) => {
    const offset = (page - 1) * pageSize;
    // UsersOrderByWithRelationInput
    const orderBy: Prisma.UserOrderByWithRelationInput = validColumns.includes(orderByColumn)
        ? { [orderByColumn]: orderDirection as Prisma.SortOrder }
        : { name: "asc" };

    const data = await SchemaClient.findMany({
        skip: offset,
        take: pageSize,
        orderBy,
        omit: {
            password: true,
        }

    });

    const totalRecords = await SchemaClient.count();
    return {
        data,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / pageSize),
        totalRecords,
    };
};

export const activateAccount = async (id: number, data: any) => {
    try {

        const existingRecord = await SchemaClient.findUnique({
            where: { id },
        });

        if (!existingRecord) {
            console.warn(`Registro com ID ${id} não encontrado.`);
            return { message: "Registro não encontrado", success: false };
        }

        const dataResult = await SchemaClient.update({
            where: { id },
            data,
        });

        if (dataResult && dataResult.isauthorized == true) {
            const email = dataResult.login;
            const nome = dataResult.name || "nome";
            emailsend.sendActivateAccountMail(email, nome );
        }

        const resultdata = {
            id: dataResult.id,
            autorizado: dataResult.isauthorized,
            ultimaAutorizacao: dataResult.ultimaAutorizacao
        }

        return resultdata;

    } catch (error: any) {
        console.error("Erro ao alterar o registro:", error.message);

        return { message: "Erro ao alterar", success: false, error: error.message };
    }

};