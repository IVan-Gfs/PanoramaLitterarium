import { useCallback, useEffect, useState } from "react";



import type {
    GrupoCriterio,
    GrupoCriterioPaginado,
} from "../type/Criterio";

import type {
    SearchParams,
} from "../api/criterio.api";
import { apiGetCriterios } from "../api/criterio.api";


export const useGrupoCriterios = () => {

    const [criterios, setCriterios] = useState<GrupoCriterio[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    // Paginação
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageSize, setPageSize] = useState<number>(6);

    const [totalPages, setTotalPages] = useState<number>(0);

    const [totalElements, setTotalElements] = useState<number>(0);

    // Ordenação / filtragem
    const [props, setProps] = useState<string>("titulo");

    const [order, setOrder] = useState<string>("asc");

    const [orderBy, setOrderBy] = useState<string>("id");

    const [searchTerm, setSearchTerm] = useState<string>("");


    const buscarGrupoCriterios = useCallback(
        async (
            params: SearchParams
        ): Promise<GrupoCriterioPaginado | null> => {

            try {

                const response = await apiGetCriterios(params);

                return response.data;

            } catch (error) {

                console.error(
                    "Erro ao buscar grupos de critérios:",
                    error
                );

                return null;
            }
        },
        []
    );


    const fetchCriterios = useCallback(async () => {

        setLoading(true);

        const params: SearchParams = {
            page: currentPage,
            pageSize,
            props,
            order,
        };

        const data = await buscarGrupoCriterios(params);

        if (data) {

            const {
                content,
                page,
                pageSize: responsePageSize,
                totalPages,
                totalElements,
            } = data.dados;

            setCriterios(content);

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
        buscarGrupoCriterios,
    ]);


    useEffect(() => {
        fetchCriterios();
    }, [fetchCriterios]);


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
        criterios,
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

        refetch: fetchCriterios,
    };
};
