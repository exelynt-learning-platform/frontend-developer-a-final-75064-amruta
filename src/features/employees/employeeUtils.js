/**
 * Filter an array of employees by exact or partial ID
 * @param {Array} employees
 * @param {string|number} id
 * @returns {Array}
 */
export const filterEmployeesById = (employees = [], id) => {
  if (!id) return employees;
  const search = String(id).trim().toLowerCase();
  return employees.filter((emp) => String(emp.id).toLowerCase() === search);
};

/**
 * Filter employees by search query (matching name, email, or id)
 * @param {Array} employees
 * @param {string} query
 * @returns {Array}
 */
export const filterEmployeesByQuery = (employees = [], query = "") => {
  if (!query) return employees;
  const q = String(query).trim().toLowerCase();
  return employees.filter((emp) => {
    const id = String(emp.id || "").toLowerCase();
    const name = String(emp.name || "").toLowerCase();
    const email = String(emp.email || emp.emailId || "").toLowerCase();
    const country = String(emp.country || "").toLowerCase();
    return id.includes(q) || name.includes(q) || email.includes(q) || country.includes(q);
  });
};

/**
 * Normalize employee object for form submission or display
 * @param {Object} data
 * @returns {Object}
 */
export const normalizeEmployeePayload = (data = {}) => {
  return {
    name: data.name ? String(data.name).trim() : "",
    email: data.email ? String(data.email).trim() : "",
    emailId: data.email ? String(data.email).trim() : data.emailId || "",
    mobile: data.mobile ? String(data.mobile).trim() : "",
    country: data.country ? String(data.country).trim() : "",
    state: data.state ? String(data.state).trim() : "",
    district: data.district ? String(data.district).trim() : "",
  };
};

/**
 * Sort employees by name alphabetically
 * @param {Array} employees
 * @param {'asc'|'desc'} direction
 * @returns {Array}
 */
export const sortEmployeesByName = (employees = [], direction = "asc") => {
  return [...employees].sort((a, b) => {
    const nameA = String(a.name || "").toLowerCase();
    const nameB = String(b.name || "").toLowerCase();
    if (direction === "desc") {
      return nameB.localeCompare(nameA);
    }
    return nameA.localeCompare(nameB);
  });
};
