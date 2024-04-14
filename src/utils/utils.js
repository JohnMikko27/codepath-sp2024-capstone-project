import supabase from "./client";

const loader = async() => {
  const { data } = await supabase
    .from("hoop-talk-posts")
    .select();
  return data;
};

const formatDate = (date) => {
  const newDate = date.slice(0,10);
  const formattedDate = newDate.slice(5,7) + "-" + newDate.slice(8,10) + "-" + newDate.slice(0,4);
  return formattedDate;
};

export { loader, formatDate };