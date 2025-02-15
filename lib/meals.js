import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  // simulate an action that takes longer for learning purposes only
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // prepare the SQL statement this way so you avoid SQL injection attacks
  return db.prepare("SELECT * FROM meals WHERE slug=?").get(slug);
}

export async function saveMeal(meal) {
  // generate a slug based on title
  meal.slug = slugify(meal.title, { lower: true });

  // remove harmful content from instructions sent by user
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const timestamp = Date.now(); // used to make image filename unique
  const fileName = `${meal.slug}-${timestamp}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  // overwrite the meal.image stored in meal object with a path to thee image since databases cannot store image files
  // should not include 'public' in the url here, since we did so already above
  meal.image = `/images/${fileName}`;

  // save to database
  db.prepare(
    `INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
      )
 
    `
  ).run(meal);
}
