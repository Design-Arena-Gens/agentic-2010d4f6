'use client';

import { useState } from 'react';

interface Cookie {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends Cookie {
  quantity: number;
}

const cookies: Cookie[] = [
  {
    id: 1,
    name: 'Chocolate Chip',
    description: 'Classic chocolate chip cookies with premium dark chocolate',
    price: 12.99,
    image: '🍪',
  },
  {
    id: 2,
    name: 'Double Chocolate',
    description: 'Rich chocolate cookies with white chocolate chips',
    price: 13.99,
    image: '🍫',
  },
  {
    id: 3,
    name: 'Oatmeal Raisin',
    description: 'Hearty oatmeal cookies with plump raisins',
    price: 11.99,
    image: '🥮',
  },
  {
    id: 4,
    name: 'Peanut Butter',
    description: 'Creamy peanut butter cookies with a classic criss-cross pattern',
    price: 12.99,
    image: '🥜',
  },
  {
    id: 5,
    name: 'Sugar Cookie',
    description: 'Traditional vanilla sugar cookies, perfectly sweet',
    price: 10.99,
    image: '⭐',
  },
  {
    id: 6,
    name: 'Snickerdoodle',
    description: 'Cinnamon sugar cookies with a soft, chewy center',
    price: 12.99,
    image: '✨',
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (cookie: Cookie) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cookie.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === cookie.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...cookie, quantity: 1 }];
    });
  };

  const removeFromCart = (cookieId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cookieId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === cookieId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== cookieId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-cookie-brown text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">🍪 Sweet Treats Cookie Co.</h1>
              <p className="text-amber-100 mt-1">Freshly baked, delivered to your door</p>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-cookie-light hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              🛒 Cart ({getTotalItems()})
            </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cookie-brown">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{item.image}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 w-8 h-8 rounded-full font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-100 hover:bg-green-200 text-green-600 w-8 h-8 rounded-full font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span className="text-cookie-brown">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-cookie-brown hover:bg-cookie-light text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-5xl font-bold text-cookie-brown mb-4">
          Handcrafted Cookies Made with Love
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Choose from our delicious selection of freshly baked cookies
        </p>
      </section>

      {/* Cookie Grid */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cookies.map((cookie) => (
            <div
              key={cookie.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-12 flex items-center justify-center">
                <span className="text-8xl">{cookie.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-cookie-brown mb-2">
                  {cookie.name}
                </h3>
                <p className="text-gray-600 mb-4">{cookie.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-cookie-light">
                    ${cookie.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(cookie)}
                    className="bg-cookie-brown hover:bg-cookie-light text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cookie-brown text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">🍪 Sweet Treats Cookie Co.</p>
          <p className="text-amber-100">Delivering happiness, one cookie at a time</p>
          <p className="text-amber-200 text-sm mt-4">
            © 2025 Sweet Treats Cookie Co. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
