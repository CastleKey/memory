import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo side={0}/>, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delts: Array(16).fill(0),
      locks: Array(16).fill(0),
      clickCount: 0,
      stepNumber: 0,
      letterOne: "",
      letterTwo: "",
      numberOne: 20,
      numberTwo: 25,
    };
  }


  toggle(number, value) {

    var lockChange = this.state.locks;
    var deltsChange = this.state.delts;

    var clickChange = this.state.clickCount + 1;
    var stepChange = this.state.stepNumber;
    var letterChange = this.state.letterOne;
    var letterChange2 = this.state.letterTwo;
    var numberChange = this.state.numberOne;
    var numberChange2 = this.state.numberTwo;

    var minus1 = number - 1;
    var minus2 = this.state.numberOne - 1;
    var minus3 = this.state.numberTwo - 1;

    var tempDelt = this.state.delts;
    var reverseDelt = +!this.state.delts[minus1];
    tempDelt[minus1] = reverseDelt

    if (this.state.stepNumber == 1) {
      if (this.state.letterOne == value) {
        lockChange[minus1] = 1;
        lockChange[minus2] = 1;
        stepChange = 0;
        letterChange = "";
        letterChange2 = "";
        numberChange = 20;
        numberChange2 = 25;


        this.setState({
          side: 0,
          delts: deltsChange,
          locks: lockChange,
          clickCount: clickChange,
          stepNumber: stepChange,
          letterOne: letterChange,
          letterTwo: letterChange2,
          numberOne: numberChange,
          numberTwo: numberChange2
        })
      }
      deltsChange[minus1] = 1;
      deltsChange[minus2] = 1;
      stepChange = 2;
      letterChange = value;
      letterChange2 = this.state.letterOne;
      numberChange = number;
      numberChange2 = this.state.numberOne;

      this.setState({
        side: 0,
        delts: deltsChange,
        locks: lockChange,
        clickCount: clickChange,
        stepNumber: stepChange,
        letterOne: letterChange,
        letterTwo: letterChange2,
        numberOne: numberChange,
        numberTwo: numberChange2
      })

      setTimeout( () => this.wait(), 1000);
    }
    else if (this.state.stepNumber == 2) {
      deltsChange[minus1] = 1;
      deltsChange[minus2] = 0;
      deltsChange[minus3] = 0;
      stepChange = 1;
      letterChange = value;
      letterChange2 = "";
      numberChange = number;
      numberChange2 = 25;

      this.setState({
        side: 0,
        delts: deltsChange,
        locks: lockChange,
        clickCount: clickChange,
        stepNumber: stepChange,
        letterOne: letterChange,
        letterTwo: letterChange2,
        numberOne: numberChange,
        numberTwo: numberChange2
      });
    }
    else {
      const first = this.state.delts;
      const hard = this.state.delts[minus1];
      stepChange = 1;
      letterChange = value;
      letterChange2 = "";
      numberChange = number;
      numberChange2 = 25;

      var reverse = +!this.state.delts[minus1];
      first[minus1] = 1;
      deltsChange[minus1] = 1;

      this.setState({
        side: 0,
        delts: deltsChange,
        locks: lockChange,
        clickCount: clickChange,
        stepNumber: stepChange,
        letterOne: letterChange,
        letterTwo: letterChange2,
        numberOne: numberChange,
        numberTwo: numberChange2
      });



    }
  }

  wait() {
    var deltsChange = this.state.delts;
    var stepChange = this.state.stepNumber;

    var numberChange1 = this.state.numberOne;
    var numberChange2 = this.state.numberTwo;

    var minus1 = numberChange1 - 1;
    var minus2 = numberChange2 - 1;

    deltsChange[minus1] = 0;
    deltsChange[minus2] = 0;

    this.setState({
      side: 0,
      delts: deltsChange,
      locks: this.state.locks,
      clickCount: this.state.clickCount,
      stepNumber: 0,
      letterOne: "",
      letterTwo: "",
      numberOne: 20,
      numberTwo: 25
    });
  }

  reset() {
    this.setState({
      side: 0,
      delts: Array(16).fill(0),
      locks: Array(16).fill(0),
      clickCount: 0,
      stepNumber: 0,
      letterOne: "",
      letterTwo: "",
      numberOne: 20,
      numberTwo: 25,
    });
  }


  render() {
    var toggle = this.toggle.bind(this);
    var reset = this.reset.bind(this);
    var wait = this.wait.bind(this);
    return (
      <div>
        <div className="row">
          <Side show={this.state.delts[0] == 0} lock={this.state.locks[0] == 0} toggle={toggle} number={1} value={"A"}/>
          <Side show={this.state.delts[1] == 0} lock={this.state.locks[1] == 0} toggle={toggle} number={2} value={"B"}/>
          <Side show={this.state.delts[2] == 0} lock={this.state.locks[2] == 0} toggle={toggle} number={3} value={"C"}/>
          <Side show={this.state.delts[3] == 0} lock={this.state.locks[3] == 0} toggle={toggle} number={4} value={"D"}/>
        </div>
        <div className="row">
          <Side show={this.state.delts[4] == 0} lock={this.state.locks[4] == 0} toggle={toggle} number={5} value={"E"}/>
          <Side show={this.state.delts[5] == 0} lock={this.state.locks[5] == 0} toggle={toggle} number={6} value={"F"}/>
          <Side show={this.state.delts[6] == 0} lock={this.state.locks[6] == 0} toggle={toggle} number={7} value={"G"}/>
          <Side show={this.state.delts[7] == 0} lock={this.state.locks[7] == 0} toggle={toggle} number={8} value={"H"}/>
        </div>
        <div className="row">
          <Side show={this.state.delts[8] == 0} lock={this.state.locks[8] == 0} toggle={toggle} number={9} value={"A"}/>
          <Side show={this.state.delts[9] == 0} lock={this.state.locks[9] == 0} toggle={toggle} number={10} value={"B"}/>
          <Side show={this.state.delts[10] == 0} lock={this.state.locks[10] == 0} toggle={toggle} number={11} value={"C"}/>
          <Side show={this.state.delts[11] == 0} lock={this.state.locks[11] == 0} toggle={toggle} number={12} value={"D"}/>
        </div>
        <div className="row">
          <Side show={this.state.delts[12] == 0} lock={this.state.locks[12] == 0} toggle={toggle} number={13} value={"E"}/>
          <Side show={this.state.delts[13] == 0} lock={this.state.locks[13] == 0} toggle={toggle} number={14} value={"F"}/>
          <Side show={this.state.delts[14] == 0} lock={this.state.locks[14] == 0} toggle={toggle} number={15} value={"G"}/>
          <Side show={this.state.delts[15] == 0} lock={this.state.locks[15] == 0} toggle={toggle} number={16} value={"H"}/>
        </div>
        <div className="row">
          <div id="side-0" className="side col">
            <Button type="button" color="warning" onClick={ () => reset()}>Reset Game</Button>
            <Button type="button" color="info" disabled>Click Count: {this.state.clickCount}</Button>
          </div>
        </div>
      </div>
    );
  }
}

function Side(params) {
  if (!params.lock) {
    return (
      <div id="side-0"className="side col">
        <Button type="button" color="success" number={params.number} onClick={ () => params.toggle(params.number, params.value) } disabled>
          {params.value}
        </Button>
      </div>
    );
  }
  else if (params.show) {
    return (
      <div id="side-0" className="side col">
        <Button type="button" color="primary" number={params.number} onClick={ () => params.toggle(params.number, params.value) }>
          {params.number}
        </Button>
      </div>
    );
  }
  else {
    return (
      <div id="side-0"className="side col">
        <Button type="button" color="danger" number={params.number} onClick={ () => params.toggle(params.number, params.value) } disabled>
          {params.value}
        </Button>
      </div>
    );
  }
}
