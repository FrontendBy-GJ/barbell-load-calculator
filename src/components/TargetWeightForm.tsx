import { FormEvent, useCallback } from "react";
import useWeightPlatesContext from "../hooks/useWeightPlatesContext";

export default function TargetWeightForm() {
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
      alert("Not enough weight plates available.");
      return;
    }

    let weight_plate_total = totalWeight - barWeight;
    let total = Number(weight_plate_total) + barWeight;
    let target_weight = percentageOfTotalWeight(percentage, total);
    target_weight = finalWeight(target_weight);

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

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 px-4">
      <div className="flex items-center gap-2">
        <label className="font-semibold" htmlFor="total_weight">
          Total Weight:
        </label>{" "}
        <input
          type="number"
          name="total_weight"
          id="total_weight"
          min={50}
          step={5}
          placeholder="225"
          value={totalWeight}
          onChange={(e) => setTotalWeight(Number(e.target.value))}
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
          className="rounded p-2"
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
        className="w-full rounded bg-blue-600 px-4 py-2 text-slate-50 shadow-lg active:bg-opacity-30"
      >
        Calculate
      </button>
    </form>
  );
}
