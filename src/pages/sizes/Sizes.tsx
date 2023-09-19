import { Layout } from "../../components/layout/Layout";
import { Button } from "../../components/button/Button";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import OrderContext from "../../context/OrderContext";

export default function Sizes() {
  const navigate = useNavigate();
  const { pizzaSize, setPizzaSize } = useContext(OrderContext);

  const sizeOptions = [
    {
      id: "1",
      flavours: 1,
      size: 35,
      slices: 8,
      text: "Grande",
    },
    {
      id: "2",
      flavours: 2,
      size: 35,
      slices: 8,
      text: "Grande",
    },
    {
      id: "3",
      flavours: 1,
      size: 28,
      slices: 4,
      text: "Média",
    },
    {
      id: "4",
      flavours: 2,
      size: 28,
      slices: 4,
      text: "Média",
    },
    {
      id: "5",
      flavours: 1,
      size: 18,
      slices: 1,
      text: "Broto",
    },
    {
      id: "6",
      flavours: 2,
      size: 18,
      slices: 1,
      text: "Broto",
    },
  ]

  const [sizeId, setSizeId] = useState("");

  const getPizzaSize = (sizeId: string) => {
    return sizeOptions.filter((option) => option.id === sizeId)
  }

  const handleChange = (event) => {
    setSizeId(event.target.value);
  };

  const handleBack = () => {
    navigate(routes.home);
  };

  const handleNext = () => {
    const selectedSize = getPizzaSize(sizeId)
    setPizzaSize(selectedSize)
    navigate(routes.pizzaFlavour);
  };

  useEffect(() => {
    if(!pizzaSize) return

    setSizeId(pizzaSize[0].id)
  }, [])

  return (
    <Layout>
      <h1 tabIndex={0}>Escolha o tamanho da sua pizza</h1>
      <section>
        {sizeOptions.map(({ id, size, slices, flavours, text }) => (
          <section key={id}>
            <input
              type="radio"
              id={id}
              name="sizes"
              onChange={handleChange}
              value={id}
              checked={sizeId === id}
            />
            <label htmlFor={id}>{text} - {flavours} sabores 
              <span>
                Pizza com {slices} pedaços e {size}cm
              </span>
            </label>
          </section>
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
