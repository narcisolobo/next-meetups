import { MongoClient } from "mongodb";
const DB_URI = process.env.DB_URI;

async function newMeetup(req, res) {
  if (req.method === "POST") {
    try {
      const client = await MongoClient.connect(DB_URI);
      const db = client.db();
      const meetups = db.collection("meetups");
      const result = await meetups.insertOne(req.body);
      console.log(result);
      client.close();
      res.status(201).json({message: 'Meetup created'});
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
}

export default newMeetup;
