/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authentication/authSlice';
import { useLoginMutation, useRecoverPasswordMutation } from '../../slices/authentication/authApiSlice';
import { validatePassword } from './LoginValidate';
import { validateEmail } from './LoginValidate';
import login_style from './Login.module.css';
import {Toast} from '../../utils/alerts'
declare var google: any;

const Login = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLParagraphElement | null>(null);

	const [email, setEmail] = useState({});
	const [password, setPassword] = useState({});
	const [errMsg, setErrMsg] = useState('');
	const [errorsEmail, setErrorsEmail]: any = useState({});
	const [errorsPassword, setErrorsPassword]: any = useState({});
  const [recoverPassword, setRecoverPassword]: any = useState(false)
	const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
	const [login] = useLoginMutation();
	const [recoverPasswordQuery] = useRecoverPasswordMutation();
	const dispatch = useDispatch();

	const handleLogin = async (credentials: any) => {
    try{
      const userData = await login(credentials).unwrap();
      dispatch(
        setCredentials({
          user: userData.data,
          accessToken: userData.accessToken,
        }),
      );
      setEmail('');
      setPassword('');
      navigate('/welcome');
      Toast.fire({
        icon: 'success',
        title: `Bienvenido ${userData.data.name}!`,
      });
    }catch(e: any){
      console.log(e)
      if (e.data.includes('banned')){
        Toast.fire({
          icon: 'error',
          title: `Usuario baneado, contacte con un administrador.`,
        });
      }
      else{
        Toast.fire({
          icon: 'error',
          title: `${e.data}`,
        });
      }
    }
	};

	const handleCallbackResponse = async (response: any) => {
		console.log('Encoded jwt ID token: ', response);
		handleLogin({ googleToken: response.credential });
	};

	useEffect(() => {
		try{
        setLocalLoading(false);
        google?.accounts?.id?.initialize({
          client_id:
            '210425083362-pkn3890s07pe9r7f0l2s1ev492j4hh13.apps.googleusercontent.com',
          callback: handleCallbackResponse,
        });
  
        google?.accounts?.id?.renderButton(document.getElementById('signInDiv'), {
          theme: 'outline',
          size: 'large',
        });    
    }catch(err){
      setLocalLoading(true)
      console.log(err)}

		const input = emailRef.current;
		input?.focus();
	}, [localLoading]);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
      if (recoverPassword) { 
        const response : any = await recoverPasswordQuery({email});
        if (response.error) throw response.error
        Toast.fire({
          icon: 'success',
          title: `La nueva contraseña fue enviada a su email`,
        });

        setRecoverPassword(false);
        setEmail('');
        setPassword('');
        navigate('/home');
      }
      else { await handleLogin({ email, password }); }
		} catch (err: any) {
      let text : string;
			if (!err?.data) {
        console.log(err.data)
				text = 'El Server no responde.';
			} else if (err.originalStatus === 400) {
				text = 'Usuario o contraseña incorrectos.';
			} else if (err.originalStatus === 403) {
				text = 'Usuario o contraseña incorrectos.';
			} else if (err.originalStatus === 404) {
        text = 'No se encontro un usuario con ese email';
      } else {
				text = 'Fallo al ingresar';
			}
      Toast.fire({
        icon: 'error',
        title: text,
      });
		}
		const error = errRef.current;
		error?.focus();
	};

	const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrorsEmail(
			validateEmail({ ...email, [e.target.name]: e.target.value }),
		);
	};
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setErrorsPassword(
			validatePassword({ ...password, [e.target.name]: e.target.value }),
		);
	};
	const spanStyle = { color: 'red', fontSize: '25px' };
	const content = localLoading ? (
		<h1>Loading...</h1>
	) : (
		<React.Fragment>
			<span
				style={spanStyle}
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live="assertive"
			>
				{errMsg}
			</span>
			<form onSubmit={handleSubmit}>
				<div className={login_style.form}>
					<h1>Ingresar</h1>
					<fieldset className={login_style.fieldset_login}>
						{/* <label className={login_style.label}>Usuario</label> <br /> */}
						<legend className={login_style.legend}>Email:</legend>
						<input
							type="text"
							ref={emailRef}
							placeholder="Email"
							name="email"
							autoComplete="off"
							required={true}
							onChange={(e) => handleEmailInput(e)}
						/>
						{errorsEmail.email && <p>{errorsEmail.email}</p>}
					</fieldset>{' '}
          <fieldset hidden={recoverPassword} className={login_style.fieldset_login}>
						{/* <label>Contraseña</label> <br /> */}
						<legend className={login_style.legend}>Contraseña:</legend>
						<input
							type="password"
							placeholder="Contraseña"
							name="password"
							autoComplete="off"
							onChange={(e) => handlePasswordInput(e)}
						/>
						{errorsPassword.password && <p>{errorsPassword.password}</p>}
					</fieldset>{' '}
           <div hidden={recoverPassword} className={login_style.googleButton} id="signInDiv"></div>
					<button
            type= "submit"
						className={login_style.bottom}
						disabled={
              !recoverPassword &&
              (
                Object.keys(errorsEmail).length > 0 ||
                Object.keys(errorsPassword).length > 0 ||
                errorsEmail.mail ||
                errorsPassword.password
                  ? true
                  : false
              )
						}
					>
              {recoverPassword ? 'Recuperar contraseña' : 'Ingresar'}
					</button>
					<button
						className={login_style.bottom}
            type= 'button'
            onClick={() => setRecoverPassword((pevState: any) => !pevState)}
					>
						{recoverPassword ? 'Volver' : 'Recuperar contraseña'}
					</button>
				</div>
				<br />
			</form>
		</React.Fragment>
	);

	return content;
};
export default Login;
