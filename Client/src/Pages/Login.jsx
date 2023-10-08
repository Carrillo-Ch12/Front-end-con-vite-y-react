import React, { Component, useState } from 'react'
import '../Components/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {
  const[values,setvalues]= useState({
    Usuaio:'',
    Password:''
  })
  return (

    <div className="Principal">
      <div className="form-group">
        <h2>Login</h2>
        <form action="" >
        <br />
        <label>Usuario: </label>
        <br />
        <input type="text"className="form-control"name="username"/>
        <br />
        <label>Contraseña: </label>
        <br />
        <input type="password"className="form-control"name="password"/>
        <br />
        <button type='submit'className="btn btn-primary" >Iniciar Sesión</button>
    
        <a href="/Registro"><button className="btn btn-primary" >Registrarme</button></a>
        </form>
      </div>
    </div>
  
    );
  
}
