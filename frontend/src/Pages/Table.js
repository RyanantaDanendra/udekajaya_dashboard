import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import "../App.css";

const Table = () => {
  const [foods, setFoods] = useState([]);
  console.log(foods);

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
        console.log(error.message);
      }
    };

    getFoods();
  }, []);

  const displayData = foods.map((food, index) => (
    <tr className={`${index % 2 == 0 ? "bg-gray-200" : "bg-white"}`}>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">{food.nama}</td>
      <td className="text-center">{food.jumlah}</td>
      <td>{food.harga}</td>
      <td>{food.totalHarga}</td>
    </tr>
  ));

  return (
    <Layout>
      <div className="w-full ps-10 pe-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl mt-12">Table</h1>
          <button className="p-0 mt-7" title="Simpan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-9"
            >
              <path
                fill="#000000"
                d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 237.3C544 220.3 537.3 204 525.3 192L448 114.7C436 102.7 419.7 96 402.7 96L160 96zM192 192C192 174.3 206.3 160 224 160L384 160C401.7 160 416 174.3 416 192L416 256C416 273.7 401.7 288 384 288L224 288C206.3 288 192 273.7 192 256L192 192zM320 352C355.3 352 384 380.7 384 416C384 451.3 355.3 480 320 480C284.7 480 256 451.3 256 416C256 380.7 284.7 352 320 352z"
              />
            </svg>
          </button>
        </div>

        <div className="form-wrapper flex justify-center mt-8">
          <table>
            <tr>
              <th className="w-12">No.</th>
              <th className="w-32">Nama</th>
              <th className="w-32">Jumlah</th>
              <th className="w-32">Harga/g</th>
              <th className="w-32">Total Harga</th>
            </tr>
            {displayData}
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Table;
