import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../public/images/teamtrip.svg';
import { Error } from '../others/Alert';
import Loading from '../others/Loading';
import { AppContext } from '../Context';
import { LogsFunction } from '../functions';
import { LOGIN_IN } from '../others/Messages';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const { Admin } = useContext(AppContext);

	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();
	const [errorMessage, SeterrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		const userData = {
			email: email,
			password: password,
		};

		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: userData.email,
					password: userData.password,
				}),
			});

			const ResponseJson = await response.json();
			if (ResponseJson.success) {
				sessionStorage.setItem('token', ResponseJson.Token);
				LogsFunction(LOGIN_IN);
				await Admin();
				navigate('/');
			} else {
				setLoading(false);
				SeterrorMessage(ResponseJson.error);
				setTimeout(() => {
					SeterrorMessage('');
				}, 10000);
			}
		} catch (error) {
			SeterrorMessage(`Error during login:${error}`);
		}
	};

	return (
		<>
			<div className="login">
				<div className="login-card">
					<div className="d-flex justify-content-center">
						<h1>MotoMate</h1>
					</div>
					{loading ? (
						<Loading />
					) : (
						<form>
							<label htmlFor="exampleInputEmail1">Email</label>
							<input
								type="email"
								className="form-control mt-2 mb-3"
								name="email"
								ref={emailRef}
							/>
							<div className="d-flex mb-2 justify-content-between">
								<label htmlFor="exampleInputPassword1">Password</label>
							</div>
							<input
								type="password"
								className="form-control mt-2"
								name="password"
								ref={passwordRef}
							/>
							<div className="mt-4 d-flex justify-content-center">
								<button
									type="submit"
									className="purplebtn"
									onClick={handleSubmit}>
									Login
								</button>
							</div>
						</form>
					)}
				</div>
				{errorMessage && <Error message={errorMessage} />}
			</div>
		</>
	);
}
