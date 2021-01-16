import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "Input Text",
      temp:0, scale:'f'
    };
    console.log("Constructor");
    // this.handleInput = this.handleInput.bind(this);
    this.handleInput = (e) => {
      this.setState({
        inputText: e.target.value,
      });
    };

    this.handleTempChange = (e)=>{
      this.setState({
        temp:e.target.value
      })
    }
    this.handleTempC = this.handleTempC.bind(this)
    this.handleTempF = this.handleTempF.bind(this)
  }

  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps");
    return null;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    console.log({ prevProps, prevState });
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    console.log({ prevProps, prevState, snapshot });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  

  handleTempC(e){
    let temp = e.target.value
    
    this.setState({scale:'c', temp})
  }

  handleTempF(e){
    let temp = e.target.value
    this.setState({scale:'f' ,temp})
  }
  render() {
    let {scale, temp} =this.state
    
    console.log("render");
    let f = scale === 'c' ? this.tryConvert(temp, this.toFahrenheit):temp
    let c = scale === 'f' ? this.tryConvert(temp, this.toCelsius):temp
    console.log({f,c})
    return (
      <div>
        <h1>Life Cycle</h1>
        <TextInput
          name={"First Name"}
          handleInput={this.handleInput}
          value={this.state.inputText}
        />
        <TempInput temp={c} handleInput={this.handleTempC} scale='c'/>
        <TempInput temp={f} handleInput={this.handleTempF} scale='f'/>
        <IsBoiling temp={c} />
      </div>
    );
  }
}

const IsBoiling = ({temp}) =>{
  if(temp >= 100 ){
    return <p>It's Boiling!</p>
  }else if(temp < 100 && temp > 0 ){
    return <p>It's Liquid Water!</p>
  }else if(temp <= 0  ){
    return <p>It's Frozen Solid!</p>
  }
}

const TextInput = ({ name, handleInput, value }) => {

  return (
    <label htmlFor={name}>
      {name}
      <input value={value} onChange={handleInput} name={name} type="text" />
      <p>{value}</p>
    </label>
  );
};
const TempInput = ({scale, temp, handleInput }) => {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };  

  return (
    
    <TextInput
          name={scaleNames[scale]}
          handleInput={handleInput}
          value={temp}
        />
  );
};
