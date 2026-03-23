class TaskRenderer {
    render(task){
        throw new Error("Méthode abstraite")
    }
}

class WorkRenderer extends TaskRenderer {
    render(task){

        const li = document.createElement("li")
        li.textContent = task.title
        li.style.backgroundColor = "red"

        return li

    }
}

class HomeRenderer extends TaskRenderer {

    render(task){
        const li = document.createElement("li")
        li.textContent = task.title
        li.style.backgroundColor = "blue"

        return li
    }
}

class MiscRenderer extends TaskRenderer {
    render(task){
        const li = document.createElement("li")
        li.textContent = task.title
        li.style.backgroundColor = "green"

        return li
    }
}

class TaskView {

    constructor(){
        this.taskList = document.getElementById("taskList")
        this.taskInput = document.getElementById("taskInput")
        this.categoryInput = document.getElementById("categoryInput")
        this.taskForm = document.getElementById("taskForm")
    }

    displayTasks(tasks){
        this.taskList.innerHTML = ""

        tasks.forEach(task => {
            let renderer

            if(task.category === "travail"){
                renderer = new WorkRenderer()
            }

            else if(task.category === "maison"){
                renderer = new HomeRenderer()
            }

            else{
                renderer = new MiscRenderer()
            }

            this.taskList.appendChild(renderer.render(task))
        })
    }
}