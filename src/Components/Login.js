import React, {useState} from 'react'
import Axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

function Login({isLoggedIn, setisLoggedIn, setTodos}) {

    const [data, setData] = useState({ username: "", password: ""})

    function handle(e) { // Login
      const newData = {...data}
      newData[e.target.id] = e.target.value
      setData(newData)
    }

    async function submit(e){ // Login
      e.preventDefault()
      try {
        let res = await Axios.post(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/login`, { username: data.username, password: data.password})
        if(!isLoggedIn) setisLoggedIn(!isLoggedIn)

        console.log(res.data)
        
        fectchAllRows(res)

      }catch(error) {
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        } else {
          console.log('Error ' + error.message);
        }
      }
    }

    async function fectchAllRows(res){
      const now = new Date()
      const dataStorage = {
        username: data.username,
        isLoggedIn: true,
        token: res.data.id_token,
        expiry: now.getTime() + (3000000)
      }
      localStorage.setItem('dataStorage', JSON.stringify(dataStorage))

      console.log('Token info -> ' + res.data.id_token)
      
      try {
        let getTodos = await Axios.get(`https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/all`, { headers: { 'X-Amz-Security-Token': `${res.data.id_token}`}})
        try {
          console.log(getTodos.data[1].id)
          setTodos(getTodos.data)
        }catch(err){
          console.log('error while adding' + err)
        }
      }catch(error) {
        if (error.response) {
          alert(error.response.status + " " + error.response.data.msg)
        }else {
          console.log('Error ' + error.message);
        }
      }
    }

    return (
        <>
          <h1 className="loginSignup_title">Login</h1>
          <form onSubmit={(e) => submit(e)} className='login-form'>
            <label className="loginSignup_label">Enter Username</label>  
            <input 
              className="loginSignup_text"
              type="text"
              onChange={(e) => handle(e)}
              id="username"
              value={data.username}
              required
            /><br />
            <label className="loginSignup_label">Enter Password</label>  
            <input 
              className="loginSignup_text"
              type="password"
              onChange={(e) => handle(e)}
              id="password"
              value={data.password}
              required
            /><br />
            <button className="btn btn-primary">Submit</button>
          </form>
        </>
    )
}

export default Login