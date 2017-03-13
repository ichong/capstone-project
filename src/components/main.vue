<template>
  <div class="main">
    <div v-if="! user">
      <div @click="login" class="login-button">Login with Google</div>
          <div class="instructions">
            <h3>Organize and manage your wedding todos.</h3>
          </div>
    </div>
    <div class="user-info" v-if="user">
      <h3>Welcome back {{user.displayName}}!</h3>
      <div class="avatar" :style="{'background-image': 'url(' + user.photoURL + ')' }"></div>
      <div @click="logout" class="logout-button">Logout</div>
    </div>
    <div v-if="user" class="instructions">
      <h3>Enter your tasks below. Check off when complete. Your to-dos automatically save!</h3>
    </div>
    <div v-if="user" class="container" id="todo">
      <!-- Panel for holding our input -->
        <section class="panel">

          <input type="checkbox" id="mark-all" v-bind:checked="areAllSelected" v-on:click="toggleClicked">
          <input type="text" placeholder="What do you need to do?" autofocus class="text-input" v-model="newTask" v-on:keyup.enter="addTask">
          <button v-on:click="clearList">Clear List</button>
    
        </section>
      
      <!-- Unordered list for holding our to-do items -->
        <ul class="list">

          <li v-for="task in taskList" v-bind:class= "{done:task.checked}">

            <input type="checkbox" class="checkbox" v-model="task.checked">
            <label for="checkbox">{{ task.text }}</label>
            <button class="delete" v-on:click="removeTask(task)">X</button>

          </li>
       
        </ul>

    </div>  
  </div>
</template>

<script>
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAtn19jcwH4G9uGbgbBPK6OfxEi9R2MPV4',
  authDomain: 'capstone-project-4d82d.firebaseapp.com',
  databaseURL: 'https://capstone-project-4d82d.firebaseio.com',
  storageBucket: 'capstone-project-4d82d.appspot.com',
  messagingSenderId: '918035012949'
}

firebase.initializeApp(config)

export default {
  name: 'todo',
  data: function () {
    return {
      newTask: '',
      taskList: [],
      user: null,
      dbRef: ''
    }
  },
  beforeCreate: function () {

  },

  computed: {
    areAllSelected: function () {
      return this.taskList.every(function (task) {
        return task.checked
      })
    },
    tasksExist: function () {
      return this.taskList.length > 0
    }
  },

  methods: {

    login: function () {
      var provider = new firebase.auth.GoogleAuthProvider()

      var main = this

      firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user
        main.user = user
        main.dbRef = 'lists/' + user.uid
        main.$bindAsArray('taskList', firebase.database().ref(main.dbRef))
      }).catch(function (e) {
        console.log(e)
      })
    },

    logout: function () {
      var main = this
      firebase.auth().signOut().then(function (result) {
        main.user = null
      })
    },

    addTask: function () {
      // trim() is used to remove whitespace from both ends of a string
      var task = this.newTask.trim()
      // if task is not an empty string
      if (task) {
        // push an object containing the task to the task List array
        firebase.database().ref(this.dbRef).push({
          text: task,
          checked: false
        })

        // reset newTask to an empty string so input field is cleared
        this.newTask = ''
      }
    },

    removeTask: function (task) {
      firebase.database().ref(this.dbRef).child(task['.key']).remove()
    },

    clearList: function () {
      var t = this
      firebase.database().ref(t.dbRef).remove()
    },

    toggleClicked: function () {
      if (this.tasksExist) {
        this.toggleAllTasks()
      }
    },

    toggleAllTasks: function () {
      var t = this
      var toggle = !this.areAllSelected

      this.taskList.forEach(function (task) {
        firebase.database().ref(t.dbRef).child(task['.key']).update({checked: toggle})
        // task.checked = toggle
      })
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

.instructions {
  text-align: center;
}

.container {
  width: 70%;
  margin: 30px auto 3em;
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
  color: #dddddd;
  text-decoration: line-through;
}

.login-button {
  width: 220px;
  text-align: center;
  padding-top: 40px;
  font-size: 1.5em;
  font-weight: 200;
  color: #ffffff;
  background-color: #333;
  border: 1px solid #333;
  border-radius: 15px;
  padding: 15px;
  margin: 40px auto;
  cursor: pointer;
}

.login-button:hover {
  background-color: #ffffff;
  color: #333;
}

.user-info {
  position: fixed;
  right: 10px;
  left: 10px;
  top: 10px;
}

.user-info h3 {
  float: left;
  font-size: 14px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 30px;
  background-size: cover;
  float: right;
  margin-top: 0px;
}

.logout-button {
  font-size: 14px;
  text-align: right;
  color: #333;
  cursor: pointer;
  float: right;
  margin-right: 10px;
  margin-top: 15px;
}

.logout-button:hover {
  text-decoration: underline;
}

/* Media Queries */
@media screen and (max-width: 768px) {
  .container {
    width: 90%;
    max-width: 90%;
  }

}
</style>
