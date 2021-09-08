import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../css/App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv'

import DashboardScreen from './DashboardScreen'
import LoginSignUpScreen from './LoginSignUpScreen'

dotenv.config();

export const LoginSignupContext = React.createContext()
export const DashboardContext = React.createContext()

function App() {

  const [todos, setTodos] = useState([])
  const [editText, setEditText] = useState({id: "", todo: ""})
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
    setEditText({id: "", todo: ""})
  }

  function handleShowEdit(e) {
    setShowEdit(true)
    setEditText({id: e.target.getAttribute('edit-key'), todo: e.target.getAttribute('edit-text')})
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
        let res = await Axios.post(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/`, {todo: newText}, { headers: {
          'X-Amz-Security-Token': `${dataObj.token}`
        }})
        try {
          let getTodos = await Axios.get(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/all`, { headers: { 'X-Amz-Security-Token': `${dataObj.token}`}})
          setTodos(getTodos.data)
          alert(res.data.msg)
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
        let res = await Axios.put(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/${editText.id}`, editText, { headers: {
          'X-Amz-Security-Token': `${dataObj.token}`
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
      let res = await Axios.delete(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/${e.target.getAttribute('del-key')}`, { headers: {
        'X-Amz-Security-Token': `${dataObj.token}`
      }})
      alert(res.data.msg)
      setTodos(todos.filter(ele => {
        return ele.id !== e.target.getAttribute('del-key')
      }))
      setEditText({id: 0, text: ""})
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
          let getTodos = await Axios.get(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/all`, { headers: { 'X-Amz-Security-Token': `${dataObj.token}`}})
          setTodos(getTodos.data)
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
            let res = await Axios.get(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/all`, { headers: {
              'X-Amz-Security-Token': `${dataObj.token}`
            }})
            if(res.data.msg !== "Token Verified"){
              // localStorage.removeItem('dataStorage')
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
      let getTodos = await Axios.get(`http://${process.env.REACT_APP_HOST}:8080/api/all`, { headers: { Authorization: `token ${dataObj.token}`}})
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

