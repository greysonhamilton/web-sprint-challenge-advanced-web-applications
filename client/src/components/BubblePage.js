import React, { useState, useEffect } from "react";
import { getColors } from '../Utils/getColors';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors()
    .then((res) => {
      const colors = res.data;
      setColorList(colors);
    })
    .catch((err) => {
      console.log("Something definitely went wrong", err.Error);
    })

  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;