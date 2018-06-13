export class Cartao {
    bandeira:string;
    name:string;
    numero:string;
    validade:string;
    cod:number;
    cep:string;

    constructor(){
        this.bandeira="";
        this.name="";
        this.numero="";
        this.validade="";
        this.cep="";
        this.cod=null;
    }
}