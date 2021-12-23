import { useEffect, useState } from "react";
import SpinnerLoad from "../layout/Spinner";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`https://api.github.com/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };
  if (!Loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((users) => (
          <h3>{users.login}</h3>
        ))}
      </div>
    );
  } else {
    return <SpinnerLoad />;
  }
}

export default UserResults;
