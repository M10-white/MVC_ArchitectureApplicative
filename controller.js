class TaskController {

    constructor(model, view){

        this.model = model
        this.view = view

        this.view.taskForm.addEventListener("submit", (e)=>{

            e.preventDefault()

            const title = this.view.taskInput.value
            const category = this.view.categoryInput.value

            const task = new AdvancedTask(title, category)

            this.model.addTask(task)

            this.view.taskInput.value = ""

            this.view.displayTasks(this.model.getTasks())

        })
    }
}

const model = new TaskModel()
const view = new TaskView()

new TaskController(model, view)