import Form from "./components/Form/Form";
import IceCreamList from "./components/IceCreamList/IceCreamList";
import { getAllData } from "./services/get";
import { useState, useEffect } from "react";
import { RiseLoader } from "react-spinners";
import Counter from "./components/Counter/Counter";

function App() {
  const [iceCream, setIceCream] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setIceCream(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      {/* mandatory to pas props to Form so it works and updates instantly */}
      <Form setUpdate={setUpdate} iceCream={iceCream} />
      {!error && (
        <IceCreamList setUpdate={setUpdate} iceCream={iceCream}/>
      )}
      <Counter setUpdate={setUpdate} iceCream={iceCream} />
      {isLoading && <RiseLoader size={5} color="blue" />}
    </>
  );
}

export default App;
