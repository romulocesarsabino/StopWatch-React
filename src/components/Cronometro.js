import { useState } from "react";
import "./Cronometro.css";

let [milisegundos, segundos, minutos, horas, dias] = [0, 0, 0, 0, 0];
let [dMilisegundos, dSegundos, dMinutos, dHoras, dDias] = ["", "", "", "", ""];
let interval = null;

const Cronometro = () => {
  const [timer, setTimer] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    miliseconds: "000",
  });
  function ActualizeDisplay() {
    dias < 10 ? (dDias = "0" + dias) : (dDias = dias);
    horas < 10 ? (dHoras = "0" + horas) : (dHoras = horas);
    minutos < 10 ? (dMinutos = "0" + minutos) : (dMinutos = minutos);
    segundos < 10 ? (dSegundos = "0" + segundos) : (dSegundos = segundos);
    milisegundos < 100
      ? milisegundos < 10
        ? (dMilisegundos = "00" + milisegundos)
        : (dMilisegundos = "0" + milisegundos)
      : (dMilisegundos = milisegundos);

    setTimer({
      days: dDias,
      hours: dHoras,
      minutes: dMinutos,
      seconds: dSegundos,
      miliseconds: dMilisegundos,
    });
  }

  function timerFunction() {
    milisegundos += 10;
    if (milisegundos >= 1000) {
      segundos += 1;
      milisegundos = 0;
    }
    if (segundos >= 60) {
      minutos += 1;
      segundos = 0;
    }
    if (minutos >= 60) {
      horas += 1;
      minutos = 0;
    }
    if (horas >= 24) {
      dias += 1;
      horas = 0;
    }
    ActualizeDisplay();
  }

  function start() {
    if (interval) return;

    interval = setInterval(timerFunction, 10);
  }

  function stop() {
    clearInterval(interval);

    interval = null;
  }

  function reset() {
    stop();
    setTimer({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      miliseconds: "000",
    });
    [milisegundos, segundos, minutos, horas, dias] = [0, 0, 0, 0, 0];
  }

  return (
    <div>
      <div className="display">
        <span className="timerCell">{timer.days}</span>:
        <span className="timerCell">{timer.hours}</span>:
        <span className="timerCell">{timer.minutes}</span>:
        <span className="timerCell">{timer.seconds}</span>:
        <span className="timerCell">{timer.miliseconds}</span>
      </div>
      <div className="buttons">
        <input type="button" value="Start" onClick={start} />
        <input type="button" value="Stop" onClick={stop} />
        <input type="button" value="Reset" onClick={reset} />
      </div>
    </div>
  );
};

export default Cronometro;
