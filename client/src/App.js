import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  // the states for the fields
  const [date, Setdate] = useState();
  const [sourceCurrency, setsourceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  const [sourceCurrencyName, setsourceCurrencyName] = useState("");
  const [targetCurrencyName, settargetCurrencyName] = useState("");
  const [pressed, setPressed] = useState(false);

  // onSubmit
  const getTheTargetAmount = async (event) => {
    event.preventDefault();
    setPressed(true);
    // send the data
    try {
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      const { amountInTargetCurrency } = responce.data;
      //currencyNames
      const { sourceCurrencyName, targetCurrencyName } = responce.data;
      setsourceCurrencyName(sourceCurrencyName);
      settargetCurrencyName(targetCurrencyName);
      setamountInTargetCurrency(amountInTargetCurrency);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className=" text-5xl font-black flex items-center justify-normal text-green-500">
        Convert Your Currencies Today
      </h1>
      <p className=" font-sm opacity-40 py-6">
        Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates. Whether
        you're planning a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.
      </p>
      <div className=" flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={getTheTargetAmount}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="date"
              >
                Date
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => Setdate(e.target.value)}
                type="date"
                name="date"
                id="date"
                placeholder="date.."
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="sourceCurrency"
              >
                Source Currency
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) =>
                  setsourceCurrency(e.target.value.toUpperCase())
                }
                type="text"
                name="sourceCurrency"
                id="sourceCurrency"
                placeholder="Source Currency..."
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="targetCurrency"
              >
                Target Currency
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) =>
                  settargetCurrency(e.target.value.toUpperCase())
                }
                type="text"
                name="targetCurrency"
                id="targetCurrency"
                placeholder="target Currency..."
              />
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="amountInSourceCurrency"
              >
                Amount in source currency
              </label>
              <input
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => setamountInSourceCurrency(e.target.value)}
                type="number"
                name="amountInSourceCurrency"
                id="amountInSourceCurrency"
                placeholder="Amount in source currency..."
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Get the target Currency
            </button>
          </form>
        </section>
        <h3 className=" flex items-center justify-start py-5 text-lg">
          {pressed ? (
            <div>
              <span className=" text-xl"> {amountInSourceCurrency}</span>{" "}
              {sourceCurrencyName} is equal to
              <span className=" text-xl font-bold text-green-400">
                {" "}
                {amountInTargetCurrency.toFixed(2)}
              </span>{" "}
              {targetCurrencyName}
            </div>
          ) : (
            ""
          )}
        </h3>
      </div>
    </div>
  );
}

export default App;
