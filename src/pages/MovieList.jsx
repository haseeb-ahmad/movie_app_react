import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { fetchMovies, deleteMovie } from "/src/store/movieSlice.js";
import EmptyState from "./EmptyState";
import { FaEllipsisH, FaEdit, FaTrashAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TailSpin } from "react-loader-spinner";

export default function MovieList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies, meta, isLoading } = useSelector((state) => state.movies);
  const [showOptions, setShowOptions] = useState(null);
  const [playingMovieId, setPlayingMovieId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(meta.current_page || 1);
  const itemsPerPage = meta.per_page || 8;


  // Fetch movies from the backend API
  useEffect(() => {
    dispatch(fetchMovies({ currentPage, itemsPerPage }));

  }, [dispatch, currentPage, itemsPerPage]);

  // Handle pagination page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // Open dropdown menu
  const handleOpenOptions = (event, movieId) => {
    setAnchorEl({ target: event.currentTarget, id: movieId });
  };

  // Close dropdown menu
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  // Function to delete a movie
  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
    handleCloseOptions();
  };


  // Play video
  const handlePlay = (movieId) => {
    setPlayingMovieId(movieId);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (anchorEl && !anchorEl.target.contains(event.target)) {
        handleCloseOptions();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [anchorEl]);

  return (
    <div className="flex flex-col min-h-screen bg-[#093545]">
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TailSpin height={80} width={80} color="#2BD17E" />
        </div>
      ) : movies.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex-grow flex flex-col">
          <Header />

          {/* Movie Grid with Responsive Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 px-4 sm:px-6 lg:px-8">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#093545] hover:bg-[#092C39] shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 relative h-52"
              >
                {/* Thumbnail or Video */}
                <div onClick={() => handlePlay(movie.id)} className="cursor-pointer">
                  {playingMovieId === movie.id ? (
                    <video
                      className="w-full h-32 object-cover"
                      preload="metadata"
                      poster={movie.poster_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxz5q9p-OqwrHewanJRwJTeD29W2_DcuS9qw&s"}
                      controls
                      autoPlay
                    >
                      <source src={movie.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={movie.poster_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxz5q9p-OqwrHewanJRwJTeD29W2_DcuS9qw&s"}
                      alt={movie.title}
                      className="w-full h-32 object-cover"
                    />
                  )
                  }
                </div>

                {/* Movie Info */}
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-white truncate">{movie.title}</h3>
                  <p className="text-xs text-white mt-1">Status: {movie.status}</p>
                  <p className="text-xs text-white mt-1">{movie.publishing_year}</p>
                </div>

                {/* Options */}
                <button
                  onClick={(event) => handleOpenOptions(event, movie.id)}
                  className="absolute top-2 right-2 text-white p-1"
                >
                  <FaEllipsisH size={18} />
                </button>
                {anchorEl && anchorEl.id === movie.id && (
                  <div className="absolute top-8 right-2 w-28 bg-white shadow-md rounded-lg p-2">
                    <button
                      onClick={() => navigate(`/movie/${movie.id}/edit`)}
                      className="w-full text-left text-blue-500 hover:bg-gray-100 rounded px-2 py-1 text-sm"
                    >
                      <FaEdit size={14} className="inline-block mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="w-full text-left text-red-500 hover:bg-gray-100 rounded px-2 py-1 text-sm"
                    >
                      <FaTrashAlt size={14} className="inline-block mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Pagination positioned at the bottom, independent of content length */}
          <div className="fixed bottom-14 left-0 right-0 flex justify-center z-20 px-4 sm:px-6 lg:px-8 mt-0">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={meta.total_pages || 1}
              onPageChange={handlePageChange}
              containerClassName="flex gap-2"
              pageClassName="px-3 py-1 border border-gray-400 rounded-md text-white cursor-pointer hover:bg-[#2BD17E]"
              activeClassName="bg-[#2BD17E] text-white"
              previousClassName="px-3 py-1 border border-gray-400 rounded-md text-white cursor-pointer hover:bg-[#2BD17E]"
              nextClassName="px-3 py-1 border border-gray-400 rounded-md text-white cursor-pointer hover:bg-[#2BD17E]"
              disabledClassName="opacity-50 cursor-not-allowed"
              renderOnZeroPageCount={null}
              forcePage={currentPage - 1}
            />
          </div>
          <Footer />
        </div>
      )}
    </div>);
}
