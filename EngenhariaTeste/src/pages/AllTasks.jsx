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
  const [SubTaskExpandida, setSubTaskExpandida] = useState(null);
  const [faseSelecionada, setFaseSelecionada] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const toggleExpandirSubTask = (taskId) => {
    if (TaskExpandida === taskId) {
      setSubTaskExpandida(null);
    } else {
      setSubTaskExpandida(taskId);
    }
  };

  const finalizaSubTask = (id, Novostatus, arquivo) => {
    if (arquivo != "") {
      axios
        .patch(`http://localhost:5000/tarefas/${id}`, { status: Novostatus })
        .then((response) => {
          console.log("Status atualizado:", response.data);
        })
        .catch((error) => console.error("Erro ao atualizar:", error));
      window.location.reload();
    } else {
      alert(
        "Para concluir a tarefa, é necessário atribuir um arquivo a mesma!"
      );
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
                            <div className="buttonGroupStages">
                              <button
                                className={
                                  faseSelecionada === 0 ? "ButtonActive" : ""
                                }
                                onClick={() => setFaseSelecionada(0)}
                              >
                                FASE 1 - Planejamento
                              </button>
                              <button
                                className={
                                  faseSelecionada === 1 ? "ButtonActive" : ""
                                }
                                onClick={() => setFaseSelecionada(1)}
                              >
                                FASE 2 - Projeto e Desenvolvimento do Produto
                              </button>
                              <button
                                className={
                                  faseSelecionada === 2 ? "ButtonActive" : ""
                                }
                                onClick={() => setFaseSelecionada(2)}
                              >
                                FASE 3 - Projeto e Desenvolvimento do Processo
                              </button>
                              <button
                                className={
                                  faseSelecionada === 3 ? "ButtonActive" : ""
                                }
                                onClick={() => setFaseSelecionada(3)}
                              >
                                FASE 4 - Validacao do Produto e do Processo
                              </button>
                              <button
                                className={
                                  faseSelecionada === 4 ? "ButtonActive" : ""
                                }
                                onClick={() => setFaseSelecionada(4)}
                              >
                                FASE 5 - Retroalimentação e Ação Corretiva
                              </button>
                            </div>
                            <table className="table">
                              <tr>
                                <th className="HighlightText">
                                  Nome da Tarefa
                                </th>
                                <th className="HighlightText">Status</th>

                                <th></th>
                              </tr>

                              {task.fases[faseSelecionada].dependencias.map(
                                (subTask) => (
                                  <>
                                    <tr
                                      onClick={() =>
                                        toggleExpandirSubTask(subTask.id)
                                      }
                                      key={subTask.id}
                                      className="itemTable"
                                    >
                                      <td className="task">{subTask.nome}</td>
                                      <td
                                        className={
                                          subTask.status == true
                                            ? "Concluida"
                                            : "Pendente"
                                        }
                                      >
                                        {subTask.status == true
                                          ? "Finalizada"
                                          : "Pendente"}
                                      </td>
                                      <td className="buttonColumn">
                                        <button
                                          onClick={() =>
                                            finalizaSubTask(
                                              subTask.id,
                                              true,
                                              subTask.arquivo
                                            )
                                          }
                                        >
                                          <FaCheck />
                                        </button>
                                      </td>
                                    </tr>

                                    {SubTaskExpandida === subTask.id && (
                                      <tr className="expanded-row">
                                        <td colSpan="3">
                                          <div className="backgroundExpandedTask">
                                            {subTask.nome}
                                            <div className="file-input-container">
                                              <input
                                                type="file"
                                                accept="image/png, image/jpeg"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                )
                              )}
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
