const validateUser = (input: any) => {
	let errorsUser: any = {};
	if (
		!input.name.match(/^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/)
	) {
		errorsUser.name =
			'El nombre debe contener al menos 4 a 20 caracteres y solo admite letras';
	}
	if (input.name.length < 4) {
		errorsUser.name =
			'El nombre debe contener al menos 4 a 20 caracteres y solo admite letras';
	}
	if (input.name.length > 20) {
		errorsUser.name =
			'El nombre debe contener al menos 4 a 20 caracteres y solo admite letras';
	}
	return errorsUser;
};

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

export { validateUser, validateEmail };
