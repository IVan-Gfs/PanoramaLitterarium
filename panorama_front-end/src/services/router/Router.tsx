import type { RouteObject } from "react-router-dom";
import LayoutMain from "../../components/layouts/LayoutMain";

// USUÁRIO
import Login from "../../views/Usuario/login";
import LayoutAuth from "../../components/layouts/LayoutAuth";

// CONCURSOS (ÁREA PÚBLICA)
import ConsultarConcursos from "../../views/Concursos/listagem";
import DetalhesConcurso from "../../views/Concursos/detalhes";

import SelecionarConta from "../../views/Usuario/selecionarConta";
import HomePage from "../../views/home";

import Sobre from "../../views/Menu/sobre";
import Categorias from "../../views/Menu/categorias";
import Organizadores from "../../views/Menu/organizadores";
import Parceiros from "../../views/Menu/parceiros";
import Contato from "../../views/Menu/contato";
import CadastrarUsuario from "../../views/Usuario/cadastrarUsuario";
import LayoutPortal from "../../components/layouts/LayoutPortal";
import VisaoGeral from "../../views/Portal/visaoGeral";
import PublicarConcurso from "../../views/Portal/Concursos/Publicar";
import ListagemConcursoPortal from "../../views/Portal/Concursos/Listagem";
import CriteriosBiblioteca from "../../views/Portal/Biblioteca/Criterios";
import ModelosInscricao from "../../views/Portal/Biblioteca/Modelos";
import BancoAutores from "../../views/Portal/Talentos/Autores";
import DestaquesTalentos from "../../views/Portal/Talentos/Destaques";
import ConvitesTalentos from "../../views/Portal/Talentos/Convites";
import HistoricoTalentos from "../../views/Portal/Talentos/Historico";
import ResultadosPortal from "../../views/Portal/Resultados";
import FinanceiroPortal from "../../views/Portal/Financeiro";
import ComunicacaoPortal from "../../views/Portal/Comunicacao";
import MinhasInscricoesPortal from "../../views/Portal/Inscricoes";
import MinhasObrasPortal from "../../views/Portal/Obras";
import AvaliacoesPortal from "../../views/Portal/Avaliacoes";
import ConfiguracoesPortal from "../../views/Portal/Configuracoes";
import PerfilPortal from "../../views/Portal/Perfil";

// ==========================================
// IMPORTAÇÕES DO PORTAL (Substitua pelos seus caminhos e views reais)
// ==========================================

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <LayoutMain/>,
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage/>
            },
            {
                path: "/concursos",
                element: <ConsultarConcursos/>
            },
            {
                path: "concursos/detalhes",
                element: <DetalhesConcurso/>
            },
            {
                path: "/categorias",
                element: <Categorias/>
            },
            {
                path: "/para-organizadores",
                element: <Organizadores/>
            },
            {
                path: "/parceiros",
                element: <Parceiros/>
            },
            {
                path: "/contato",
                element: <Contato/>
            },
            {
                path: "/sobre",
                element: <Sobre/>
            }
        ]
    },
    {
        path: "/user",
        element: <LayoutAuth/>,
        children: [
            {
                path: "/user/login",
                element: <Login/>
            },
            {
                path: "/user/cadastrar",
                element: <SelecionarConta/>
            },
            {
                path: "/user/cadastrar/:tipoConta",
                element: <CadastrarUsuario/>
            }
        ]
    },
    {
        path: "/portal",
        element: <LayoutPortal/>,
        children: [
            {
                path: "visao-geral", // Carrega em /portal/visao-geral
                element: <VisaoGeral />
            },
            // Sublinks do Dropdown de Concursos
            {
                path: "concursos/publicar",
                element: <PublicarConcurso />
            },
            {
                path: "concursos/listagem",
                element: <ListagemConcursoPortal />
            },
            // Sublinks do Dropdown de Biblioteca
            {
                path: "biblioteca/criterios",
                element: <CriteriosBiblioteca />
            },
            {
                path: "biblioteca/modelos",
                element: <ModelosInscricao />
            },
            // Sublinks do Dropdown de Talentos
            {
                path: "talentos/autores",
                element: <BancoAutores />
            },
            {
                path: "talentos/destaques",
                element: <DestaquesTalentos />
            },
            {
                path: "talentos/convites",
                element: <ConvitesTalentos />
            },
            {
                path: "talentos/historico",
                element: <HistoricoTalentos />
            },
            // Links Simples do Portal
            {
                path: "resultados",
                element: <ResultadosPortal />
            },
            {
                path: "financeiro",
                element: <FinanceiroPortal />
            },
            {
                path: "comunicacao",
                element: <ComunicacaoPortal />
            },
            // Rotas de Participantes e Jurados
            {
                path: "inscricoes",
                element: <MinhasInscricoesPortal />
            },
            {
                path: "explorar",
                element: <ConsultarConcursos />
            },
            {
                path: "obras",
                element: <MinhasObrasPortal />
            },
            {
                path: "avaliacoes",
                element: <AvaliacoesPortal />
            },
            // Configurações (Rodapé)
            {
                path: "configuracoes",
                element: <ConfiguracoesPortal />
            },
            {
                path: "perfil",
                element: <PerfilPortal />
            }
        ]
    }
];
