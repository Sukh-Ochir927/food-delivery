import Cookies from "js-cookie";

type UserData = {
  email: string;
  password: string;
};

type SignInResponse = {
  token: string;
  success: boolean;
};

export const signIn = async (
  userData: UserData,
): Promise<SignInResponse | null> => {
  try {
    const token = Cookies.get("token");

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = (await response.json()) as SignInResponse;

    return data;
  } catch (error) {
    console.log(error);
  }
};
