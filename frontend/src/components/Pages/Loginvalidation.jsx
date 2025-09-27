function Validation (values) {

    // alert("")

    let error = {}
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(a-zA-Z0-9)(8,)$/

    if (values.username === "") {
        error.username = "Name should not be empty"
    }
    else {
        error.username = ""
    }

    if (values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if (values.mobile_number === "") {
        error.mobile_number = "Mobile number should not be empty"
    }
    else {
        error.mobile_number = ""
    }

    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    } 
    // else if (!password_pattern.test(values.password)) {
    //     error.password = "Password didn't match"
    // }
    else {
        error.password = ""
    }
    return error;
}

export default Validation;