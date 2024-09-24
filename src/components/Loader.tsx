import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../redux/store";
function Loader() {

  const { loading } = useAppSelector((state) => state.app)
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="info" />
      </Backdrop>
    </div>
  );
}

export default Loader;
