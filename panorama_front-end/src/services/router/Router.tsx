import type { RouteObject } from "react-router-dom";
import LayoutMain from "../../components/layouts/LayoutMain";

//USUÁRIO
import Login from "../../views/Usuario/login";
import LayoutAuth from "../../components/layouts/LayoutAuth";

//CONCURSOS
import ConsultarConcursos from "../../views/Concursos/listagem";
import DetalhesConcurso from "../../views/Concursos/detalhes";
import CadastrarUsuario from "../../views/Usuario/cadastrar";
import SelecionarConta from "../../views/Usuario/selecionarConta";




export const routes: RouteObject[] = [
    {
        path: "/",
        element: <LayoutMain/>,
        children: [
            {
                path: "/concursos",
                element: <ConsultarConcursos/>
            },
            {
                path: "concursos/detalhes",
                element: <DetalhesConcurso/>
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