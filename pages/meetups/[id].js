import Head from "next/head";
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
const DB_URI = 'DB_URI=mongodb+srv://nlobo:EVVCahYxLPuPK0ZR@cluster0.dkz1zrt.mongodb.net/meetups?retryWrites=true&w=majority';

function MeetupDetailsPage({ meetup }) {
  return (
    <Fragment>
      <Head>
        <meta name="description" content={meetup.description} />
        <title>{meetup.title}</title>
      </Head>
      <MeetupDetail
        image={meetup.image}
        title={meetup.title}
        description={meetup.description}
        address={meetup.address}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(DB_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        id: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const client = await MongoClient.connect(DB_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(id) });
  client.close();

  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        image: meetup.image,
      },
    },
  };
}

export default MeetupDetailsPage;
