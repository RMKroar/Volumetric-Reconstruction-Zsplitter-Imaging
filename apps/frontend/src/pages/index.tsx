import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<number[][][] | undefined>(undefined);

  const fetchData = async () => {
    interface IResponse {
      result: string;
    }

    setLoading(true);
    const response = await fetch("http://localhost:8000/deconv-result");
    const resJson = (await response.json()) as IResponse;
    const result = JSON.parse(resJson.result ?? "[[[]]]");
    setData(result);
    console.log(result);
    setLoading(false);
  };

  const VolumeCanvas = dynamic(() => import("../components/volumeCanvas"), {
    ssr: false, // Prevent server-side rendering
  });

  return (
    <>
      {data ? (
        <VolumeCanvas data={data} />
      ) : (
        <div className="p-4">
          <button
            className="px-4 py-2 mb-2 bg-slate-700 rounded-lg hover:bg-slate-900 text-white cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Deconvolution Result"}
          </button>
          {data && <p>{JSON.stringify(data)}</p>}
        </div>
      )}
    </>
  );
};

export default Home;
