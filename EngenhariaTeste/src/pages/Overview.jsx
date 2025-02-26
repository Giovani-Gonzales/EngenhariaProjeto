import React from 'react'

import Navbar from '../components/Navbar'
import InfoCards from '../components/InfoCards'

import '../styles/Overview/Overview.css'

const Overview = () => {
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
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='Concluida'>Concluida</td>
                <td className='NormalText'>100%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='emProgresso'>Em Progresso</td>
                <td className='NormalText'>100%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='naoIniciada'>Não Iniciada</td>
                <td className='NormalText'>100%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='Concluida'>Concluida</td>
                <td className='NormalText'>100%</td>
              </tr>
            </table>
          </div>

        </div>

      </div>
      <InfoCards/>
    </div>
  )
}

export default Overview