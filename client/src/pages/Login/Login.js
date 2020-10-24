import React from 'react';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Login.css';

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login auth
    window.location.assign('/creator');
  }

	return (
		<React.Fragment>
			<main className="Login vh-100 d-flex flex-column align-items-center mt-5 pt-5">
				<h3 className="mb-5">Buskr Login</h3>
				<Form className="Login-Form w-25" onSubmit={handleSubmit}>
					<Form.Group controlId="Login-username-input">
						<Form.Label>Username</Form.Label>
						<Form.Control placeholder="" />
					</Form.Group>

					<Form.Group controlId="Login-password-input">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="" />
					</Form.Group>

					<Form.Group controlId="Login-submit" className="d-flex flex-row m-1">
						<Button className="Login-Btn mr-2 w-25 btn-sm" variant="primary" type="submit">
							Log In
						</Button>
						<p className="Need-Acct-Text m-1 w-75 text-center">
							Don't have an account?{' '}
							<Link to="/signup" className="Link-Text">
								{' '}
								Sign Up
							</Link>
						</p>
					</Form.Group>
				</Form>
			</main>
		</React.Fragment>
	);
};

export default Login;