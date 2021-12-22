var courseApi = 'http://localhost:8000/api/todos';

function start() {
    getCourse(renderCourse);

    handleCreateForm();
}

start();

//select all

function getCourse(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json' 
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json(); 
}
  
  

//delete data

function deleteCourses(id) {
    var options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            fetch('http://localhost:8000/api/todo/'+id+'/delete', options)
                .then(function (response) {
                    response.json();
                })
                .then(function() {
                    getCourse(renderCourse);
                });
}

//Input update

function inputUpdate(id) {
    console.log(id)
    var createBtn = document.querySelector('#create');
    var updateBtn = document.querySelector('#update');
    createBtn.setAttribute('style', 'display: none;');
    updateBtn.setAttribute('style', 'display: block;');
    updateBtn.setAttribute('onclick', `updateCourses('${id}')`);


    fetch('http://localhost:8000/api/todo/'+id)
        .then(function (response) {
            return response.json();
        })
        .then(getCourseUpdate);
}

function getCourseUpdate(course) {
    document.querySelector('input[name="task"]').value = course.task;
    console.log(course.task)
}

function renderCourse(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var cour = courses.todos;
    var htmls = cour.map(function (course) {
        return `
            <li>
                <h4>${course.task}</h4>
                <button onclick="deleteCourses('${course._id}')">Delete</button>
                <button onclick="inputUpdate('${course._id}')">Update</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="task"]').value;
        var formData = {task: name}
        console.log(formData);
        postData('http://localhost:8000/api/todo/create', formData)
            .then(formData => {
            console.log(formData);
            })
            .then(function() {
                getCourse(renderCourse);
            })
        
    }
}

//update DB

async function putData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json(); 
}

function updateCourses(id) {
    console.log(id)
    var task = document.querySelector('input[name="task"]').value;
    var formData = {task: task}
    console.log(formData);
    putData('http://localhost:8000/api/todo/'+id+'/update', formData)
            .then(formData => {
            console.log(formData);
            })
            .then(function() {
                getCourse(renderCourse);
            })

    var createBtn = document.querySelector('#create');
    var updateBtn = document.querySelector('#update');
    createBtn.setAttribute('style', 'display: block;');
    updateBtn.setAttribute('style', 'display: none;');
    document.querySelector('input[name="task"]').value = "";
}