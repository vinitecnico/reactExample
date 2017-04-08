import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is the prop text',
      cat: 0
    }
  }
  //update name is function
  update(e) {
    this.setState({ txt: e.target.value })
  }
  render() {
    return (<div>
        <h1>{this.state.txt} - {this.state.cat}</h1>
        <Widget update={this.update.bind(this)} />
        <button>I <Heart /> React</button>
        <Title text="12345678"/>
    </div>)
  }
}

const Widget = (props) => 
  <input type="text" onChange={props.update} />

// const Button = (props) => <button>{props.children}</button>

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

// protType validation
const Title = (props) => <h1>Title: {props.text}</h1>
Title.propTypes = {
  text(props, propName, Component) {
    if(!(propName in props)) {
      return new Error(`missing ${propName}`)
    }
    if(props[propName].length < 6){
      return new Error(`${propName} was too short`)
    }
  }
}

export default App