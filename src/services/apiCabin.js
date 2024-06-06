import supabase, { supabaseUrl } from "./supabase";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Could not fetch data from the cabin");
  }

  return data;
}
// version 1
export async function insertCabin(newCabin) {
  //https://hdssijhdxjbsvtjjhsma.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Creating new cabin failed please try again");
  }

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
    throw new Error(
      "Cabin image is unsuccessfull uoloaded and the cabin is not created "
    );
  }
  return data;
}
// version 1

// version 2
export async function insertUpdateCabin(newCabin, id) {
  const hasImageUrl = newCabin.image?.startsWith?.(supabaseUrl);
  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imgPath = hasImageUrl
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imgName}`;

  //naming the image to be upload
  let query = supabase.from("cabins");
  //Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]);

  //Edit Cabin
  if (id) query = query.update({ ...newCabin, image: imgPath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Creating new cabin failed please try again");
  }

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imgName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
    throw new Error(
      "Cabin image is unsuccessfull uoloaded and the cabin is not created "
    );
  }
  return data;
}

export async function deleteCabin(cabin) {
  const imageName = cabin.image
    .replaceAll("/", " ")
    .split(" ")
    .slice(-1)
    .join("");
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabin.id);

  if (error) {
    console.error(error.message);
    throw new Error("Could not delete data from the Cabin");
  }

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .remove(imageName);

  if (storageError) {
    console.error(error.message);
    throw new Error("Could not delete image from the bucket");
  }
  return data;
}
