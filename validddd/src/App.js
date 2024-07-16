import { useState } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [tryPassword, setTryPassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [tryPasswordError, setTryPasswordError] = useState(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let error = null;

		if (!/^[A-Z0-9._-]+@[A-Z]+.+[A-Z]$/i.test(target.value)) {
			error = 'Email введен некорректно.';
		} else if (target.value.length > 30) {
			error = 'Неверно введен Email. Должно быть не больше 30 символов';
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let error2 = null;
		if (
			!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
				target.value,
			)
		) {
			error2 = 'Пароль не соответствует требования.';
		} else if (target.value.length > 25) {
			error2 = 'Неверно введен пароль. Должно быть не больше 25 символов';
		}
		setPasswordError(error2);
	};

	const onTryPasswordChange = ({ target }) => {
		setTryPassword(target.value);

		let error3 = null;
		if (target.value !== password) {
			error3 = 'Пароли не совпадают.';
		}
		setTryPasswordError(error3);
	};

	const onEmailBlur = () => {
		if (email.length < 10) {
			setEmailError('Невеверный емаил. Должно быть не меньше 3 символов.');
		}
	};

	const onPasswordBlur = () => {
		if (password.length < 5) {
			setPasswordError(
				'Пароль введен некорректно. Должно быть не меньше 5 символов.',
			);
		}
	};

	const onTryPasswordBlur = () => {
		if (tryPassword.length < 5) {
			setTryPasswordError(
				'Пароль введен некорректно. Должно быть не меньше 5 символов.',
			);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password, tryPassword });
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.hone}>Форма регистрации</h1>
			<form onSubmit={onSubmit} className={styles.autor}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				{tryPasswordError && (
					<div className={styles.errorLabel}>{tryPasswordError}</div>
				)}
				<label className={styles.label}>Введите Email:</label>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onEmailChange}
					onBlur={onEmailBlur}
					className={styles.inputGroup}
				/>
				<br></br>
				<label className={styles.label}>Введите пароль:</label>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
					className={styles.inputGroup}
				/>
				<br></br>
				<label className={styles.label}>Повторите пароль:</label>

				<input
					type="password"
					name="password"
					value={tryPassword}
					placeholder="Повторите пароль"
					onChange={onTryPasswordChange}
					onBlur={onTryPasswordBlur}
					className={styles.inputGroup}
				/>
				<button
					type="submit"
					className={styles.button}
					disabled={
						emailError !== null ||
						passwordError !== null ||
						tryPasswordError !== null
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
