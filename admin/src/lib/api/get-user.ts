import { cookies } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { apiUrl, authHeaders, logApiFetchError } from "./config";

type GetUserResponse = {
  id: number;
  role: string;
  email: string;
  name: string;
};

export const getUser = async (): Promise<GetUserResponse | null> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const endpoint = "/users/me";
  const url = apiUrl(endpoint);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: authHeaders(token),
    });

    if (!response.ok) {
      logApiFetchError({ endpoint, url, status: response.status });
      return null;
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    unstable_rethrow(error);
    logApiFetchError({ endpoint, url, error });
    return null;
  }
};
