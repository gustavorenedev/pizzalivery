import { useContext, useEffect, useState } from "react";
import OrderContext from "../../context/OrderContext";

export default function CheckoutSecond() {
  const { newOrder } = useContext(OrderContext);
  const [jsonString, setJsonString] = useState("");

  useEffect(() => {
    // Converte o objeto JSON em uma string JSON formatada
    if (newOrder) {
      const formattedJson = JSON.stringify(newOrder, null, 2);
      setJsonString(formattedJson);
    }
  }, [newOrder]);

  return (
    <div>
      <pre>{jsonString}</pre>
    </div>
  );
}
