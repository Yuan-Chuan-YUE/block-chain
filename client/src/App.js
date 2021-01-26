import React, { Component } from "react";
import CadastralContract from "./contracts/CadastralContract.json";
import getWeb3 from "./getWeb3";
import CreateEstate from "./CreateEstate";
import NowEstateList from "./NowEstateList";
import SearchFromChain from "./SearchFromChain";
import SplitEstate from "./SplitEstate";
import Version from "./Version";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import MergeEstate from "./MergeEstate";
import styles from "./App.css";


class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CadastralContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CadastralContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  /*runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };*/

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <Router>
            <div className="linkList">
               <Link to="/">首頁</Link><br />
               <Link to="/createEstate">建立土地</Link><br /> 
               <Link to="/splitEstate">分割土地</Link><br />
               <Link to="/nowEstateList">土地現況</Link><br />
               <Link to="/searchFromChain">土地驗證</Link><br />
               <Link to="/versionSearch">版本查詢</Link><br />
               <Link to="/mergeEstate">合併土地</Link><br />
            </div>
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/createEstate"><CreateEstate web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} /></Route>
                <Route path="/nowEstateList"><NowEstateList /></Route>
                <Route path="/splitEstate"><SplitEstate web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} /></Route>
                <Route exact path="/searchFromChain"><SearchFromChain web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} /></Route>
                <Route exact path="/versionSearch"><Version /></Route>
                <Route path="/mergeEstate"><MergeEstate web3={this.state.web3} accounts={this.state.accounts} contract={this.state.contract} /></Route>
            </Switch>
        </Router>
    );
  }
}

function Home(){

        return (
            <div>
            <h1>Home!</h1>
            </div>
        );
}
/*
                */
export default App;
