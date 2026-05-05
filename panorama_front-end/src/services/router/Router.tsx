import type { RouteObject } from "react-router-dom";
import LayoutMain from "../../components/layouts/LayoutMain";

//USUÁRIO
import Login from "../../views/Usuario/login";
import LayoutAuth from "../../components/layouts/LayoutAuth";

//CONCURSOS
import ConsultarConcursos from "../../views/Concursos/listagem";
import CadastrarUsuarioOrganizacao from "../../views/Usuario/cadastrar.usuario.organizacao";
import CriarConta from "../../views/Usuario/selecionarConta.usuario";
import DetalhesConcurso from "../../views/Concursos/detalhes";




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
                element: <CriarConta/>
            },
            {
                path: "/user/cadastrar/organização",
                element: <CadastrarUsuarioOrganizacao/>
            }
        ]

    }
]