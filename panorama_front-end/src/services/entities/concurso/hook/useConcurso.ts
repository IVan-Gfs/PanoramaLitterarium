import { useCallback, useEffect, useState } from "react";
import type {ConcursoOrganizacao, ConcursoOrganizacaoPaginado } from "../type/Concurso";
import { apiGetConcursos, apiPutConcurso, type SearchParams } from "../api/api.concurso";
import { ROTA } from "../../../router/url";

export const useConcurso = () => {
    const [concursos, setConcursos] = useState<ConcursoOrganizacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    //Paginação
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageSize, setPageSize] = useState<number>(6);

    const [totalPages, setTotalPages] = useState<number>(0);

    const [totalElements, setTotalElements] = useState<number>(0);

    //Filtragem
    const [props, setProps] = useState<string>("titulo");

    const [order, setOrder] = useState<string>("asc");

    const [orderBy, setOrderBy] = useState<string>("id");

    const [searchTerm, setSearchTerm] = useState<string>("");



    const atualizarConcurso = useCallback(
        async (
            payload: Partial<ConcursoOrganizacao>,
            id: number
        ): Promise<ConcursoOrganizacao | null> => {
            try {
                const response = await apiPutConcurso(id, payload);
                return response.data.dados;
            } catch (error) {
                console.error("Erro ao atualizar concurso", error);
                return null;
            }
        }

        , [])
    const buscarConcurso = useCallback(
        async (
            params: SearchParams
        ): Promise<ConcursoOrganizacaoPaginado | null> => {
            try {
                const response = await apiGetConcursos(ROTA.CONCURSO.LISTAR + '/organization', params);
                return response.data;
            } catch (error) {
                console.error(
                    "Erro ao buscar Concurso:",
                    error
                );

                return null;
            }

        }
        , [])

    const fetchConcursos = useCallback(async () => {

        setLoading(true);

        try {
            const params: SearchParams = {
                page: currentPage,
                pageSize,
                props,
                order,
            };

            const data = await buscarConcurso(params);

            if (data) {

                const {
                    content,
                    page,
                    pageSize: responsePageSize,
                    totalPages,
                    totalElements,
                } = data.dados;

                setConcursos(content);
                setCurrentPage(page);
                setPageSize(responsePageSize);
                setTotalPages(totalPages);
                setTotalElements(totalElements);
            }
        }catch(error){
            console.error("Erro ao carregar concursos:", error);
        }finally {
            setLoading(false);
        }

    }, [
        currentPage,
        pageSize,
        props,
        order,
        orderBy,
        searchTerm,
        buscarConcurso,
    ]);

    useEffect(() => {
        fetchConcursos();
    }, [fetchConcursos]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {

        const value = Number(event.target.value);

        setPageSize(value);

        setCurrentPage(1);
    };

    const handleTogglePause = async (concurso: ConcursoOrganizacao) => {

        const novoStatus = concurso.status === "PUBLICADO" ? "PAUSADO" : "PUBLICADO"

        const response = await atualizarConcurso({status: novoStatus}, concurso.id)

        if (response) {
            setConcursos((prev) =>
                prev.map((item) =>
                    item.id === concurso.id
                        ? response
                        : item
                )
            );
        }
    };


    const handleSearchChange = (
        value: string
    ) => {

        setSearchTerm(value);

        setCurrentPage(1);
    };


    const handleOrderChange = (
        value: string
    ) => {

        setOrder(value);

        setCurrentPage(1);
    };


    const handleOrderByChange = (
        value: string
    ) => {

        setOrderBy(value);

        setCurrentPage(1);
    };

    return {
        concursos,
        loading,

        currentPage,
        pageSize,
        totalPages,
        totalElements,

        props,
        order,
        orderBy,
        searchTerm,

        setProps,

        handlePageChange,
        handlePageSizeChange,
        handleSearchChange,
        handleOrderChange,
        handleOrderByChange,

        handleTogglePause,

        refetch: fetchConcursos,
    };
}