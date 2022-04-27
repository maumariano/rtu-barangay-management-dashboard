import React from "react";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/resident-records");
  }, []);
  return (
    <>
      <p>Redirecting ...</p>
    </>
  );
};

export default LandingPage;
