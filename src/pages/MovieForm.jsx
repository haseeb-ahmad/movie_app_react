import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, updateMovie, addMovie } from "../store/movieSlice.js";
import { LuDownload } from "react-icons/lu";
import { TailSpin } from "react-loader-spinner";
import { FaTimes } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";

export default function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, movie } = useSelector((state) => state.movies);

  const [formData, setFormData] = useState({
    title: "",
    publishingYear: "",
    video: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({ title: "", publishingYear: "", video: "" });


  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));;
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (movie && !isLoading) {
      setFormData({
        title: movie.title || "",
        publishingYear: movie.publishing_year || "",
        video: null, // You might want to fetch the video file if needed.
      });
      setPreview(movie.video_url || null); // If the movie has a preview URL.
    }
  }, [movie, isLoading]);

  useEffect(() => {
    setPreview(null); // Reset preview when ID changes
  }, [id]);


  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("video/")) {
      setErrors((prevErrors) => ({ ...prevErrors, video: "Only video files are allowed." }));
      return;
    }
    setErrors((prevErrors) => ({ ...prevErrors, video: "" }));
    setFormData((prevData) => ({ ...prevData, video: file }));
    const videoURL = URL.createObjectURL(file);
    setPreview(videoURL);
  };

  // validate seprately
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, title: value }));

    // Validate title on change
    const newErrors = { ...errors, title: "" };
    if (!value.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
  };

  const handlePublishingYearChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, publishingYear: value }));

    // Validate publishing year on change
    const newErrors = { ...errors, publishingYear: "" };
    const year = parseInt(value, 10);
    if (
      !value.trim() ||
      isNaN(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      newErrors.publishingYear = `Please enter a valid year between 1900 and ${new Date().getFullYear()}`;
    }
    setErrors(newErrors);
  };

  // validate form completely 
  const validateForm = () => {
    const newErrors = { title: "", publishingYear: "", video: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    const year = parseInt(formData.publishingYear, 10);
    if (
      isNaN(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      newErrors.publishingYear = `Please enter a valid year between 1900 and ${new Date().getFullYear()}`;
      isValid = false;
    }

    if (!formData.video && !preview && !id) {
      newErrors.video = "Video is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("form validated");
    } else {
      console.log("form not valid");
      return;
    }
    if (!validateForm()) {
      return;
    }
    const movieData = new FormData();
    movieData.append("movie[title]", formData.title);
    movieData.append("movie[publishing_year]", formData.publishingYear);

    if (formData.video) {
      movieData.append("movie[video]", formData.video);
    }
    if (id) {
      dispatch(updateMovie({ id, movie: movieData }));
    } else {
      dispatch(addMovie(movieData));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#093545]">
      <Header />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TailSpin height={80} width={80} color="#2BD17E" />
        </div>
      )}
      <div className="flex flex-col mt-8 px-6 sm:px-12 md:px-20 lg:px-32">
        <h1 className="text-2xl font-bold mb-4 text-white">
          {id ? "Edit Movie" : "Create a New Movie"}
        </h1>

        <form className="flex flex-col sm:flex-row gap-8 sm:gap-16">
          <div className="flex flex-col items-center mb-8 sm:mb-12 w-full sm:w-[350px]">
            <label className="h-[300px] sm:h-[350px] w-full border-dashed border-2 border-gray-400 flex flex-col items-center justify-center cursor-pointer relative">
              {preview ? (
                <div className="relative w-full h-full">
                  <video controls className="h-full w-full object-cover">
                    <source src={preview} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData((prevData) => ({ ...prevData, video: null }));
                      setErrors((prevErrors) => ({ ...prevErrors, video: "" }));
                    }}
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <LuDownload size={40} className="text-white mb-4" />
                  <p className="text-white text-sm">Drop a video here or click to upload</p>
                </div>
              )}
              <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
            </label>

            {errors.video && (
              <p className="text-red-500 text-sm mt-2 text-center">{errors.video}</p>
            )}
          </div>

          <div className="flex flex-col flex-grow gap-4 sm:gap-6">
            <div className="mb-2 w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={handleTitleChange}
                className={`w-full p-3 rounded bg-[#224957] text-white placeholder-white focus:outline-none placeholder:text-xs ${errors.title ? "border-2 border-red-500" : "border-transparent"
                  }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            <div className="mb-2 w-full sm:w-1/4">
              <input
                type="number"
                placeholder="Publishing Year"
                value={formData.publishingYear}
                onChange={handlePublishingYearChange}
                className={`w-full p-3 rounded bg-[#224957] text-white placeholder-white focus:outline-none no-spin placeholder:text-xs ${errors.publishingYear ? "border-2 border-red-500" : "border-transparent"
                  }`}
              />
              {errors.publishingYear && (
                <p className="text-red-500 text-sm mt-2">{errors.publishingYear}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-white text-white rounded w-full sm:w-1/4 overflow-hidden text-ellipsis whitespace-nowrap"
                onClick={() => navigate("/movies")}
              >
                <span className="block truncate">
                  Cancel
                </span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 text-white bg-[#2BD17E] rounded w-full sm:w-1/4 overflow-hidden text-ellipsis whitespace-nowrap"
                disabled={isLoading}
              >
                <span className="block truncate">
                  {id ? "Update" : "Submit"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
