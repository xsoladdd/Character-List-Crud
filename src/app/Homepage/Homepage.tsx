"use client";
import React from "react";
import AddingForm from "./Form";
import List from "./List";

const Home: React.FC = () => {
  return (
    <>
      <section className="text-gray-100 body-font w-full grid lg:grid-cols-2 pt-24 gap-16 ">
        <List />
        <AddingForm />
      </section>
    </>
  );
};
export default Home;
