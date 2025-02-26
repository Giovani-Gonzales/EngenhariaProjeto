import React from 'react'

import '../styles/InfoCards/InfoCards.css'

const InfoCards = () => {
  return (
    <div className='Cardgroup'>
        <div className='Card'>
            <div className='CardHeader'>
                <h3 className='HighlightText'>Resta Pouco Tempo</h3>
            </div>

            <table className='table'>
              <tr>
                <th className='HighlightText'>Nome da Tarefa</th>
                <th className='HighlightText'>Tempo Restante</th>
                <th className='HighlightText'>Progresso (%)</th>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>100%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>100%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>100%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>100%</td>
              </tr>
            </table>
            
        
        </div>

        <div className='Card'>
            <div className='CardHeader'>
                <h3 className='HighlightText'>Adicionados Recentemente</h3>
            </div>

            <table className='table'>
              <tr>
                <th className='HighlightText'>Nome da Tarefa</th>
                <th className='HighlightText'>Inicio</th>
                <th className='HighlightText'>Progresso (%)</th>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>0%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>0%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>0%</td>
              </tr>
              <tr className='itemTable'>
                <td className='HighlightText task'>Tarefa</td>
                <td className='NormalText'>18/02/2025</td>
                <td className='NormalText'>0%</td>
              </tr>
            </table>
            
        
        </div>
    </div>
  )
}

export default InfoCards