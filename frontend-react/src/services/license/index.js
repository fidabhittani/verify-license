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
 *  Search By License
 */
export const searchByLicense = async (licenseNum) => {
  const res = await fetch(`/api/licenses/${licenseNum}`);

  return res.json();
};



