import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'

// Componentes internos
import Navbar from '../components/Navbar';
import Input from '../components/Input';

// Folhas de estilo
import '../styles/NewTasks/NewTasks.css';



const NewTasks = () => {
    const [nameTask, setNameTask] = useState('');
    const [fimTask, setFimTask] = useState('');
  
    const handleSubmit = (e) => {
      const newTask = {
        name: nameTask,
        inicio: dayjs().format('YYYY-MM-DD'),
        fim: fimTask,
        status: 'Inativa',
        progresso: 0
    };

    axios.post('http://localhost:5000/tarefas', newTask)
      .then(response => {
        console.log('Dados enviados com sucesso:', response.data);
        alert('Tarefa enviada com sucesso!')
        setNameTask('');
        setDateTask('');
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:', error);
      });

    e.preventDefault(); 
  };

  return (
    <div className='Content'>
      <Navbar />
      <div className='BackgroundForm container'>
        <div className='Area'>
          <h1 className='HighlightText TitleArea'>Adicionar Tarefa</h1>
          <div className='AreaContent'>
            <form onSubmit={handleSubmit}>
                <div className='inputArea'>
                    <Input
                        label='Nome da Tarefa'
                        type='text'
                        name='name'
                        value={nameTask} 
                        onChange={(e) => setNameTask(e.target.value)}  
                        placeholder='Digite o nome da tarefa'
                    />
                    <Input
                        label='Prazo de Entrega'
                        type='date'
                        name='Fim'
                        value={fimTask} 
                        onChange={(e) => setFimTask(e.target.value)} 
                    />
                </div>
                <div className='footerForm'>
                    <button type='submit'>Adicionar</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTasks;
