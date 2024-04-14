import supabase from "./client";

const homeLoader = async() => {
  const { data } = await supabase
    .from("hoop-talk-posts")
    .select();
  return data;
};

const detailLoader = async({ params }) => {
  const { data } = await supabase
    .from("hoop-talk-posts")
    .select()
    .eq("id", params.id);
  // console.log(data);
  return data;
};

const formatDate = (date) => {
  const newDate = date.slice(0,10);
  const formattedDate = newDate.slice(5,7) + "-" + newDate.slice(8,10) + "-" + newDate.slice(0,4);
  return formattedDate;
};

export { homeLoader, formatDate, detailLoader };