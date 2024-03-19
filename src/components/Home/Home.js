import React from "react";

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 py-5 text-center">

          <h1 className="mt-3 text-center" style={{ color: "#000000" }}><img height={150} src="dog.png"/><br/>Welcome</h1>
          <p className="lead text-center" style={{ color: "#000000" }}>Veterinary Management System</p>
        </div>
      </div>
    </div>
  );
}

export default Home;