import React, { useState, useEffect } from "react";

function Background() {
  const [arr, setArr] = useState([]);
  const symbols = [
    "$",
    "€",
    "£",
    "¥",
    "₴",
    "₽",
    "¢",
    "₣",
    "zł",
    "Kč",
    "₢",
    "₺",
    "₦",
    "₧",
    "₨",
    "₩",
    "₪",
    "₫",
    "฿",
    "₭",
    "៛",
    "₮",
    "₸",
    "₲",
  ];
  const animationTimingFunctionArray = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
  ];

  const stringStyle = () => {
    return {
      fontSize: Math.ceil(Math.random() * 5) * 2 + 5 + "vh",
      left: Math.floor(Math.random() * 90) + "vw",
      top: 0,
      animationName: "rain",
      animationDuration: Math.ceil(Math.random() * 4) * 2 + 1 + "s",
      animationTimingFunction:
        animationTimingFunctionArray[
          Math.floor(Math.random() * animationTimingFunctionArray.length)
        ],
      animationFillMode: "forwards",
    };
  };

  useEffect(() => {
    setTimeout(() => {
      const el = {
        style: stringStyle(),
        content: symbols[Math.floor(Math.random() * symbols.length)],
      };
      setArr([...arr, el]);
    }, 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr]);

  return (
    <section className="background">
      {arr.map((it, ind) => (
        <p key={ind} style={it.style}>
          {it.content}
        </p>
      ))}
    </section>
  );
}

export default Background;
