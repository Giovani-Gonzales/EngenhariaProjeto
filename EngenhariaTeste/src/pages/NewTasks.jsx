import React, { useState, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import Input from "../components/Input";

import "../styles/NewTasks/NewTasks.css";

const NewTasks = () => {
  const [nameTask, setNameTask] = useState("");
  const [fimTask, setFimTask] = useState("");
  
  const handleSubmit = (e) => {
    const newTask = {
      name: nameTask,
      inicio: dayjs().format("YYYY-MM-DD"),
      fim: fimTask,
      status: "Inativa",
      progresso: 0,
      descricao: "",
      fases: [
        {
          id:"1",
          nome:"Planejamento",
          status: false,
          dependencias:[
            {
              id: "11",
              nome: "Liberação de Vendas: Assistente de Vendas",
              status: false,
              arquivo: ""
            },
            {
              id: "12",
              nome: "Solicitação de SAV: Assistente de Vendas",
              status: false,
              arquivo: ""
            },
            {
              id: "13",
              nome: "Avaliação dos Dados de Entrada: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "14",
              nome: "Definição da Equipe Multifuncional: Engenheiros/Supervisores",
              status: false,
              arquivo: ""
            },
            {
              id: "15",
              nome: "Análise Técnica Inicial: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "16",
              nome: "Definição de Requisitos do Cliente: Analista do SGI/Atendimento ao Cliente",
              status: false,
              arquivo: ""
            },
            {
              id: "17",
              nome: "Reunião de Abertura do APQP: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "18",
              nome: "Cronograma do APQP: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "19",
              nome: "Lista Preliminar de Materiais: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "110",
              nome: "Fluxograma Preliminar: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "111",
              nome: "Lista de Ferramental: Engenharia de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "112",
              nome: "Layout Preliminar: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "113",
              nome: "Cadastro do Produto no Banco de Dados: Comercial",
              status: false,
              arquivo: ""
            },
            {
              id: "114",
              nome: "Lista de Características Especiais: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "115",
              nome: "Lições Aprendidas: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "116",
              nome: "Plano de Teste para Validação do Produto: Técnico do Laboratório",
              status: false,
              arquivo: ""
            },
            {
              id: "117",
              nome: "Análise Crítica da Documentação: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "118",
              nome: "Validação da Fase: Gerente/Supervisor de Engenharia/Qualidade",
              status: false,
              arquivo: ""
            }
          ]

        },
        {
          id:"2",
          nome:"Projeto e Desenvolvimento do Produto",
          status: false,
          dependencias:[
            {
              id: "21",
              nome: "FMEA de Produto (DFMEA): Equipe Multifuncional",
              status: false,
              arquivo: ""
            },
            {
              id: "22",
              nome: "Elaboração dos Desenhos de Componentes: Engenheiro ou Técnico de Produto/Projetista",
              status: false,
              arquivo: ""
            },
            {
              id: "23",
              nome: "Elaboração do DFM/DFA: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "24",
              nome: "Controle e Distribuição de Desenhos: Analista do SGI",
              status: false,
              arquivo: ""
            },
            {
              id: "25",
              nome: "Definição de Fornecedores: Comprador",
              status: false,
              arquivo: ""
            },
            {
              id: "26",
              nome: "Solicitação de Amostras e PPAP: EQF",
              status: false,
              arquivo: ""
            },
            {
              id: "27",
              nome: "Acompanhamento de Construção de Ferramental: EQF",
              status: false,
              arquivo: ""
            },
            {
              id: "28",
              nome: "Projeto de Ferramentas e Equipamentos: Engenheiro ou Técnico de Produto/Projetista",
              status: false,
              arquivo: ""
            },
            {
              id: "29",
              nome: "Validação de Projetos de Ferramentas e Equipamentos: Engenheiro ou Técnico de Processo/Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "210",
              nome: "Definição de Fornecedores de Ferramental: Comprador",
              status: false,
              arquivo: ""
            },
            {
              id: "212",
              nome: "Estudo Preliminar de Embalagem e Transporte: Engenheiro ou Técnico de Processo/Produto, Analista Logístico",
              status: false,
              arquivo: ""
            },
            {
              id: "213",
              nome: "Plano de Controle Protótipo: Engenheiro ou Analista da Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "214",
              nome: "Folha de Trabalho Padronizado (FTP) Protótipo: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "215",
              nome: "Projeto de Dispositivos/Ferramentas para Protótipos: Engenheiro ou Técnico de Produto/Projetista",
              status: false,
              arquivo: ""
            },
            {
              id: "216",
              nome: "Confecção de Ferramentas/Dispositivos para Protótipos: Modelador/Ferramenteiro",
              status: false,
              arquivo: ""
            },
            {
              id: "217",
              nome: "Aprovação de Protótipos: Engenheiro ou Técnico de Processo/Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "218",
              nome: "Solicitação de Nota Fiscal de Protótipos: Assistente de Vendas",
              status: false,
              arquivo: ""
            },
            {
              id: "219",
              nome: "Envio de Protótipos: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "220",
              nome: "Avaliação Ambiental e de Segurança: Analista ou Técnico de SGI/Engenharia ou Técnico de Segurança",
              status: false,
              arquivo: ""
            },
            {
              id: "221",
              nome: "Validação da Fase: Gerente de Manufatura/Supervisor de Engenharia/Qualidade",
              status: false,
              arquivo: ""
            }
          ]

        },
        {
          id:"3",
          nome:"Projeto e Desenvolvimento do Processo",
          status: false,
          dependencias:[
            {
              id: "31",
              nome: "FMEA de Processo (PFMEA): Equipe Multidisciplinar",
              status: false,
              arquivo: ""
            },
            {
              id: "32",
              nome: "Cadastro do IMDS: Técnico de Laboratório",
              status: false,
              arquivo: ""
            },
            {
              id: "33",
              nome: "Construção de Ferramentas e Dispositivos: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "34",
              nome: "Try-out de Ferramentas e Equipamentos: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "35",
              nome: "Dimensional de Ferramentas e Dispositivos: Engenheiro ou Técnico de Processo/Produto/Metrologista",
              status: false,
              arquivo: ""
            },
            {
              id: "36",
              nome: "Instrução de Texturização de Moldes: Preparador de Ferramentas",
              status: false,
              arquivo: ""
            },
            {
              id: "37",
              nome: "Inclusão de Equipamentos no Cronograma de Manutenção: Analista de Manutenção",
              status: false,
              arquivo: ""
            },
            {
              id: "38",
              nome: "Inclusão de Instrumentos de Medição no Sistema de Calibração: Analista de Metrologia",
              status: false,
              arquivo: ""
            },
            {
              id: "39",
              nome: "Plano de Inspeção de Layout: Técnico de Laboratório/Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "310",
              nome: "Elaboração do Layout das Instalações: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "311",
              nome: "Definição de Embalagens Interna e do Produto Acabado: Analista de Logística",
              status: false,
              arquivo: ""
            },
            {
              id: "312",
              nome: "Aquisição de Embalagens: Comprador",
              status: false,
              arquivo: ""
            },
            {
              id: "313",
              nome: "Elaboração de IOTS: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "314",
              nome: "Plano de Controle de Pré-Lançamento: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "315",
              nome: "Folha de Trabalho Padronizado (FTP) Pré-Lançamento: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "316",
              nome: "Elaboração de Critério de Aceitação: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "317",
              nome: "Plano de Controle de Recebimento de Componentes/Matérias-Primas: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "318",
              nome: "Plano de Controle de GP-12: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "319",
              nome: "Plano de Análise do Sistema de Medição (MSA): Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "320",
              nome: "Plano de Análise de Capabilidade do Processo: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "321",
              nome: "Treinamento da Equipe: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            }
          ]
        },
        {
          id:"4",
          nome:"Validacao do Produto e do Processo",
          status: false,
          dependencias:[
            {
              id: "41",
              nome: "Disponibilização de Embalagens: Analista de Logística",
              status: false,
              arquivo: ""
            },
            {
              id: "42",
              nome: "Corrida Piloto de Produção: Engenharia de Processo, Analista de Qualidade, etc.",
              status: false,
              arquivo: ""
            },
            {
              id: "43",
              nome: "Validação do Fluxograma do Processo: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "44",
              nome: "MSA e Dimensional do Produto: Analista da Qualidade/Metrologia",
              status: false,
              arquivo: ""
            },
            {
              id: "45",
              nome: "Estudo de Capabilidade do Processo: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "46",
              nome: "Atualização do DFMEA e PFMEA: Engenheiro ou Técnico de Processo",
              status: false,
              arquivo: ""
            },
            {
              id: "47",
              nome: "Elaboração de Instruções para Gages/Dispositivos: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "48",
              nome: "Revisão de Critério de Aceitação: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "49",
              nome: "Auditoria Interna do Projeto: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "410",
              nome: "Validação de Testes do Produto: Técnico do Laboratório",
              status: false,
              arquivo: ""
            },
            {
              id: "411",
              nome: "Validação da Embalagem: Analista de Logística",
              status: false,
              arquivo: ""
            },
            {
              id: "412",
              nome: "Aprovação do IMDS: Técnico ou Analista de Laboratório",
              status: false,
              arquivo: ""
            },
            {
              id: "413",
              nome: "Organização e Aprovação do PPAP: Analista de Qualidade",
              status: false,
              arquivo: ""
            }
          ]
        },
        {
          id:"5",
          nome:"Retroalimentacao e Acao Corretiva",
          status: false,
          dependencias:[
            {
              id: "51",
              nome: "Validação Ambiental e de Segurança: Analista de SGI e Técnico de Segurança",
              status: false,
              arquivo: ""
            },
            {
              id: "52",
              nome: "Planejamento de Ramp-up: Analista de Logística",
              status: false,
              arquivo: ""
            },
            {
              id: "53",
              nome: "Avaliação da Saúde Financeira do Projeto: Analista de Custos e Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "54",
              nome: "Avaliação de Indicadores GP-12: Analista de Qualidade",
              status: false,
              arquivo: ""
            },
            {
              id: "55",
              nome: "Inclusão do Produto em Cronogramas de Inspeção e Auditorias: Analista ou Técnico Responsável",
              status: false,
              arquivo: ""
            },
            {
              id: "56",
              nome: "Atualização do Banco de Lições Aprendidas: Engenheiro ou Técnico de Produto",
              status: false,
              arquivo: ""
            },
            {
              id: "57",
              nome: "Encerramento do Projeto: Supervisor de Engenharia",
              status: false,
              arquivo: ""
            }
          ]
        },

      ]

    };

    axios
      .post("http://localhost:5000/tarefas", newTask)
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
        alert("Tarefa enviada com sucesso!");
        setNameTask("");
        setDateTask("");
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });

    e.preventDefault();
  };

  return (
    <div className="Content">
      <Navbar />
      <div className="BackgroundForm container">
        <div className="Area">
          <h1 className="HighlightText TitleArea">Adicionar Tarefa</h1>
          <div className="AreaContent">
            <form onSubmit={handleSubmit}>
              <div className="inputArea">
                <Input
                  label="Nome da Tarefa"
                  type="text"
                  name="name"
                  value={nameTask}
                  onChange={(e) => setNameTask(e.target.value)}
                  placeholder="Digite o nome da tarefa"
                />
                <Input
                  label="Prazo de Entrega"
                  type="date"
                  name="Fim"
                  value={fimTask}
                  onChange={(e) => setFimTask(e.target.value)}
                />
              </div>
              <div className="footerForm">
                <button type="submit">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTasks;
