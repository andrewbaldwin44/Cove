// One upper case letter or symbol or number, 8 characters in length
const minimumPasswordRequirements = /^(?=.*[A-Z])|(?=.*[!@#$&*])|(?=.*[0-9]).{8}$/;

export const PASSWORD_REQUIREMENTS = {
  minimumPasswordRequirements,
  minimumPasswordLength: 8,
}
