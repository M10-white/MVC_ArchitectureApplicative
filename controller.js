class TaskController {

    constructor(model, view){
        this.model = model
        this.view = view
        this.currentFilter = "all"

        this.init()
    }

    init(){

        this.view.taskForm.addEventListener("submit", (e)=>{
            e.preventDefault()

            const title = this.view.taskInput.value
            const category = this.view.categoryInput.value

            this.model.addTask(new AdvancedTask(title, category))

            this.view.taskInput.value = ""

            this.updateView()
        })

        this.view.filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {

                this.currentFilter = btn.dataset.filter

                this.view.filterButtons.forEach(b => b.classList.remove("active"))
                btn.classList.add("active")

                this.updateView()
            })
        })

        if(this.model.getTasks().length === 0){
            fetch("tasks.json")
                .then(res => res.json())
                .then(data => {
                    data.forEach(t => {
                        this.model.addTask(new AdvancedTask(t.title, t.category))
                    })
                    this.updateView()
                })
        } else {
            this.updateView()
        }
    }

    updateView(){
        let tasks = this.model.getTasks()

        this.view.updateStats(tasks)

        if(this.currentFilter !== "all"){
            tasks = tasks.filter(t => t.category === this.currentFilter)
        }

        this.view.displayTasks(tasks, this)
    }

    deleteTask(index){
        let tasks = this.model.getTasks()

        if(this.currentFilter !== "all"){
            const filtered = tasks.filter(t => t.category === this.currentFilter)
            const realTask = filtered[index]
            const realIndex = tasks.indexOf(realTask)
            this.model.removeTask(realIndex)
        } else {
            this.model.removeTask(index)
        }

        this.updateView()
    }
}

const model = new TaskModel()
const view = new TaskView()
new TaskController(model, view)