import FoodListItems from "../foodListitem/FoodListItems";
import styles from "./FoodMap.module.css";

export default function FoodMap({ foodData, setFoodId }) {
  return (
    <div className={styles.container}>
      {foodData.map((foodList) => (
        <FoodListItems
          key={foodList.id}
          foodList={foodList}
          setFoodId={setFoodId}
        />
      ))}
    </div>
  );
}
