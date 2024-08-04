import { useState, useEffect } from "react";

const App = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    //retrieve cart from localStorage
    // for(let key in localStorage) {
    //   if (!localStorage.hasOwnProperty(key)) {
    //     continue;
    //   }
    //   console.log(`${key}: ${localStorage.getItem(key)}`);
    // }
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);
  const addToCart = (data) =>
    setCart([
      ...cart,
      { type: "ADD_TO_CART", data, props: { sam: "Developer" } },
    ]);
  const removeFromCart = (data) =>
    setCart(cart.filter((item) => item.data !== data));
  useEffect(() => {
    //save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <div>
        <h3>Cart</h3>
        {cart.map((item) => (
          <div key={item.data}>
            {item.data}
            <button onClick={() => removeFromCart(item.data)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Add Item to Cart</h3>
        <input
          type="text"
          placeholder="Enter Item"
          onKeyDown={(event) =>
            event.key === "Enter" && addToCart(event.target.value)
          }
        />
      </div>
    </div>
  );
};

export default App;
