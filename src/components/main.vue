<template>
  <div class="main">
  <div class="container" id="todo">
    <!-- Panel for holding our input -->
      <section class="panel">

        <input type="checkbox" id="mark-all">
        <input type="text" placeholder="What do you need to do?" autofocus class="text-input" v-model="newTask" v-on:keyup.enter="addTask">
        <button>Clear List</button>
  
      </section>
    
    <!-- Unordered list for holding our to-do items -->
      <ul class="list">

        <li v-for="task in taskList">

          <input type="checkbox" class="checkbox">
          <label for="checkbox">{{ task.text }}</label>
          <button class="delete">X</button>

        </li>
     
      </ul>

      <!-- Will string the contents of the data object and display on page-->
      <pre>{{ $data }}</pre>

  <!-- </div>   -->
  </div>
</template>

<script>
export default {
  name: 'todo',
  data: function () {
    return {
      newTask: '',
      taskList: []
    }
  },
  methods: {

    addTask: function () {
      // trim() is used to remove whitespace from both ends of a string
      var task = this.newTask.trim()
      // if task is not an empty string
      if (task) {
        // push an object containing the task to the task List array
        this.taskList.push({
          text: task,
          checked: false
        })
        // reset newTask to an empty string so input field is cleared
        this.newTask = ''
      }
    }
  }
}
</script>

<style scoped>

ul, li {
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  line-height: 1;
  font-family: "Lato", sans-serif;
  background-color: #E2E4F6;
}

.container {
  width: 70%;
  margin: 1em auto 3em;
  border: 1px solid #DEFFFC;
}

.panel, li {
  /*use flexbox */
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding: 10px;
  border-bottom: 1px solid #DEFFFC;
  background-color: #E7C8DD;
}

.text-input {
  border: 1px solid #E7C8DD;
  padding-left: 10px;
  width: 70%;
  height: 35px;
  color: #555;
  font-size: 1.125rem;
  font-weight: 200;
}

button {
  color: #555;
  background-color: #FFFFFF;
  border: 1px solid #DEFFFC;
  outline: 0;
  width: 100px;
  height: 38px;
  cursor: pointer;
  font-size: 15px;
}

/* Task area */ 
.list li {
  background-color: #86626E;
}

.list li .checkbox {
  margin-right: 40px;
}

.list li .delete {
  background-color: transparent;
  border: 1px solid #86626E;
  color: #ddd;
  /*hide the delete button by default*/
  visibility: hidden;
  font-size: 20px;
  font-weight: bold;
}

.list li:hover > .delete {
  /* show the delete button when hovering on list item*/
  visibility: visible;
}

.list label {
  padding-right: 10px;
  display: inline-block;
  width: 70%;
  font-size: 18px;
  line-height: 24px;
  color: #fcfcfc;
  z-index: 2;
  overflow: hidden;
}

.list li.done label {
  color: #ddd;
  text-decoration: line-through;
}

/* Media Queries */

@media screen and (max-width: 768px) {
  .container {
    width: 90%;
    max-width: 90%;
  }
  button {
    width: 80px;
  }
}
</style>
