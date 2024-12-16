import React from "react";
import { Audio, Blocks } from "react-loader-spinner";

const Loader = ({ visible }) => {
  return (
    <div>
      {visible && (
        <div style={styles.loaderContainer}>
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={visible}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center", // Centers vertically
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    position: "fixed", // Keeps it fixed in the middle
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: adds a semi-transparent background
    zIndex: 9999, // Ensures it stays on top
  },
};
export default Loader;
