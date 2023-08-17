const REQUIRED_FIELD = "Поле обязательно для заполнения";
export const EmailValidation = {
  required: REQUIRED_FIELD,
  validate: (email: string): boolean | string => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(email)) {
      return "Адрес электронной почты соответствует требованиям";
    }
    return true;
  },
};
export const PasswordValidation = {
  required: REQUIRED_FIELD,
  validate: (password: string): boolean | string => {
    if (!/[A-ZА-Я]/.test(password)) {
      return "Пароль должен содержать хотя бы одну заглавную букву";
    }
    if (!/[a-zа-я]/.test(password)) {
      return "Пароль должен содержать хотя бы одну букву";
    }
    if (!/\d/.test(password)) {
      return "Пароль должен содержать хотя бы одну цифру";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Пароль должен содержать хотя бы один символ (!@#$%^&*)";
    }
    if (password.trim() !== password) {
      return "В начале и конце пароля должны отсутствовать пробелы";
    }
    if (password.length < 8) {
      return "Слишком короткий пароль";
    }
    return true;
  },
};
