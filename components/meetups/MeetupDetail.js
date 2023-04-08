import styles from './MeetupDetail.module.css'

function MeetupDetail(props) {
  return (
    <div className={styles.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <address>{props.address}</address>
    </div>
  );
}

export default MeetupDetail;
