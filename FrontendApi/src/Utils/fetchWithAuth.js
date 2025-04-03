import { getToken } from "./getToken";

export const fetchWithAuth = async (
  url,
  method = "GET",
  body = null,
  token = null
) => {
  const finalToken = token || getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (finalToken) {
    options.headers["Authorization"] = `Bearer ${finalToken}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Errore ${res.status}: ${message}`);
  }

  return res.status === 204 ? null : res.json();
};
