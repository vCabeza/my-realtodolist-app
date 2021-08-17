import React, { useState } from "react";
import "firebase/firestore";
import { useUser, useFirestore } from "reactfire";

const NewTodo = (props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const firestore = useFirestore();
  const user = useUser();

  const submit = async () => {
    console.log(firestore);
    await firestore
      .collection("users")
      .doc(user.data.uid)
      .collection("todoList")
      .doc()
      .set({ titulo: titulo, descripcion: descripcion })
      .then(function () {
        console.log("Document successfully added!");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="mt-8 w-full max-w-xs">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="titulo"
          >
            Titulo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="titulo"
            onChange={(ev) => setTitulo(ev.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="descripcion"
          >
            Descripcion
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="descripcion"
            onChange={(ev) => setDescripcion(ev.target.value)}
          />
        </div>
        <button
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          onClick={submit}
        >
          Create To Do
        </button>
      </div>
    </div>
  );
};

export default NewTodo;
