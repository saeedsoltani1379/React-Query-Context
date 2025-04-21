import { createContext, useContext, useEffect, useState } from "react";
import { UseLicalStorage } from "../hook/uselocalstorage";
import axios from "axios";
import { ServerTypes } from "../servertypes/serverTypes";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

interface cartItem {
  id: number;
  qty: number;
}

interface IshopingContext {
  stateContext: cartItem[];
  handleIncreaseQty: (id: number) => void;
  handleDecreaseQty: (id: number) => void;
  handleRemoveQty: (id: number) => void;
  showQty: (id: number) => number;
  allQtys: number;
  priceOne: number;
  isLogin: boolean;
  handleLogin: (username:string,password:string) => void;
  handleLogout: () => void;
}

const shopingCartContext = createContext({} as IshopingContext);
export const UseShopingCartContext = () => {
  return useContext(shopingCartContext);
};

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [stateContext, setStateContext] = UseLicalStorage<cartItem[]>(
    "localitems",
    []
  );

  const handleIncreaseQty = (id: number) => {
    setStateContext((prevstate) => {
      const selected = prevstate.find((item) => item.id === id);
      if (selected == null) {
        return [...prevstate, { id: id, qty: 1 }];
      }
      return prevstate.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
    });
  };

  const handleDecreaseQty = (id: number) => {
    setStateContext((prevstate) => {
      const selected = prevstate.find((item) => item.id === id);
      if (selected?.qty == 1) {
        return prevstate.filter((item) => item.id !== id);
      }
      return prevstate.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  const handleRemoveQty = (id: number) => {
    setStateContext((prevstate) => {
      return prevstate.filter((item) => item.id !== id);
    });
  };

  const showQty = (id: number) => {
    return stateContext.find((item) => item.id === id)?.qty || 0;
  };

  const allQtys = stateContext.reduce((total, item) => total + item.qty, 0);
  const [statePrice, setstatePrice] = useState<ServerTypes[]>();
  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then((res) => setstatePrice(res.data));
  }, []);

  const priceOne = stateContext.reduce((total, item) => {
    const price = statePrice?.find((p) => p.id === item.id);
    return total + (price?.price || 0) * item.qty;
  }, 0);
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);

  const handleLogin = (username: string, password: string) => {
    login(username, password).finally(() => {
      let token = "hfjkdhsfjyha7tyr6t4r5g6ew5r6aw5er6g5awer65a6werg5";
      localStorage.setItem("token", token);
      setisLogin(true);
      navigate("/");
    });
  };

  const handleLogout = () => {
    setisLogin(false);
    navigate("/login");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setisLogin(true);
    }
  }, []);

  return (
    <shopingCartContext.Provider
      value={{
        stateContext,
        handleIncreaseQty,
        handleDecreaseQty,
        handleRemoveQty,
        showQty,
        allQtys,
        priceOne,
        isLogin,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </shopingCartContext.Provider>
  );
}
