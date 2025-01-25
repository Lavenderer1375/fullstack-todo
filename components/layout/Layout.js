import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

const Layout = ({ children }) => {
  const { status } = useSession();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const logOutHandler = async () => {
    signOut();
  };

  const toggleMenuHandler = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  return (
    <div className="container">
      <header>
        <p>FullStack ToDo App</p>
        <button onClick={toggleMenuHandler}>Menu</button>
        {status === "authenticated" ? (
          <button onClick={logOutHandler}>
            Log Out
            <FiLogOut />
          </button>
        ) : null}
      </header>
      <div className="container--main">
        {isMenuVisible && (
          <aside className="sidebar" onClick={toggleMenuHandler}>
            <p>Welcome 👋</p>
            <ul>
              <li>
                <VscListSelection />
                <Link href="/">Todos</Link>
              </li>
              <li>
                <BiMessageSquareAdd />
                <Link href="/add-todo">Add Todo</Link>
              </li>
              <li>
                <RxDashboard />
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </aside>
        )}
        <section>{children}</section>
      </div>
    </div>
  );
};

export default Layout;
