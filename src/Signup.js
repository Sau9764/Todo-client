import React from 'react'

function Signup({ regeister, handleSignup, signInData }) {
    return (
        <>
            <h1> Sign Up </h1>
            <form onSubmit={(e) => regeister(e)} className='login-form'>
                <label>Enter Username</label>  
                <input 
                    className="text"
                    type="text"
                    onChange={(e) => handleSignup(e)}
                    id="username"
                    value={signInData.username}
                    required
                />
                <br />

                <label>Enter Password</label>  
                <input 
                    className="text"
                    type="password"
                    onChange={(e) => handleSignup(e)}
                    id="password"
                    value={signInData.password}
                    required
                />
                <br />

                <label>Conform Password</label>  
                <input 
                    className="text"
                    type="password"
                    onChange={(e) => handleSignup(e)}
                    id="confPass"
                    value={signInData.confPass}
                    required
                />
                <br />

                <button className="btn" >Register</button>
            </form>
        </>
    )
}

export default Signup
