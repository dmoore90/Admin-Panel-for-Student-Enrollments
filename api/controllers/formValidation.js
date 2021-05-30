const validateName = (name) => {
	if (name.length > 1 && name.length <= 20) {
		return name;
	} else {
		return null;
	}
} 
const validateEmail = (email) => {
	var re = /\S+@\S+\.\S+/;
	if (re.test(email) == true) {
		return email;
	} else {
		return null;
	}
}

const validatePassword = (pass1, pass2) => {
	if (pass1 == pass2 && pass1.length >= 8 && pass1.length <= 16) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	validateName,
	validateEmail,
	validatePassword
};