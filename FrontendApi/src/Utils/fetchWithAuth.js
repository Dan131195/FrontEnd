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

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Errore ${res.status}: ${text}`);
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
