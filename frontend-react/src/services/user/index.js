/**
 *  Check if the user is already logged in and the cookie token is valid
 */

export const verifyTokenQuery = async () => {
  const res = await fetch("/api/user/verify");

  return res.json();
};

/** Resgistation of the user */

export const registerUser = async (data) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.message || "Something went wrong during registration."
    );
  }

  return res.json();
};

/** Login user */

export const loginUser = async (data) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Invalid credentials");
  }

  return res.json();
}

/** Logout user */

export const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong during logout.");
  }

  return res.json();
}