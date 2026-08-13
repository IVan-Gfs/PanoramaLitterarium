import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./services/router/Router";
import { AuthProvider } from "./contexts/AuthContext";

// Cria a instância do roteador moderno do React Router v6
const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
