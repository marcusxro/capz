const mongoose = require('mongoose');

// Replace this with your MongoDB Atlas connection string
const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/activityLog';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Uid: {
    type: String,
    required: true,
  },
});

const DBcollection = mongoose.model('logs', mySchema);

module.exports = DBcollection;
