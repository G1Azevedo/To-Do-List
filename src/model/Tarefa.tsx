export class Tarefa {
    titulo: string;
    descricao: string;
    prazo: string;

    constructor(titulo: string, descricao: string, prazo: string) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.prazo = prazo;
    }
}
