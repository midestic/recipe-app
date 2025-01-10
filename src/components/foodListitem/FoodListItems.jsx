import styles from "./FoodListItems.module.css";

export default function FoodListItems({ foodList, setFoodId }) {
  return (
    <div className={styles.foodListContainer}>
      <img
        className={styles.images}
        src={foodList.image}
        alt="food-recipe-pizza"
      />
      <div className={styles.foodContents}>
        <p className={styles.foodName}>{foodList.title}</p>
      </div>

      <div className={styles.btnContainer}>
        <button onClick={() => setFoodId(foodList.id)}>VIEW RECIPE</button>
      </div>
    </div>
  );
}
