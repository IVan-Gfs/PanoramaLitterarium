
import React, { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import "../../assets/css/components/modalConfimacao.css";

interface ModalConfirmacaoProps {
    isOpen: boolean;
    titulo?: string;
    mensagem: string;
    descricao?: string;
    textoConfirmar?: string;
    textoCancelar?: string;
    onConfirm: () => Promise<boolean | void> | boolean | void;
    onClose: () => void;
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
    isOpen,
    titulo = "Confirmar exclusão",
    mensagem,
    descricao = "Essa ação não poderá ser desfeita.",
    textoConfirmar = "Excluir",
    textoCancelar = "Cancelar",
    onConfirm,
    onClose,
}) => {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !loading) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, loading, onClose]);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setLoading(true);
        setErro(false);

        try {
            const sucesso = await onConfirm();

            if (sucesso === false) {
                setErro(true);
                return;
            }

            onClose();
        } catch {
            setErro(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="modal-confirmacao__overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !loading) {
                    onClose();
                }
            }}
        >
            <div
                className="modal-confirmacao"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="modal-confirmacao-titulo"
                aria-describedby="modal-confirmacao-mensagem"
            >
                <button
                    type="button"
                    className="modal-confirmacao__fechar"
                    onClick={onClose}
                    disabled={loading}
                    aria-label="Fechar modal"
                >
                    <X size={20} />
                </button>

                <div className="modal-confirmacao__icone">
                    <AlertTriangle size={27} />
                </div>

                <h2 id="modal-confirmacao-titulo">
                    {titulo}
                </h2>

                <p
                    id="modal-confirmacao-mensagem"
                    className="modal-confirmacao__mensagem"
                >
                    {mensagem}
                </p>

                {descricao && (
                    <p className="modal-confirmacao__descricao">
                        {descricao}
                    </p>
                )}

                {erro && (
                    <p className="modal-confirmacao__erro" role="alert">
                        Não foi possível concluir a operação. Tente novamente.
                    </p>
                )}

                <div className="modal-confirmacao__acoes">
                    <button
                        type="button"
                        className="modal-confirmacao__btn modal-confirmacao__btn--cancelar"
                        onClick={onClose}
                        disabled={loading}
                    >
                        {textoCancelar}
                    </button>

                    <button
                        type="button"
                        className="modal-confirmacao__btn modal-confirmacao__btn--confirmar"
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? "Aguarde..." : textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacao;
