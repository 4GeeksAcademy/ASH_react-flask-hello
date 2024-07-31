import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
		actions.getUserProfile()
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Hello User!</h1>
			{store.current_user && <div className="alert alert-danger">
				{`user email: ${store.current_user.email} / user is active: ${store.current_user.is_active}`}
			</div> }
		</div>
	);
};
