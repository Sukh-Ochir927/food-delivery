import { getOrders } from "@/lib/api/getOrders";
import Link from "next/link";

export default function Home() {
  const data = getOrders();
  return (
    <div>
      <Link href="/dashboard/foods">
        <h1>Login</h1>
      </Link>
    </div>
  );
}
