import React, { useState } from "react";
import { useConcurso } from "../../../services/entities/concurso/hook/useConcurso";
import type { ConcursoOrganizacao } from "../../../services/entities/concurso/type/Concurso";
import Listagem, {
    type ListagemColumn,
} from "../../../components/search/listagem";
import ModalEditarGrupoCriterio from "../../../components/modal/modalGrupoCriterio";
import { formatarData } from "../../../utils/date";
import { Ban, ClipboardList, Pause, Play } from "lucide-react";

const ListagemConcursoPortal: React.FC = () => {



    const {
        concursos,
        loading,
        currentPage,
        pageSize,
        totalPages,
        handlePageChange,
        handlePageSizeChange,
        handleTogglePause


    } = useConcurso();

    const [concursoSelecionado, setConcursoSelecionado] = useState<ConcursoOrganizacao | null>(null);

    const handleEdit = (
        concurso: ConcursoOrganizacao
    ) => {

        setConcursoSelecionado(concurso);
    };

    const handleCloseModal = () => {

        setConcursoSelecionado(null);
    };

    const handleDelete = (
        concurso: ConcursoOrganizacao
    ) => {

        console.log(
            "Excluir concurso:",
            concurso
        );
    };

    const handleTriagem = () => { }
    const handleCancel = () => { }

    const columns: ListagemColumn<ConcursoOrganizacao>[] = [

        {
            key: "titulo",
            label: "Título",
            width: "100%",

            render: (concurso) => (
                <span className="item-listagem">
                    {concurso.titulo}
                </span>
            ),
        },
        {
            key: "prazoInscricao",
            label: "Prazo Inscrição",
            width: "20%",
            align: 'center',
            render: (concurso) => (
                <span className="item-listagem">
                    {formatarData(concurso.prazoInscricao)}
                </span>
            )
        },
        {
            key: "dataFinalizacao",
            label: "Prazo Finalização",
            width: "20%",
            align: 'center',
            render: (concurso) => (
                <span className="item-listagem">
                    {formatarData(concurso.dataFinalizacao)}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            align: "center",
            width: "20%",
            render: (concurso) => (
                <span className={`item-listagem-status STATUS-` + concurso.status}>
                    {concurso.status}
                </span>
            )
        }

    ];


    return (
        <div className="criterios-biblioteca">

            <header className="criterios-biblioteca__header">

                <h1>
                    Concursos e Seleções
                </h1>


            </header>


            <section className="criterios-biblioteca__content">

                <Listagem
                    data={concursos}
                    columns={columns}
                    loading={loading}

                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={pageSize}

                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handlePageSizeChange}

                    onRowClick={handleEdit}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showEdit={(concurso) => concurso.status !== "CANCELADO"}

                    // Excluir somente rascunhos
                    showDelete={(concurso) =>
                        concurso.status === "RASCUNHO"
                    }

                    // Ações adicionais
                    actions={[
                        {
                            key: "triagem",
                            label: "Triagem das obras",
                            icon: <ClipboardList size={17} />,
                            className: "listagem-action-triagem",
                            onClick: handleTriagem,
                            disabled: (c) => !["PUBLICADO", "PAUSADO", "ENCERRADO"].includes(c.status),
                        },
                        {
                            key: "pausar",
                            label: "Pausar concurso",
                            icon: <Pause size={17} />,
                            className: "listagem-action-pause",
                            onClick: handleTogglePause,
                            visible: (c) => c.status === "PUBLICADO",
                        },
                        {
                            key: "reativar",
                            label: "Reativar concurso",
                            icon: <Play size={17} />,
                            className: "listagem-action-play",
                            onClick: handleTogglePause,
                            visible: (c) => c.status === "PAUSADO" ,
                            

                            
                        },
                        {
                            key: "cancelar",
                            label: "Cancelar concurso",
                            icon: <Ban size={17} />,
                            className: "listagem-action-cancel",
                            onClick: handleCancel,
                            disabled: (c) => !["PUBLICADO", "PAUSADO",].includes(c.status),

                        },

                    ]}

                    emptyMessage="Nenhum concurso encontrado."
                />

            </section>


            {/* {concursoSelecionado && (
                <ModalEditarGrupoCriterio
                    grupo={concursoSelecionado}
                    onClose={handleCloseModal}
                />
            )} */}

        </div>
    );
};

export default ListagemConcursoPortal;
