import React, { useState } from "react";

import type {
    GrupoCriterio,
} from "../../services/entities/criterio/type/Criterio";

type ModalEditarGrupoCriterioProps = {
    grupo: GrupoCriterio;
    onClose: () => void;
};

const ModalEditarGrupoCriterio: React.FC<
    ModalEditarGrupoCriterioProps
> = ({
    grupo,
    onClose,
}) => {

    const [nome, setNome] = useState(grupo.nome);


    const handleSubmit = (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        console.log({
            id: grupo.id,
            nome,
        });

        // API de atualização aqui

        onClose();
    };


    return (
        <div className="modal-overlay">

            <div
                className="modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                <div className="modal-header">

                    <h2>
                        Editar grupo de critérios
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="modal-body">

                        <div className="form-group">

                            <label htmlFor="nome">
                                Nome
                            </label>

                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(event) =>
                                    setNome(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    <div className="modal-footer">

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                        >
                            Salvar
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ModalEditarGrupoCriterio;
