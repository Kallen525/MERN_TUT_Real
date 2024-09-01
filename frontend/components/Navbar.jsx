import { Link } from "react-router-dom";
import { pageData } from "./pageData";

export function Navbar() {
  return (
    <div className="navbar">
      {pageData.map((page) => (
        <Link to={page.path} className="navItem" key={page.name}>
          <button>{page.name}</button>
        </Link>
      ))}
    </div>
  );
}
