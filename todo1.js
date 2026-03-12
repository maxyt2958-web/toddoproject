document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("todo-form");
    const taskList = document.getElementById("taskList");
    const emptyImage = document.getElementById("emptyImage");
    const progressBar = document.getElementById("progress");
    const progressNumbers = document.getElementById("numbers");

    
    loadTasks();

addTaskButton.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask();
    });

    function addTask(text = "", completed = false) {
 const taskText = text || taskInput.value.trim();
       if (!taskText) return;
   const li = document.createElement("li");
       if (completed) li.classList.add("completed");
     li.innerHTML = `
           <div class="task-info">
 <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>              <span>${taskText}</span>
            </div>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

    
        const checkbox = li.querySelector(".checkbox");
        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed", checkbox.checked);
            updateProgress();
            saveTasks();
        });

        // Delete logic [00:16:23]
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
            saveTasks();
        });

        // Edit logic [00:16:48]
        li.querySelector(".edit-btn").addEventListener("click", () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector("span").textContent;
                li.remove();
                toggleEmptyState();
                updateProgress();
                saveTasks();
            }
        });

        taskList.appendChild(li);
        taskInput.value = "";
        toggleEmptyState();
        updateProgress();
        saveTasks();
    }

    function updateProgress() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll("input:checked").length;
        const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        
        progressBar.style.width = `${progressPercent}%`;
        progressNumbers.textContent = `${completedTasks}/${totalTasks}`;

        
        if (totalTasks > 0 && completedTasks === totalTasks) {
            confetti({
            particleCount: 150,
             spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    function toggleEmptyState() {
        emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector("input").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});