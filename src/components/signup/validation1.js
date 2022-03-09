function validation1(values) { //values = formValues (useState)
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
        errors.email = "Email is required";
    }
    else if (!regex.test(values.email)) {
        errors.email = "Email is invalid";
    }
    if (!values.password) {
        errors.password = "Password is required";
    }
   
else if (values.password.length < 5) {
        errors.password = "Password is too short";
    }
    return errors;

}

export default validation1;