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
  const [faseSelecionada, setFaseSelecionada] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [liberaBotaoFase, setLiberaBotaoFase] = useState(false);

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

  const atualizarProgresso = (id) => {

    axios
      .patch(`http://localhost:5000/tarefas/${id}`, { status: "Concluida" })
      .then((response) => {
        console.log("Status atualizado:", response.data);
      })
      .catch((error) => console.error("Erro ao atualizar:", error));
    window.location.reload();
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(SearchName.toLowerCase())
  );

  const alternaFase = (taskId, fase) => {
    setFaseSelecionada(fase);
    verificaFaseConcluida(taskId, fase);

  };

  const toggleExpandirTask = (taskId) => {
    setFaseSelecionada(0);
    verificaFaseConcluida(taskId, 0);
    if (TaskExpandida === taskId) {
      setTaskExpandida(null);
    } else {
      setTaskExpandida(taskId);
    }
  };

  const toggleExpandirSubTask = (taskId) => {
    setSelectedFile(null);
    if (TaskExpandida === taskId) {
      setSubTaskExpandida(null);
    } else {
      setSubTaskExpandida(taskId);
    }
  };

  const finalizaFase = (taskId, faseIndex) => {
    axios
      .get(`http://localhost:5000/tarefas/${taskId}`)
      .then((response) => {
        const task = response.data;

        const updatedFases = task.fases.map((fase, index) => {
          if (index === faseIndex) {
            return { ...fase, status: true };
          }
          return fase;
        });
        return axios.patch(`http://localhost:5000/tarefas/${taskId}`, {
          fases: updatedFases,
        });
        
      })
      .then(() => {
        if (faseIndex = 4) {
          atualizarProgresso(taskId)
        }
          window.location.reload();
        
      })
      .catch((error) => {
        console.error("Erro ao atualizar fase:", error);
        alert("Erro ao atualizar o status da fase!");
      });
  };

  const verificaFaseConcluida = async (taskId, faseIndex) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/tarefas/${taskId}`
      );
      const fase = response.data.fases[faseIndex];

      const todasConcluidas = fase.dependencias.every(
        (dependencia) => dependencia.status === true
      );

      if (todasConcluidas) {
        setLiberaBotaoFase(true);
      } else {
        setLiberaBotaoFase(false);
      }

      return todasConcluidas;
    } catch (error) {
      console.error("Erro na verificação:", error);
      return false;
    }
  };

  const finalizaSubTask = async (taskId, arquivo, subTaskId) => {
    if (!arquivo) {
      return alert("Para concluir a tarefa, é necessário atribuir um arquivo!");
    }

    try {
      // 1. Buscar a tarefa atual
      const response = await axios.get(
        `http://localhost:5000/tarefas/${taskId}`
      );
      const task = response.data;

      // 2. Calcular o valor percentual de cada dependência
      const totalDependencias = task.fases.reduce(
        (total, fase) => total + fase.dependencias.length,
        0
      );
      const valorPorDependencia = 100 / totalDependencias;

      // 3. Atualizar as fases e calcular novo progresso
      let updatedFases = task.fases.map((fase) => ({
        ...fase,
        dependencias: fase.dependencias.map((dependencia) =>
          dependencia.id === subTaskId
            ? { ...dependencia, status: true, arquivo }
            : dependencia
        ),
      }));

      // 4. Calcular novo progresso
      const novasConcluidas = updatedFases.reduce(
        (total, fase) =>
          total + fase.dependencias.filter((d) => d.status).length,
        0
      );
      const novoProgresso = Math.min(
        100,
        Math.round(novasConcluidas * valorPorDependencia)
      );

      // 5. Enviar atualização
      await axios.patch(`http://localhost:5000/tarefas/${taskId}`, {
        fases: updatedFases,
        progresso: novoProgresso,
      });

      // 6. Verificar se fase foi concluída e recarregar
      await verificaFaseConcluida(taskId, faseSelecionada);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar a tarefa");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePreview = (file) => {
    if (!selectedFile) {
      alert("Nenhum arquivo selecionado para visualização!");
      return;
    }
    window.open(previewImage, "_blank");
  };

  const handleUpload = (taskId, subTaskId) => {
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo primeiro!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];

      // Primeiro buscamos a task completa
      axios
        .get(`http://localhost:5000/tarefas/${taskId}`)
        .then((response) => {
          const task = response.data;
          let updatedFases = [...task.fases];

          updatedFases = updatedFases.map((fase) => {
            const updatedDependencias = fase.dependencias.map((dependencia) => {
              if (dependencia.id === subTaskId) {
                return {
                  ...dependencia,
                  arquivo: base64String,
                };
              }
              return dependencia;
            });
            return { ...fase, dependencias: updatedDependencias };
          });

          return axios.patch(`http://localhost:5000/tarefas/${taskId}`, {
            fases: updatedFases,
          });
        })
        .then(() => {
          alert("Arquivo enviado e tarefa concluída com sucesso!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Erro ao enviar arquivo:", error);
          alert("Erro ao enviar arquivo!");
        });
    };
    reader.readAsDataURL(selectedFile);
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
                                className={`${
                                  faseSelecionada === 0 ? "ButtonActive" : ""
                                } ${
                                  task.fases[0].status ? "ButtonFinish" : ""
                                }`}
                                onClick={() => alternaFase(task.id, 0)}
                              >
                                FASE 1 - Planejamento
                              </button>
                              <button
                                className={`${
                                  faseSelecionada === 1 ? "ButtonActive" : ""
                                } ${
                                  !task.fases[0].status ? "ButtonDisabled" : ""
                                } ${
                                  task.fases[1].status ? "ButtonFinish" : ""
                                }`}
                                onClick={() => alternaFase(task.id, 1)}
                                disabled={task.fases[0].status === false}
                              >
                                FASE 2 - Projeto e Desenvolvimento do Produto
                              </button>
                              <button
                                className={`${
                                  faseSelecionada === 2 ? "ButtonActive" : ""
                                } ${
                                  !task.fases[1].status ? "ButtonDisabled" : ""
                                } ${
                                  task.fases[2].status ? "ButtonFinish" : ""
                                }`}
                                onClick={() => alternaFase(task.id, 2)}
                                disabled={task.fases[1].status === false}
                              >
                                FASE 3 - Projeto e Desenvolvimento do Processo
                              </button>
                              <button
                                className={`${
                                  faseSelecionada === 3 ? "ButtonActive" : ""
                                } ${
                                  !task.fases[2].status ? "ButtonDisabled" : ""
                                } ${
                                  task.fases[3].status ? "ButtonFinish" : ""
                                }`}
                                onClick={() => alternaFase(task.id, 3)}
                                disabled={task.fases[2].status === false}
                              >
                                FASE 4 - Validacao do Produto e do Processo
                              </button>
                              <button
                                className={`${
                                  faseSelecionada === 4 ? "ButtonActive" : ""
                                } ${
                                  !task.fases[3].status ? "ButtonDisabled" : ""
                                } ${
                                  task.fases[4].status ? "ButtonFinish" : ""
                                }`}
                                onClick={() => {
                                  alternaFase(task.id, 4);
                                }}
                                disabled={task.fases[3].status === false}
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
                                <th className="HighlightText">Prazo Limite</th>
                              </tr>

                              {task.fases[faseSelecionada].dependencias.map(
                                (subTask) => (
                                  <>
                                    <tr
                                      onClick={() =>
                                        toggleExpandirSubTask(subTask.id)
                                      }
                                      key={subTask.id}
                                      className="itemTable subTasks"
                                    >
                                      <td className="task">
                                        {subTask.nome.split(":")[0].trim()}
                                      </td>
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
                                      <td>20/12/2026</td>
                                    </tr>

                                    {SubTaskExpandida === subTask.id && (
                                      <tr className="expanded-row">
                                        <td colSpan="3">
                                          <div className="backgroundExpandedTask">
                                            <h3 className="HighlightText">
                                              Detalhes da Tarefa: "
                                              {subTask.nome
                                                .split(":")[0]
                                                .trim()}
                                              "
                                            </h3>
                                            <div className="infoTask">
                                              <p>
                                                <strong className="HighlightText">
                                                  Nome:
                                                </strong>{" "}
                                                {subTask.nome
                                                  .split(":")[0]
                                                  .trim()}
                                              </p>
                                              <p>
                                                <strong className="HighlightText">
                                                  Status:
                                                </strong>{" "}
                                                {subTask.status == true
                                                  ? "Finalizada"
                                                  : "Pendente"}
                                              </p>
                                              <p>
                                                <strong className="HighlightText">
                                                  Data Limite:
                                                </strong>{" "}
                                                {task.fim}
                                              </p>
                                            </div>
                                            {subTask.arquivo != "" ? (
                                              <div className="file-preview">
                                                <img
                                                  src={`data:image/png;base64,${subTask.arquivo}`}
                                                  alt="Visualizar Arquivo"
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() =>
                                                    setModalAberto(true)
                                                  }
                                                />

                                                {modalAberto && (
                                                  <div
                                                    className="fileModal"
                                                    onClick={() =>
                                                      setModalAberto(false)
                                                    }
                                                  >
                                                    <img
                                                      id="modalImage"
                                                      src={`data:image/png;base64,${subTask.arquivo}`}
                                                      onClick={(e) =>
                                                        e.stopPropagation()
                                                      }
                                                    />
                                                    <a
                                                      href={`data:image/png;base64,${subTask.arquivo}`}
                                                      download={`${subTask.nome
                                                        .split(":")[0]
                                                        .trim()}.png`}
                                                      id="download-button"
                                                      onClick={(e) =>
                                                        e.stopPropagation()
                                                      }
                                                    >
                                                      Fazer Download do Arquivo
                                                    </a>
                                                  </div>
                                                )}
                                              </div>
                                            ) : (
                                              <div className="file-preview">
                                                AINDA NENHUM ARQUIVO FOI ANEXADO
                                                A ESSA TAREFA
                                              </div>
                                            )}
                                            <div
                                              className="file-input-container"
                                              style={
                                                subTask.status
                                                  ? { display: "none" }
                                                  : {}
                                              }
                                            >
                                              <p className="HighlightText">
                                                UPLOAD DE ARQUIVO
                                              </p>
                                              <input
                                                type="file"
                                                onChange={handleFileChange}
                                                disabled={subTask.status}
                                                className={
                                                  subTask.status
                                                    ? "ButtonDisabled"
                                                    : ""
                                                }
                                              />
                                              <div
                                                className="file-actions"
                                                style={
                                                  !selectedFile
                                                    ? { display: "none" }
                                                    : {}
                                                }
                                              >
                                                <button onClick={handlePreview}>
                                                  Visualizar
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    handleUpload(
                                                      task.id,
                                                      subTask.id
                                                    )
                                                  }
                                                >
                                                  Enviar Arquivo
                                                </button>
                                              </div>
                                            </div>
                                            <button
                                              className="finishButton"
                                              onClick={() =>
                                                finalizaSubTask(
                                                  task.id,
                                                  subTask.arquivo,
                                                  subTask.id
                                                )
                                              }
                                              style={
                                                !subTask.arquivo ||
                                                subTask.status
                                                  ? { display: "none" }
                                                  : {}
                                              }
                                            >
                                              Concluir Tarefa
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                )
                              )}
                            </table>
                            <button
                              id="finalizaFaseButton"
                              onClick={() =>
                                finalizaFase(task.id, faseSelecionada)
                              }
                              style={
                                !liberaBotaoFase ||
                                task.fases[faseSelecionada].status
                                  ? { display: "none" }
                                  : {}
                              }
                            >
                              Concluir Fase
                            </button>
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
