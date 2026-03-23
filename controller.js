function saveTaskToServer(task){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, task })
        }, 2000)
    })
}

class TaskController {

    constructor(model, view){
        this.model = model
        this.view = view
        this.currentFilter = "all"

        this.model.subscribe((allTasks) => {
            this.view.updateStats(allTasks)

            let tasks = allTasks
            if(this.currentFilter !== "all"){
                tasks = tasks.filter(t => t.category === this.currentFilter)
            }
            this.view.displayTasks(tasks, this)
        })

        this.init()
    }

    init(){

        this.view.taskForm.addEventListener("submit", async (e) => {
            e.preventDefault()

            const title = this.view.taskInput.value.trim()
            const category = this.view.categoryInput.value

            if(!title) return

            this.view.setLoading(true)

            try {
                const response = await saveTaskToServer(new AdvancedTask(title, category))

                if(response.success){
                    this.model.addTask(response.task)
                    this.view.taskInput.value = ""
                }
            } catch(err) {
                console.error("Erreur serveur :", err)
            } finally {
                this.view.setLoading(false)
            }
        })

        this.view.filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                this.currentFilter = btn.dataset.filter
                this.view.filterButtons.forEach(b => b.classList.remove("active"))
                btn.classList.add("active")

                const allTasks = this.model.getTasks()
                this.view.updateStats(allTasks)
                let tasks = allTasks
                if(this.currentFilter !== "all"){
                    tasks = tasks.filter(t => t.category === this.currentFilter)
                }
                this.view.displayTasks(tasks, this)
            })
        })

        if(this.model.getTasks().length === 0){
            fetch("tasks.json")
                .then(res => res.json())
                .then(data => {
                    data.forEach(t => {
                        this.model.addTask(new AdvancedTask(t.title, t.category))
                    })
                })
        }
    }

    deleteTask(index){
        const tasks = this.model.getTasks()

        if(this.currentFilter !== "all"){
            const filtered = tasks.filter(t => t.category === this.currentFilter)
            const realTask = filtered[index]
            const realIndex = tasks.indexOf(realTask)
            this.model.removeTask(realIndex)
        } else {
            this.model.removeTask(index)
        }
    }
}

const model = new TaskModel()
const view = new TaskView()
new TaskController(model, view)