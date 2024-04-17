import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <div className="flex gap-8 row-start-1 row-end-2">
      <Link to="/">HoopTalk</Link>
      <Link to="/create">Create</Link>
    </div>
  );
};

export default Nav;