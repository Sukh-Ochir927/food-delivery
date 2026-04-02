"use client";
import { JSX, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "./signIn";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="flex w-360 h-screen justify-between items-center m-auto ">
      <div>
        <SignInPage />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <Image
          className="object-fit object-cover w-214"
          src="/login.png"
          alt="log in"
          width={856}
          height={640}
        />
      </div>
    </div>
  );
};
export default SignIn;

type SignInResponse = {
  token: string;
  success: boolean;
};

const SignInPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const data = await signIn({ email, password });
      if (data?.success) {
        console.log("Login successful, token:", data.token);
        router.push("/dashboard/foods");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start gap-6 w-104 ml-20">
      <div>
        <h1 className="font-semibold text-[24px]">Log In</h1>
        <p className="text-gray-400">Log in to enjoy your favorite dishes.</p>
      </div>
      <Input
        placeholder="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      ></Input>
      <Input
        value={password}
        placeholder="password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      ></Input>

      <Button onClick={onSubmit} disabled={loading} type="submit">
        {loading ? "Logging in..." : "Log In"}
      </Button>
    </div>
  );
};
