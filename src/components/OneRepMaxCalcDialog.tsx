import { useRef, useState } from "react";

export default function OneRepMaxCalcDialog() {
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [oneRepMax, setOneRepMax] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close1RMdialog = () => {
    dialogRef.current?.close();
    setTimeout(() => {
      setWeight(0);
      setReps(0);
      setOneRepMax(null);
    }, 500);
  };

  const handleCalculate = () => {
    if (weight > 0 && reps > 0) {
      setOneRepMax(weight * (1 + reps / 30));
    } else {
      setOneRepMax(null);
    }
  };

  const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

  return (
    <>
      <button
        aria-label="One Rep Max"
        onClick={() => dialogRef.current?.showModal()}
        className="fixed bottom-4 right-5 z-50 aspect-square w-12 rounded-full bg-blue-600 text-slate-50 shadow-md shadow-slate-900/50 transition hover:bg-blue-700 md:bottom-8 md:right-8"
      >
        1RM
      </button>

      <dialog ref={dialogRef} className="w-full max-w-md px-2 pt-4 sm:px-4">
        <header className="text-center">
          <h2 className="font-semibold">1 Rep Max Calculator</h2>
        </header>
        <form method="dialog" className="my-4">
          <div className="flex items-center gap-2">
            <label className="flex-1" htmlFor="weight">
              Weight Lifted (lbs):
            </label>
            <input
              type="number"
              inputMode="numeric"
              autoComplete="off"
              min={0}
              id="weight"
              value={weight || ""}
              onChange={(e) => {
                const value = e.target.value;
                setWeight(value === "" ? ("" as unknown as number) : +value);
              }}
              className="flex-1 rounded border-[0.5px] border-slate-900 p-2"
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <label className="flex-1" htmlFor="reps">
              Repetitions:
            </label>
            <input
              type="number"
              id="reps"
              inputMode="numeric"
              autoComplete="off"
              min={0}
              value={reps || ""}
              onChange={(e) => {
                const value = e.target.value;
                setReps(value === "" ? ("" as unknown as number) : +value);
              }}
              className="flex-1 rounded border-[0.5px] border-slate-900 p-2"
            />
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            disabled={weight <= 0 || reps <= 0}
            className="my-4 w-full rounded-md bg-blue-600 py-2 text-slate-50 transition hover:bg-blue-700 disabled:cursor-not-allowed"
          >
            Calculate
          </button>

          {oneRepMax && (
            <div>
              <h3 className="text-center">
                Your Estimated 1RM:{" "}
                <em className="font-semibold">
                  {oneRepMax?.toFixed(1).split(".")[1] === "0"
                    ? oneRepMax?.toFixed(0)
                    : oneRepMax?.toFixed(1)}{" "}
                  lbs
                </em>
              </h3>
              <table className="mt-2 w-full">
                <thead className="bg-blue-300">
                  <tr className="divide-x-2">
                    <th>Percentage</th>
                    <th>Weight (lbs)</th>
                    <th>Repetitions of 1RM</th>
                  </tr>
                </thead>
                <tbody>
                  {percentages.map((pct, i) => (
                    <tr key={pct} className="text-center even:bg-slate-200">
                      <td>{pct}%</td>
                      <td>
                        {(oneRepMax * (pct / 100)).toFixed(1).split(".")[1] ===
                        "0"
                          ? (oneRepMax * (pct / 100)).toFixed(0)
                          : (oneRepMax * (pct / 100)).toFixed(1)}
                      </td>
                      <td>{i === 0 ? 1 : i * 2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <footer>
            <button
              type="button"
              onClick={close1RMdialog}
              className="mt-4 cursor-pointer rounded-md bg-blue-600 px-6 py-2 text-slate-50 transition hover:bg-blue-700"
            >
              Close
            </button>
          </footer>
        </form>
      </dialog>
    </>
  );
}
