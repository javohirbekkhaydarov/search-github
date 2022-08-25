import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";
import {FaMoon} from "react-icons/fa";

//? domen => dev--udxxk7p.us.auth0.com
//? id    => 27Jn1hUbTjzzjYCA13FJEIXWqRPh8onF

const getStorageTheme = () => {
  let theme = "light-time";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};
const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, user, logout, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user;

  // dark mode
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Wrapper>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && (
        <h4>
          {" "}
          Welcome , <b>{user.name.toUpperCase()}</b>
        </h4>
      )}
      {isUser ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
      <button className="btn" onClick={toggleTheme}>
         <FaMoon />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  FaMoon {
    background: #fff;
    font-size: 22px;
  }
`;
export default Navbar;
