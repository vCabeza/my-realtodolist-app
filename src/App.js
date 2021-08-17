import "./App.css";
import Auth from "./Auth";
import NewTodo from "./NewTodo";
import { useFirebaseApp, useUser } from "reactfire";
import TodoList from "./TodoList";

function App() {
  const user = useUser();
  const firebase = useFirebaseApp();

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <div className="App flex flex-col justify-center items-center">
      {user.data && (
        <>
          <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0">
              <p className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
                My Real TodoList App
              </p>
            </div>
            <div>
              <label className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
                {user.data.email}
              </label>
              <label className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
                <button
                  className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800"
                  onClick={logout}
                >
                  Cerrar Sesión
                </button>
              </label>
            </div>
          </nav>

          <NewTodo />
          <TodoList />
        </>
      )}
      <Auth />
    </div>
  );
}

export default App;
