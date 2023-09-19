import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export default function Sizes() {
  const navigate = useNavigate();

  const sizeOptions = [
    {
      id: 1,
      value: "large",
      text: "Grande",
    },
    {
      id: 2,
      value: "large-2",
      text: "Grande 2 sabores",
    },
    {
      id: 3,
      value: "medium",
      text: "Média",
    },
    {
      id: 4,
      value: "medium-2",
      text: "Média 2 sabores",
    },
    {
      id: 5,
      value: "small",
      text: "Broto",
    },
    {
      id: 6,
      value: "small-2",
      text: "Broto 2 sabores",
    },
  ];

  const [size, setSize] = useState("");

  const handleChange = (event) => {
    setSize(event.target.id);
  };

  const handleBack = () => {
    navigate(routes.home);
  };

  const handleNext = () => {
    navigate(routes.pizzaFlavour);
  };

  return (
    <Layout>
      <h1>Escolha o tamanho da sua pizza</h1>
      <section>
        {sizeOptions.map(({ id, value, text }) => (
          <div key={id}>
            <input
              type="radio"
              id={value}
              name="sizes"
              onChange={handleChange}
              value={size}
            />
            <label htmlFor={value}>{text}</label>
          </div>
        ))}
      </section>
      <div>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Eescolha o sabor</Button>
      </div>
    </Layout>
  );
}
