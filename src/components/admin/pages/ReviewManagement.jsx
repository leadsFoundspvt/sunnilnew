import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FaEdit, FaTrash, FaStar, FaTimes } from "react-icons/fa";

const ReviewManagement = () => {
  const {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getReviewStats,
  } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviews(page, 10);
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);

      const statsResponse = await getReviewStats();
      setStats(statsResponse.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to fetch reviews",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const handleOpenDialog = (review = null) => {
    setCurrentReview(
      review || {
        name: "",
        rating: 0,
        title: "",
        comment: "",
        status: "pending",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentReview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReview({ ...currentReview, [name]: value });
  };

  const handleRatingChange = (value) => {
    setCurrentReview({ ...currentReview, rating: value });
  };

  const handleStatusChange = (e) => {
    setCurrentReview({ ...currentReview, status: e.target.value });
  };

  const handleSubmit = async () => {
    // Client-side validation
    if (
      !currentReview.name ||
      !currentReview.rating ||
      !currentReview.title ||
      !currentReview.comment
    ) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    if (currentReview.rating < 1 || currentReview.rating > 5) {
      setSnackbar({
        open: true,
        message: "Rating must be between 1 and 5",
        severity: "error",
      });
      return;
    }

    try {
      if (currentReview._id) {
        await updateReview(currentReview._id, currentReview);
        setSnackbar({
          open: true,
          message: "Review updated successfully",
          severity: "success",
        });
      } else {
        await createReview({
          name: currentReview.name,
          rating: currentReview.rating,
          title: currentReview.title,
          comment: currentReview.comment,
          ...(currentReview.status && { status: currentReview.status }),
        });
        setSnackbar({
          open: true,
          message:
            "Review created successfully. It will be published after approval.",
          severity: "success",
        });
      }
      fetchReviews();
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Operation failed",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setSnackbar({
        open: true,
        message: "Review deleted successfully",
        severity: "success",
      });
      fetchReviews();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete review",
        severity: "error",
      });
    }
  };

  // Custom Star Rating Component
  const StarRating = ({ rating, onChange, readOnly = false }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => !readOnly && onChange(star)}
            className={`text-${
              rating >= star ? "yellow-400" : "gray-300"
            } text-xl`}
            disabled={readOnly}
          >
            <FaStar />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Review Management</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-lg font-semibold">
          Total Reviews: {stats.totalReviews || 0} | Average Rating:{" "}
          {stats.averageRating?.toFixed(1) || 0}
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => handleOpenDialog()}
        >
          Add New Review
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <tr key={review._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {review.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {review.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StarRating rating={review.rating} readOnly />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {review.comment}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              review.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : review.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {review.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            onClick={() => handleOpenDialog(review)}
                          >
                            <FaEdit className="inline" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete(review._id)}
                          >
                            <FaTrash className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No reviews found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <button
                      key={pageNum}
                      className={`px-3 py-1 rounded-md ${
                        page === pageNum
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal/Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {currentReview?._id ? "Edit Review" : "Add New Review"}
              </h2>
              <button
                onClick={handleCloseDialog}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentReview?.name || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentReview?.title || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Review title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <StarRating
                  rating={currentReview?.rating || 0}
                  onChange={handleRatingChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment *
                </label>
                <textarea
                  name="comment"
                  rows="4"
                  value={currentReview?.comment || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your experience..."
                  required
                ></textarea>
              </div>

              {/* Only show status field for admin edits */}
              {currentReview?._id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentReview?.status || "pending"}
                    onChange={handleStatusChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleSubmit}
              >
                {currentReview?._id ? "Update" : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar/Toast */}
      {snackbar.open && (
        <div
          className={`fixed top-4 right-4 z-50 transition-transform duration-300 ${
            snackbar.open ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          <div
            className={`px-6 py-4 rounded-lg shadow-lg flex items-center ${
              snackbar.severity === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span>{snackbar.message}</span>
            <button
              className="ml-4 text-lg"
              onClick={() => setSnackbar({ ...snackbar, open: false })}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewManagement;
