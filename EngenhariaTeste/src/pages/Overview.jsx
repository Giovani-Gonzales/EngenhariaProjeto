import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


import Navbar from '../components/Navbar'
import InfoCards from '../components/InfoCards'

import { FaCheck } from "react-icons/fa";


import '../styles/Overview/Overview.css'

const Overview = () => {

  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  const requisicaoAPI = () => {
    axios.get('http://localhost:5000/tarefas')

    .then((response) => {
      setTasks(response.data)
    })
    .catch(error => {
      setError(error)
    })
  }

  useEffect(() => {
    requisicaoAPI()
  }, [])

  //Limita a quantidade de itens que aparecem na lista de tarefas do overview
  const LimitedQuantityTasks = [...tasks].slice(0, 4);  


  const atualizarProgresso = (id, Novostatus) => {
    if (Novostatus = "Concluida") {
      axios.patch(`http://localhost:5000/tarefas/${id}`, { progresso: 100 })
      .then(response => {
        console.log("Status atualizado:", response.data)
      })
      .catch(error => console.error("Erro ao atualizar:", error));
    }

    axios.patch(`http://localhost:5000/tarefas/${id}`, { status: Novostatus })
      .then(response => {
        console.log("Status atualizado:", response.data)
      })
      .catch(error => console.error("Erro ao atualizar:", error));
    window.location.reload()
  };
  
 
  
  return (
    <div className='Content'>
      <Navbar/>
      <div className='Background container'>

        <div className='container Area'>
          <h1 className='HighlightText TitleArea'>Dashboard</h1>
          <iframe frameborder="0" allowFullScreen="true" src='https://app.powerbi.com' className='AreaContent'></iframe>
        </div>

        <div className='container Area'>
          <h1 className='HighlightText TitleArea'>Tarefas</h1>
          <div className='AreaContent'>
            <table className='table'>
              <tr>
                <th className='HighlightText'>Nome da Tarefa</th>
                <th className='HighlightText'>Inicio</th>
                <th className='HighlightText'>Status</th>
                <th className='HighlightText'>Progresso (%)</th>
                <th ></th>
              </tr>
              {LimitedQuantityTasks.map ((task) => 
                <>
                <tr key={task.id} className='itemTable'>
                  <td className='HighlightText task'>{task.name}</td>
                  <td className='NormalText'>{task.inicio}</td>
                  <td className={task.status}>{task.status}</td>
                  <td className='NormalText'>{task.progresso}%</td>
                  <td onClick={() => atualizarProgresso(task.id,"Concluida")} className='buttonColumn'>
                    <button>
                      <FaCheck/>
                      </button>
                  </td>
                </tr></>
              )}
            </table>
          </div>

        </div>

      </div>
      <InfoCards/>
    </div>
  )
}

export default Overview