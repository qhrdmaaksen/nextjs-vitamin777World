import VitaminItem from './VitaminItem';
import classes from './VitaminList.module.css';

function VitaminList(props) {
  return (
    <ul className={classes.list}>
      {props.vitamins.map((vitamin) => (
        <VitaminItem
          key={vitamin.id}
          id={vitamin.id}
          image={vitamin.image}
          title={vitamin.title}
          address={vitamin.address}
        />
      ))}
    </ul>
  );
}

export default VitaminList;
// Path: components/vitamins/VitaminList.js
// Compare this snippet from components/vitamins/NewVitaminForm.js:
// import classes from './NewVitaminForm.module.css'
