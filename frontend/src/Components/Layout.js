import "../App.css";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
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
            <Link to="/" className="mx-auto">
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
            <Link to="/table" className="mx-auto">
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
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
