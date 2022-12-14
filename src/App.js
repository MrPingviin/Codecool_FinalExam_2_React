import React, { useEffect, useState } from "react";
import Client from "./components/Client";

const dataContainer = [];

const App = () => {
  const [searchLaunched, setSearchLaunched] = useState(false);

  const runSearch = async () => {
    const searchBar = document.querySelector("#searchBar");

    if (searchBar.value.length < 3) {
      alert("The keyword should be at least 3 character.");
      return null;
    }

    const fetchData = await fetch(
      "https://demoapi.com/api/vet/clients?search=AMIT-A-FELHASZN%C3%81L%C3%93-%C3%8DRT"
    );
    const data = await fetchData.json();

    dataContainer.push(data);
    console.log(data);
    return setSearchLaunched(true);
  };

  return (
    <div>
      <h1>Veterinarian admin - clients</h1>
      <input type="text" placeholder="Search" id="searchBar"></input>
      <button id="searchButton" onClick={runSearch}>
        Search
      </button>
      {searchLaunched
        ? dataContainer.map((item) => {
            return <Client name={item.name} isVaccinated={item.isVaccinated} />;
          })
        : null}
    </div>
  );
};

export default App;
