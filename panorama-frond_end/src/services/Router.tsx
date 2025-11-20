import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import CadastrarUsuario from "../views/Usuario/cadastrar";

export const routes: RouteObject[] = [
    {
        path: "/panorama",
        element: <Layout/>,
        children: [
            {
                path: "/panorama/login",
                element: <CadastrarUsuario/> 
            }
        ]
    }
]