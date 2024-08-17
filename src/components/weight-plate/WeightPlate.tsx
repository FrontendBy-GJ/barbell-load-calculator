import { CSSProperties } from "react";
import "./weight-plate.css";

type PlatesProps = {
  weight: number;
  amount: number;
};

export default function WeightPlate({ weight, amount }: PlatesProps) {
  return (
    <div
      data-weight={weight}
      role="presentation"
      aria-hidden="true"
      aria-label="Weight Plate"
      style={
        {
          "--weight": weight,
        } as CSSProperties
      }
      className="plate relative shrink-0 rounded-full text-center font-bold text-white shadow-md shadow-black/70 before:absolute before:inset-2 before:rounded-full before:shadow-inner before:shadow-black/70 after:absolute after:left-1/2 after:top-1/2 after:size-[75px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:shadow-md after:shadow-black/70"
    >
      <div className="absolute left-1/2 top-1/2 z-50 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--bg-clr)] shadow-inner shadow-black"></div>
      <div className="absolute left-0 right-0 top-0 z-50 translate-y-2/3">
        x{amount}
      </div>
      <div className="absolute left-[clamp(75%,100vw,2rem)] top-1/2 flex -translate-y-1/2 flex-col">
        <span>{weight}</span>
        <span>LB</span>
      </div>
      <div
        aria-hidden="true"
        className="absolute right-[clamp(75%,100vw,2rem)] top-1/2 flex -translate-y-1/2 flex-col"
      >
        <span>{weight}</span>
        <span>LB</span>
      </div>
    </div>
  );
}
