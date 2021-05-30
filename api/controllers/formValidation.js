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

module.exports = {
	validateName,
	validateEmail
};