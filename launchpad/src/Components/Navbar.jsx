import { Link, Navigate } from "react-router-dom";
import { pageData } from "./PageData";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("User");
    navigate("/");
  }

  return (
    <div className="navbar">
      {pageData.map((page) => {
        return (
          <Link to={page.path} className="navItem">
            <button>{page.name}</button>
          </Link>
        );
      })}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
