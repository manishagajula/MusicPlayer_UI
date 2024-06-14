import { SearchIcon } from "../icons/searchIcon";
import { Logo } from "../icons/Logo";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const Sidebar = ({
  data,
  setData,
  setSelectedObj,
  selectedfilter,
  setSelectedFilter,
  setSongIndex,
  setsearch,
  search,
}) => {
  console.log({ das: data });
  console.log("render");

  const [allMusic, setAllMusic] = useState([]);

  const handleForYou = () => {
    const getForYouData = data?.filter(({ top_track }) => !top_track);
    console.log(getForYouData);
    setSelectedFilter(getForYouData);
  };

  const handleTopTracks = () => {
    console.log({ data });
    const getTopTracks = data?.filter(({ top_track }) => top_track);
    setSelectedFilter(getTopTracks);
    console.log(getTopTracks);
  };

  console.log({ selectedfilter });
  return (
    <div className="lg:relative hidden lg:block">
      <div className="flex flex-col items-center justify-between w-full mt-8 h-[780px]">
        <div className="ml-[32px]">
          <Logo />
        </div>
        <div className="text-black opacity-100">
          <img
            src="https://s3-alpha-sig.figma.com/img/4b1c/9272/23674d7d0fc7e5938c32787f13738353?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EKm7mUGAUiXUID9MpPZaWNxz3o~XoB~CvK5~tiJJ-zGkWg5unOEg0GO04tOl9bmn4Q5pWNEpCc08mOOAJJZjxsXko9VXF6llT8NnK3QPmU2RVL5o7PIgWmFcNik43crBhyqtx26lDMborCqDDLsiXJD0WSxLCnsHuNbV1HTYfe-XlyOVgPuku~~ZYzAJH9Gjt1jBd3K2HHz-B8L6zd~B~WQyE3o3GZD8p~7ZohVaRaJi875ILzT-T2C0oGY-jykP6yploQovAUCLgd-rJZ53MPSko9uYX6b8wmBnjiA~L0CfAh3u-60Efhk4xXbPqu8E19B-V-bwfrDiT8NeBXWUsA__"
            alt="profile"
            className=" absolute top-[760px] left-[32px] h-[48px] w-[48px] rounded-full bg-black opacity-100 bottom-[32px]"
          />
        </div>
      </div>
      <div className="absolute top-[40px] left-[280px]">
        <div className="w-[258px] h-[32px] flex flex-row gap-10">
          {" "}
          <p
            className="w-[88px] h-[32px] .inter-font text-2xl leading-8 font-bold text-white"
            onClick={handleForYou}
          >
            For You
          </p>
          <p
            className="w-[130px] h-[32px] .inter-font font-bold text-2xl leading-8 text-white opacity-50"
            onClick={handleTopTracks}
          >
            Top Tracks
          </p>
        </div>

        <div className="flex items-center justify-between mt-8 mb-6 w-[400px] h-[48px] rounded-lg top-[104px] bg-white/10 px-4 py-2 left-[296px] ">
          <input
            type="text"
            placeholder="Search Song, Artist"
            className="w-full h-full .inter-font leading-7 text-lg outline-none font-normal text-white/60 bg-transparent"
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
              setAllMusic(() =>
                data.filter(
                  (obj) =>
                    obj.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) ||
                    obj.artist
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
          {search.length > 0 ? (
            <span onClick={() => setsearch("")}>
              <IoMdClose />
            </span>
          ) : (
            <SearchIcon />
          )}
          {search.length > 0 && allMusic.length > 0 && (
            <div className="w-[400px] h-[400px] overflow-scroll fixed top-[154px] left-[285px] bg-transparent backdrop-blur-xl z-10 px-4 py-2 rounded-lg">
              <ul>
                {allMusic.map((obj) => (
                  <li className="pt-[12px] pl-[16px] pb-[12px]  backdrop-blur-xl bg-transparent hover:bg-black	opacity-[60%] hover: text-white rounded-lg">
                    <div>
                      <div>
                        <img
                          src={`https://cms.samespace.com/assets/${obj.cover}`}
                          alt="Songbgcover"
                          className="h-[48px] w-[48px] rounded-[56px]"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-start w-[83px] h-[48px]">
                        <p className="text-white w-[153px] h-[24px] .inter-font font-normal text-lg	leading-6">
                          {obj.name}
                        </p>
                        <p className=" opacity-[60%] w-[112px] h-[24px] .inter-font leading-6 text-white font-normal	text-sm">
                          {obj.artist}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {search.length > 0 && allMusic.length === 0 && (
            <p>No Results Found</p>
          )}
        </div>
        <div className="">
          {selectedfilter?.map((obj, index) => (
            <ul
              className="w-[432px] h-[80px] rounded-lg flex flex-col items-start justify-between p-[16px]"
              onClick={() => {
                setSelectedObj(obj);
                setSongIndex(index);
              }}
            >
              <li
                key={obj.id}
                className="flex flex-row items-start justify-start mb-4 gap-[16px]"
              >
                <div className="flex flex-row gap-[16px]">
                  <div className=" ">
                    <img
                      src={`https://cms.samespace.com/assets/${obj.cover}`}
                      alt="Songbgcover"
                      className="h-[48px] w-[48px] rounded-[56px]"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start w-[83px] h-[48px]">
                    <p className="text-white w-[153px] h-[24px] .inter-font font-normal text-lg	leading-6">
                      {obj.name}
                    </p>
                    <p className=" opacity-[60%] w-[112px] h-[24px] .inter-font leading-6 text-white font-normal	text-sm">
                      {obj.artist}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between ml-[166px] text-white opacity-[60%] ">
                  4.16
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
