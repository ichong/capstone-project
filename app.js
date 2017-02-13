//Create a new Vue instance
new Vue({
  //Bind this Vue instance to container div with an ID of todo 
  el: "#todo",

  //This is where to register the values that hold data for our app
  data: {
    newTask: "",
    taskList: []
  },

  //This is where to hold the methods we want to use in our app
  methods: {

    addTask: function() {
      //trim() is used to remove whitespace from both ends of a string
      var task = this.newTask.trim();
      //if task is not an empty string
      if (task) {
        //push an object containing the task to the task List array
        this.taskList.push({
          text: task,
          checked: false
        });
        //reset newTask to an empty string so input field is cleared
        this.newTask = "";
      }
    }
  }
});
