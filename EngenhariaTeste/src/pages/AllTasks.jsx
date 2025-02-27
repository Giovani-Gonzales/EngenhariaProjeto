import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


import Navbar from '../components/Navbar'

import { FaCheck } from "react-icons/fa";
// Folhas de estilo
import '../styles/NewTasks/NewTasks.css';

const AllTasks = () => {
    const [tasks, setTasks] = useState([])


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

  return (
    <div className='Content'>
      <Navbar />
      <div className='BackgroundForm container'>
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
                        {tasks.map ((task) => 
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
                                    </tr>
                                </>
                            )}
                    </table>
                </div>

            </div>
        </div>
    </div>
  );
};
export default AllTasks