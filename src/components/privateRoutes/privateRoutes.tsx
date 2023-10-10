import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../routes";

// Outlet = responsável por renderizar rotas
// ex: renderizar rotas que necessitam de validação
export default function PrivateRoutes() {
  // se o token for vazio = falso, ele manda para o login
  // se true manda para o checkout
  const userToken = sessionStorage.getItem("token");
  return userToken ? <Outlet /> : <Navigate to={routes.login} />;
}
