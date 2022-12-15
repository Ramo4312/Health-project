import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import LoginClose from '../images/close.svg';

const LoginPage = () => {
	
	return (
		<main>
			<section className="login-container">
				<div className='login-inner'>
					<div className="login-content">
						<img src={LoginClose} alt="icon-close" className="login-close" />
						<h3 className='login-title'>Войти
						</h3>
						<form className="login-form">
							<label>
								Имя
							</label>
							<input 
								type="username" 			
								className="login-username" 
							/>
							<label>
								Пароль
							</label>
							<input 
								type="password"
								className="login-password" 
							/>
						</form>
					
						<div className="forgot-pass">
							<Link 
								to="/forgotpassword" 
								className="forgot-pass-link"
							>
								Забыли пароль?
							</Link>
						
							<button className="login-btn">
								Войти
							</button>
							
							<Link 
								className='registration-link' 
								to='/registration'
							>
								Регистрация
							</Link>
							
						</div>
					</div>
				</div>
				<div className="log-ellips-1"></div>
				<div className="log-ellips-2"></div>
				<div className="log-ellips-3"></div>
				<div className="log-ellips-4"></div>
				<div className="log-ellips-5"></div>
			</section>
		</main>
	)
}

export default LoginPage;
