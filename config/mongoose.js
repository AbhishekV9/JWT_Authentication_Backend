const mongoose=require('mongoose');
const uri='mongodb+srv://avishekv99:zocket@cluster0.kxpuk.mongodb.net/JWT-AUTH?retryWrites=true&w=majority'

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Atlas database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

