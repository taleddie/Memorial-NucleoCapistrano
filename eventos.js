/*
    eventos do memorial
    trocar textos, fotos ou adicionar/remover itens

   - formato vertical 4:5 (a foto é cortada automaticamente no centro)
   - pd ser .png, .jpg ou .webp
   - até uns 400 KB por foto pro site abrir suave no celular
 */


/* config geral */
const CONFIG = {

    // pasta onde ficam as pastas de cada evento (evento-01, evento-02...)
    pastaImagens: "img",

    // true  = enquanto a foto NAO existir mostra o aviso
    // false = fotos que nao existirem simplesmente NAO APARECEM (ativar quando terminar de colocar tudo)
    mostrarEspacosVazios: true
};


/* atalho p fotos numeradas */
function numeradas(quantidade, extensao = "png") {
    const lista = [];
    for (let n = 1; n <= quantidade; n++) {
        lista.push("foto-" + String(n).padStart(2, "0") + "." + extensao);
    }
    return lista;
}


/*
   LISTA DE EVENTOS
   Campos de cada evento:

   pasta    -> nome da pasta das fotos, dentro de img/          (ex.: "evento-01")
   titulo   -> título do card
   data     -> data ou período (deixe "" se não tiver; então nada aparece)
   frase    -> frase de lembrança que aparece acima das fotos (deixe "" para não mostrar)
   cor      -> "laranja", "branco", "azul", "verde", "lima" ou "cinza"
   tamanho  -> "grande" (linha inteira), "medio" (metade) ou "pequeno" (um quarto)
               (só muda o tamanho do card FECHADO no computador)
   fotos    -> as fotos do carrossel. Duas formas:

               1) Numeradas (mais fácil):        fotos: numeradas(6)

               2) Lista com nomes de arquivo:    fotos: ["foto-01.png", "foto-02.png"]

               Se quiser descrever cada foto (bom para acessibilidade), legenda ou ajustar o corte,
               use objetos em vez de nomes:

               fotos: [
                   { arquivo: "foto-01.png", alt: "Descrição da foto", legenda: "Texto embaixo da foto", foco: "50% 20%" },
                   { arquivo: "foto-02.png", alt: "Descrição da foto", orientacao: "horizontal" }
               ]

               alt        = descrição para leitores de tela (recomendado)
               legenda    = texto curto na borda branca da polaroide (opcional)
               foco       = ponto do corte: "50% 50%" = centro; "50% 0%" = topo; "50% 100%" = base (opcional)
               orientacao = "vertical" (padrão, não precisa escrever) ou "horizontal"
                            use "horizontal" pra foto tirada na deitada - ela fica mais larga no carrossel
                            dá pra misturar vertical e horizontal no mesmo evento sem problema
 */
const EVENTOS = [

    {
        pasta: "evento-01",
        titulo: "Passeios e Atividades Culturais",
        data: "",
        frase: "",
        cor: "laranja",
        tamanho: "grande",
        fotos: [
            { arquivo: "foto-01.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-02.jpg", legenda: " ", orientacao: "vertical" },
            { arquivo: "foto-03.png", legenda: " ", orientacao: "vertical" },
            { arquivo: "foto-04.jpg", orientacao: "vertical" },
            { arquivo: "foto-05.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-06.jpg", legenda: " ", orientacao: "horizontal", foco: "50% 80%" },
            { arquivo: "foto-07.jpg", legenda: " ", orientacao: "vertical" },
            { arquivo: "foto-08.heic", legenda: " ", orientacao: "vertical" },
            { arquivo: "foto-09.jpg", legenda: " ", orientacao: "vertical" }
        ]
    },
    {
        pasta: "evento-02",
        titulo: "Eventos Esportivos e Competições",
        data: "",
        frase: "",
        cor: "branco",
        tamanho: "pequeno",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-02/
    },
    {
        pasta: "evento-03",
        titulo: "Confraternizações",
        data: "",
        frase: "",
        cor: "azul",
        tamanho: "medio",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-03/
    },
    {
        pasta: "evento-04",
        titulo: "Amistosos",
        data: "",
        frase: "",
        cor: "lima",
        tamanho: "pequeno",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-04/
    },
    {
        pasta: "evento-05",
        titulo: "Eventos Externos",
        data: "",
        frase: "",
        cor: "cinza",
        tamanho: "pequeno",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-10/
    },
    {
        pasta: "evento-06",
        titulo: "Festivais de Férias",
        data: "",
        frase: "",
        cor: "verde",
        tamanho: "pequeno",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-11/
    },
    {
        pasta: "evento-07",
        titulo: "Etapa Final",
        data: "2024",
        frase: "",
        cor: "branco",
        tamanho: "medio",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-09/
    },
    {
        pasta: "evento-08",
        titulo: "Etapa Local",
        data: "2024",
        frase: "",
        cor: "azul",
        tamanho: "medio",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-05/
    },
    {
        pasta: "evento-09",
        titulo: "Etapa Regional",
        data: "2024",
        frase: "",
        cor: "lima",
        tamanho: "medio",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-06/
    },
    {
        pasta: "evento-10",
        titulo: "Etapa Local",
        data: "2025",
        frase: "",
        cor: "verde",
        tamanho: "medio",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-07/
    },
    {
        pasta: "evento-11",
        titulo: "Etapa Regional",
        data: "2025",
        frase: "",
        cor: "laranja",
        tamanho: "medio",
        fotos: numeradas(6)   // <- AQUI: fotos em img/evento-08/
    },
    {
        pasta: "evento-12",
        titulo: "Etapa Final",
        data: "2025",
        frase: "Adiada de 2025 para 2026.",
        cor: "cinza",
        tamanho: "medio",
        fotos: [
            { arquivo: "foto-01.jpg", legenda: "Núcleos Capistrano e Itaim Paulista", orientacao: "vertical" },
            { arquivo: "foto-02.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-03.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-04.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-05.jpg", legenda: " ", orientacao: "vertical" }
        ]
    },
    {
        pasta: "evento-13",
        titulo: "Etapa Local",
        data: "2026",
        frase: "",
        cor: "branco",
        tamanho: "medio",
        fotos: [
            { arquivo: "foto-01.jpg", legenda: " ", orientacao: "vertical" },
            { arquivo: "foto-02.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-03.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-04.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-05.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-06.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-07.jpg", legenda: " ", orientacao: "horizontal" },
            { arquivo: "foto-08.jpg", legenda: " ", orientacao: "horizontal" }
        ]
    }

    /* PARA ADICIONAR UM NOVO EVENTO:
       1) crie a pasta img/evento-12/ e coloque as fotos lá dentro
       2) copie um bloco { ... } acima, cole aqui embaixo (com vírgula depois do bloco anterior)
       3) troque pasta, titulo, data, cor e fotos

       {
           pasta: "evento-12",
           titulo: "nome",
           data: "2026",
           frase: "pipipi popopo ",
           cor: "lima",
           tamanho: "medio",
           fotos: numeradas(6)
       }
    */
];
