import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p><Link to="/signup"><button type="button" className="btn btn-link">Sign Up</button></Link></p>
		<p>
			<i className="fa fa-heart text-dark" /> by{" "}
			<a href="https://www.linkedin.com/in/agustin-soto-holt" target="_blank" rel="noopener noreferrer">agusotoholt</a>
		</p>
	</footer>
);
