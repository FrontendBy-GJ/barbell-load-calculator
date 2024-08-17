import useWeightPlatesContext from "../hooks/useWeightPlatesContext";
import WeightPlate from "./weight-plate/WeightPlate";

export default function WeightPlates() {
  let { platesAvailable, platesNeeded, targetWeight } =
    useWeightPlatesContext();

  return (
    <div className="my-auto flex h-full w-full flex-col">
      {targetWeight && (
        <span className="font-Protest text-center text-4xl md:text-5xl">
          {targetWeight} lbs
        </span>
      )}
      <div className="flex flex-wrap items-center justify-center -space-y-16 px-8 py-10 lg:-space-x-16 lg:space-y-0 lg:px-12">
        {platesNeeded.size === 0 &&
          Object.entries(platesAvailable)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([weight, avail]) => {
              if (avail === 0) {
                return null;
              }
              return (
                <WeightPlate
                  key={weight}
                  weight={Number(weight)}
                  amount={Number(avail)}
                />
              );
            })}
        {Array.from(platesNeeded.entries()).map(([weight, amount]) => (
          <WeightPlate key={weight} weight={weight} amount={amount} />
        ))}
      </div>
    </div>
  );
}
