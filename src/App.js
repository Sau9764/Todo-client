import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Todos from './Todos'

function App() {

  const [data, setData] = useState({ username: "", password: ""})
  const [signInData, setsignInData] = useState({username: "", password: "", confPass: ""})
  const [todos, setTodos] = useState([])

  const [cred, setCred] = useState(true)
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [isLogout, setisLogout] = useState(false)
  
  function handle(e) {
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  function handleSignup(e){
    const newData = {...signInData}
    newData[e.target.id] = e.target.value
    setsignInData(newData)
  }

  async function regeister(e) {
    e.preventDefault()
    if(signInData.password !== signInData.confPass){
      alert("Password and conform password should be same")
    }else{
      try {      
        let res = await Axios.post("http://localhost:5000/auth/sign-up", {username: signInData.username, password: signInData.password})
        alert(res.data.msg)
        window.location.reload();
      }catch(error) {
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error ' + error.message);
        }
      }
    }
  }

  async function submit(e){
    e.preventDefault()
    try {
      let res = await Axios.post("http://localhost:5000/auth/login", { username: data.username, password: data.password})
      if(!isLoggedIn) setisLoggedIn(!isLoggedIn)
      const now = new Date()
      const dataStorage = {
        username: data.username,
        isLoggedIn: true,
        token: res.data.id_token,
        expiry: now.getTime() + (3000000)
      }
      localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
      try {
        let getTodos = await Axios.get('http://localhost:5000/api/all', { headers: { Authorization: `token ${res.data.id_token}`}})
        setTodos(getTodos.data.data)
        console.log(getTodos.data.data);
      }catch(error) {
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        }else {
          console.log('Error ' + error.message);
        }
      }
    }catch(error) {
      if (error.response) {
        alert(error.response.status + " " + error.response.data.msg)
      } else {
        console.log('Error ' + error.message);
      }
    }
  }

  useEffect( async () => {
    const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
    const now = new Date()
    if(dataObj != null ){
      if (now.getTime() > dataObj.expiry || isLogout) {
        if(!isLogout) alert('Session Expired')
        localStorage.removeItem('dataStorage')
      }
    }
  })

  function logout(e) {
    e.preventDefault()
    if(!isLogout) setisLogout(!isLogout)
    localStorage.removeItem('dataStorage')
    window.location.reload();
  }

  function toggle(e) {
    e.preventDefault()
    setCred(!cred)
  }

  return (
    <>
      <div className="container">
        {
          isLoggedIn ?
            <div className="content">
              <h1>Todo Tasks</h1>
              <hr />
              <Todos todos={todos}/>
            </div>
          :
            <div className="cred">
              <a href="#" className="link" onClick={toggle}>SignUp</a> / <a href="#" className="link" onClick={toggle}>Login</a>
              
              {cred ? <Login 
                        submit={submit} 
                        handle={handle} 
                        data={data} 
                      /> 
                    : 
                      <Signup 
                        regeister={regeister} 
                        handleSignup={handleSignup} 
                        signInData={signInData} 
                      />
              }

            </div>
        }
       
      </div>
    </>

  );
}

export default App;