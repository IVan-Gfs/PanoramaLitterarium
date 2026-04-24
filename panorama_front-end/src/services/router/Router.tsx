import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";

//USUÁRIO
import User from "../../components/layout/User";
import Login from "../../views/Usuario/login";

//CONCURSOS
import ConsultarConcursos from "../../views/Concursos/listagem";
import CadastrarUsuarioOrganizacao from "../../views/Usuario/cadastrar.usuario.organizacao";
import CriarConta from "../../views/Usuario/cadastrar.usuario";
import DetalhesConcurso from "../../views/Concursos/detalhes";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
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
        element: <User/>,
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