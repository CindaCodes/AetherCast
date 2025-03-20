import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import ThemeToggle from "./ThemeToggle";

export default function Weather() {
  return (
    <div className="Container">
      <div className="row">
        <div className="col-sm-4">
          <div className="text-center">Denver</div>
        </div>
        <div className="col-sm-4">
          <Form />
        </div>
        <div className="col-sm-4">
          <ThemeToggle />
        </div>
      </div>
      <Footer />
    </div>
  );
}
