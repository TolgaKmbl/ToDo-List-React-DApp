pragma solidity >=0.4.22 <0.7.0;

contract TodoList {

  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;
  
  event TaskCreated (uint id, string content, bool completed);
  event TaskToggled (uint id, bool completed);
  event TaskEdited (uint id, string content);
  
  constructor() {
        createTask("Initial test task");
        createTask("Initial test task #2");
        createTask("Initial test task #3");
      }

  function createTask(string memory _content) public {    
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false); 
    emit TaskCreated(taskCount, _content, false);
  }
  
  function toggleTask(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskToggled(_id, true);
  }

  function editTask(uint _id, string memory _content) public {
    Task memory _task = tasks[_id];
    _task.content = _content;
    tasks[_id] = _task;
    emit TaskEdited(_id, _content);
  }

}