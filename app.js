//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useUnifiedTopology: true , useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "What fruit tho?"]
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Peach",
  rating: 10,
  review: "I love peaches!"
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person ({
//   name: "Sara",
//   age: 26
// })
//
// person.save();

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 9,
//   review: "Great fruit!"
// });
//
// pineapple.save();

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple
// });
//
// person.save();

// const apple = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Solid fruit."
// });
//
// apple.save();
//
// Person.updateOne({name: "Sara"}, {favoriteFruit: apple}, function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Updated Sara.");
//   }
// });
//
// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me."
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 2,
//   review: "I don't like minions."
// });
//
// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });
//
// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     })
//   }
// });
//
// Fruit.deleteMany({name: "Peach", function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully Deleted");
//   }
// }});

// Person.deleteMany({name: "Sara"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     console.log("Successfully Deleted");
//   }
// });
//
// Fruit.updateOne({_id:""}, {name: "Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated!");
//   }
// });

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great Fruit!"
    },
    {
      name: "Orange",
      score: 6,
      review: "Too Florida for me..."
    },
    {
      name: "Banana",
      score: 3,
      review: "I don't like minions."
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
