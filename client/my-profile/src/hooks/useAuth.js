// Mock authentication function to check if user is logged in
export const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
