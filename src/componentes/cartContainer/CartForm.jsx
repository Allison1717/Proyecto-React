import { useState } from "react";

function InputForm(props) {
  return (
    <div style={{ display: "flex", marginBottom: 8 }}>
      <label style={{ width: "100px", marginRight: 4 }}>{props.label}</label>
      <input
        value={props.value}
        name={props.name}
        type="text"
        onChange={props.onInputChange}
      />
    </div>
  );
}

export default function CartForm(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  console.log("State:", userData);

  function onInputChange(evt) {

    const field = evt.target.name;
    const value = evt.target.value;
    console.log(field, value);
    const newState = { ...userData };
    newState[field] = value;
    setUserData(newState);
  }

  function clearData() {
    setUserData({
      name: "",
      email: "",
      phone: "",
    });
  }

  function onSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(userData);
  }

  let arrayUserData = Object.keys(userData);
  console.log(arrayUserData);

  return (
    <form onSubmit={onSubmit}>
      {arrayUserData.map((field) => (
        <InputForm
          name={field}
          value={userData[field]}
          onInputChange={onInputChange}
          label={field}
        />
      ))}
      <button
        disabled={
          !(
            userData.name !== "" &&
            userData.phone !== "" &&
            userData.email !== ""
          )
        }
        type="submit"
      >
        Crear orden
      </button>
      <button onClick={clearData}>Limpiar Datos</button>
    </form>
  );
}