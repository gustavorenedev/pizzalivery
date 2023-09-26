import { createContext, useState } from "react";

// função para criar o contextg
const OrderContext = createContext({});

// provider = provedor

const OrderContextProvider = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState();

  const [pizzaFlavour, setPizzaFlavour] = useState();

  return (
    <OrderContext.Provider
      value={{ pizzaSize, setPizzaSize, pizzaFlavour, setPizzaFlavour }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider };
export default OrderContext;
