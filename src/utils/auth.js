const USERS = [
  { email: "admin1@entnt.com", password: "admin123", role: "Admin1" },
  { email: "admin2@entnt.com", password: "admin123", role: "Admin2" },
  { email: "admin3@entnt.com", password: "admin123", role: "Admin3" },
];

export const login = (email, password) => {
  const user = USERS.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Invalid credentials" };
};
export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user?.role === role;
};
