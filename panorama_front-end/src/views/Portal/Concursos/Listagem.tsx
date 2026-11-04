import React, { useState } from "react";
import { useConcurso } from "../../../services/entities/concurso/hook/useConcurso";
import type { Concurso } from "../../../services/entities/concurso/type/Concurso";
import Listagem, {
    type ListagemColumn,
} from "../../../components/search/listagem";
import ModalEditarGrupoCriterio from "../../../components/modal/modalGrupoCriterio";
import { formatarData } from "../../../utils/date";

const ListagemConcursoPortal: React.FC = () => {

  const {
    concursos,
    loading,
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    
    
  } = useConcurso();

  const [concursoSelecionado, setConcursoSelecionado] = useState<Concurso | null>(null);

  const handleEdit = (
          concurso: Concurso
      ) => {
  
          setConcursoSelecionado(concurso);
      };

      const handleCloseModal = () => {

        setConcursoSelecionado(null);
    };

    const handleDelete = (
            concurso: Concurso
        ) => {
    
            console.log(
                "Excluir concurso:",
                concurso
            );
        };

        const columns: ListagemColumn<Concurso>[] = [
        
                {
                    key: "titulo",
                    label: "Título",
                    width: "100%",
        
                    render: (concurso) => (
                        <span className="criterios-listagem__nome">
                            {concurso.titulo}
                        </span>
                    ),
                },
                {
                    key: "prazoInscricao",
                    label: "Prazo de Inscrição",
                    width: "20%",
                    render: (concurso) => (
                        <span className="criterios-listagem__nome">
                            {formatarData(concurso.prazoInscricao)}
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
