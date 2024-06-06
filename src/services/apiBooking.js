import { isToday } from "date-fns";
import { PAGE_SIZE } from "../utils/constant";
import { getToday } from "../utils/helper";
import supabase from "./supabase";

export async function getBooking({ filterData, sortBy, pageData }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(*),guests(*)", { count: "exact" }); // count get data from you database just use exact to get them all
  //filter
  if (filterData) query = query.eq(filterData.field, filterData.value);
  //sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  //pagination
  if (pageData) {
    const from = (pageData - 1) * PAGE_SIZE;

    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) throw new Error("Could not fetch the data from the booking");

  return { data, count };
}

export async function apiGetBookingDetailsById(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*),guests(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error("cant get specific booking details by Id");

  return data;
}

//update Booking

export async function apiUpdateBooking(id, obj) {
  let query = supabase.from("bookings");

  if (id) query = query.update(obj).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cant Update Specific Data");

  return data;
}
//DeleteBooking

export async function apiDeleteBooking(id) {
  let query = supabase.from("bookings");

  if (id) query = query.delete().eq("id", id);

  const { data, error } = await query;

  if (error) throw new Error("something went wrong please try again!");

  return data;
}

//Getting Recent booking by Last number is required

export async function apiRecentBookingByAfterDate(date) {
  let query = supabase.from("bookings");

  if (date)
    query = query
      .select("created_at,totalPrice,extraPrice")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

  const { data, error } = await query;

  if (error)
    throw new Error("failed to fetch the data from this recent booking");

  return data;
}

export async function apiStayAfterDate(date) {
  let query = supabase.from("bookings");

  if (date)
    query = query
      .select("*,guests(fullName)")
      .gte("startDate", date)
      .lte("startDate", getToday());

  const { data, error } = await query;

  if (error) throw new Error("failed to fetch the data");

  return data;
}

//Today's Activity filtering out

export async function apiTodaysActivity() {
  const { data, error } = await supabase.from("bookings").select("*,guests(*)");

  if (error) throw new Error("failed to fetch the data from APi");
  const filterData = data.filter(
    (activity) =>
      (activity.status === "check-in" && isToday(new Date(activity.endDate))) ||
      (activity.status === "unconfirmed" &&
        isToday(new Date(activity.startDate)))
  );

  return filterData;
}
