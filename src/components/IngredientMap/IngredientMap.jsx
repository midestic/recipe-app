import IngredientList from "../ingredientList/IngredientList";

export default function IngredientMap({ details, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <p>Loading.......</p>
      ) : (
        details.extendedIngredients.map((ingredient) => (
          <IngredientList
            key={ingredient.id}
            ingredient={ingredient}
            isLoading={isLoading}
          />
        ))
      )}
    </div>
  );
}
