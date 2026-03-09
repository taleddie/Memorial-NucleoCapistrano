
document.addEventListener("click", function(event) {

    // verifica se o clique foi dentro de algum card
    const isClickInsideGrid = event.target.closest(".conteudoCont > div");
    
    // se o clique NÃO foi dentro de um dos grids
    if (!isClickInsideGrid) {
        // remove a classe 'active' de todos os grids
        document.querySelectorAll(".conteudoCont > div")
            .forEach(div => div.classList.remove("active"));
    }
});

document.querySelectorAll(".conteudoCont > div").forEach(item => {
    item.addEventListener("click", function(event) {
        event.stopPropagation();
        
        // verifica se o card clicado JÁ ESTÁ ATIVO
        const isAlreadyActive = this.classList.contains("active");
        
        // remove a classe 'active' de todos os grids
        document.querySelectorAll(".conteudoCont > div")
            .forEach(div => div.classList.remove("active"));
        
        // se NÃO estava ativo, ativa o card clicado
        if (!isAlreadyActive) {
            this.classList.add("active");
        }
        // se já estava ativo, não adiciona a classe (fica fechado)
    });
});

