import React from 'react'
import { Link } from 'react-router-dom';

import dwLogo from '../assets/LogoDW.jpeg'

import '../styles/Navbar/Navbar.css'


import { FaEye } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className='navBackground'>
        <div className='navHeader'>
            <img className='dwLogo' src={dwLogo}/>
            <div className='UserText'>
              <a className='HighlightText'>Bem Vindo!</a>
              <a className='NormalText'>Lorem Ipsum</a>
            </div>
        </div>

        <div className='navBody'>
          <Link to="/" className='navItem'>
            <FaEye className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Visão Geral</a>
          </Link>

          <div className='navItem'>
            <AiFillDashboard className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Dashboard</a>
          </div>

          <Link to="/all-tasks" className='navItem'>
            <FaTasks className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Todos os Projetos</a>
          </Link>

          <Link to='/new-tasks' className='navItem'>
            <FaCirclePlus className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Adicionar Tarefa</a>
          </Link>
        </div>
    </div>
  )
}

export default Navbar