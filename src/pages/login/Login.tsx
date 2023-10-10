import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import OrderContext from "../../context/OrderContext";
import { Layout } from "../../components/layout/Layout";
import { Title } from "../../components/title/Title";

export default function Login() {
  const navigate = useNavigate();
  const { pizzaOrder } = useContext(OrderContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("token", `${login}.${password}`);

    if (pizzaOrder) {
      return navigate(routes.checkout);
    } else {
      return navigate(routes.pizzaSize);
    }
  };

  return (
    <Layout>
      <Title>Login</Title>
      <form>
        <label htmlFor="login">Login</label>
        <input
          type="text"
          name="login"
          id="login"
          value={login}
          onChange={handleLogin}
        />
        <label htmlFor="pass">Senha</label>
        <input
          type="password"
          name="pass"
          id="pass"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </Layout>
  );
}
