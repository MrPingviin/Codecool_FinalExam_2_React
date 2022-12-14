import "./Client.css";
import { useEffect, useState } from "react";

const Client = ({ dataContainer, name, isVaccinated }) => {
  const [isWaiting, setWaitingStatus] = useState(false);
  const [vac, setvac] = useState(isVaccinated);

  const toggleVacStat = () => {
    const vacStat = document.querySelector("#vacStat");
    const petName = document.querySelector("#petName");

    (vac) ? setvac("false") : setvac("true");

    const dataToSend = {
      name: `${petName.innerHTML}`,
      isVaccinated: `${vac}}`,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    console.log(dataToSend);
    setWaitingStatus(true);
    fetch("https://demoapi.com/api/vet/pets/", options)
      .then((res) => res.json())
      .then((data) => {
        data.success === true ? setWaitingStatus(false) : alert("Error!");
      });
  };
  return (
    <div className="Client">
      <span>
        Name: <span id="petName">{name}</span>
      </span>
      <span>
        isVaccinated: {isWaiting ? "..." : <span id="vacStat">{isVaccinated}</span>}
      </span>
      <button onClick={toggleVacStat}>Toggle</button>
    </div>
  );
};

export default Client;
