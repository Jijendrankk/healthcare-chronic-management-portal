import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      const role = Cookies.get("role");
      if (!token) {
        router.push("/login");
      } else if (role === "patient") {
        router.push("/dashboard/patient");
      } else if (role === "provider") {
        router.push("/dashboard/provider"); 
      } else if (!allowedRoles.includes(role)) {
        router.push("/login"); 
      } 
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
