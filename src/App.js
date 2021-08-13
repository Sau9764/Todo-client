import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Todos from './Todos'
import Edit from './Edit'
import plus from './plus.png'
import AddTodo from './AddTodo'

function App() {

  const [data, setData] = useState({ username: "", password: ""})
  const [signInData, setsignInData] = useState({username: "", password: "", confPass: ""})
  const [todos, setTodos] = useState([])
  const [editText, setEditText] = useState({id: "", text: ""})
  const [newText, setnewText] = useState("")

  const [cred, setCred] = useState(true)
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [isLogout, setisLogout] = useState(false)
  const [isEditTodo, setEditTodo] = useState(false)
  const [addTodo, setAddTodo] = useState(false)

  // ----------------------------- login functions -----------------------------
  function handle(e) { // Login
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
  }
  async function submit(e){ // Login
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
  function toggle(e) { // Tiggle signup and login
    e.preventDefault()
    setCred(!cred)
  }
  function logout(e) { // Logout
    e.preventDefault()
    if(!isLogout) setisLogout(!isLogout)
    if(isLoggedIn) setisLoggedIn(!isLoggedIn)
    localStorage.removeItem('dataStorage')
    // window.location.reload();
  }

  // ----------------------------- SignUp functions -----------------------------
  function handleSignup(e){ // SignUp
    const newData = {...signInData}
    newData[e.target.id] = e.target.value
    setsignInData(newData)
  }
  async function regeister(e) { // Sign Up
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

  // ----------------------------- Add todo functions -----------------------------
  function handleAdd(e) { // Add Todo
    setnewText(e.target.value)
  }
  function addToggle(e){ // Add toggle
    setAddTodo(!addTodo) 
    console.log("clicked" + addTodo)
  }
  async function Add(e){
    e.preventDefault()
    const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
    if(dataObj.isLoggedIn === true){
      try {
        let res = await Axios.post('http://localhost:5000/api/new', {text: newText}, { headers: {
          Authorization: `token ${dataObj.token}`
        }})

        try {
          let getTodos = await Axios.get('http://localhost:5000/api/all', { headers: { Authorization: `token ${dataObj.token}`}})
          setTodos(getTodos.data.data)
          // console.log(getTodos.data.data);
          alert("Successfully Added")
        }catch(error) {
          localStorage.removeItem('dataStorage')
          if (error.response) {
            alert(error.response.status + " " + error.response.data.msg)
          }else {
            console.log('Error ' + error.message)
          }
        }
        
        
      }catch(error){
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        } else {
          console.log('Error ' + error.message);
        }
      }
      setAddTodo(!addTodo)
    }else{
      localStorage.removeItem('dataStorage')
      if(addTodo) setAddTodo(!addTodo)
      if(isLoggedIn) setisLoggedIn(!isLoggedIn) 
    }
  }

  // ----------------------------- Edit todo functions -----------------------------
  function handleEdit(e){ // Edit text
    const obj = {...editText}
    obj[e.target.id] = e.target.value;
    setEditText(obj)
  }
  async function editTodo(e) { // Edit component display
    if(!isEditTodo) setEditTodo(!isEditTodo)
    const obj = {...editText}
    obj.id = e.target.getAttribute('edit-key');
    obj.text = e.target.getAttribute('edit-text')
    setEditText(obj)
  }
  async function change(e) { // Edit todo
    e.preventDefault()
    const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
    if(dataObj.isLoggedIn === true){
      try {
        let res = await Axios.put('http://localhost:5000/api/edit', editText, { headers: {
          Authorization: `token ${dataObj.token}`
        }})
        alert(res.data.msg)
        // const todosNew = [...todos]
        setTodos(todos.map(ele => {
          if(ele.id != editText.id) return ele
          else return editText
        }))
        if(isEditTodo) setEditTodo(!isEditTodo)
      }catch(error) {
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        } else {
          console.log('Error ' + error.message);
        }
      }
    }else{
      localStorage.removeItem('dataStorage')
      if(isEditTodo) setEditTodo(!isEditTodo)
      if(isLoggedIn) setisLoggedIn(!isLoggedIn) 
    }
  }
  
  // ----------------------------- Delete todo functions -----------------------------
  async function deleteTodo(e){ // Delete Todo
    e.preventDefault() 
    const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
    try{
      let res = await Axios.delete(`http://localhost:5000/api/delete/${e.target.getAttribute('del-key')}`, { headers: {
        Authorization: `token ${dataObj.token}`
      }})
      alert(res.data.msg)
      setTodos(todos.filter(ele => {
        return ele.id != e.target.getAttribute('del-key')
      }))
    }catch(error){
      if (error.response) {
        alert(error.response.status + " " + error.response.data.msg)
      } else {
        console.log('Error ' + error.message);
      }
    }
  }

  // useEffect(() => {
  //   const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
  //   const now = new Date()
  //   if(dataObj != null ){
  //     if (now.getTime() > dataObj.expiry) {
  //       localStorage.removeItem('dataStorage')
  //       if(isLoggedIn) alert("session expired.")
  //     }else{
  //       try{
  //         let res = Axios.get('http://localhost:5000/callback', {headers: { Authorization: `token ${dataObj.token}`}})
  //         if(res.data.msg !== "Token Verified"){
  //           localStorage.removeItem('dataStorage')
  //         }else{
  //           if(!isLoggedIn) setisLoggedIn(!isLoggedIn)
  //         }
  //       }catch(error) {
  //         localStorage.removeItem('dataStorage')
  //         if (error.response) {
  //           alert(error.response.status + " " + error.response.data.msg)
  //         } else {
  //           console.log('Error ' + error.message)
  //         }
  //       }
  //     }
  //   }
  // })

  return (
    <>
      <div className="container">
        {
          isLoggedIn ?
            <div className="content">
              {
                isEditTodo ? 
                  <Edit editText={editText} change={change} handleEdit={handleEdit} /> 
                : 
                  addTodo ? <AddTodo Add={Add} newText={newText} handleAdd={handleAdd} />
                  :
                  <div>
                    <div>
                      <h1>Todo Tasks </h1>
                    </div>
                    <div className="addTodoContainer" onClick={addToggle}>
                      <div className="add">
                        <img src={plus} className="addTodo" />
                        <label> Add Todo </label>
                      </div>
                      <label className="logout" onClick={logout}> Logout </label>
                    </div>
                    <hr />
                    <Todos className="todoContainer" todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
                  </div>
              }
            </div>
          :
            <div className="cred">
              <a href="#" className="link" onClick={toggle}>SignUp</a> / <a href="#" className="link" onClick={toggle}>Login</a>
              {cred ? <Login submit={submit} handle={handle} data={data} /> 
                    : <Signup regeister={regeister} handleSignup={handleSignup} signInData={signInData} />
              }
           </div>
        }
      </div>
    </>
  );
}

export default App;