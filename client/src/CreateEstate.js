import React, { Component } from "react";
import EstateFormat from "./EstateFormat.js";
var sqlBuffer = require("./PushSqlBuffer.js");

class CreateEstate extends Component{
    state = { web3: null, accounts: null, contract: null };
    
    constructor(props) {
        super(props);
    };

    componentDidMount = async () => {
        this.setState({web3:this.props.web3, accounts:this.props.accounts, contract: this.props.contract});
    };
  page = async () => {
    const { accounts, contract} = this.state;
    let form = document.getElementById("createForm");
      let dataForm = EstateFormat.getCreatForm(form);
      let dataObject = dataForm.DFormat;
      await contract.events.eventCreate(async (err,events) => {
          await fetch(`http://localhost:4001/create?data=${JSON.stringify(dataObject.json)}`).then((response) => {
              return response.text();
          }).then((ret) => {
              return ret;
          }).catch((err) => {
              console.log(err);
              return err;
          });
          let becomeList = new Array(1);
          becomeList[0] = dataObject.json;
          let eventData = EstateFormat.getEventFormat([],becomeList,0,events.returnValues.createDate);
          eventData = JSON.stringify(eventData);
          await fetch(`http://localhost:4001/event?estateId=${events.returnValues.Id}&changeDate=${events.returnValues.createDate}&changeReason=${0}&ev=${eventData}`).then((response) => {
                return response.text();
  }).then((ret) => {
      return 
  });
          });
    await contract.methods.create(dataObject.id,dataObject.blockChain,dataForm.PFormat.blockChain,[]).send({ from:accounts[0] });


    /*await contract.methods.create("circleEstate",["1","2","3","4",42,"2020","2020","test",0],b,p).send({ from: accounts[0] });*/

  };


    render() {
        if(!this.state.web3){
            return <div>shit</div>
        }
        return (
            <div id="creatEstate">
            <h1>新增一筆土地</h1>
            <form id="createForm">
            <label>PMNO</label><br />
            <input type="text" id="pmno" placeholder="4位數字" size="10"></input><br />
            <label>PCNO</label><br />
            <input type="text" id="pcno" placeholder="4位數字" size="10"></input><br />
            <label>SCNO</label><br />
            <input type="text" id="scno" placeholder="4位數字" size="10"></input><br />
            <label>County</label><br />
            <input type="text" id="county" placeholder="taipei" size="10"></input><br />
            <label>Township</label><br />
            <input type="text" id="townShip" placeholder="2位數字" size="10"></input><br />
            <label>記錄日期</label><br />
            <input type="text" id="begD" placeholder="20200217" size="10"></input><br />
            <label>PointList</label><br />
            <input type="text" id="pointList" placeholder="[[x1,y1],[x2,y2]...]" size="40"></input><br />
            <button type="button" onClick={this.page}>送出</button>
            </form>
            </div>
        );
    };
}



export default CreateEstate;
