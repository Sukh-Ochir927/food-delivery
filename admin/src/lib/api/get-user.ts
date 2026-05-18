import { cookies } from "next/headers";
import { apiUrl, authHeaders } from "./config";

type GetUserResponse = {
  id: number;
  role: string;
  email: string;
  name: string;
};

export const getUser = async (): Promise<GetUserResponse> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const response = await fetch(apiUrl("/users/me"), {
    cache: "no-store",
    headers: authHeaders(token),
  });

  if (!response.ok) {
    return { id: 0, role: "", email: "", name: "Admin" };
  }

  const userData = await response.json();

  return userData;
};
