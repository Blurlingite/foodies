import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // simulate an action that takes longer for learning purposes only
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}
