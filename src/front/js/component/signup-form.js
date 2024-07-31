import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
	const { actions } = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (email == "" || password == ""){
            alert("Neither Email nor Password must be blank")
            return
        }
        let signed = actions.signup(email,password)
        if (signed) {
            navigate('/login')
            alert(`Sign up was successful. Welcome ${email}, please log in to continue to the site`)
            return
        }
        setPassword("")
        setEmail("")
        alert("Try again")
    }

	return (
		<div className="text-center mt-5">
            <form className="w-25 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>		
        </div>
	);
};
