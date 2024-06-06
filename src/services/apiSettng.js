import supabase from "./supabase";

export async function getAPiSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) {
    console.error(error.message);
    throw new Error("Could not fetch APi Settings");
  }

  return data;
}

export async function updateAPiSettings(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Could not update APi Settings");
  }
  return data;
}
