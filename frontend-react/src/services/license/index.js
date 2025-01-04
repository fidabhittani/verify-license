/**
 *  Get all licenses
 * @returns
 */
export const fetchLicense = async () => {
  const res = await fetch("/api/licenses");
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Invalid credentials");
  }

  return res.json();
};

/**
 *  Create license
 *
 */

export const createLicense = async (data) => {
  const res = await fetch("/api/licenses", {
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
};
/**
 *  Update license
 *
 */

export const updateLicense = async ({id, data}) => {
  const res = await fetch(`/api/licenses/${id}`, {
    method: "PUT",
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
};
/**
 *  Update license
 *
 */

export const findLiceneById = async (id) => {

  const res = await fetch(`/api/licenses/${id}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Invalid credentials");
  }

  return res.json();
};
/**
 *  Delete license
 *
 */

export const deleteLicense = async (id) => {
  const res = await fetch(`/api/licenses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Invalid credentials");
  }

  return res.json();
};

/**
 *  Search By License or cnic
 */
export const searchByLicense = async (licenseNum) => {
  const res = await fetch(`/api/licenses/getByLicenseOrCNIC/${licenseNum}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "License not found");
  }


  return res.json();
};



