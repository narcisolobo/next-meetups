import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
const DB_URI = 'DB_URI=mongodb+srv://nlobo:EVVCahYxLPuPK0ZR@cluster0.dkz1zrt.mongodb.net/meetups?retryWrites=true&w=majority';


function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="A meetup page for people with Hedgehogs."
        />
        <title>Hedgehog Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(DB_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
