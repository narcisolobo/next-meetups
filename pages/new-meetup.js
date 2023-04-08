import { useRouter } from "next/router";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  const handleAddMeetup = async (meetup) => {
    console.log(meetup);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetup),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
}

export default NewMeetupPage;
