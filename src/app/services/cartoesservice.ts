import { Cartao } from './../cartao';

export class CartoesService {
    public cartao : Cartao; //Cartao selecionado
    public lista : Cartao[]=[]; //Cartoes cadastrados

    adiciona(card:Cartao){
        this.lista.push(card);
    }
}