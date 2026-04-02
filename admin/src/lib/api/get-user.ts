import { cookies } from "next/headers";

type GetUserResponse = {
  id: number;
  role: string;
  email: string;
  name: string;
};

export const getUser = async (): Promise<GetUserResponse> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const response = await fetch("http://localhost:3001/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = await response.json();

  return userData;
};
