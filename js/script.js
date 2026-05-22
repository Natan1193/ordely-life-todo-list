//=========
//  DADOS
//=========

//  Array de tarefas
let tasks = []

//======
// DOM
//======

//  Selecionar elementos do HTML no JavaScript

//  document.querySelector() faz o JavaScript "enxergar" o HTML

const form = document.querySelector("#toDoForm")

const input = document.querySelector("#taskInput")

const list = document.querySelector("#toDoList")

//=================
//  LOCAL STORAGE
//=================

//  Recuperar dados do navegador / pegar o que já foi salvo.
const savedTasks = localStorage.getItem("tasks")

//  Verificar se existem dados
if (savedTasks) {
    //  Converter string para array
    tasks = JSON.parse(savedTasks)
    //  Renderizar ao carregar
    renderTasks()
}

//===========
//  FUNÇÕES
//===========

// Função para salvar

// “Salve no navegador um item chamado tasks contendo o array convertido em texto.”

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//  Renderização

//  Desenha a tela com base no array
function renderTasks() {

    // limpar antes de renderizar
    list.innerHTML = ""

    // Percorre tarefas
    tasks.forEach(function(task) {

        //  Cria um elemento <li> em memória
        const li = document.createElement("li")

        //  Coloca o texto dentro do <li>
        li.textContent = task.text

        //  Muda o estilo para concluída
        if (task.completed) {
            li.style.textDecoration = "line-through"
            li.style.opacity = "0.6"
        }

        //  Adiciona evento de clique no <li>
        li.addEventListener("click", function() {
            
            //  Alterna o completed (false -> true / true -> false)
            task.completed = !task.completed

            // Salvar toda vez que mudar algo nas tarefas
            saveTasks()

            //  Chama a renderização
            renderTasks()
        })

        //  Remove <li> do array 'tasks' e chama renderTasks() (Arquitetura limpa (state-driven))
        
        //  Cria botão dentro do <li>
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "🗑"

        //  Evento de clique no botão
        deleteButton.addEventListener("click", function(event){
            
            //  Evita conflito com clique do <li> (Impede que o clique do botão "suba")
            event.stopPropagation()

            //  Remove do array

            //  Cria um novo array sem a tarefa clicada
            tasks = tasks.filter(function(t) {
                return t.id !== task.id
            })

            // Salvar toda vez que mudar algo nas tarefas
            saveTasks()

            //  Re-renderização
            renderTasks()
        })

        //  Adiciona botão dentro do <li>
        li.appendChild(deleteButton)

        //  Adiciona o <li> na lista (aparece na tela)
        list.appendChild(li)
    })
}

//===========
//  EVENTOS
//===========

//  Capturar o submit do formulário

//  Escutar o evento do form

//  “Quando o formulário for enviado, execute essa função”
form.addEventListener("submit", function(event) {  
    
    //  Impede o comportamento padrão / reload da página
    event.preventDefault()

    //  Captura o que o usuário digitou
    const taskText = input.value

    //  Evita adicionar tarefa vazia
    if (taskText.trim() === "") return

    //  Cria nova tarefa
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    //  Adiciona nova tarefa
    tasks.push(newTask)

    // Salvar toda vez que mudar algo nas tarefas
    saveTasks()

    //  Limpa o input depois de capturar o valor
    input.value = ""

    //  Chama a renderização
    renderTasks()
})

