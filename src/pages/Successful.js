import { useNavigate } from "react-router-dom";

function Successful() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-xl font-bold">Payment successful!</div>
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default Successful;
