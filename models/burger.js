// your model should do CRUD operations
const orm = require('../config/orm.js');

const createBurger = async (x) => {
  await orm.createBurger(x);
  return ;
}

const readBurger = async () => {
  const list = await orm.getAll();
  return list;
}

const deleteBurger = async (x,burg) => {
  await orm.deleteBurger(x,burg);
  return;
}

const clearList = async () => {
  await orm.clearList();
  return;
}

module.exports = {
  createBurger,
  readBurger,
  deleteBurger,
  clearList
}