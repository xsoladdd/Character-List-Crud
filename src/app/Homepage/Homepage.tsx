import React from "react";
import List from "./List";
import AddingForm from "./Form";

const Home: React.FC = () => {
  return (
    <>
      <section className="text-gray-100 body-font w-full grid lg:grid-cols-2 pt-24 ">
        <List />
        <AddingForm/>

      </section>
    </>
  );
};
export default Home;
