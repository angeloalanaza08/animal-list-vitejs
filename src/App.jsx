import { useEffect, useState } from "react";
import "./app.css";

function App() {
  const { search, animals } = useAnimalSearch();

  return (
    <div className="place-content-center min-h-full font-['Poppins']">
      <main className="text-gray-50">
        <div className="place-content-center flex p-10 text-2xl font-bold tracking-wider">
          <h1 className="text-amber-500">LIST OF ANIMAL RECORDS</h1>
        </div>
        <div className="flex w-full place-content-center">
          <input
            type="text"
            placeholder="SEARCH FOR ANIMALS"
            onChange={(e) => search(e.target.value)}
            className="flex w-1/2 bg-slate-800 p-5 rounded-xl focus:ring-sky-500"
          />
        </div>
        <ul className="grid-cols-3 grid px-20 pt-10">
          {animals.map((animal) => (
            <Animal key={animal.id} {...animal} />
          ))}
          {animals.length === 0 && "No animals found"}
        </ul>
      </main>
    </div>
  );
}

// Dumb UI component
function Animal({ type, name, age }) {
  return (
    <ul>
      <li className="p-5 center border-2 border-sky-500 m-2 rounded-md text-center">
        <strong>{type}</strong> {name} ({age} years old)
      </li>
    </ul>
  );
}

// Custom Hook
function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  };

  return { search, animals };
}

export default App;
