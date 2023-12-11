import { useEffect, useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import "./navbar.css"
import PAGES from "../Data/pages";
import Spinner from "../instance/Spinner";

const ADMIN_USER = "admin";

const [vote, , admin] = PAGES;


const Navbar = ({ user, setUser, setCurrentPage }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const closeNavbar = () => {
      if (!showLogout) {
        return;
      }
        setShowLogout(false);
      
    };

    // document.body.addEventListener("click", closeNavbar);

    return () => {
      document.body.removeEventListener("click", closeNavbar);
    };
  }, [showLogout]);

  const handleLogout = () => {
    setIsLoading(true);
    setUser({ name: "", role: "", email: "", id: "" });

    setTimeout(() => {
      // Your logout logic here
      setIsLoading(false);
    }, 2000);
  };
 

  const handleClickedVote = () =>{
    setIsLoading(true);

    setTimeout(()=>{
      setCurrentPage(vote);
      setIsLoading(false);

    },2000)
  } 

  const handleClickedAdmin = () =>{
    setIsLoading(true);

    setTimeout(()=>{
      setCurrentPage(admin);
      setIsLoading(false);
    },2000)

  } 

  const isAdmin = () => user.role === ADMIN_USER;
  const adminsBtn = () => (isAdmin() ? "" : "not-admin-btn");

  return (
    <div className="main">
      { isLoading ? <><Spinner /></>  : <></>}
      <div className="nav-center">
        <div className="btn-container">
          <button
            type="button"
            className="btn drop-down-main-btn"
            onClick={(event) => {
              event.stopPropagation();
              setShowLogout(!showLogout);
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={handleLogout}
            >
            Logout

            </button>

            <button
              type="button"
              className={"dropdown-btn " + adminsBtn()}
              onClick={handleClickedVote}
            >
              Vote

            </button>

            <button
              type="button"
              className={"dropdown-btn " + adminsBtn()}
              onClick={handleClickedAdmin}
    
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;