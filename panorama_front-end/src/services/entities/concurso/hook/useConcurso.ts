import { useCallback, useEffect, useState } from "react";
import type { Concurso, ConcursoPaginado } from "../type/Concurso";
import { apiGetConcursos, type SearchParams } from "../api/api.concurso";
import { ROTA } from "../../../router/url";

export const useConcurso = () => {
    const [concursos, setConcursos] = useState<Concurso[]>([]);
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


    const buscarConcurso = useCallback(
        async (
            params: SearchParams
        ): Promise<ConcursoPaginado | null> =>{
            
            try {
                const response = await apiGetConcursos(ROTA.CONCURSO.LISTAR, params);
                return response.data;
            } catch (error) {
                console.error(
                    "Erro ao buscar grupos de critérios:",
                    error
                );

                return null;
            }
        }
    ,[])

    const fetchConcursos = useCallback(async () => {
    
            setLoading(true);
    
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
    
            setLoading(false);
    
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

        refetch: fetchConcursos,
    };
}