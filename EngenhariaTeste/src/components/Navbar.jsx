import React from 'react'

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
          <div className='navItem'>
            <FaEye className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Visão Geral</a>
          </div>

          <div className='navItem'>
            <AiFillDashboard className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Dashboard</a>
          </div>

          <div className='navItem'>
            <FaTasks className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Todos os Projetos</a>
          </div>

          <div className='navItem'>
            <FaCirclePlus className='HighlightText ItemIcon'/>
            <a className='HighlightText'>Adicionar Tarefa</a>
          </div>
        </div>
    </div>
  )
}

export default Navbar