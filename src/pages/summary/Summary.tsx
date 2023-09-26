import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Layout } from "../../components/layout/Layout";
import { convertToCurrency } from "../../helpers/convertToCurrency";
import OrderContext from "../../context/OrderContext";
import { routes } from "../../routes";

export default function Summary() {
  const navigate = useNavigate()

  const {pizzaSize, pizzaFlavour, setPizzaOrder} = useContext(OrderContext)
  const [summaryData, setSummaryData] = useState({})
  const [summaryAmount, setSummaryAmount] = useState(0)

  const handleBack = () => {
    navigate(routes.pizzaFlavour)
  }

  const handleNext = () => {
    const payload = {
      item: {
        name: summaryData.name,
        image: summaryData.image,
        size: summaryData.size,
        slices: summaryData.slices,
        value: summaryData.price,
      },
      total: summaryAmount,
    }

    setPizzaOrder(payload)
    navigate(routes.checkout)
    console.log(payload)
  }

  useEffect(() => {
    // validação de dados
    if(!pizzaFlavour) {
      return navigate(routes.pizzaSize)
    }

    if(!pizzaSize) {
      return navigate(routes.home)
    }

    setSummaryData({
      text: pizzaSize[0].text,
      slices: pizzaSize[0].slices,
      name: pizzaFlavour[0].name,
      price: pizzaFlavour[0].price[pizzaSize[0].slices],
      image: pizzaFlavour[0].image,
    })
  }, [])

  useEffect(() => {
    setSummaryAmount(summaryData.price)
  }, [summaryAmount])

  return (
  <Layout>
    <h1 tabIndex={0}>Resumo do pedido</h1>
    <section>
      <div>
        <img src={summaryData.image} alt="" />
        <p>{summaryData.name}</p>
        <p>{summaryData.text} {`(${summaryData.slices}) pedaços`}</p>
        <p>{convertToCurrency(summaryData.price)}</p>
      </div>
      <div>
        <p>{convertToCurrency(summaryAmount)}</p>
      </div>
    </section>
    <div>
      <Button inverse="inverse" onClick={handleBack}>
        Voltar
      </Button>
      <Button onClick={handleNext}>Ir para o pagamento</Button>
    </div>
  </Layout>
  )
}
