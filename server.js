// placeholder
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const {readBurger, createBurger , deleteBurger , clearList } = require('./models/burger.js');

app.engine("handlebars",exphbs({ defaultLayout : "main" }));
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use(express.json({limit:"1mb"}));

app.get('/', async (req,res)=>{
  let list = await readBurger();
  res.render('index',{
    burger: list[0],
    ate: list[1]
  })
})

app.post('/api/burger',async (req,res)=>{
  const {data} = req.body;
  await createBurger(data)
  res.render('index')
})

app.delete('/api/burger/',async (req,res)=>{
  const {id , burg} = req.body;
  await deleteBurger(id,burg);
  res.render('index')
})

app.delete('/api/clearlist',async (req,res)=>{
  await clearList();
  res.render('index')
})

app.listen(process.env.PORT || 8080 , ()=>{
  console.log('on port 8080')
});



