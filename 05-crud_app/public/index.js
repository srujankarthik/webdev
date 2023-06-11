// selections
const tasksDOM = document.querySelector('.tasks');
const loadingTextDOM = document.querySelector('.loading')
const taskForm = document.querySelector('.task-input');
const taskFormBtn = document.querySelector('.submit-btn');

// console.log(taskForm, taskFormBtn);

async function displayTasks() {
    loadingTextDOM.style.visibility = 'visible';
    try {
        const {
            data: {tasks}
        } = await axios.get('/api/v1/tasks');
        if(tasks.length < 1) {
            tasksDOM.innerHTML = `<h4 class="">No tasks</h4>`
            loadingTextDOM.style.visibility = 'hidden';
            return;
        }
        const allTasks = tasks.map((task) => {
            const {completed, _id: taskID, name } = task;
            return (
            `
            <div class="p-2 bg-gray-400 rounded-sm">
            <h2>${name}</h2>
            </div>
            `)
            
        })
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.log(error);
    }
    loadingTextDOM.style.visibility = 'hidden';
}

displayTasks();

// add tasks to form via input