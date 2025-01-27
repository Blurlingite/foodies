// outputs meal items in a grid
import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          {/* forward all properties of the meal item using spread operator */}
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
