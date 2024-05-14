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
  try {
    const { data: sessionData } = await supabase.auth.getSession(); // might have to put this part in a try catch block so that the catch block catches error and it doesnt show an error i think?
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

export { homeLoader, formatDate, detailLoader, getUserLoader};