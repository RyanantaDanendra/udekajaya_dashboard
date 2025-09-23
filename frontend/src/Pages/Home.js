import { useState, useEffect } from "react";
import "../App.css";
import Layout from "../Components/Layout";
import Modal from "../Components/Modal";
import Swal from "sweetalert2";

const Home = ({ setUser }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [isJumlah, setIsJumlah] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const appUrl = process.env.REACT_APP_APPURL;

  const [foodId, setFoodId] = useState(null);

  let timerInterval = 0;

  const [jumlah, setJumlah] = useState("");
  const [harga, setHarga] = useState("");
  const [nama, setNama] = useState("");

  const getFoods = async (searchTerm = "") => {
    try {
      const response = await fetch(`${appUrl}/foods?search=${searchTerm}`, {
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
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFoods();
  }, [success]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    getFoods(e.target.value);
  };

  const openModal = (isTrue, id) => {
    const modal = document.getElementById("modal");

    setSuccess(false);
    setFoodId(id);

    modal.classList.remove("opacity-0", "pointer-event-none");
    modal.classList.add("opacity-100", "pointer-events-auto");

    setIsJumlah(isTrue);
  };

  const openAddModal = () => {
    const modal = document.getElementById("modal");

    modal.classList.remove("opacity-0", "pointer-event-none");
    modal.classList.add("opacity-100", "pointer-events-auto");
    setIsClicked(true);
    setIsJumlah(false);
  };

  const editJumlah = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${appUrl}/foods/editJumlah/${foodId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jumlah }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error.message);
      }

      if (response.ok) {
        Swal.fire({
          title: "Data Berhasil Di Edit!",
          icon: "success",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        setSuccess(true);
        setJumlah("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const editHarga = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${appUrl}/foods/editHarga/${foodId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ harga }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error.message);
      }

      if (response.ok) {
        Swal.fire({
          title: "Data Berhasil Di Edit!",
          icon: "success",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            setError("I was closed by the timer");
          }
        });

        setSuccess(true);
        setHarga("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteData = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${appUrl}/foods/deleteFood/${id}`, {
            method: "DELETE",
          });

          const json = await response.json();

          if (!response.ok) {
            console.log(json.error.message);
          }

          if (response.ok) {
            Swal.fire({
              title: "Data Berhasil Di Hapus!",
              icon: "success",
              html: "<b></b> milliseconds.",
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            });
            setSuccess(true);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  const displayData = foods.map((food, index) => (
    <div
      className="card-container w-56 h-40 rounded-lg border-2 border-black pt-7 ps-4 pe-4"
      style={{ backgroundColor: "#E4EFE7" }}
    >
      <div className="flex justify-between">
        <h2 className="text-3xl">{food.nama}</h2>
        <form onSubmit={(e) => deleteData(e, food._id)}>
          <button title="Hapus Data" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-7"
            >
              <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
            </svg>
          </button>
        </form>
      </div>
      <div className="flex justify-between items-center">
        <h5 className="text-md mt-3">Jumlah: {food.jumlah}</h5>
        <button onClick={() => openModal(true, food._id)}>
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
        <h5 className="text-md">Harga: {food.harga}/g</h5>
        <button onClick={() => openModal(false, food._id)}>
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

  const addData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${appUrl}/foods/addFood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, jumlah, harga }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error.message);
      }

      if (response.ok) {
        Swal.fire({
          title: "Data Berhasil Di Tambah!",
          icon: "success",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            setError("I was closed by the timer");
          }
        });

        setNama("");
        setJumlah("");
        setHarga("");
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout setUser={setUser}>
      <div className="lg:ps-10 w-full">
        <div className="flex lg:justify-between lg:items-center pe-9 w-full flex-col items-center">
          <h1 className="text-3xl mt-12">Produk</h1>
          <div className="mt-10 flex">
            <input
              placeholder="Search . . ."
              className="border-2 border-black w-56 border-r-0 rounded-l focus:outline-none"
              value={search}
              onChange={handleSearch}
            />
            <button className="border-2 border-black border-l-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="w-5"
              >
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="cards-wrapper flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
          {displayData}
          <div
            onClick={openAddModal}
            className="card-container w-56 h-40 rounded-lg border-2 border-black flex justify-center opacity-75 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-16"
            >
              <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
            </svg>
          </div>
        </div>
      </div>
      <Modal success={success}>
        {isJumlah ? (
          <div className="flex flex-col items-center">
            <h1 className="text-center mt-7 text-2xl font-bold">Edit Jumlah</h1>
            <form className="mt-20" onSubmit={editJumlah}>
              <input
                name="jumlah"
                id="jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                placeholder="Jumlah Baru. . ."
                className="block border-b-2 border-b-black"
              />
              <div className="button-wrapper flex justify-center">
                <button
                  type="submit"
                  className="mt-8 w-28 h-16 rounded-full text-white"
                  style={{ backgroundColor: "#99BC85" }}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        ) : isClicked && !isJumlah ? (
          <div className="flex flex-col pb-8">
            <h1 className="text-center mt-7 text-2xl font-bold">Tambah Data</h1>
            <form className="mt-10 ps-7" onSubmit={addData}>
              <label htmlFor="nama">Nama</label>
              <input
                name="nama"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="block border-b-2 border-b-black bg-gray-100 w-56 mb-5"
              />
              <label htmlFor="jumlah">Jumlah</label>
              <input
                name="jumlah"
                id="jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                className="block border-b-2 border-b-black bg-gray-100 w-56 mb-5"
              />
              <label htmlFor="harga">Harga</label>
              <input
                name="harga"
                id="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="block border-b-2 border-b-black bg-gray-100 w-56"
              />
              <div className="button-wrapper">
                <button
                  type="submit"
                  className="mt-8 w-28 h-16 rounded-full text-white"
                  style={{ backgroundColor: "#99BC85" }}
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        ) : !isJumlah ? (
          <div className="flex flex-col items-center">
            <h1 className="text-center mt-7 text-2xl font-bold">Edit Harga</h1>
            <form className="mt-20" onSubmit={editHarga}>
              <input
                name="harga"
                id="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Harga Baru. . ."
                className="block border-b-2 border-b-black"
              />
              <div className="button-wrapper flex justify-center">
                <button
                  type="submit"
                  className="mt-8 w-28 h-16 rounded-full text-white"
                  style={{ backgroundColor: "#99BC85" }}
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </Modal>
      <h1>{error && `${error}`}</h1>
    </Layout>
  );
};

export default Home;
