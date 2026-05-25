import type { RouteObject } from "react-router-dom";
import LayoutMain from "../../components/layouts/LayoutMain";

//USUÁRIO
import Login from "../../views/Usuario/login";
import LayoutAuth from "../../components/layouts/LayoutAuth";

//CONCURSOS
import ConsultarConcursos from "../../views/Concursos/listagem";
import DetalhesConcurso from "../../views/Concursos/detalhes";
import CadastrarUsuario from "../../views/Usuario/CadastrarUsuario";
import SelecionarConta from "../../views/Usuario/selecionarConta";
import HomePage from "../../views/home";
import Categorias from "../../views/menu/categorias";
import Organizadores from "../../views/menu/organizadores";
import Parceiros from "../../views/menu/parceiros";
import Contato from "../../views/menu/contato";
import Sobre from "../../views/menu/sobre";




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

    }
]