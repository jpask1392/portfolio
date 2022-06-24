import useCart from "@/components/hooks/useCart";

const CountBubble = () => {
  const [ cart ] = useCart();

  return (
    cart?.lineItems.length ? (
      <div className="bg-secondaryLight w-4 h-4 rounded-full flex justify-center items-center">
        <span className="h-full text-tiny text-primary">
          {cart.lineItems.reduce((acc: number, val: any) => acc + val.quantity, 0)}
        </span>
      </div>
    ) : null
  )
}

export default CountBubble;
