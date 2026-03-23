class Task {
    constructor(title){
        this.title = title
    }
}

class AdvancedTask extends Task {
    constructor(title, category, done = false){
        super(title)
        this.category = category
        this.done = done
    }
}

class TaskModel {

    constructor(){
        if (TaskModel.instance){
            return TaskModel.instance
        }

        this.tasks = []
        this.load()

        TaskModel.instance = this
    }

    addTask(task){
        this.tasks.push(task)
        this.save()
    }

    removeTask(index){
        this.tasks.splice(index, 1)
        this.save()
    }

    getTasks(){
        return this.tasks
    }

    save(){
        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

    load(){
        const data = JSON.parse(localStorage.getItem("tasks")) || []
        this.tasks = data.map(t => new AdvancedTask(t.title, t.category, t.done))
    }
}