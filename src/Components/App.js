import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../css/App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import DashboardScreen from './DashboardScreen'
import LoginSignUpScreen from './LoginSignUpScreen'

export const LoginSignupContext = React.createContext()
export const DashboardContext = React.createContext()

function App() {

  const [todos, setTodos] = useState([])
  const [editText, setEditText] = useState({id: "", text: ""})
  const [newText, setnewText] = useState("")

  const [isLoggedIn, setisLoggedIn] = useState(true)
  const [isEditTodo, setEditTodo] = useState(false)
  const [addTodo, setAddTodo] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  const loginSignupContextData = {
    isLoggedIn, 
    setisLoggedIn, 
    setTodos
  }

  const dashboardContextData = {
    showAdd,
    handleCloseAdd,
    handleShowAdd,
    logout,
    todos,
    Add,
    setnewText,
    deleteTodo,  
    editText, 
    setEditText, 
    change,
    showEdit, 
    handleShowEdit,
    handleCloseEdit
  }

  function handleCloseAdd() {
    setShowAdd(false)
  }

  function handleShowAdd(e) {
    setShowAdd(true)
    setnewText( e.target.getAttribute('add-text'))
  }

  function handleCloseEdit() {
    setShowEdit(false)
    setEditText({id: "", text: ""})
  }

  function handleShowEdit(e) {
    setShowEdit(true)
    setEditText({id: e.target.getAttribute('edit-key'), text: e.target.getAttribute('edit-text')})
  }

  function logout(e) { // Logout
    e.preventDefault()
    if(isLoggedIn) setisLoggedIn(!isLoggedIn)
    localStorage.removeItem('dataStorage')
  }
  
  async function Add(e){
    e.preventDefault()
    const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
    if(dataObj.isLoggedIn === true){
      try {
        await Axios.post('http://localhost:5000/api/new', {text: newText}, { headers: {
          Authorization: `token ${dataObj.token}`
        }})
        try {
          let getTodos = await Axios.get('http://localhost:5000/api/all', { headers: { Authorization: `token ${dataObj.token}`}})
          setTodos(getTodos.data.data)
          alert("Successfully Added")
        }catch(error) {
          localStorage.removeItem('dataStorage')
          if (error.response) {
            alert(error.response.status + " " + error.response.data.msg)
          }else {
            console.log('Error ' + error.message)
          }
        }
        handleCloseAdd()
      }catch(error){
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        } else {
          console.log('Error ' + error.message);
        }
      }
    }else{
      localStorage.removeItem('dataStorage')
      if(addTodo) setAddTodo(!addTodo)
      if(isLoggedIn) setisLoggedIn(!isLoggedIn) 
    }
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
        setTodos(todos.map(ele => {
          if(ele.id !== editText.id) return ele
          else return editText
        }))
        handleCloseEdit()
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
  
  async function deleteTodo(e){ // Delete Todo
    e.preventDefault() 
    const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
    try{
      let res = await Axios.delete(`http://localhost:5000/api/delete/${e.target.getAttribute('del-key')}`, { headers: {
        Authorization: `token ${dataObj.token}`
      }})
      alert(res.data.msg)
      setTodos(todos.filter(ele => {
        return ele.id !== e.target.getAttribute('del-key')
      }))
    }catch(error){
      if (error.response) {
        alert(error.response.status + " " + error.response.data.msg)
      } else {
        console.log('Error ' + error.message);
      }
    }
  }

  // usefEffect Todos

  useEffect(() => {
    async function fetchUseEffectEditDatadata() {
      const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
      if(dataObj!== null && dataObj.isLoggedIn === true){
        try {
          let getTodos = await Axios.get('http://localhost:5000/api/all', { headers: { Authorization: `token ${dataObj.token}`}})
          setTodos(getTodos.data.data)
        }catch(error) {
          localStorage.removeItem('dataStorage')
          if (error.response) {
            console.log(error.response.status + " " + error.response.data.msg)
          }else {
            console.log('Error ' + error.message)
          }
        }
      }else{
        localStorage.removeItem('dataStorage')
        setisLoggedIn(i => (i === true ? false : false)) 
      }
    }
    fetchUseEffectEditDatadata()
  }, [editText.id])

  useEffect(() => {
    async function fetchUseEffectReloadData() {
      const dataObj = JSON.parse(localStorage.getItem('dataStorage'))
      const now = new Date()
      if(dataObj !== null ){
        if (now.getTime() > dataObj.expiry) {
          localStorage.removeItem('dataStorage')
        }else{
          try{
            let res = await Axios.get('http://localhost:5000/auth/callback', { headers: {
              Authorization: `token ${dataObj.token}`
            }})
            if(res.data.msg !== "Token Verified"){
              localStorage.removeItem('dataStorage')
            }else{
              setisLoggedIn(i => (i === false ? true : true))
              getAllData(dataObj)
            }
          }catch(error) {
            localStorage.removeItem('dataStorage')
            if (error.response) {
              alert(error.response.status + " " + error.response.data.msg)
            } else {
              console.log('Error ' + error.message)
            }
          }
        }
      }else{
        setisLoggedIn(false)
      }
    }
    fetchUseEffectReloadData()
  }, [])

  async function getAllData(dataObj) {
    try {
      let getTodos = await Axios.get('http://localhost:5000/api/all', { headers: { Authorization: `token ${dataObj.token}`}})
      setTodos(getTodos.data.data)
    }catch(error) {
      localStorage.removeItem('dataStorage')
      if (error.response) {
        alert(error.response.status + " " + error.response.data.msg)
      }else {
        console.log('Error ' + error.message)
      }
    }
  }

  return (
    <div className="container">

      {isLoggedIn 
        ? <DashboardContext.Provider value={dashboardContextData}>
            <DashboardScreen /> 
          </DashboardContext.Provider>

        : <LoginSignupContext.Provider value={loginSignupContextData}>
            <LoginSignUpScreen />
          </LoginSignupContext.Provider>
      }
      
    </div>
  );
}

export default App;

