import supabase, { supabaseUrl } from "./supabase";

export async function SignUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error("Cant create new user");

  return data;
}

export async function Login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Email or Password is incorrect");

  return data;
}

export async function apiCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("username is not registered");

  return data?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("User can't logout please try again");
}

export async function updateUserApi({ password, fullName, avatar }) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error)
    throw new Error("Something went wrong updating the account information");

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error("cant upload avatar");

  const { data: updatedAvatar, error: error2 } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    }
  );

  if (error2) throw new Error(`updating data failed please try again!`);

  return updatedAvatar;
}

// Reset password!

export async function apiResetPasswordorEmail({ email }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://cabin-oasis-bookings.netlify.app/account",
  });

  if (error)
    throw new Error("Account user cant reset password please contach admin!");

  return data;
}
