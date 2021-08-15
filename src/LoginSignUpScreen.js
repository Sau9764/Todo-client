import React, { useState } from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'

function LoginSignUpScreen({isLoggedIn, setisLoggedIn, setTodos, submit, handle, data, regeister, handleSignup, signInData}) {
    
    const [isSigninLogin, setSigninLogin] = useState(true)

    function toggleLoginSignin(e) { // Tiggle signup and login
        e.preventDefault()
        setSigninLogin(!isSigninLogin)
    }

    return (
        <div className="loginSignUp">
             
            {isSigninLogin 
                ? <Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} setTodos={setTodos} submit={submit} handle={handle} data={data} /> 
                : <Signup regeister={regeister} handleSignup={handleSignup} signInData={signInData} />
            }
            Goto {isSigninLogin 
                    ? <a href="#" className="loginSignUpLink" onClick={toggleLoginSignin}>SignUp</a> 
                    :  <a href="#" className="loginSignUpLink" onClick={toggleLoginSignin}>Login</a>
                }
        </div>
    )
}

export default LoginSignUpScreen
