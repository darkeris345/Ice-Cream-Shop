/* eslint-disable react/prop-types */
import "./Form.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { postData } from "../../services/post";
import { useState } from "react";
import { flavorToKey } from "../../services/makeKey";

function Form({ setUpdate }) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      flavor: "Test Test",
      price: 1,
      color: "#ffffff",
      fontColor: "black",
    },
  });

  const formSubmitHandler = async (formData) => {
    try {
      await postData({
        ...formData,
        key: flavorToKey(formData.flavor),
        count: 0,
      });
      reset();
      // updates instantly when form is submitted
      setUpdate((update) => update + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <label htmlFor="flavor">Flavor: </label>
          <input
            type="text"
            id="flavor"
            name="flavor"
            {...register("flavor", {
              required: true,
              maxLength: 20,
            })}
          />
          <div>{errors.flavor?.message}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem" }}>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            name="price"
            {...register("price", {
              required: true,
              min: 1,
              max: 10,
            })}
          />
          <div>{errors.price?.message}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "1.4rem" }}>
          <label htmlFor="color">Color: </label>
          <input
            type="color"
            id="color"
            name="color"
            defaultValue={"#ffffff"}
            style={{ width: "3rem", height: "3rem" }}
            {...register("color", {
              required: true,
              pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            })}
          />
          <div>{errors.color?.message}</div>
        </div>
        <div style={{ display: "flex" }}>
          <label htmlFor="whiteFont">White font: </label>
          <input
            type="radio"
            id="whiteFont"
            name="fontColor"
            value={"white"}
            defaultChecked
            {...register("fontColor")}
          />

          <label htmlFor="blackFont">Black font: </label>
          <input
            type="radio"
            id="blackFont"
            name="fontColor"
            value={"black"}
            {...register("fontColor")}
          />
        </div>
        <input style={{ marginBottom: "1rem", width: "15rem" }} type="submit" value="Submit" />
      </form>
      {error && <p>{error}</p>}
      <DevTool control={control} />
    </div>
  );
}

export default Form;
