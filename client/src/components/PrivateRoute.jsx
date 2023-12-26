import React from "react";
import { useSelector } from "react-redux";
import { Outlet , Navigate} from "react-router-dom";

function privateRoute(params) {
    const{currentUser} = useSelector((state) => state.user);
    if(currentUser){
        return <Outlet/>
    }
    else{
        return <Navigate to="/signin"/>
    }
}

export default privateRoute;