import React from 'react';
import UsuListaItem from './Usu_Lista_Item';


const UsuLista = (props) =>{
  //Gera a lista de usuários na tela principal
  const Lista = props.pessoas.map((term)=>{
      return (
        <UsuListaItem
          key={term.id}
          nome={term.name}
          imagem={term.img}
          iden={term.id}
          onUserSelect={props.onUserSelect}
          tModalNenhumCartao={props.tModalNenhumCartao}
          tModalCartaoCadastrado={props.tModalCartaoCadastrado}
          username={term.username}/>
      );
    });

  return(
      <div>
        {Lista}
      </div>
  );
}

export default UsuLista;
