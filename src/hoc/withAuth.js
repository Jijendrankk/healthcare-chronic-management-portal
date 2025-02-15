import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent, allowedRoles) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = Cookies.get("token");
      const role = Cookies.get("role");

      if (!token || !allowedRoles.includes(role)) {
        router.push("/login");
      } else {
        setIsAuthorized(true);
      }
    }, []);

    if (!isAuthorized) return <h1>Loading...</h1>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
