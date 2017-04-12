import React from 'react';
// import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is the prop text',
      cat: 0,
      currentEvent: '---',
      a: '',
      b: '',
      items: []
    }
  }
  //start function
  update(e) {
    this.setState({ txt: e.target.value })
  }
  change(e) {
    //return event textArea
    this.setState({ currentEvent: e.type })
  }
  updateChange() {    
    this.setState({
      a: this.a.refs.input.value,
      b: this.b.refs.input.value
    })
  }
  componentWillMount() {
    fetch('https://swapi.co/api/people/?format=json')
    .then( response => response.json() )
    .then( ({results: items}) => this.setState({items}) )
  }
  filter(e) {
    this.setState({filter: e.target.value})
  }
  //end function
  render() {
    let items = this.state.items;
    if(this.state.filter) {
      items = items.filter( item => item.name.toLowerCase()
      .includes(this.state.filter.toLowerCase()))
    }

    return (<div>
        <h1>{this.state.txt} - {this.state.cat}</h1>
        <Widget update={this.update.bind(this)} />
        <button>I <Heart /> React</button>
        <Title text="12345678"/>
        <textarea onKeyPress={this.change.bind(this)} onDoubleClick={this.change.bind(this)} onBlur={this.change.bind(this)} onFocus={this.change.bind(this)}  cols="30" rows="10" />
        <h1>{this.state.currentEvent}</h1>

        {/*data Bind*/}
        <Input  ref={ component => this.a = component } updateChange={ this.updateChange.bind(this) } /> { this.state.a }
        <Input  ref={ component => this.b = component } updateChange={ this.updateChange.bind(this) }/> { this.state.b }

         <h2>Filter in array</h2>
        <input type="text" onChange={this.filter.bind(this)} />
        { items.map( item => 
           <Person key={item.name} person={item} />)}
    </div>)
  }
}

class Input extends React.Component {
  render() {
    return <div><input ref="input" type="text" onChange={this.props.updateChange} /></div>
  }
}

const Widget = (props) => 
  <input type="text" onChange={props.update} />


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

const  Person = (props) => <h4>{props.person.name}</h4>

export default App
