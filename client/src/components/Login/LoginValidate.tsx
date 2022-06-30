const validateEmail = (input: any) => {
	let errorsEmail: any = {};
	if (input.email.includes(' ')) {
		errorsEmail.email = 'Introduzca un Email valido';
	}
	if (
		!input.email.match(
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
		)
	) {
		errorsEmail.email = 'Introduzca un Email valido';
	}
	return errorsEmail;
};

const validatePassword = (input: any, field: string = 'password', errorsPassword : any = {}) => {

  console.log(errorsPassword)

	if (input[field].includes(' ')) {
		errorsPassword[field] =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
	}
	else if (!input[field].match(/^([a-zA-Z0-9]){6,15}$/)) {
		errorsPassword[field] =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
  }
	else if (input[field].length < 6) {
		errorsPassword[field] =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
  }
	else if (input[field].length > 15) {
		errorsPassword[field] =
			'La contraseña debe contener al menos 6 a 15 caracteres y solo admite letras o numeros';
  }
  else delete errorsPassword[field];
	return errorsPassword;
};

export { validateEmail, validatePassword };
