import React from 'react';
import { Link } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
	
	return (
		<main>
			<section className="login-container">
				<h3 className='login-title'>Войти</h3>
				<form className="login-form">
					<label>
						Имя
					</label>
					<p>
						<input 
							type="username" 			
							className="login-username" 
						/>
					</p>
					
					<label>
						Пароль
					</label>
					<p>
						<input 
							type="password"
							className="login-password" 
						/>
					</p>
				</form>
					
				<div className="forgot-pass">
					<Link to="/forgotpassword" className="forgot-pass-link">
						Забыли пароль?
					</Link>
				</div>
				<div className="login-buttons">
					<button className="login-btn">
						Войти
					</button>
					<div className="registration-btn">
						<Link className='registration-link' to='/registration'>
							Регистрация
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}

export default LoginPage;
