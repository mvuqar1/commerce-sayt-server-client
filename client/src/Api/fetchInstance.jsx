export const fetchInstance = () => {
  const token = localStorage.getItem('token');

  return {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};