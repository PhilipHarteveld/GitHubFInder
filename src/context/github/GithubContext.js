import { createContext } from "react";
import { useEffect, useReducer } from "react";
import githubReducer from "./Githubreducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialSate = {
    users: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialSate);

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

  return (
    <GithubContext.Provider
      value={{ users: state.users, Loading: state.loading, SearchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
