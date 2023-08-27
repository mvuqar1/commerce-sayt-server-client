// export const fetchUrl = "http://localhost:5001"
export const fetchUrl = "https://commerse-server.onrender.com/";

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