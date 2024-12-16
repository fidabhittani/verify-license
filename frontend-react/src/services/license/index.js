
/**
 *  Get all licenses
 * @returns 
 */
export const fetchLicense = async () => {
  const res = await fetch("/api/licenses");
  return res.json();
};
