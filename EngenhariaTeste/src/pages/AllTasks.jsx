import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Input from "../components/Input";

import { FaCheck } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

import "../styles/AllTasks/AllTasks.css";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [SearchName, setSearchName] = useState("");
  const [TaskExpandida, setTaskExpandida] = useState(null);

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

  useEffect(() => {
    setPage(1);
  }, [tasksPerPage]);

  const passaPagina = (pageNumber) => setPage(pageNumber);

  const atualizarProgresso = (id, Novostatus) => {
    if ((Novostatus = "Concluida")) {
      axios
        .patch(`http://localhost:5000/tarefas/${id}`, { progresso: 100 })
        .then((response) => {
          console.log("Status atualizado:", response.data);
        })
        .catch((error) => console.error("Erro ao atualizar:", error));
    }

    axios
      .patch(`http://localhost:5000/tarefas/${id}`, { status: Novostatus })
      .then((response) => {
        console.log("Status atualizado:", response.data);
      })
      .catch((error) => console.error("Erro ao atualizar:", error));
    window.location.reload();
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(SearchName.toLowerCase())
  );

  const toggleExpandirTask = (taskId) => {
    if (TaskExpandida === taskId) {
      setTaskExpandida(null);
    } else {
      setTaskExpandida(taskId);
    }
  };

  const tasksOrdemInvertida = [...filteredTasks].reverse();
  const indexUltimaTask = page * tasksPerPage;
  const indexPrimeiraTask = indexUltimaTask - tasksPerPage;
  const TasksAtuais = tasksOrdemInvertida.slice(
    indexPrimeiraTask,
    indexUltimaTask
  );

  return (
    <div className="Content">
      <Navbar />
      <div className="BackgroundTasks container">
        <div className="container Area">
          <h1 className="HighlightText TitleArea">Tarefas</h1>
          <div className="FiltersArea">
            <div className="SearchName">
              <Input
                label="NOME DA TAREFA:"
                type="text"
                name="name"
                placeholder="Digite o nome da tarefa"
                value={SearchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="StatusFilter">
              <label className="HighlightText">STATUS</label>
              <div className="buttonGroup">
                <button
                  className={tasksPerPage === 5 ? "ButtonActive" : ""}
                  onClick={() => setTasksPerPage(5)}
                >
                  INATIVA
                </button>
                <button
                  className={tasksPerPage === 10 ? "ButtonActive" : ""}
                  onClick={() => setTasksPerPage(10)}
                >
                  CONCLUIDA
                </button>
                <button
                  className={tasksPerPage === 50 ? "ButtonActive" : ""}
                  onClick={() => setTasksPerPage(50)}
                >
                  EM PROGRESSO
                </button>
              </div>
            </div>

            <div className="ProgressFilter">
              <label className="HighlightText">STATUS</label>
              <input type="range" name="progress" min="0" max="100" />
            </div>
            <div className="pagesQtd">
              <label className="HighlightText">TAREFAS P/ PÁGINA</label>
              <div className="buttonGroup">
                <button
                  className={tasksPerPage === 5 ? "ButtonActive" : ""}
                  onClick={() => setTasksPerPage(5)}
                >
                  5
                </button>
                <button
                  className={tasksPerPage === 10 ? "ButtonActive" : ""}
                  onClick={() => setTasksPerPage(10)}
                >
                  10
                </button>
                <button
                  className={tasksPerPage === 50 ? "ButtonActive" : ""}
                  onClick={() => setTasksPerPage(50)}
                >
                  50
                </button>
              </div>
            </div>
          </div>
          <div className="AreaContent">
            <table className="table">
              <tr>
                <th className="HighlightText">Nome da Tarefa</th>
                <th className="HighlightText">Inicio</th>
                <th className="HighlightText">Status</th>
                <th className="HighlightText">Progresso (%)</th>
                <th></th>
              </tr>
              {TasksAtuais.map((task) => (
                <>
                  <tr
                    key={task.id}
                    className="itemTable"
                    onClick={() => toggleExpandirTask(task.id)}
                  >
                    <td className="HighlightText task">{task.name}</td>
                    <td className="NormalText">{task.inicio}</td>
                    <td className={task.status}>{task.status}</td>
                    <td className="NormalText">{task.progresso}%</td>
                    <td
                      onClick={() => atualizarProgresso(task.id, "Concluida")}
                      className="buttonColumn"
                    >
                      <button>
                        <FaCheck />
                      </button>
                    </td>
                  </tr>

                  {TaskExpandida === task.id && (
                    <tr>
                      <td colSpan="5" className="TaskExpandida">
                        <div className="backgroundExpandedTask">
                          <h3 className="HighlightText">
                            Detalhes da Tarefa: {task.name}
                          </h3>
                          <div className="infoTask">
                            <p>
                              <strong className="HighlightText">Nome:</strong>{" "}
                              {task.name}
                            </p>
                            <p>
                              <strong className="HighlightText">Início:</strong>{" "}
                              {task.inicio}
                            </p>
                            <p>
                              <strong className="HighlightText">Status:</strong>{" "}
                              {task.status}
                            </p>
                            <p>
                              <strong className="HighlightText">
                                Progresso:
                              </strong>{" "}
                              {task.progresso}%
                            </p>
                            <p>
                              <strong className="HighlightText">
                                Descrição:
                              </strong>{" "}
                              {task.descricao || "N/A"}
                            </p>
                          </div>
                          <div className="subtasksArea">
                            <table className="table">
                              <tr>
                                <th className="HighlightText">
                                  Nome da Tarefa
                                </th>
                                <th className="HighlightText">Inicio</th>
                                <th className="HighlightText">Status</th>
                                <th className="HighlightText">Progresso (%)</th>
                                <th></th>
                              </tr>
                              {task.subTasks.map((subTask) => (
                                  <tr
                                    key={subTask.id}
                                    className="itemTable"
                                  >
                                    <td className="HighlightText task">
                                      {subTask.name}
                                    </td>
                                    <td className="NormalText">
                                      {subTask.inicio}
                                    </td>
                                    <td className={subTask.status}>
                                      {subTask.status}
                                    </td>
                                    <td className="NormalText">
                                      {subTask.progresso}%
                                    </td>
                                    <td
                                      onClick={() =>
                                        atualizarProgresso(subTask.id, "Concluida")
                                      }
                                      className="buttonColumn"
                                    >
                                      <button>
                                        <FaCheck />
                                      </button>
                                    </td>
                                  </tr>
                              ))}
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </table>

            <div className="pagination">
              <button
                onClick={() => passaPagina(page - 1)}
                disabled={page === 1}
              >
                <GrLinkPrevious />
              </button>
              <span className="pageAlt"> Página {page} </span>
              <button
                onClick={() => passaPagina(page + 1)}
                disabled={indexUltimaTask >= tasks.length}
              >
                <GrLinkNext />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllTasks;
