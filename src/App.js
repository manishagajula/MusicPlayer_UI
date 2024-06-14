import "./App.css";
import { Sidebar } from "./Components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { MusicPlayer } from "./Components/MusicPlayer";

function App() {
  const [data, setData] = useState([]);
  const [selectedObj, setSelectedObj] = useState({});
  const [selectedfilter, setSelectedFilter] = useState([]);
  const [songIndex, setSongIndex] = useState(0);
  const [search, setsearch] = useState("");

  const sidebarData = async () => {
    try {
      const response = await axios?.get(
        "https://cms.samespace.com/items/songs"
      );
      console.log(response);
      if (response?.status === 200) {
        setData(response.data.data);
        setSelectedFilter(response.data.data);
        setSelectedObj(response?.data?.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("here");
    sidebarData();
  }, []);

  return (
    <div
      className={`lg:w-[1440px] lg:h-[900px] w-screen h-screen`}
      style={{
        background:
          selectedObj.accent ||
          "linear-gradient(108.18deg, #201606 2.46%, #000000 99.84%)",
        transition: "background 0.5s ease",
      }}
      onClick={() => setsearch("")}
    >
      <div className="lg:flex lg:flex-row flex flex-col">
        <Sidebar
          data={data}
          setData={setData}
          setSelectedObj={setSelectedObj}
          selectedfilter={selectedfilter}
          setSelectedFilter={setSelectedFilter}
          setSongIndex={setSongIndex}
          setsearch={setsearch}
          search={search}
        />

        <MusicPlayer
          data={data}
          setData={setData}
          selectedObj={selectedObj}
          setSelectedObj={setSelectedObj}
          selectedfilter={selectedfilter}
          songIndex={songIndex}
          setSongIndex={setSongIndex}
        />
      </div>
    </div>
  );
}

export default App;
