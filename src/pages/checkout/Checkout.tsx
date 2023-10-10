import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Title } from "../../components/title/Title";
import OrderContext from "../../context/OrderContext";
import { routes } from "../../routes";
import { Button } from "../../components/button/Button";
import { convertToCurrency } from "../../helpers/convertToCurrency";
import {
  CheckoutAction,
  CheckoutItem,
  CheckoutItemFlex,
  PaymentMethodGroup,
} from "./Checkout.style";

export default function Checkout() {
  const { pizzaOrder } = useContext(OrderContext);

  const navigate = useNavigate();

  const paymentOptions = [
    { id: "20", value: 1, text: "Cartão de crédito" },
    { id: "21", value: 2, text: "Cartão de débito" },
    { id: "22", value: 3, text: "Vale refeição" },
    { id: "23", value: 4, text: "PIX" },
  ];

  const [paymentType, setPaymentType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (event) => {
    setPaymentType(event.target.value);
    // setIsDisabled(false)
  };

  const getPaymentOptiontype = (paymentType: number) => {
    if (!paymentType) return;

    const filteredValue = paymentOptions.filter(
      (payment) => payment.value === paymentType
    );

    return filteredValue[0].text;
  };

  // async/await

  // const handleClick = () => {
  //   setIsLoading(true);

  //   fetch("https://www.api.pizzalivery.com.br/order", {
  //     method: "POST",
  //     body: JSON.stringify(pizzaOrder),
  //   })
  //     .then(() => {
  //       alert("Deu bom");
  //     })
  //     .catch(() => {
  //       alert("Deu ruim");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //       alert("Finalizou");
  //     });
  // };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const abobrinha = await fetch(
        "https://www.api.pizzalivery.com.br/order",
        {
          method: "POST",
          body: JSON.stringify(pizzaOrder),
        }
      );

      console.log(abobrinha);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pizzaOrder === undefined) {
      return navigate(routes.pizzaSize);
    }
  }, []);

  // ?. nullish

  return (
    // <Layout>
    //   {isLoading ? (
    //     <>Carregando</>
    //   ) : (
    //     <>
    //       <Title tabIndex={0}>Pagamento</Title>
    //       <CheckoutItem>
    //         <h2>Items</h2>
    //         <CheckoutItemFlex>
    //           <p>
    //             {pizzaOrder?.item.name}/{pizzaOrder?.item.size}
    //           </p>
    //           <p>{convertToCurrency(pizzaOrder?.item.value)}</p>
    //         </CheckoutItemFlex>
    //       </CheckoutItem>
    //       <CheckoutItem>
    //         <h2>Forma de pagamento</h2>
    //         <CheckoutItemFlex>
    //           <PaymentMethodGroup>
    //             <label htmlFor="payments">Selecione a forma de pagamento</label>
    //             <select
    //               name="payments"
    //               id="payments"
    //               defaultValue={""}
    //               onChange={handleChange}
    //             >
    //               <option disabled value="">
    //                 Selcione
    //               </option>
    //               {paymentOptions.map(({ id, value, text }) => (
    //                 <option key={id} value={value}>
    //                   {text}
    //                 </option>
    //               ))}
    //             </select>
    //           </PaymentMethodGroup>
    //           <p>{getPaymentOptiontype(Number(paymentType))}</p>
    //         </CheckoutItemFlex>
    //       </CheckoutItem>
    //       <CheckoutItem>
    //         <CheckoutItemFlex>
    //           <h2>Total do pedido</h2>
    //           <p>{convertToCurrency(pizzaOrder?.total)}</p>
    //         </CheckoutItemFlex>
    //       </CheckoutItem>
    //       <CheckoutAction>
    //         <Button onClick={handleClick} disabled={!Boolean(paymentType)}>
    //           Fazer pedido
    //         </Button>
    //       </CheckoutAction>
    //     </>
    //   )}
    // </Layout>

    <Layout>
      <Title tabIndex={0}>Pagamento</Title>
      <CheckoutItem>
        <h2>Items</h2>
        <CheckoutItemFlex>
          <p>
            {pizzaOrder?.item.name}/{pizzaOrder?.item.size}
          </p>
          <p>{convertToCurrency(pizzaOrder?.item.value)}</p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutItem>
        <h2>Forma de pagamento</h2>
        <CheckoutItemFlex>
          <PaymentMethodGroup>
            <label htmlFor="payments">Selecione a forma de pagamento</label>
            <select
              name="payments"
              id="payments"
              defaultValue={""}
              onChange={handleChange}
            >
              <option disabled value="">
                Selcione
              </option>
              {paymentOptions.map(({ id, value, text }) => (
                <option key={id} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </PaymentMethodGroup>
          <p>{getPaymentOptiontype(Number(paymentType))}</p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutItem>
        <CheckoutItemFlex>
          <h2>Total do pedido</h2>
          <p>{convertToCurrency(pizzaOrder?.total)}</p>
        </CheckoutItemFlex>
      </CheckoutItem>
      <CheckoutAction>
        <Button onClick={handleClick} disabled={!Boolean(paymentType)}>
          Fazer pedido
        </Button>
      </CheckoutAction>
    </Layout>
  );
}
