"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// makes a server action which only executes on server (make sure to use async)

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"), // title comes from the input tag "name" attribute in the form
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);

  // redirect user
  redirect("/meals");
}
