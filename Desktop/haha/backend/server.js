const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const bodyParser = require('body-parser');
const DBcollection = require('./mongo'); // activity model
const { ObjectId } = require('mongodb'); // used for result in delete method

app.get('/', (req, res) => {
  res.send('connected');
});

app.get('/database', (req, res) => {
  DBcollection.find()
  .then((users) => {
    res.json(users)
  }).catch((e) => {
    console.log("ERROR ", e)
  })
});

app.use(bodyParser.json());
app.post('/GetAct', async(req, res) => {})
app.post('/getId', async (req, res) => {
  const { activity, Uid, email } = req.body;

  try {
    const newActivity = new DBcollection({
      activity,
      email,
      Uid
    });
    await newActivity.save();
    res.status(201).json({ message: 'Activity saved successfully' });

  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

// Define the route
app.put('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const updatedActivity = req.body.content; // Corrected to 'activity'
  try {
    const result = await DBcollection.findByIdAndUpdate(postId, {
      $set: {
        activity: updatedActivity, // Corrected to 'activity'
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete("/posts/:id", async (req, res) => { // route
  const itemId = req.params.id; //actual item
  const data = await DBcollection; // awaits my db collection
  const result = await data.deleteOne({ _id: new ObjectId(itemId) }); //finds the particular id to be deleted
  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send('Invalid ObjectId format'); //if invalid. this is  required
  } if (result.deletedCount === 1) { //success
      res.send("Document deleted successfully");
  } else {
      res.status(404).send("Document not found");
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
