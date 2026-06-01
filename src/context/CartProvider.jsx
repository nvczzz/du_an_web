import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const API_URL = "http://localhost:4000";

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.all([
      fetch(`${API_URL}/products`).then((res) => res.json()),
      fetch(`${API_URL}/users`)
        .then((res) => res.json())
        .catch(() => []),
    ])
      .then(([productData, userData]) => {
        if (!active) return;
        setProducts(Array.isArray(productData) ? productData : []);
        setUsers(Array.isArray(userData) ? userData : []);
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
        setUsers([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const loginUser = useCallback(
    (username, password) => {
      const foundUser =
        users.find(
          (user) =>
            user.username === username &&
            String(user.password) === String(password),
        ) ||
        (username === "user" && password === "123"
          ? { id: "demo", username: "user", name: "Demo User" }
          : null);

      if (!foundUser) {
        return {
          success: false,
          message: "Tai khoan hoac mat khau khong dung.",
        };
      }

      setCurrentUser(foundUser);
      return { success: true };
    },
    [users],
  );

  const registerUser = useCallback(
    (newUser) => {
      const usernameTaken = users.some(
        (user) => user.username === newUser.username,
      );

      if (usernameTaken) {
        return { success: false, message: "Ten dang nhap da ton tai." };
      }

      const user = {
        id: Date.now(),
        ...newUser,
      };

      setUsers((prevUsers) => [...prevUsers, user]);
      setCurrentUser(user);
      return { success: true };
    },
    [users],
  );

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      cart,
      currentUser,
      addToCart,
      loginUser,
      registerUser,
      logoutUser,
    }),
    [
      products,
      loading,
      cart,
      currentUser,
      addToCart,
      loginUser,
      registerUser,
      logoutUser,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
