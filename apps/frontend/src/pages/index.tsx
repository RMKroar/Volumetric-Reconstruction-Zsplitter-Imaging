import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8000/deconv-result");
    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  return (
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
  );
};

export default Home;
