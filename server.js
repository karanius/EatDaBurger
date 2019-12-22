// placeholder
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const {readBurger, createBurger , deleteBurger , clearList } = require('./models/burger.js');

app.engine("handlebars",exphbs({ defaultLayout : "main" }));
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use(express.json({limit:"1mb"}));

const refresh = async () => {
  const list = await readBurger().catch(err=>console.log(err));
  return list;
}
const normalize = async (x) => {
  let leftList = x[0];
  let rightList = x[1];

  leftList = leftList.map(each=>{
    if (each.id !== 1) {
      let str = `${each.id}`
      return {
        id: parseInt(str.slice(0, str.length - 1 ) ) + 1,
        name: each.name
      }
    } else {
      return each
    }
  })

  rightList = rightList.map(each=>{
    if (each.id !== 1) {
      let str = `${each.id}`
      return {
        id: parseInt(str.slice(0, str.length - 1 ) ) + 1,
        name: each.name
      }
    } else {
      return each
    }
  })
  return [leftList,rightList]
}

const deNormalize = (a) => {
  if (a !== 1){
    return parseInt(`${a - 1}1`)
  }
  return a
}

app.get('/', async (req,res)=>{
  let list = await refresh();
   list = await normalize(list);
  res.render('index',{
    burger: list[0],
    ate: list[1]
  })
})

app.post('/api/burger/',async (req,res)=>{
  const {data} = req.body;
  await createBurger(data);
  res.send();
})

app.delete('/api/burger/',async (req,res)=>{
  let {id , burg} = req.body;
  id = deNormalize(parseInt(id));
  await deleteBurger(id,burg)
  res.send();
})

app.delete('/api/clearlist',async (req,res)=>{
  await clearList()
  res.send()
})

const PORT = process.env.PORT || 8080;
app.listen( PORT , ()=>{
  console.log(`on port ${PORT}`)
});



