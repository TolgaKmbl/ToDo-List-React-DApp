import React, { useState, useEffect } from "react";
import TodoList from "./contracts/TodoList.json";
import getWeb3 from "./getWeb3";

import Loading from "./components/Loading";
import ToDoComponent from "./components/ToDoComponent";
import Navbar from "./components/Navbar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const TodoContext = React.createContext();
export const NavContext = React.createContext();


function App() {   

  const [todoTask, setTodoTask] =  useState([]);
  const [web3, setWeb3] =  useState(undefined);
  const [accounts, setAccounts] =  useState(undefined);
  const [contract, setContract] =  useState(undefined);  
  const [taskCount, setTaskCount] =  useState(0); 
  const [isLoading, setIsLoading] =  useState(false); 

  let textInput = React.createRef(); 

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();        
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TodoList.networks[networkId];
        const contract = new web3.eth.Contract(
          TodoList.abi,
          deployedNetwork && deployedNetwork.address,
        ); 
  
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3(web3);
        setAccounts(accounts[0]); 
        setContract(contract);                              
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
        setIsLoading(true);
      }
    }
    init();
  }, []);
  
  useEffect(() => {
    const todoInit = async () => {

      const taskCount = await contract.methods.taskCount().call();
      setTaskCount(taskCount);

      var temp=[
        
      ];  
      for (var i = 1; i <= taskCount; i++) {
        const task =  await contract.methods.tasks(i).call();
        temp.push(task);
      } 
      setTodoTask(temp);              
    }      
    if(typeof web3 !== 'undefined' && typeof accounts !== 'undefined' && typeof contract !== 'undefined') {
      todoInit();          
    }    
  }, [taskCount, web3, accounts, contract]);

  useEffect(() => {
    console.log(todoTask);
    console.log(taskCount);
 }, [todoTask, taskCount]);

  
  const createTask = async (taskContent) => {    
    await contract.methods.createTask(taskContent).send({ from: accounts })
    .on('receipt', (receipt) => {
      console.log("Succesfully created a task");
    })
    setTaskCount(prevState => prevState + 1);
  }; 
  
  const toggleTask = async (taskId) => {
    await contract.methods.toggleTask(taskId).send({ from: accounts })
    .on('receipt', (receipt) => {
      console.log("Succesfully toggled a task");      
    });
  };

  if(typeof web3 === 'undefined') {
    return <div><Loading /></div>;
  }
  return (    
    <div className="container-fluid">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex justify-content-center">
          <NavContext.Provider value={{accounts}}>
            <Navbar />
          </NavContext.Provider>
          <TodoContext.Provider value={{taskCount, todoTask, toggleTask, createTask}}>
            <ToDoComponent />
          </TodoContext.Provider> 
        </main>
      </div>
    </div>
  );

}

export default App;
