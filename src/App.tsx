import Footer from "./components/Footer";
import Header from "./components/header/Header";
import TargetWeightForm from "./components/TargetWeightForm";
import WeightPlateInventory from "./components/WeightPlateInventory";
import WeightPlates from "./components/WeightPlates";
import { WeightPlateContextProvider } from "./context/WeightPlateContext";

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-clr)]">
      <Header />

      <WeightPlateContextProvider>
        <main className="max-w-7xl px-4 pb-10 md:mx-auto md:px-8">
          <div className="mt-6 flex flex-col rounded border-2 border-blue-600 md:flex-row">
            <div className="md:min-w-80 md:max-w-80 md:border-r-2 md:border-blue-600">
              <WeightPlateInventory />
              <hr
                aria-hidden="true"
                className="mx-auto h-0.5 w-[95%] rounded bg-slate-300"
              />
              <div className="w-full py-4">
                <TargetWeightForm />
              </div>
            </div>
            <WeightPlates />
          </div>
        </main>
      </WeightPlateContextProvider>
      <Footer />
    </div>
  );
}

export default App;
