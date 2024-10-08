import supabase from "./client";
import Fuse from "fuse.js";

const homeLoader = async() => {
  try {
    const { data, error } = await supabase
      .from("hoop-talk-posts")
      .select();
    console.log(data);
    if (error) return [];
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
  
};

const detailLoader = async({ params }) => {
  const { data } = await supabase
    .from("hoop-talk-posts")
    .select()
    .eq("id", params.id);
  try {
    // user getUser instead of getSession? there might be a problem with session
    const { data: sessionData } = await supabase.auth.getSession(); 
    sessionData.session.user.id === data[0].userId 
      ? data[0].isUser = true
      : data[0].isUser = false;
  } catch (err) {
    // added a try catch just so that it won't break the app if the user isn't currently logged in
  }
  
  return data;
};

const formatDate = (date) => {
  const newDate = date.slice(0,10);
  const formattedDate = newDate.slice(5,7) + "-" + newDate.slice(8,10) + "-" + newDate.slice(0,4);
  return formattedDate;
};

const getUserLoader = async() => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

const fuzzySearch = async(s) => {
  const data = await homeLoader();
  const fuseOptions = {
    shouldSort: true,
    keys: [
      "title",
    ]
  };
  const fuse = new Fuse(data, fuseOptions);
  console.log(fuse.search(s));
  return fuse.search(s);
};

export { homeLoader, formatDate, detailLoader, getUserLoader, fuzzySearch };