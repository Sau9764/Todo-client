import React, { useState, useContext } from 'react'
import Login from './Login'
import Signup from './Signup'
import { LoginSignupContext } from './App'

function LoginSignUpScreen() {

    const { isLoggedIn, setisLoggedIn, setTodos } = useContext(LoginSignupContext)
    
    const [isSigninLogin, setSigninLogin] = useState(true)

    function toggleLoginSignin(e) {
        e.preventDefault()
        setSigninLogin(!isSigninLogin)
    }

    return (
        <div className="loginSignUp">
             
            {isSigninLogin 
                ? <Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} setTodos={setTodos} /> 
                : <Signup setSigninLogin={setSigninLogin}/>
            }
            <div className="login-signup-link">
                Goto {isSigninLogin 
                        ? <a href="" className="loginSignUpLink" onClick={toggleLoginSignin}>SignUp</a> 
                        :  <a href="" className="loginSignUpLink" onClick={toggleLoginSignin}>Login</a>
                    }
            </div>
        </div>
    )
}

export default LoginSignUpScreen
