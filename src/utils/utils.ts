/* eslint-disable @typescript-eslint/no-explicit-any */
const detailsLoader = async({ params }: { params: any}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/posts/${params.postId}`, {
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch(e) {
    console.log(e);
  }
};

export { detailsLoader };