import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "../component/login-form";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<LoginForm />
		</div>
	);
};
