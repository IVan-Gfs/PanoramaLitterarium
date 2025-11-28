import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";

//USUÁRIO
import User from "../components/User";
import Login from "../views/Usuario/login";

//CONCURSOS
import ConsultarConcursos from "../views/concursos/consultar";
import CadastrarUsuarioOrganizacao from "../views/Usuario/cad-organizacao/cadastrar.usuario.organizacao";
import CriarConta from "../views/Usuario/cadastrar.usuario";


export const routes: RouteObject[] = [
    {
        path: "/inicio",
        element: <Layout/>,
        children: [
            {
                path: "/inicio/concursos",
                element: <ConsultarConcursos/>
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