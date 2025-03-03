import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';


import '../styles/InfoCards/InfoCards.css'

const InfoCards = () => {

  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:5000/tarefas')

    .then((response) => {
      setTasks(response.data)
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  const sortedByRecent = [...tasks].sort((a, b) => dayjs(b.inicio).isAfter(dayjs(a.inicio)) ? 1 : -1).slice(0, 4);
  const sortedByTimeLeft = [...tasks].sort((a, b) => dayjs(a.fim).diff(dayjs(a.inicio), 'day') - dayjs(b.fim).diff(dayjs(b.inicio), 'day')).slice(0, 4);



  return (
    <div className='Cardgroup'>
        <div className='Card'>
            <div className='CardHeader'>
                <h3 className='HighlightText'>Resta Pouco Tempo</h3>
            </div>

            <Link to="/all-tasks">
              <table className='table'>
                <tr>
                  <th className='HighlightText'>Nome da Tarefa</th>
                  <th className='HighlightText'>Tempo Restante</th>
                  <th className='HighlightText'>Progresso (%)</th>
                </tr>
                {sortedByTimeLeft.map ((task) => 
                
                  <tr key={task.id} className='itemTable'>
                    <td className='HighlightText task'>{task.name}</td>
                    <td className='NormalText'>{dayjs(task.fim).diff(dayjs(task.inicio), "day")} Dias</td>
                    <td className='NormalText'>{task.progresso}%</td>
                  </tr>
                )}
              </table>
            </Link>
        </div>

        

        <div className='Card'>
            <div className='CardHeader'>
                <h3 className='HighlightText'>Adicionados Recentemente</h3>
            </div>

            <Link to="/all-tasks">      
              <table className='table'>
                <tr>
                  <th className='HighlightText'>Nome da Tarefa</th>
                  <th className='HighlightText'>Inicio</th>
                  <th className='HighlightText'>Progresso (%)</th>
                </tr>
                {sortedByRecent.map ((task) => 
                  <tr key={task.id} className='itemTable'>
                    <td className='HighlightText task'>{task.name}</td>
                    <td className='NormalText'>{task.inicio}</td>
                    <td className='NormalText'>{task.progresso}%</td>
                  </tr>
                )}
              </table>
            </Link>
            
        
        </div>
    </div>
  )
}

export default InfoCards