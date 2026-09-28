/*
   componentes dos cards e carrossel de fotos

   este arquivo le a lista EVENTOS (eventos.js) e cria UM card para cada evento,
   sempre com a mesma estrutura e o mesmo carrossel
 */

(function () {
    "use strict";

    var grade = document.getElementById("grade");
    if (!grade || typeof EVENTOS === "undefined" || typeof CONFIG === "undefined") return;

    var movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

    var CORES = ["laranja", "branco", "azul", "verde", "lima", "cinza"];
    var TAMANHOS = ["grande", "medio", "pequeno"];
    var TEMPO_FECHAR = 560; // ms - igual à --duracao do style.css (.55s)

    var SETA_ANTERIOR = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var SETA_PROXIMA = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';


    /* utilitário: cria um elemento */
    function criar(tag, classe, texto) {
        var el = document.createElement(tag);
        if (classe) el.className = classe;
        if (texto !== undefined) el.textContent = texto;
        return el;
    }


    /* transforma a lista "fotos" do evento em caminhos completos */
    function listaDeFotos(evento, indice) {
        var nomePasta = String(evento.pasta || "evento-" + String(indice + 1).padStart(2, "0"))
            .replace(/^\/+|\/+$/g, "");
        var base = String(CONFIG.pastaImagens || "img").replace(/\/+$/, "");

        var itens = evento.fotos;
        if (typeof itens === "number") itens = numeradas(itens);
        if (!Array.isArray(itens)) itens = [];

        return itens.map(function (item, n) {
            var f = typeof item === "string" ? { arquivo: item } : item;
            return {
                src: base + "/" + nomePasta + "/" + f.arquivo,
                alt: f.alt || evento.titulo + ": foto " + (n + 1),
                legenda: f.legenda || "",
                foco: f.foco || "",
                orientacao: f.orientacao === "horizontal" ? "horizontal" : "vertical"
            };
        });
    }


    /* carrossel - igual p todos os eventos */
    function criarGaleria(evento, fotos) {
        var galeria = criar("div", "galeria");

        if (fotos.length === 0) {
            galeria.appendChild(criar("p", "galeria-vazia", "Ainda não há fotografias neste momento."));
            return galeria;
        }

        var trilho = criar("div", "galeria-trilho");
        trilho.tabIndex = 0; // permite usar as setas do teclado
        trilho.setAttribute("role", "group");
        trilho.setAttribute("aria-roledescription", "carrossel");
        trilho.setAttribute("aria-label", "Fotografias de " + evento.titulo + (evento.data ? " (" + evento.data + ")" : ""));

        var controles = criar("div", "galeria-controles");
        var anterior = criar("button", "galeria-botao");
        var contador = criar("span", "galeria-contador");
        var proximo = criar("button", "galeria-botao");

        anterior.type = proximo.type = "button";
        anterior.setAttribute("aria-label", "Foto anterior");
        proximo.setAttribute("aria-label", "Próxima foto");
        anterior.innerHTML = SETA_ANTERIOR;
        proximo.innerHTML = SETA_PROXIMA;
        contador.setAttribute("aria-live", "polite");
        contador.setAttribute("aria-atomic", "true");

        controles.appendChild(anterior);
        controles.appendChild(contador);
        controles.appendChild(proximo);

        var slides = [];
        var atual = 0;

        fotos.forEach(function (foto) {
            var slide = criarSlide(foto, aoFalhar);
            slides.push(slide);
            trilho.appendChild(slide);
        });

        galeria.appendChild(trilho);
        galeria.appendChild(controles);
        renumerar();

        /* foto não encontrada na pasta */
        function aoFalhar(slide) {
            if (CONFIG.mostrarEspacosVazios) {
                slide.classList.add("sem-arquivo"); // mostra "Coloque a foto aqui"
                return;
            }
            slides = slides.filter(function (s) { return s !== slide; });
            slide.remove();
            if (slides.length === 0) {
                galeria.innerHTML = "";
                galeria.appendChild(criar("p", "galeria-vazia", "Ainda não há fotografias neste momento."));
                return;
            }
            renumerar();
            atualizar();
        }

        function renumerar() {
            slides.forEach(function (s, i) {
                s.setAttribute("aria-label", "Foto " + (i + 1) + " de " + slides.length);
            });
        }

        /* descobre qual foto está no centro e atualiza contador, botões e destaque */
        function atualizar() {
            if (!slides.length || !trilho.clientWidth) return;
            var centro = trilho.scrollLeft + trilho.clientWidth / 2;
            var melhor = 0;
            var menor = Infinity;
            slides.forEach(function (s, i) {
                var distancia = Math.abs(s.offsetLeft + s.offsetWidth / 2 - centro);
                if (distancia < menor) { menor = distancia; melhor = i; }
            });
            atual = melhor;
            slides.forEach(function (s, i) { s.classList.toggle("atual", i === melhor); });
            contador.textContent = (melhor + 1) + " / " + slides.length;
            anterior.disabled = melhor === 0;
            proximo.disabled = melhor === slides.length - 1;
        }

        function ir(i) {
            i = Math.max(0, Math.min(slides.length - 1, i));
            var s = slides[i];
            trilho.scrollTo({
                left: s.offsetLeft + s.offsetWidth / 2 - trilho.clientWidth / 2,
                behavior: movimentoReduzido.matches ? "auto" : "smooth"
            });
        }

        anterior.addEventListener("click", function () { ir(atual - 1); });
        proximo.addEventListener("click", function () { ir(atual + 1); });

        trilho.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") { e.preventDefault(); ir(atual + 1); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); ir(atual - 1); }
            else if (e.key === "Home") { e.preventDefault(); ir(0); }
            else if (e.key === "End") { e.preventDefault(); ir(slides.length - 1); }
        });

        var esperando = false;
        trilho.addEventListener("scroll", function () {
            if (esperando) return;
            esperando = true;
            window.requestAnimationFrame(function () { esperando = false; atualizar(); });
        }, { passive: true });

        // recalcula quando o card abre/fecha ou a tela muda de tamanho
        if ("ResizeObserver" in window) new ResizeObserver(atualizar).observe(trilho);
        atualizar();

        return galeria;
    }

    /* foto polaroide */
    function criarSlide(foto, aoFalhar) {
        var slide = criar("div", "slide");
        if (foto.orientacao === "horizontal") slide.classList.add("slide--horizontal");
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "slide");

        var polaroid = criar("figure", "polaroid");
        var moldura = criar("div", "foto");
        if (foto.orientacao === "horizontal") moldura.classList.add("foto--horizontal");

        // quadrinho que aparece só se o arquivo da foto não existir
        var vazia = criar("div", "foto-vazia");
        vazia.appendChild(criar("strong", "", "Coloque a foto aqui"));
        vazia.appendChild(criar("code", "", foto.src));
        moldura.appendChild(vazia);

        var img = document.createElement("img");
        img.alt = foto.alt;
        img.loading = "lazy";
        img.decoding = "async";
        if (foto.foco) img.style.setProperty("--foco", foto.foco);
        img.addEventListener("error", function () {
            img.remove();
            aoFalhar(slide);
        });
        img.src = foto.src;
        moldura.appendChild(img);

        polaroid.appendChild(moldura);
        polaroid.appendChild(criar("figcaption", "", foto.legenda));
        slide.appendChild(polaroid);
        return slide;
    }


    /* cards */
    function criarCard(evento, indice) {
        var id = "evento-" + (indice + 1);
        var cor = CORES.indexOf(evento.cor) >= 0 ? evento.cor : CORES[indice % CORES.length];
        var tamanho = TAMANHOS.indexOf(evento.tamanho) >= 0 ? evento.tamanho : "medio";

        var card = criar("article", "card cor-" + cor + " card--" + tamanho);
        card.style.setProperty("--i", indice);

        /* cabeçalho - titulo + data + btn abre/fecha */
        var titulo = criar("h2", "card-titulo");
        var botao = criar("button", "card-botao");
        botao.type = "button";
        botao.id = "botao-" + id;
        botao.setAttribute("aria-expanded", "false");
        botao.setAttribute("aria-controls", "painel-" + id);

        var textos = criar("span", "card-textos");
        textos.appendChild(criar("span", "card-titulo-texto", evento.titulo));
        if (evento.data) {
            textos.appendChild(document.createTextNode(" "));
            textos.appendChild(criar("span", "card-data", evento.data));
        }
        var icone = criar("span", "card-icone");
        icone.setAttribute("aria-hidden", "true");

        botao.appendChild(textos);
        botao.appendChild(icone);
        titulo.appendChild(botao);
        card.appendChild(titulo);

        /* painel que abre - frase + carrossel */
        var painel = criar("div", "card-painel");
        painel.id = "painel-" + id;
        painel.setAttribute("role", "region");
        painel.setAttribute("aria-labelledby", "botao-" + id);

        var interno = criar("div", "card-painel-interno");
        var conteudo = criar("div", "card-conteudo");
        if (evento.frase) conteudo.appendChild(criar("p", "card-frase", evento.frase));
        conteudo.appendChild(criarGaleria(evento, listaDeFotos(evento, indice)));

        interno.appendChild(conteudo);
        painel.appendChild(interno);
        card.appendChild(painel);

        botao.addEventListener("click", function () { alternar(card); });
        return card;
    }


    /* só um card fica aberto por vez e ocupa uma linha inteira */
    var fechandoCard = null; // card que está fechando agora
    var pendente = null;     // card que foi clicado enquanto outro fechava

    function definirAberto(card, aberto) {
        card.classList.toggle("aberto", aberto);
        card.querySelector(".card-botao").setAttribute("aria-expanded", aberto ? "true" : "false");
    }

    /* mudança de layout e animação dos cards do lugar antigo pro novo */
    function comAnimacaoDeLugar(mudar) {
        var cards = Array.prototype.slice.call(grade.children);
        var antes = cards.map(function (c) { return c.getBoundingClientRect(); });
        mudar();
        if (movimentoReduzido.matches || !cards.length || !cards[0].animate) return;
        cards.forEach(function (c, i) {
            var depois = c.getBoundingClientRect();
            var dx = antes[i].left - depois.left;
            var dy = antes[i].top - depois.top;
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
            c.animate(
                [{ transform: "translate(" + dx + "px, " + dy + "px)" }, { transform: "translate(0, 0)" }],
                { duration: 600, easing: "cubic-bezier(.22, .8, .24, 1)" }
            );
        });
    }

    function rolarPara(card) {
        card.scrollIntoView({ behavior: movimentoReduzido.matches ? "auto" : "smooth", block: "start" });
    }

    function abrir(card) {
        comAnimacaoDeLugar(function () { definirAberto(card, true); });
        rolarPara(card);
    }

    function fechar(card) {
        fechandoCard = card;
        definirAberto(card, false);
        card.classList.add("fechando"); // continua com a largura total até terminar de recolher

        window.setTimeout(function () {
            var proximo = pendente;
            pendente = null;
            fechandoCard = null;
            comAnimacaoDeLugar(function () {
                card.classList.remove("fechando");
                if (proximo) definirAberto(proximo, true);
            });
            if (proximo) rolarPara(proximo);
        }, movimentoReduzido.matches ? 0 : TEMPO_FECHAR);
    }

    function alternar(card) {
        if (fechandoCard) { pendente = card; return; }
        var aberto = grade.querySelector(".card.aberto");
        if (aberto === card) { fechar(card); return; }
        if (aberto) { pendente = card; fechar(aberto); return; }
        abrir(card);
    }

    /* esc fecha card */
    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape" || fechandoCard) return;
        var aberto = grade.querySelector(".card.aberto");
        if (aberto) {
            fechar(aberto);
            aberto.querySelector(".card-botao").focus();
        }
    });


    /* MONTA A PÁGINA!!!!!!!!!!!!!!!!!!!! */
    EVENTOS.forEach(function (evento, indice) {
        grade.appendChild(criarCard(evento, indice));
    });
})();
