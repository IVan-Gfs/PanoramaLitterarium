
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    ChevronRight,
    Home,
    Globe
} from "lucide-react";

import "../../assets/css/components/breadCrumbPortal.css";

interface ConfiguracaoPagina {
    titulo: string;
    descricao: string;
}

const nomesRotas: Record<string, string> = {
    "visao-geral": "Visão geral",
    concursos: "Concursos",
    publicar: "Publicar",
    listagem: "Listagem",
    triagem: "Triagem das obras",
    biblioteca: "Biblioteca",
    criterios: "Critérios Avaliativos",
    obras: "Obras",
    categorias: "Categorias",
    resultados: "Resultados",
    comunicacao: "Comunicação",
    perfil: "Perfil",
    configuracoes: "Configurações",
    
};

// Títulos e descrições independentes dos nomes do menu
const configuracaoPaginas: Record<string, ConfiguracaoPagina> = {
    "/portal/visao-geral": {
        titulo: "Visão Geral",
        descricao: "Acompanhe as principais informações do portal.",
    },

    "/portal/concursos/listagem": {
        titulo: "Meus Concursos e Seleções",
        descricao: "Gerencie seus concursos, seleções e acompanhe suas publicações.",
    },

    "/portal/concursos/publicar": {
        titulo: "Publicar Concurso",
        descricao: "Cadastre e disponibilize novos concursos e seleções.",
    },

    "/portal/concursos/triagem": {
        titulo: "Triagem das Obras",
        descricao: "Analise e gerencie as obras inscritas nos concursos.",
    },

    "/portal/biblioteca": {
        titulo: "Minha Biblioteca",
        descricao: "Gerencie o acervo literário da organização.",
    },

    "/portal/resultados": {
        titulo: "Resultados",
        descricao: "Acompanhe os resultados dos concursos e seleções.",
    },

    "/portal/comunicacao": {
        titulo: "Comunicação",
        descricao: "Gerencie as comunicações da organização.",
    },

    "/portal/perfil": {
        titulo: "Meu Perfil",
        descricao: "Visualize e atualize suas informações.",
    },

    "/portal/configuracoes": {
        titulo: "Configurações",
        descricao: "Gerencie as configurações do portal.",
    },
};

const BreadcrumbPortal: React.FC = () => {
    const location = useLocation();

    const caminhoAtual = location.pathname.replace(/\/$/, "") || "/";

    const segmentos = caminhoAtual
        .split("/")
        .filter(Boolean)
        .filter((segmento) => segmento !== "portal");

    const segmentosCompletos = caminhoAtual
        .split("/")
        .filter(Boolean);

    const breadcrumbs = segmentos.map((segmento, index) => {
        const caminho = "/" + segmentosCompletos
            .slice(0, index + 2)
            .join("/");

        return {
            nome: nomesRotas[segmento] || segmento,
            caminho,
            atual: index === segmentos.length - 1,
        };
    });

    const pagina = configuracaoPaginas[caminhoAtual];

    const titulo = pagina?.titulo ||
        breadcrumbs[breadcrumbs.length - 1]?.nome ||
        "Visão Geral";

    const descricao = pagina?.descricao ||
        "Panorama Litterarium";

    return (
        <div className="pl-breadcrumb">

            <div className="pl-breadcrumb__left">

                <div className="pl-breadcrumb__navigation">

                    <Link
                        to="/portal/visao-geral"
                        className="pl-breadcrumb__home"
                        title="Página inicial"
                    >
                        <Home size={17} />
                    </Link>

                    {breadcrumbs.map((item) => (
                        <React.Fragment key={item.caminho}>

                            <ChevronRight
                                size={16}
                                className="pl-breadcrumb__separator"
                            />

                            {item.atual ? (
                                <span className="pl-breadcrumb__current">
                                    {item.nome}
                                </span>
                            ) : (
                                <Link
                                    to={item.caminho}
                                    className="pl-breadcrumb__link"
                                >
                                    {item.nome}
                                </Link>
                            )}

                        </React.Fragment>
                    ))}

                </div>

                <div className="pl-breadcrumb__heading">

                    <span className="pl-breadcrumb__heading-title">
                        {titulo}
                    </span>

                    <span className="pl-breadcrumb__heading-description">
                        {descricao}
                    </span>

                </div>

            </div>

            <Link
                to="/"
                target="about:blank"
                className="pl-breadcrumb__public-button"
            >
                <Globe size={18} />
                <span>Área Pública</span>
            </Link>

        </div>
    );
};

export default BreadcrumbPortal;
