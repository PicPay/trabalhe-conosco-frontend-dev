import React from 'react';
import '../css/index.css';
import UsuListaItem from './Usu_Lista_Item';


const UsuLista = (props) =>{
  const Lista = props.pessoas.map((term)=>{
      return (
        <UsuListaItem
          key={term.id}
          nome={term.name}
          imagem={term.img}
          iden={term.id}
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
