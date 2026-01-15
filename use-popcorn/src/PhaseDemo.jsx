import { useEffect } from "react";

export function PhaseDemo({ value }) {
  console.log("🧱 RENDER phase → value:", value);

  useEffect(() => {
    console.log("⚡ EFFECT phase → value:", value);

    return () => {
      console.log("🧹 CLEANUP phase → value:", value);
    };
  }, [value]);

  return <h2>Value is {value}</h2>;
}
