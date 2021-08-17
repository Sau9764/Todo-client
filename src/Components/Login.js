import React, {useState} from 'react'
import Axios from 'axios'

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
        let res = await Axios.post("http://localhost:5000/auth/login", { username: data.username, password: data.password})
        if(!isLoggedIn) setisLoggedIn(!isLoggedIn)
        
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
      try {
        let getTodos = await Axios.get('http://localhost:5000/api/all', { headers: { Authorization: `token ${res.data.id_token}`}})
        setTodos(getTodos.data.data)
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