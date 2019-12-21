
// Here is the O.R.M. where you write functions that takes inputs and conditions
// and turns them into database commands like SQL.
const mysql = require('mysql');
const token = require('../config/connection.js');


// if there is no tables,  create them
(async function(){
  const con = mysql.createConnection(token);
  const table = await new Promise((resolve,reject)=>{
    con.query(`show tables`,(err,result)=>{
      if (err) reject(err);
      resolve(result);
    })
  });
  if (table.length === 0) {
    await new Promise((resolve,reject)=>{
      const list = ['ate','burgers']
      for ( let i = 0 ; i < 2 ; i++){
        con.query(`create table ${list[i]} (id int primary key auto_increment , name varchar(30) )`, (err,result)=>{
          if (err) {reject(err)}
        });
      }
    });
    con.end();
  } else {
    con.end();
  }
})();

const orm = {
  getAll: async function() {
    const con = mysql.createConnection(token);
    const data = await new Promise( (resolve , reject)=>{
      con.query(`select * from burgers`,  (err,result)=>{
        if (err) {
          reject(err)
        } else {
          resolve( result)
        }
      })
    })
    const eatenData = await new Promise( (resolve , reject)=>{
      con.query(`select * from ate order by id desc`, (err,result)=>{
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
    con.end();
    
    return [data,eatenData]
  },
  createBurger: async function(burger){
    const con = mysql.createConnection(token);
    await new Promise((resolve,reject)=>{
      con.query(`insert into burgers (name) values ( "${burger}" )`,(err,result)=>{
        con.end()
        if (err) reject(err);
        resolve('!')
      })
    })
  },
  deleteBurger: async function (id,burger){
    const con = mysql.createConnection(token);
    await new Promise((resolve,reject)=>{
      con.query(`delete from burgers where id = ${id}`,(err,result)=>{
        if (err){
          reject(err)
        } else {
          resolve('!')
        }
      })
    })
    await new Promise((resolve,reject)=>{
      con.query(`insert into ate (name) values ("${burger}")`,(err,result)=>{
        if (err) {
          reject(err)
        } else {
          resolve('!')
        }
      });
      con.end();
    })
  },
  clearList: async function () {

    const deleteTables = async (table) => {
      const con = mysql.createConnection(token);
      await new Promise((resolve,reject)=>{
        con.query(`drop table ${table}`,(err,result)=>{
          con.end()
          if (err){
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    const createTables = async (table) => {
      const con = mysql.createConnection(token);
      await new Promise((resolve,reject)=>{
        con.query(`create table ${table} (id int primary key auto_increment , name varchar(30) ) `,(err,result)=>{
          con.end();
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }

    const getTables = async () => {
      const con = mysql.createConnection(token);
      const tables = await new Promise((resolve,reject)=>{
        con.query(`show tables`,(err,result)=>{
          con.end()
          if (err) {reject(err)} else {
            resolve(result)
          }
        })
      })
      return tables;
    }

    const tableNames = await getTables();
    for (let i of tableNames) {
      await deleteTables(i["Tables_in_burger_db"]);
      await createTables(i["Tables_in_burger_db"]);
    }
  }
  }


module.exports = orm;