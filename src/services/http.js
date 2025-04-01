import axios from "axios";

const publicEndpoints = [
  "/v1/products/only-discount",
  "/v1/products/info/all",
  "/another-public-endpoint",
];


const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Kiểm tra nếu endpoint thuộc danh sách public
  const isPublicEndpoint = publicEndpoints.some((endpoint) =>
    config.url.includes(endpoint)
  );

  if (!isPublicEndpoint && token) {
    // Gắn Authorization header nếu không phải endpoint public
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response);
    return Promise.reject(error);
  }
);

export default http;
