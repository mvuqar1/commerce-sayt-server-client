// export const fetchUrl = "http://localhost:5001"
export const fetchUrl = "https://main--commerce-sayt-server-client.netlify.app";

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