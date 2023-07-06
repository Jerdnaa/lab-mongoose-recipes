const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Import of the model Recipe from './models/Recipe.model.js'
const RecipeModel = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
const amongus = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    await RecipeModel.deleteMany()
    const newRecipe = {
      title: 'Lasagna',
      level: 'Easy Peasy',
      ingredients: ["Tomato", "Beer"],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 60,
      creator: 'Cynthia',
    };
    await RecipeModel.create(newRecipe)
    console.log(newRecipe.title)
    await RecipeModel.insertMany(data)
    data.forEach(recipe => {
      console.log(recipe.title);
    });
    await RecipeModel.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    console.log("Success!")
    await RecipeModel.deleteOne({title: "Carrot Cake"})
    console.log("DELETED!")
    await mongoose.connection.close()
    console.log("Mongoose default connection disconnected through app termination")
    

  } catch(error) {
    console.error('Error connecting to the database', error);
  }

  

  // mongoose
  // .connect(MONGODB_URI)
  // .then(x => {
  //   console.log(`Connected to the database: "${x.connection.name}"`);
  //   // Before adding any recipes to the database, let's remove all existing ones
  //   return RecipeModel.deleteMany()
  // })
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });
}

amongus();


// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return RecipeModel.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });
