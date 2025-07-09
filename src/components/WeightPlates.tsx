import useWeightPlatesContext from "../hooks/useWeightPlatesContext";
import WeightPlate from "./weight-plate/WeightPlate";

export default function WeightPlates() {
  const { platesAvailable, platesNeeded, targetWeight } =
    useWeightPlatesContext();

  const totalWeightOfPlatesAvail = Object.entries(platesAvailable).reduce(
    (total, [weight, avail]) => total + Number(weight) * Number(avail),
    0,
  );

  return (
    <div className="my-auto flex h-full w-full flex-col items-center justify-center">
      {targetWeight ? (
        <span className="mt-4 text-center font-Bebas text-5xl md:text-6xl">
          {targetWeight} lbs
        </span>
      ) : (
        <p className="mt-4 text-center font-Bebas text-5xl md:text-6xl">
          Available: {totalWeightOfPlatesAvail}lbs
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center -space-y-16 px-8 py-10 lg:-space-x-16 lg:space-y-0 lg:px-20">
        {platesNeeded.size === 0 &&
          Object.entries(platesAvailable)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([weight, avail]) => {
              if (avail === 0 || avail === ("" as unknown)) {
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
