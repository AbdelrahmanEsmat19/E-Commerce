import React, { useState, useEffect } from "react";
import "./Loader.css";

export default function Loader({ fullPage, onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fullPage) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      if (fullPage) {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [fullPage]);

  const handleLoadingComplete = () => {
    setLoading(false);
    onComplete();
  };

  if (fullPage) {
    return (
      <div className="full-page-loader-body">
        <div className="full-page-loader">
          <div className="loader-container">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        {loading ? null : <div className="loader-complete">Loading complete!</div>}
      </div>
    );
  } else {
    return (
      <div className="loader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}