const yup = require('yup');

const add_employee_validation_schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(100),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'password and confirm password must be same').required().min(6).max(100),
    first_name: yup.string().required().min(3).max(100),
    last_name: yup.string().required().min(3).max(100),
});
const edit_employee_validation_schema = yup.object().shape({
   first_name: yup.string().required().min(3).max(100),
    last_name: yup.string().required().min(3).max(100),
});

module.exports={
    add_employee_validation_schema,
    edit_employee_validation_schema
}