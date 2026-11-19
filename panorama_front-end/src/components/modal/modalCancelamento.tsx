import React, { useEffect, useId, useRef, useState } from "react";
import { AlertTriangle, Ban, BellRing, Eye, X } from "lucide-react";
import "../../assets/css/components/modalCancelamento.css";

export const MOTIVO_MIN = 10;
export const MOTIVO_MAX = 500;

interface ModalCancelarConcursoProps {
    isOpen: boolean;
    tituloConcurso?: string;
    loading?: boolean;
    /** Deve retornar true quando o cancelamento for salvo com sucesso */
    onConfirm: (motivo: string) => Promise<boolean> | boolean;
    onClose: () => void;
}

const ModalCancelarConcurso: React.FC<ModalCancelarConcursoProps> = ({
    isOpen,
    tituloConcurso,
    loading = false,
    onConfirm,
    onClose,
}) => {
    const [motivo, setMotivo] = useState("");
    const [tocado, setTocado] = useState(false);
    const [erroApi, setErroApi] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const idTitulo = useId();
    const idMotivo = useId();
    const idErro = useId();

    const motivoLimpo = motivo.trim();
    const motivoCurto = motivoLimpo.length < MOTIVO_MIN;
    const mostrarErro = tocado && motivoCurto;

    // Reseta o formulário sempre que o modal abre e foca no campo
    useEffect(() => {
        if (!isOpen) return;
        setMotivo("");
        setTocado(false);
        setErroApi(null);
        const t = setTimeout(() => textareaRef.current?.focus(), 50);
        return () => clearTimeout(t);
    }, [isOpen]);

    // Fecha com ESC (exceto durante o envio) e trava o scroll do fundo
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) onClose();
        };

        const overflowAnterior = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = overflowAnterior;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, loading, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTocado(true);
        setErroApi(null);

        if (motivoCurto || loading) return;

        const sucesso = await onConfirm(motivoLimpo);
        if (!sucesso) {
            setErroApi("Não foi possível cancelar o concurso. Tente novamente.");
        }
    };

    return (
        <div
            className="modal-cancelar__overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !loading) onClose();
            }}
        >
            <div
                className="modal-cancelar"
                role="dialog"
                aria-modal="true"
                aria-labelledby={idTitulo}
            >
                <header className="modal-cancelar__header">
                    <span className="modal-cancelar__icone" aria-hidden="true">
                        <Ban size={22} />
                    </span>

                    <div className="modal-cancelar__titulos">
                        <h2 id={idTitulo} className="modal-cancelar__titulo">
                            Cancelar concurso
                        </h2>
                        {tituloConcurso && (
                            <p className="modal-cancelar__concurso" title={tituloConcurso}>
                                {tituloConcurso}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        className="modal-cancelar__fechar"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Fechar"
                    >
                        <X size={18} />
                    </button>
                </header>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="modal-cancelar__corpo">
                        <div className="modal-cancelar__aviso" role="note">
                            <AlertTriangle size={18} aria-hidden="true" />
                            <div>
                                <p className="modal-cancelar__aviso-titulo">
                                    Esta ação não poderá ser desfeita.
                                </p>
                                <ul className="modal-cancelar__aviso-lista">
                                    <li>
                                        <BellRing size={14} aria-hidden="true" />
                                        <span>
                                            Todos os participantes serão notificados sobre o
                                            cancelamento e o motivo informado.
                                        </span>
                                    </li>
                                    <li>
                                        <Eye size={14} aria-hidden="true" />
                                        <span>
                                            O motivo ficará visível para o público na página de
                                            detalhes do concurso.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="modal-cancelar__campo">
                            <label htmlFor={idMotivo} className="modal-cancelar__label">
                                Motivo do cancelamento
                            </label>

                            <textarea
                                id={idMotivo}
                                ref={textareaRef}
                                className={
                                    "modal-cancelar__textarea" +
                                    (mostrarErro ? " modal-cancelar__textarea--erro" : "")
                                }
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                onBlur={() => setTocado(true)}
                                maxLength={MOTIVO_MAX}
                                rows={5}
                                disabled={loading}
                                placeholder="Explique aos participantes por que o concurso está sendo cancelado."
                                aria-invalid={mostrarErro}
                                aria-describedby={mostrarErro || erroApi ? idErro : undefined}
                            />

                            <div className="modal-cancelar__rodape-campo">
                                <span
                                    id={idErro}
                                    className="modal-cancelar__erro"
                                    role="alert"
                                >
                                    {mostrarErro
                                        ? `Informe o motivo com pelo menos ${MOTIVO_MIN} caracteres.`
                                        : erroApi}
                                </span>
                                <span className="modal-cancelar__contador">
                                    {motivo.length}/{MOTIVO_MAX}
                                </span>
                            </div>
                        </div>
                    </div>

                    <footer className="modal-cancelar__acoes">
                        <button
                            type="button"
                            className="modal-cancelar__btn modal-cancelar__btn--secundario"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Voltar
                        </button>
                        <button
                            type="submit"
                            className="modal-cancelar__btn modal-cancelar__btn--perigo"
                            disabled={loading}
                        >
                            {loading ? "Cancelando..." : "Cancelar concurso"}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ModalCancelarConcurso;