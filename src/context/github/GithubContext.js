import { createContext } from "react";
import { useEffect, useReducer } from "react";
import githubReducer from "./Githubreducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialSate = {
    users: [],
    user: {},
    loading: false,
    repos: [],
  };
  const [state, dispatch] = useReducer(githubReducer, initialSate);
  //clear users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });
  const setLoading = () => dispatch({ type: "SET_LOADING" });
  //test getting users search
  const SearchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: {
          Authorization: ``,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  //get single user

  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: ``,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //repos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: ``,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.status === 404) {
      window.location = "/notFound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    }
  };

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        Loading: state.loading,
        SearchUsers,
        clearUsers,
        getUser,
        repos: state.repos,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
