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
  const { pizzaOrder, setNewOrder } = useContext(OrderContext);

  const navigate = useNavigate();
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const handleChange = (event) => {
    setPaymentType(event.target.value);
    // setIsDisabled(false)
  };

  const getPaymentOptions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/payment/options");
      const options = await response.json();
      setPaymentOptions(options);
    } catch (error) {
      alert(`Deu ruim: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentOptiontype = (paymentType: number) => {
    if (!paymentType) return;

    const filteredValue = paymentOptions.filter(
      (payment) => payment.value === paymentType
    );

    return filteredValue[0].text;
  };

  const createOrder = async (orderPayload) => {
    try {
      const response = await fetch("http://localhost:8000/order/create_order", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });
      const order = await response.json();
      setNewOrder(order);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Finally");
      navigate(routes.checkoutSecond);
    }
  };

  const handleClick = () => {
    createOrder(pizzaOrder);
  };

  useEffect(() => {
    if (pizzaOrder === undefined) {
      return navigate(routes.pizzaSize);
    }
  }, []);

  // ?. nullish

  useEffect(() => {
    getPaymentOptions();
  }, []);

  return (
    <Layout>
      <Title tabIndex={0}>Pagamento</Title>
      <CheckoutItem>
        <h2>Items</h2>
        {pizzaOrder.item.map((item) => {
          return (
            <CheckoutItemFlex>
              <p>
                {item.name} / {item.size}
              </p>
              <p>{convertToCurrency(item.value)}</p>
            </CheckoutItemFlex>
          );
        })}
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
