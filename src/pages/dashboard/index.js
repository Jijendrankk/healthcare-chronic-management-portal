import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const router = useRouter();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  return <p>Redirecting...</p>;
}
