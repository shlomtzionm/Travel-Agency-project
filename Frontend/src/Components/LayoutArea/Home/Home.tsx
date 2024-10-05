import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import List from "../../DataArea/List/List";
import { Login } from "../../UserArea/Login/Login";
import { LoginAuthorization } from "../Routing/LoginAuthorization";

function Home(): JSX.Element {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      {!user && <Login />}
      {user && (
        <LoginAuthorization>
          <List />
        </LoginAuthorization>
      )}
    </div>
  );
}

export default Home;
