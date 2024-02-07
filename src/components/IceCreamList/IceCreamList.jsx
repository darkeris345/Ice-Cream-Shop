/* eslint-disable react/prop-types */
import "./IceCreamList.css";
import { deleteData } from "../../services/delete";
import { updateData } from "../../services/update";
import { getOne } from "../../services/get";

function IceCreamList({ iceCream, setUpdate }) {
  const deleteHandler = async (id) => {
    await deleteData(id);
    setUpdate((update) => update + 1);
  };
  const countHandler = async (id) => {
    const ice = await getOne(id);
    const { count } = ice;
    console.log(count);
    await updateData(id, { count: count + 1 });
  };

  const minusHandler = async (id) => {
    const ice = await getOne(id);
    const { count } = ice;
    console.log(count);
    if (count <= 0) {
      return;
    } else {
      await updateData(id, { count: count - 1 });
    }
  };

  return (
    <>
      <div className="iceCreamList">
        {iceCream.map((ice) => {
          const { id, flavor, price, color, fontColor } = ice;

          return (
            <div
              key={id}
              className="iceCreamCard"
              style={{ color: fontColor, backgroundColor: color }}
            >
              <button
                className="deleteButton"
                style={{
                  color: fontColor,
                  backgroundColor: color,
                  fontSize: "1,5rem",
                }}
                onClick={() => deleteHandler(id)}
              >
                X
              </button>
              <h1>{flavor}</h1>
              <p>Price: ${price}</p>
              <div style={{ border: "none" }}>
                <button
                  style={{ marginRight: "1rem" }}
                  onClick={() => countHandler(id)}
                >
                  +
                </button>
                <button onClick={() => minusHandler(id)}>-</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default IceCreamList;
