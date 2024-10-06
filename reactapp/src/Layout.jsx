import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from './apiBaseUrl';
import { Outlet } from "react-router-dom";

function Layout() {

  


  return (
   <>
      <div className="row">
        Hello
      </div>
      <div className="row">
        <Outlet />
      </div>
   </>
  );
}

export default Layout;
