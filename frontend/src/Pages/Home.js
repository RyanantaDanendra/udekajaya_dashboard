import { useState, useEffect } from "react";
import "../App.css";
import Layout from "../Components/Layout";
import Modal from "../Components/Modal";

const Home = ({}) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [isJumlah, setIsJumlah] = useState(false);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await fetch("http://localhost:4000/foods", {
          method: "GET",
        });

        const json = await response.json();

        if (!response.ok) {
          console.log(json.error.message);
        }

        if (response.ok) {
          setFoods(json);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFoods();
  }, []);

  const openModal = (isTrue) => {
    const modal = document.getElementById("modal");

    modal.classList.remove("opacity-0", "pointer-event-none");
    modal.classList.add("opacity-100", "pointer-events-auto");

    setIsJumlah(isTrue);
  };

  const displayData = foods.map((food, index) => (
    <div
      className="card-container w-56 h-40 rounded-lg border-2 border-black pt-7 ps-4 pe-4"
      style={{ backgroundColor: "#E4EFE7" }}
    >
      <h2 className="text-3xl">{food.nama}</h2>
      <div className="flex justify-between items-center">
        <h5 className="text-md mt-3">Jumlah: {food.jumlah}</h5>
        <button onClick={() => openModal(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-5 mt-4"
          >
            <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h5 className="text-md">Harga: {food.harga}</h5>
        <button onClick={() => openModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-5"
          >
            <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
          </svg>
        </button>
      </div>
    </div>
  ));

  return (
    <Layout>
      <div className="ps-10">
        <h1 className="text-3xl mt-12">Produk</h1>
        <button onClick={openModal}>Test</button>
        <div className="cards-wrapper flex flex-wrap gap-4 mt-8">
          {displayData}
        </div>
      </div>
      <Modal>
        {isJumlah ? (
          <>
            <h1>Edit Jumlah</h1>
          </>
        ) : (
          <>
            <h1>Edit Harga</h1>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default Home;
