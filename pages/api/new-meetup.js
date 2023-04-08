// EVVCahYxLPuPK0ZR
// mongodb+srv://nlobo:<password>@cluster0.dkz1zrt.mongodb.net/?retryWrites=true&w=majority
import { MongoClient } from "mongodb";

async function newMeetup(req, res) {
  if (req.method === "POST") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://nlobo:EVVCahYxLPuPK0ZR@cluster0.dkz1zrt.mongodb.net/meetups?retryWrites=true&w=majority"
      );
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
