class Task {

    constructor(title){
        this.title = title
    }

}

class AdvancedTask extends Task {

    constructor(title, category){
        super(title)
        this.category = category
    }

}

class TaskModel {

    constructor(){

        if (TaskModel.instance){
            return TaskModel.instance
        }

        this.tasks = []

        TaskModel.instance = this

    }

    addTask(task){
        this.tasks.push(task)
    }

    getTasks(){
        return this.tasks
    }

}