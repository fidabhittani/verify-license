/**
 *  Get all licenses
 * @returns
 */
export const fetchLicense = async () => {
  const res = await fetch("/api/licenses");
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

  return res.json();
};
/**
 *  Update license
 *
 */

export const findLiceneById = async (id) => {

  const res = await fetch(`/api/licenses/${id}`);

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

  return res.json();
};

/**
 *  Search By License or cnic
 */
export const searchByLicense = async (licenseNum) => {
  const res = await fetch(`/api/licenses/getByLicenseOrCNIC/${licenseNum}`);

  return res.json();
};



