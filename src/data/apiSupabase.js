import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import { subtractDates } from "../utils/helper";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { useState } from "react";

export async function deleteGuest() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) {
    console.error(error.message);
    throw new Error("Cant delete Data");
  }
}

export async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.error(error.message);
}

export async function deleteBooking() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.error(error.message);
}

export async function createGuest() {
  const { error } = await supabase.from("guests").insert(guests);

  if (error) console.error(error.message);
}

export async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.error(error.message);
}

export async function deleteBucket() {
  const { data, error } = await supabase.storage.deleteBucket("avatars");
  if (error) console.error(error.message);
  console.log(data);
}

export async function createBookings() {
  const { data: guestIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestIds.map((guest) => guest.id);

  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);

    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);

    const extraPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extraPrice;
    console.log(numNights, cabinPrice, extraPrice, totalPrice);
    let status;

    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "check-out";

    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";

    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "check-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extraPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.error(error.message);
}

export function useUploadData() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBooking();
    await deleteGuest();
    await deleteCabins();

    await createGuest();
    await createCabins();
    // await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBooking();
    await createBookings();

    setIsLoading(false);
  }

  async function deletingBucket() {
    setIsLoading(true);
    await deleteBucket();
    setIsLoading(false);
  }

  return { isLoading, uploadAll, uploadBookings, deletingBucket };
}
