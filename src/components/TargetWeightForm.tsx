declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    popover?: "auto" | "manual";
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    popovertarget?: string;
  }
}

import { FormEvent, useCallback, useEffect, useRef } from "react";
import useWeightPlatesContext from "../hooks/useWeightPlatesContext";

export default function TargetWeightForm({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    percentageOfTotalWeight,
    finalWeight,
    weightPlatesNeeded,
    setPlatesNeeded,
    percentage,
    setPercentage,
    barWeight,
    setBarWeight,
    platesAvailable,
    totalWeight,
    setTotalWeight,
    setTargetWeight,
  } = useWeightPlatesContext();
  const popoverRef = useRef<HTMLDivElement>(null);
  const totalWeightRef = useRef<HTMLInputElement>(null);

  const percentageOptions = () => {
    let options = [];
    for (let i = 100; i >= 5; i -= 5) {
      options.push(
        <option key={i} value={i}>
          {i}%
        </option>,
      );
    }
    return options;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateWeight();
  };

  const calculateWeight = useCallback(() => {
    const totalAvailableWeight =
      Object.entries(platesAvailable).reduce(
        (total, [weight, amount]) => total + Number(weight) * Number(amount),
        0,
      ) + barWeight;

    if (totalWeight > totalAvailableWeight) {
      setIsDialogOpen(true);
      return;
    }

    let weight_plate_total = totalWeight - barWeight;
    let total = Number(weight_plate_total) + barWeight;
    let target_weight = percentageOfTotalWeight(percentage, total);
    target_weight = finalWeight(target_weight);

    if (target_weight <= barWeight) {
      popoverRef?.current?.showPopover();
      return;
    }

    const plates = weightPlatesNeeded(target_weight, barWeight);
    setPlatesNeeded(() => plates);
    setTargetWeight(target_weight.toString());
  }, [
    platesAvailable,
    setPlatesNeeded,
    totalWeight,
    barWeight,
    setTargetWeight,
    finalWeight,
    percentageOfTotalWeight,
  ]);

  useEffect(() => {
    if (totalWeightRef.current) {
      totalWeightRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="px-4 space-y-4">
      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="total_weight">
          Total Weight:
        </label>{" "}
        <input
          ref={totalWeightRef}
          type="number"
          inputMode="numeric"
          autoComplete="off"
          required
          name="total_weight"
          id="total_weight"
          min={50}
          step={5}
          placeholder="225"
          value={totalWeight}
          onChange={(e) => {
            const value = e.target.value;
            setTotalWeight(
              value === "" ? ("" as unknown as number) : Number(value),
            );
          }}
          className="w-[4.5rem] rounded p-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="percentage">
          Percentage:
        </label>{" "}
        <select
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          name="percentage"
          id="percentage"
          className="p-2 rounded"
        >
          {percentageOptions()}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold">Bar Weight:</span>{" "}
        <div className="flex items-center gap-2">
          <label htmlFor="45lbs">45 lbs</label>
          <input
            type="radio"
            name="bar"
            id="45lbs"
            value={45}
            checked={barWeight === 45}
            onChange={(e) => setBarWeight(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="15lbs">15 lbs</label>
          <input
            type="radio"
            name="bar"
            id="15lbs"
            value={15}
            checked={barWeight === 15}
            onChange={(e) => setBarWeight(Number(e.target.value))}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 rounded shadow-lg text-slate-50 active:bg-opacity-30"
        popovertarget="target-weight"
      >
        Calculate
      </button>

      <div
        id="target-weight"
        popover="auto"
        ref={popoverRef}
        className="max-w-[35ch] rounded-md bg-red-500 p-4 text-slate-100"
      >
        <p>
          The target weight must exceed the bar weight. Please adjust your
          inputs.
        </p>
      </div>
    </form>
  );
}
