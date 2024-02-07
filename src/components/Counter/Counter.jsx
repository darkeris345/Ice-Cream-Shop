import "./Counter.css";
import { useEffect } from "react";

function Counter({ iceCream, setUpdate }) {
  useEffect(() => {
    setUpdate((update) => update + 1);
  });

  const totalCount = iceCream.reduce((prev, ice) => {
    return prev + ice.count;
  }, 0);

  const discount = (count) => {
    if (count > 0 && count < 10) {
      return 0;
    } else if (count >= 10 && count < 20) {
      return 0.05;
    } else if (count >= 20 && count < 30) {
      return 0.15;
    } else if (count >= 30 && count < 40) {
      return 0.25;
    } else if (count >= 40) {
      return 0.35;
    }
  };

  const subtotal = iceCream
    .map((ice) => ice.price * ice.count)
    .reduce((a, b) => a + b, 0);

  const total = subtotal * (1 - discount(totalCount));

  return (
    <div className="counter">
      <div className="iceCreamPortions">
        {iceCream.map((ice) => {
          const { id, flavor, count, color } = ice;

          return (
            count > 0 && (
              <div key={id}>
                <p
                  style={{ color: color }}
                  onChange={() => setUpdate((update) => update + 1)}
                >
                  {flavor}: {count}
                </p>
              </div>
            )
          );
        })}
      </div>
      <div className="priceCounter">
        <p>Total Products: {totalCount}</p>
        <p>Discount: {discount(totalCount) * 100 + "%"}</p>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Counter;
