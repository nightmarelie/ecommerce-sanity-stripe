import React, {
  createContext,
  useContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-hot-toast";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: any[];
};

type StateContext = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, q: number) => void;
  toggleCartItemQuanitity: (id: string, value: string) => void;
  onRemove: (product: Product) => void;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setTotalQuantities: Dispatch<SetStateAction<number>>;
};

const Context = createContext<StateContext>({} as StateContext);

export const StateContext: FC<any> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([] as Product[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: Product;
  let index;

  const isProduct = (p: Product | undefined): p is Product => {
    return (p as Product)._id !== undefined;
  };

  const onAdd: StateContext["onAdd"] = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems: Product[] = cartItems
        .map((cartProduct) => {
          if (cartProduct._id === product._id)
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
        })
        .filter(isProduct);

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove: StateContext["onRemove"] = (product) => {
    foundProduct =
      cartItems.find((item) => item._id === product._id) || ({} as Product);
    const newCartItems = cartItems
      .filter((item) => item._id !== product._id)
      .filter(isProduct);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct!.price * foundProduct!.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct!.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity: StateContext["toggleCartItemQuanitity"] = (
    id,
    value
  ) => {
    foundProduct = cartItems.find((item) => item._id === id) || ({} as Product);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems: Product[] = cartItems.splice(index, 1);

    if (value === "inc" && newCartItems) {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec" && newCartItems) {
      if (foundProduct!.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
