import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root, channel) {
  ReactDOM.render(<Demo channel={channel} />, root);
}


class Demo extends React.Component {

  constructor(props) {
    super(props);
    console.log("Made it to constructor");
    // New stuff
    this.channel = props.channel;
    this.state = {
      guesscorrected: [],
      lockedBlocks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      clickedBlocks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      letterBlocks: ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
      clickCount: 0,
      stepNumber: 0,
      letterOne: "",
      letterTwo: "",
      numberOne: 20,
      numberTwo: 25,
    };
  }

  gotView(view) {
    console.log("New view", view);
    this.setState(view.game);
  }

  sendClick(number) {
    console.log("Sending click");
    this.channel.push("guess", { number1: number })
        .receive("ok", this.gotView.bind(this));
  }

  sendReset() {
    console.log("Sending reset");
    this.channel.push("reset")
        .receive("ok", this.gotView.bind(this));
  }


  render() {
    return (
      <div>
        <div className="row">
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock1} locked={this.state.block1} number={0} value={"A"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock2} locked={this.state.block2} number={1} value={"B"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock3} locked={this.state.block3} number={2} value={"C"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock4} locked={this.state.block4} number={3} value={"D"} />
        </div>
        <div className="row">
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock5} locked={this.state.block5} number={4} value={"E"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock6} locked={this.state.block6} number={5} value={"F"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock7} locked={this.state.block7} number={6} value={"G"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock8} locked={this.state.block8} number={7} value={"H"} />
        </div>
        <div className="row">
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock9} locked={this.state.block9} number={8} value={"A"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock10} locked={this.state.block10} number={9} value={"B"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock11} locked={this.state.block11} number={10} value={"C"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock12} locked={this.state.block12} number={11} value={"D"} />
        </div>
        <div className="row">
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock13} locked={this.state.block13} number={12} value={"E"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock14} locked={this.state.block14} number={13} value={"F"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock15} locked={this.state.block15} number={14} value={"G"} />
          <Blocks state={this.state} click={this.sendClick.bind(this)} clicked={this.state.lock16} locked={this.state.block16} number={15} value={"H"} />
        </div>
        <div className="row">
          <div id="side-0" className="side col">
            <Clicks state={this.state} reset={this.sendReset.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

function Blocks(params) {
  let state = params.state;
  if (params.clicked == 1) {
    return (
      <div id="side-0"className="side col">
        <Button type="button" color="success" number={params.number} onClick={ () => params.click(params.number) } disabled>
          {params.value}
        </Button>
      </div>
    );
  }
  else if (params.locked == 1) {
    return (
      <div id="side-0"className="side col">
        <Button type="button" color="danger" number={params.number} onClick={ () => params.click(params.number) } disabled>
          {params.value}
        </Button>
      </div>
    );
  }
  else {
    return (
      <div id="side-0"className="side col">
        <Button type="button" color="primary" number={params.number} onClick={ () => params.click(params.number) } >
          {params.number}
        </Button>
      </div>
    );
  }
}

function Clicks(params) {
  let state = params.state;

  return <div>
    <Button type="button" color="info" disabled>Click Count: {state.clicks}</Button>
    <Button type="button" color="warning" onClick={params.reset}>Reset Game</Button>
  </div>;
}
