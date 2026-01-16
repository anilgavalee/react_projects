import { useState } from "react";

export function StarRating({ userRating, setUserRating }) {
  const [tempRating, setTempRating] = useState(0);
  console.log(tempRating);

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
      
        return (
            
          <Star
            key={num}
            onHoverIn={() => setTempRating(num)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= num : userRating >= num}
            onRate={() => setUserRating(num)}
          ></Star>
        );
      })}
    </div>
  );
}

function Star({ onHoverIn, onHoverOut, full, onRate }) {
  return (
    <span
      style={{
        width: "24px",
        height: "24px",
        cursor: "pointer",
        color: full ? "#facc15" : "#d1d5db",
      }}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onClick={onRate}
    >
      ★
    </span>
  );
}
