import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import Navbar from "../components/Navbar";
import InfoCards from "../components/InfoCards";

import { FaCheck } from "react-icons/fa";

import "../styles/Overview/Overview.css";

const Overview = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const requisicaoAPI = () => {
    axios
      .get("http://localhost:5000/tarefas")

      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    requisicaoAPI();
  }, []);

  const LimitedQuantityTasks = [...tasks].slice(0, 4);

  return (
    <div className="Content">
      <Navbar />
      <div className="Background container">
        <div className="container Area">
          <h1 className="HighlightText TitleArea">Dashboard</h1>
          <iframe
            frameborder="0"
            allowFullScreen="true"
            src="https://app.powerbi.com"
            className="AreaContent"
          ></iframe>
        </div>

        <div className="container Area">
          <h1 className="HighlightText TitleArea">Tarefas</h1>
          <div className="AreaContent">
            <Link to="/all-tasks">
              <table className="table">
                <tr>
                  <th className="HighlightText">Nome da Tarefa</th>
                  <th className="HighlightText">Inicio</th>
                  <th className="HighlightText">Status</th>
                  <th className="HighlightText">Progresso (%)</th>
                  <th></th>
                </tr>
                {LimitedQuantityTasks.map((task) => (
                  <>
                      <tr key={task.id} className="itemTable">
                        <td className="HighlightText task">{task.name}</td>
                        <td className="NormalText">{task.inicio}</td>
                        <td className={task.status}>{task.status}</td>
                        <td className="NormalText">{task.progresso}%</td>
                      </tr>
                  </>
                ))}
              </table>
            </Link>
          </div>
        </div>
      </div>
      <InfoCards />
    </div>
  );
};

export default Overview;
