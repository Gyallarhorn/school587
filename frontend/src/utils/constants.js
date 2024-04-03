const mainContentKeys = ['year', 'letter', 'email', 'phone', 'social', 'almaMater', 'position', 'workplace', 'economic'];
const additioanlContentKeys = ['success', 'isSuccess', 'achievement', 'defineSuccess', 'successSource', 'mistakes', 'wish', 'wishToGraduates'];

const letters = [
  {
    _id: '1711193361164',
    name: 'А',
  },
  {
    _id: '1711193394993',
    name: 'Б',
  },
  {
    _id: '1711193399514',
    name: 'В',
  },
  {
    _id: '1711193403822',
    name: 'Г',
  },
  {
    _id: '1711193407617',
    name: 'Д',
  },
];

const inputRegexp = {
  firstName: /^[a-zA-Zа-яА-ЯёЁ\s()-]+$/u,
  lastName: /^[a-zA-Zа-яА-ЯёЁ\s()-]+$/u,
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^\+\d(\s*\d\s*){10,11}$/,
};

const errorText = {
  firstName: 'Пожалуйста введите корректное имя',
  lastName: 'Пожалуйста введите корректную фамилию',
  email: 'Пожалуйста введите корректную почту',
  phone: 'Пожалуйста введите корректный номер телефона',
};


export { mainContentKeys, additioanlContentKeys, letters, inputRegexp, errorText };
