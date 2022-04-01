import { BsLightbulbFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <header class="nav-header nav-bg-transparent px-xl py-xs">
      <h2 class="h2 text-primary">Streak.</h2>
      <nav>
        <ul class="nav-links">
          <li>
            <BsLightbulbFill size={25} className="pointer" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export { Navbar };
