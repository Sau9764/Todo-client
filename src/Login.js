import React from 'react'

function Login({ submit, handle, data }) {
    return (
        <>
        <h1>Login</h1>

        <form onSubmit={(e) => submit(e)} className='login-form'>
          <label>Enter Username</label>  
          <input 
            className="text"
            type="text"
            onChange={(e) => handle(e)}
            id="username"
            value={data.username}
            required
          />
          <br />

          <label>Enter Password</label>  
          <input 
            className="text"
            type="password"
            onChange={(e) => handle(e)}
            id="password"
            value={data.password}
            required
          />
          <br />

          <button className="btn" >Submit</button>
        </form>
        
          
        </>
    )
}

export default Login