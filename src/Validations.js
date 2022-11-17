import Joi from "joi";

const register = (data) => {
  const schema = Joi.object({
    "First Name": name_validation_joi_object(),
    "Last Name": name_validation_joi_object(),
    Email: email_validation_joi_object(),
    Password: password_joi_object(),
    "Confirm Password": Joi.custom((value, helper) => {
      if (value != data.Password) {
        return helper.message("Two passwords does not match");
      }
      return true;
    }),
  });

  const { error, value } = schema.validate(data, { abortEarly: false });

  return { value, error };
  
};

const login = (data)=>{
  const schema = Joi.object({
    Email : email_validation_joi_object(),
    Password : password_joi_object(),
  });

  const {error,value} = schema.validate(data,{abortEarly: false});

  return {value, error};
}

const validateupdateprofile = (data) => {
  const UserCompleteRegistrationValidationSchema = Joi.object({
    "First Name": name_validation_joi_object(),
    "Last Name": name_validation_joi_object(),
    Email: email_validation_joi_object()
  });
  const { error, value } = UserCompleteRegistrationValidationSchema.validate(
    data,
    { abortEarly: false }
  );
  return { value, error };
};
const userUpdatePwd = (data) => {
  console.log("checking.........");
  console.log(data)
  const user_update_pwd_schema = Joi.object({
    password: password_joi_object(),
    re_password: password_joi_object(),
  });

  const { error, value } = user_update_pwd_schema.validate(data, {
    abortEarly: false,
  });

  return { value, error };
};

const name_validation_joi_object = () => {
  return Joi.string()
    .required()
    .pattern(new RegExp("^[A-Z][a-z0-9_-]{2,}$"))
    .messages({
      "string.empty": "Field should not be empty!",
      "string.required": "Field is required!",
      "string.pattern.base": "First letter must be a Capital",
    });
};

const email_validation_joi_object = () => {
  return Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": "Field should not be empty!",
      "string.required": "Field is required!",
      "string.email": "Enter a valid email address!",
    });
};

const password_joi_object = () => {
  return Joi.string()
    .required()
    .min(8)
    .max(25)
    .custom(custom_password)
    .messages({
      "string.empty": "Field should not be empty!",
      "string.required": "Field is required!",
      "string.min": `Field should have at least {#limit} characters!`,
      "string.max": `Field should have at most {#limit} characters!`,
    });
};

const custom_password = (value, helper) => {
  if (value.search(/[A-Z]/) < 0) {
    return helper.message(
      "Password must contain at least one uppercase letter"
    );
  } else if (value.search(/[a-z]/) < 0) {
    return helper.message(
      "Password must contain at least one lowercase letter"
    );
  } else if (value.search(/[0-9]/i) < 0) {
    return helper.message("Password must contain at least one number");
  } else if (value.search(/[#?!@$%^&*-]/i) < 0) {
    return helper.message(
      "Password must contain at least one special character"
    );
  } else {
    return true;
  }
};

export default {
    register,
    login,
    validateupdateprofile,
    userUpdatePwd,
}
