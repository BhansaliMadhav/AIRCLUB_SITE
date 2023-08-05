import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { ClientJS } from "clientjs";
let fingerprint = "";
function MyComponent() {
  useEffect(() => {
    const client = new ClientJS();
    fingerprint = client.getFingerprint();
    console.log("Fingerprint from admin control  page", fingerprint);
  }, []);
}

const AdminControls = () => {
  const navigate = useNavigate();
  MyComponent();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  async function populateQuote() {
    const req = await fetch(process.env.REACT_APP_BASE_URL + "/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/admin");
      } else {
        populateQuote();
      }
    } else {
      navigate("/admin");
    }
  });
  async function updateQuote(event) {
    // event.preventDefault();
    const req = await fetch(process.env.REACT_APP_BASE_URL + "api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  }
  const isMobile = useMediaQuery("(max-width:686px)");
  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      <h1>Your quote: {quote || "No Quote found"}</h1>
      {!quote && (
        <form onSubmit={updateQuote}>
          <input
            type="text"
            placeholder="Quote"
            value={tempQuote}
            onChange={(e) => setTempQuote(e.target.value)}
          />
          <input type="submit" value={"Update Quote"} />
        </form>
      )}
    </Box>
  );
};

export default AdminControls;
