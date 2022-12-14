import "./Client.css";
import { useEffect, useState } from "react";

const Client = ({ dataContainer, name, isVaccinated }) => {
  const [isWaiting, setWaitingStatus] = useState(false);
  const [vac, setvac] = useState(isVaccinated);

  const toggleVacStat = () => {
    vac ? setvac(false) : setvac(true);

    for (let i = 0; i < dataContainer.length; i++) {
      if (dataContainer[i].name === name) {
        dataContainer[i].isVaccinated = vac;
      }
    }

    console.log(dataContainer)

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataContainer),
    };

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
        isVaccinated:{" "}
        {isWaiting ? (
          "..."
        ) : (
          <span id="vacStat">{isVaccinated ? "true" : "false"}</span>
        )}
      </span>
      <button onClick={toggleVacStat}>Toggle</button>
    </div>
  );
};

export default Client;
