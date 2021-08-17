import React, { useState, useEffect } from "react";
import "firebase/firestore";
import { useUser, useFirestore } from "reactfire";

const TodoList = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingTodo, setUpdatingTodo] = useState(0);
  const firestore = useFirestore();
  const user = useUser();

  const getTodos = async () => {
    await firestore
      .collection("users")
      .doc(user.data.uid)
      .collection("todoList")
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setTodoList(docs);
      });
  };

  useEffect(() => {
    user.data && getTodos();
  }, []);

  const deleteTodo = async (id, titulo, descripcion) => {
    await firestore
      .collection("users")
      .doc(user.data.uid)
      .collection("todoList")
      .doc(id)
      .delete({ titulo: titulo, descripcion: descripcion })
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const updateTodo = async (id) => {
    await firestore
      .collection("users")
      .doc(user.data.uid)
      .collection("todoList")
      .doc(id)
      .update({ titulo: titulo, descripcion: descripcion })
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    setIsUpdating(false);
    setUpdatingTodo(0);
  };

  const cancelUpdate = () => {
    setIsUpdating(false);
    setUpdatingTodo(0);
  };

  const startUpdateTodo = (id, titulo, descripcion) => {
    setIsUpdating(true);
    setUpdatingTodo(id);
    setTitulo(titulo);
    setDescripcion(descripcion);
  };

  return (
    <div>
      <p className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
        TO DO List
      </p>
      {todoList.map((todo) =>
        isUpdating && updatingTodo === todo.id ? (
          <div className="mt-8 w-full max-w-xs" key={todo.id}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="titulo"
                  onChange={(e) => setTitulo(e.target.value)}
                  value={titulo}
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="descripcion"
                  onChange={(ev) => setDescripcion(ev.target.value)}
                  value={descripcion}
                />
              </div>
              <button
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mx-8"
                onClick={() => updateTodo(todo.id)}
              >
                Save
              </button>
              <button
                className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800 mx-8"
                onClick={() => cancelUpdate(todo.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="mt-8 max-w-sm rounded overflow-hidden shadow-lg"
            key={todo.id}
          >
            <p className="font-bold text-xl mb-2">{todo.titulo}</p>
            <p className="text-gray-700 text-base">{todo.descripcion}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={() =>
                startUpdateTodo(todo.id, todo.titulo, todo.descripcion)
              }
            >
              Editar To Do
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={() => deleteTodo(todo.id)}
            >
              Eliminar To Do
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default TodoList;
