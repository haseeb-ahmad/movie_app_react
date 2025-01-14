import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-[#093545]">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          Your movie list is empty
        </h2>
        <button
          onClick={() => navigate("/movie/new")}
          className="bg-[#2BD17E] text-white px-6 py-3 rounded"
        >
          Add a new movie
        </button>
      </div>
      <Footer />
    </div>
  );
}
