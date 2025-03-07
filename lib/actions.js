"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || (typeof text === "string" && text.trim() === "");
}

// makes a server action which only executes on server (make sure to use async)
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"), // title comes from the input tag "name" attribute in the form
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email || !meal.creator_email.includes("@")) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid Input.",
    };
  }
  await saveMeal(meal);

  // redirect user
  redirect("/meals");
}
