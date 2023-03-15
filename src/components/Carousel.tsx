import axios from "axios";
import { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { chunk } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

interface Item {
  type: string;
  id: string;
  attributes: {
    file: string;
    title: string;
    colors: {
      primary: string | null;
      dominant: string | null;
    };
    source: {
      name: string;
      url: string;
    };
    dimens: {
      height: number;
      width: number;
      aspectRatio: number | null;
    };
    isOriginal: boolean;
    verificationStatus: string;
    ageRating: string;
    timestamps: {
      created: string;
      updated: string;
    };
  };
  relationships: {
    uploader: {
      links: {
        self: string;
        related: string;
      };
      data: {
        type: string;
        id: string;
      };
    };
    artist: {
      links: {
        self: string;
        related: string;
      };
      data: null;
    };
    categories: {
      meta: {
        count: number;
      };
      data: {
        type: string;
        id: string;
      }[];
      links: {
        self: string;
        related: string;
      };
    };
    characters: {
      meta: {
        count: number;
      };
      data: {
        type: string;
        id: string;
      }[];
      links: {
        self: string;
        related: string;
      };
    };
    likedBy: {
      meta: {
        count: number;
      };
      data: {
        type: string;
        id: string;
      }[];
      links: {
        self: string;
        related: string;
      };
    };
  };
  links: {
    self: string;
  };
}

const getResults = async (offset: number): Promise<Item[]> => {
  const { data } = await axios.get(
    `https://api.nekosapi.com/v2/images?page[limit]=25&page[offset]=${offset}`,
    {
      headers: {
        Accept: "application/vnd.api+json",
      },
    }
  );

  return data.data;
};

export default function Carousel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    getResults(0).then((res) => {
      const chunks = chunk(res, 3);
      setData(chunks.map((chunk) => chunk.map((item) => item.attributes.file)));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-violet-600 lg:w-1/3 lg:mb-0 mb-4">
            2D Waifus Are Real!
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Please Report If You Find Any Irrelevent Images, Some Images May Be
            NSFW
          </p>
          <div className="flex flex-wrap md:ml-auto -mx-2 lg:mt-0 mt-2 -mb-10 md:mb-0 space-x-10">
            <div className="flex justify-center">
              <a
                href="https://nekosapi.com"
                target="_blank"
                rel="noreferrer"
                className="text-violet-500 hover:text-violet-600"
              >
                <span className="flex items-center">
                  <p className="text-xl font-semibold">Powered By NekosAPI</p>
                  <FiExternalLink className="ml-2" />
                </span>
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href="https://github.com/Oreki-Dev/Waifu-List"
                target="_blank"
                rel="noreferrer"
                className="text-violet-500 hover:text-violet-600"
              >
                <span className="flex items-center">
                  <p className="text-xl font-semibold">Star On Github</p>
                  <FiExternalLink className="ml-2" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <InfiniteScroll
          className="flex flex-wrap md:-m-2 -m-1"
          dataLength={data.length}
          next={() => {
            getResults(data.length * 3).then((res) => {
              let chunks = chunk(res, 3);

              setData([
                ...data,
                ...chunks.map((chunk) =>
                  chunk.map((item) => item.attributes.file)
                ),
              ]);
            });
          }}
          hasMore={true}
          loader={
            <div className="mt-20 flex justify-center w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-violet-400 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-violet-400 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-violet-400 rounded"></div>
                    <div className="h-4 bg-violet-400 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          }
          endMessage={
            <div className="mt-20 flex justify-center w-full">
              <p className="text-xl text-violet-500 font-semibold">
                Yay! You have seen it all
              </p>
            </div>
          }
          scrollThreshold={0.9}
        >
          {data.map((chunk, index) => (
            <div key={index} className="flex flex-wrap w-1/2">
              {chunk.map((image, index) =>
                index === chunk.length - 1 ? (
                  <div key={index} className="md:p-2 p-1 w-full">
                    <img
                      alt="gallery"
                      className="w-full h-full object-cover object-center block"
                      src={image}
                    />
                  </div>
                ) : (
                  <div key={index} className="md:p-2 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full object-cover h-full object-center block"
                      src={image}
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );
}
