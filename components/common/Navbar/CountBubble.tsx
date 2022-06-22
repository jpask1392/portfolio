import useCart from "@/components/hooks/useCart";

const CountBubble = () => {
  const [ cart ] = useCart();

  return (
    cart && (
      <div className="bg-primary w-4 h-4 rounded-full flex justify-center items-center">
        <span className="h-full text-tiny">
          {cart.lineItems.reduce((acc: number, val: any) => acc + val.quantity, 0)}
        </span>
      </div>
    )
  )
}

export default CountBubble;
