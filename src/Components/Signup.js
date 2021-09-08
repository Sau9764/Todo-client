import React, { useState } from 'react'
import Axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

function Signup({ setSigninLogin }) {

    const [signInData, setsignInData] = useState({username: "", password: "", confPass: ""})

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
            let res = await Axios.post(
                `https://9cuwgcqll5.execute-api.ap-south-1.amazonaws.com/dev/signup`, 
                {username: signInData.username, password: signInData.password}
              )
            // alert(res.data.msg)
            alert(res.data.msg)
            setSigninLogin(prev => (!prev))
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

    return (
        <>
            <h1 className="loginSignup_title"> Sign Up </h1>
            <form onSubmit={(e) => regeister(e)} className='login-form'>
                <label className="loginSignup_label">Enter Username</label>  
                <input 
                    className="loginSignup_text"
                    type="text"
                    onChange={(e) => handleSignup(e)}
                    id="username"
                    value={signInData.username}
                    required
                />
                <br />

                <label className="loginSignup_label">Enter Password</label>  
                <input 
                    className="loginSignup_text"
                    type="password"
                    onChange={(e) => handleSignup(e)}
                    id="password"
                    value={signInData.password}
                    required
                />
                <br />

                <label className="loginSignup_label">Conform Password</label>  
                <input 
                    className="loginSignup_text"
                    type="password"
                    onChange={(e) => handleSignup(e)}
                    id="confPass"
                    value={signInData.confPass}
                    required
                />
                <br />

                <button className="btn btn-success" >Register</button>
            </form>
        </>
    )
}

export default Signup
