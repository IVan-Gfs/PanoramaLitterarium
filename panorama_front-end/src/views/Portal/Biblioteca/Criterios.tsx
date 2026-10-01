import React, { useState } from "react";

import type {
    GrupoCriterio,
} from "../../../services/entities/criterio/type/Criterio";

import Listagem, {
    type ListagemColumn,
} from "../../../components/search/listagem";


import "../../../assets/css/criterios/criteriosListagem.css";
import { useGrupoCriterios } from "../../../services/entities/criterio/hook/useGrupoCriterios";
import ModalEditarGrupoCriterio from "../../../components/modal/modalGrupoCriterio";


const CriteriosBiblioteca: React.FC = () => {

    const {
        criterios,
        loading,

        currentPage,
        pageSize,
        totalPages,

        handlePageChange,
        handlePageSizeChange,
    } = useGrupoCriterios();


    /*
     * Grupo selecionado para edição
     */
    const [grupoSelecionado, setGrupoSelecionado] =
        useState<GrupoCriterio | null>(null);


    /*
     * Abre modal
     */
    const handleEdit = (
        grupo: GrupoCriterio
    ) => {

        setGrupoSelecionado(grupo);
    };


    /*
     * Fecha modal
     */
    const handleCloseModal = () => {

        setGrupoSelecionado(null);
    };


    /*
     * Exclusão
     */
    const handleDelete = (
        grupo: GrupoCriterio
    ) => {

        console.log(
            "Excluir grupo:",
            grupo
        );

        // futuramente:
        // abrir modal de confirmação
    };


    /*
     * Colunas da listagem
     */
    const columns: ListagemColumn<GrupoCriterio>[] = [

        {
            key: "nome",
            label: "Nome",
            width: "100%",

            render: (grupo) => (
                <span className="criterios-listagem__nome">
                    {grupo.nome}
                </span>
            ),
        },

    ];


    return (
        <div className="criterios-biblioteca">

            <header className="criterios-biblioteca__header">

                <h1>
                    Critérios Avaliativos
                </h1>


            </header>


            <section className="criterios-biblioteca__content">

                <Listagem
                    data={criterios}
                    columns={columns}

                    loading={loading}

                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={pageSize}

                    onPageChange={handlePageChange}

                    onItemsPerPageChange={
                        handlePageSizeChange
                    }

                    onRowClick={handleEdit}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                    emptyMessage={
                        "Nenhum grupo de critérios encontrado."
                    }
                />

            </section>


            {grupoSelecionado && (
                <ModalEditarGrupoCriterio
                    grupo={grupoSelecionado}
                    onClose={handleCloseModal}
                />
            )}

        </div>
    );
};


export default CriteriosBiblioteca;
