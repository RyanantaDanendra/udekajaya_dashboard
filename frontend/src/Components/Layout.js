import "../App.css";
import { Link } from "react-router-dom";

const Layout = ({ children, setUser }) => {
  const windowSize = window.innerWidth;

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const openMenu = () => {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");

    if (sidebar.classList.contains("-left-full")) {
      sidebar.classList.remove("-left-full");
      sidebar.classList.add("left-0");

      hamburger.classList.remove("bg-black");
      hamburger.classList.add("bg-white");

      hamburger.removeAttribute("fill");
      hamburger.setAttribute("fill", "#FFFFFF");
    } else if (sidebar.classList.contains("left-0")) {
      sidebar.classList.remove("left-0");
      sidebar.classList.add("-left-full");

      hamburger.removeAttribute("fill");
      hamburger.setAttribute("fill", "#000000");
    }
  };

  if (windowSize > 450) {
    return (
      <div className="container flex">
        <div className="sidebar-container w-44 max-w-44 min-h-screen bg-black pt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-16 mx-auto"
          >
            <path
              fill="#ffffff"
              d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z"
            />
          </svg>
          <p className="text-white text-center">Admin</p>

          <div className="icons-wrapper flex flex-col items-center">
            <div className="icon-wrapper w-12 h-12 rounded-full mt-32 flex items-center">
              <Link to="/" className="mx-auto" title="Data">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-5"
                >
                  <path
                    fill="#ffffff"
                    d="M465.4 192L431.1 144L209 144L174.7 192L465.4 192zM96 212.5C96 199.2 100.2 186.2 107.9 175.3L156.9 106.8C168.9 90 188.3 80 208.9 80L431 80C451.7 80 471.1 90 483.1 106.8L532 175.3C539.8 186.2 543.9 199.2 543.9 212.5L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 212.5z"
                  />
                </svg>
              </Link>
            </div>
            <div className="icon-wrapper w-12 h-12 rounded-full mt-3 flex items-center">
              <Link to="/table" className="mx-auto" title="Tables">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-5 "
                >
                  <path
                    fill="#ffffff"
                    d="M352 224L352 320L480 320L480 224L352 224zM288 224L160 224L160 320L288 320L288 224zM96 384L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 384zM480 384L352 384L352 480L480 480L480 384zM288 480L288 384L160 384L160 480L288 480z"
                  />
                </svg>
              </Link>
            </div>
            <div className="icon-wrapper w-12 h-12 rounded-full mt-3 flex items-center">
              <button onClick={logout} className="mx-auto" title="Logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-5"
                >
                  <path
                    fill="#ffffff"
                    d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  } else {
    return (
      <div className="container">
        <button className="absolute mt-2 z-50" onClick={openMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-12"
          >
            <path
              id="hamburger"
              fill="#000000"
              className="bg-black transition-all duration-600 ease-out"
              d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"
            />
          </svg>
        </button>
        <div
          id="sidebar"
          className="sidebar absolute w-64 h-screen bg-black -left-full transition-all duration-300 ease-out flex justify-center"
        >
          <div className="sidebar-container bg-black pt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-16 mx-auto"
            >
              <path
                fill="#ffffff"
                d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z"
              />
            </svg>
            <p className="text-white text-center">Admin</p>

            <div className="icons-wrapper flex flex-col items-center">
              <div className="icon-wrapper w-12 h-12 rounded-full mt-32 flex items-center">
                <Link to="/" className="mx-auto" title="Data">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-5"
                  >
                    <path
                      fill="#ffffff"
                      d="M465.4 192L431.1 144L209 144L174.7 192L465.4 192zM96 212.5C96 199.2 100.2 186.2 107.9 175.3L156.9 106.8C168.9 90 188.3 80 208.9 80L431 80C451.7 80 471.1 90 483.1 106.8L532 175.3C539.8 186.2 543.9 199.2 543.9 212.5L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 212.5z"
                    />
                  </svg>
                </Link>
              </div>
              <div className="icon-wrapper w-12 h-12 rounded-full mt-3 flex items-center">
                <Link to="/table" className="mx-auto" title="Tables">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-5 "
                  >
                    <path
                      fill="#ffffff"
                      d="M352 224L352 320L480 320L480 224L352 224zM288 224L160 224L160 320L288 320L288 224zM96 384L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 384zM480 384L352 384L352 480L480 480L480 384zM288 480L288 384L160 384L160 480L288 480z"
                    />
                  </svg>
                </Link>
              </div>
              <div className="icon-wrapper w-12 h-12 rounded-full mt-3 flex items-center">
                <button onClick={logout} className="mx-auto" title="Logout">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-5"
                  >
                    <path
                      fill="#ffffff"
                      d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }
};

export default Layout;
