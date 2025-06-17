export class Tarefa {
    id: string;
    titulo: string;
    descricao: string;
    prazo: string;
    categoria: string;
    concluida: boolean;

    constructor(titulo: string, descricao: string, prazo: string, categoria: string, id?: string) {
        this.id = id || new Date().getTime().toString() + Math.random().toString();
        this.titulo = titulo;
        this.descricao = descricao;
        this.prazo = prazo;
        this.categoria = categoria;
        this.concluida = false;
    }
}