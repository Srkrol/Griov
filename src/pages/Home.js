import React from "react";

import Header from "../components/Header";
import Topimage from "../components/TopImage";
import GrBox from "../components/GrBox";
import GrCenter from "../components/GrCenter";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Topimage />
      </div>
      <div>
        <GrBox />
      </div>
      <div>
        <GrCenter />
      </div>
    </div>
  );
};
