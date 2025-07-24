import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";

// Create Auth Context
export const AuthContext = createContext();

const API_BASE_URL = "http://localhost:3010/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutRef = useRef(() => {});

  // Memoized setAuthToken with stable reference
  const setAuthToken = useCallback((token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, []);

  // Memoized logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    api.post("/admin/logout").catch(console.error);
  }, [setAuthToken]);

  // Set logout reference during render
  logoutRef.current = logout;

  // Add response interceptor to handle token expiration
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logoutRef.current();
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setAuthToken(token);
        try {
          const response = await api.get("/admin/profile");
          setUser(response.data.admin);
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
          }
          console.error("Authentication error:", error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [setAuthToken]);

  // Memoized login function
  const login = useCallback(
    async (credentials) => {
      try {
        const response = await api.post("/admin/login", credentials);
        const { token, admin } = response.data;

        localStorage.setItem("token", token);
        setAuthToken(token);
        setUser(admin);
        return admin;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },
    [setAuthToken]
  );

  // API functions (moved outside provider for clarity)
  // Admin Profile
  const getAdminProfile = () => api.get("/admin/profile");
  const updateAdminProfile = (profileData) =>
    api.put("/admin/profile", profileData);

  // Terms & Conditions
  const getTerms = () => api.get("/terms");
  const updateTerms = (termsData) => api.put("/terms", termsData);

  // Privacy Policy
  const getPrivacy = () => api.get("/privacy");
  const updatePrivacy = (privacyData) => api.put("/privacy", privacyData);

  // Blog Management
  const getBlogs = (page = 1, limit = 10) =>
    api.get(`/blogs?page=${page}&limit=${limit}`);

  const getBlogById = (id) => api.get(`/blogs/${id}`);
  const getBlogBySlug = (slug) => api.get(`/blogs/slug/${slug}`);

  const createBlog = (blogData) => api.post("/blogs", blogData);
  const updateBlog = (id, blogData) => api.put(`/blogs/${id}`, blogData);
  const deleteBlog = (id) => api.delete(`/blogs/${id}`);

  // Reviews Management
  const getReviews = (page = 1, limit = 10) =>
    api.get(`/reviews?page=${page}&limit=${limit}`);

  const getReviewStats = () => api.get("/reviews/stats");
  const getReviewById = (id) => api.get(`/reviews/${id}`);

  const createReview = (reviewData) => api.post("/reviews", reviewData);
  const updateReview = (id, reviewData) =>
    api.put(`/reviews/${id}`, reviewData);
  const deleteReview = (id) => api.delete(`/reviews/${id}`);

  // System Health
  const checkHealth = () => api.get("/health");

  // Memoized context value
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
      // API methods
      getAdminProfile,
      updateAdminProfile,
      getTerms,
      updateTerms,
      getPrivacy,
      updatePrivacy,
      getBlogs,
      getBlogById,
      getBlogBySlug,
      createBlog,
      updateBlog,
      deleteBlog,
      getReviews,
      getReviewStats,
      getReviewById,
      createReview,
      updateReview,
      deleteReview,
      checkHealth,
    }),
    [user, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
