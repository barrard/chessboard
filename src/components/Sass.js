import React from "react";

export default function Sass() {
  return (

        <ParaSection>

        <Para text={`
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
      laboriosam pariatur exercitationem praesentium sed. Odit distinctio illo
      ipsa delectus minus, cum assumenda quo nulla aspernatur ut excepturi!
      Culpa, tempora animi!
      `}>
      </Para>
      <Para text={`
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
      laboriosam pariatur exercitationem praesentium sed. Odit distinctio illo
      ipsa delectus minus, cum assumenda quo nulla aspernatur ut excepturi!
      Culpa, tempora animi!
      `}>
      </Para>
        </ParaSection>
  );
}

const ParaSection = (props) => {
    let style = {
        maxWidth:'50%',
        display:'flex',
        flexDirection:'column'

    }
  return <section style={style}>{props.children}</section>;
};
const Para = ({ text }) => {
  return <p>{text}</p>;
};
