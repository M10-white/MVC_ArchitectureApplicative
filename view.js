class TaskView {

    constructor(){
        this.taskList = document.getElementById("taskList")
        this.taskInput = document.getElementById("taskInput")
        this.categoryInput = document.getElementById("categoryInput")
        this.taskForm = document.getElementById("taskForm")
        this.filterButtons = document.querySelectorAll(".filters button")
        this.emptyState = document.getElementById("emptyState")
        this.taskCount = document.getElementById("taskCount")
        this.statTotal = document.getElementById("statTotal")
        this.statDone = document.getElementById("statDone")
        this.statLeft = document.getElementById("statLeft")
    }

    createTaskElement(task){

        const li = document.createElement("li")
        li.classList.add(task.category)

        if(task.done) li.classList.add("done")

        const span = document.createElement("span")
        span.textContent = task.title

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "✕"
        deleteBtn.classList.add("delete")
        deleteBtn.title = "Supprimer"

        li.appendChild(span)
        li.appendChild(deleteBtn)

        // Click on task to toggle done
        span.addEventListener("click", () => {
            task.done = !task.done
            li.classList.toggle("done")
        })

        return { li, deleteBtn }
    }

    displayTasks(tasks, controller){

        this.taskList.innerHTML = ""

        // Empty state
        if(tasks.length === 0){
            this.emptyState.classList.add("visible")
        } else {
            this.emptyState.classList.remove("visible")
        }

        // Task count
        const word = tasks.length <= 1 ? "tâche" : "tâches"
        this.taskCount.textContent = `${tasks.length} ${word}`

        tasks.forEach((task, index) => {

            const { li, deleteBtn } = this.createTaskElement(task)

            deleteBtn.addEventListener("click", () => {
                controller.deleteTask(index)
            })

            this.taskList.appendChild(li)
        })
    }

    updateStats(allTasks){
        const total = allTasks.length
        const done = allTasks.filter(t => t.done).length
        const left = total - done

        this.statTotal.textContent = total
        this.statDone.textContent = done
        this.statLeft.textContent = left
    }
}