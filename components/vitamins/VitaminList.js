import VitaminItem from './VitaminItem';
import classes from './VitaminList.module.css';

const VitaminList = (props) => {
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
};

export default VitaminList;
