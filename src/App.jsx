import { useEffect } from "react";
import supabase from "./utils/client";


function App() {
  useEffect(() => {
    const insertData = async() => {
        await supabase
          .from("testtable")
          .insert({testage: 2222, testname: "loler"})
          .select();
        console.log("insertData called");
    }
    insertData()
  }, [])

  return (
      <div className="text-red-500">hi capstone</div>
  )
}

export default App
