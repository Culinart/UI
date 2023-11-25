import React, { useState } from "react";
import imgReceitaPedido from "../../../assets/Cliente/Pedidos/imgReceitaPedido.png";
import { FiStar } from "react-icons/fi";

function CardReceitaAvaliacao() {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex items-center flex-col w-48 bg-white shadow-md rounded-xl border border-gray-300 p-2">
      <img src={imgReceitaPedido} className="w-full h-28 object-cover mb-2" alt="Receita" />
      <div className="flex flex-col w-full h-auto">
        <h2 className="text-lg font-medium mb-2">Frango Xadrez</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`cursor-pointer text-xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardReceitaAvaliacao;
