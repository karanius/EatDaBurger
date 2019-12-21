// your model should do CRUD operations
const orm = require('../config/orm.js')

const createBurger = async (x) => {
  orm.createBurger(x);
  return ;
}

const readBurger = async () => {
  const list = orm.getAll();
  return list
}

const deleteBurger = async (x,burg) => {
  orm.deleteBurger(x,burg);
  return
}

const clearList = async () => {
  orm.clearList()
  return
}

module.exports = {
  createBurger,
  readBurger,
  deleteBurger,
  clearList
}