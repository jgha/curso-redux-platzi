import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

import Spinner from '../General/Spinner';
import ErrorMessage from '../General/ErrorMessage';

import Comentarios from "./Comentarios";

const { ObtenerTodos: ObtenerTodosUsuarios } = usuariosActions;
const { 
    ObtenerPorUsuario: PublicacionesPorUsuario,
    abrirCerrar,
    obtenerComentarios
 } = publicacionesActions;



class Publicaciones extends Component {
  async componentDidMount(){
      const { 
        ObtenerTodosUsuarios,
        PublicacionesPorUsuario,
        match : { params: { key } }
       } = this.props;

      if(!this.props.usuariosReducer.usuarios.length){
        console.log('traer usuarios');
        await ObtenerTodosUsuarios();
      }
      if(this.props.usuariosReducer.error){
        return;
      }
      if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
        PublicacionesPorUsuario(key);
      }
      
  }

  renderUsuario = () => {
    const { 
        usuariosReducer,
        match: { params : { key } }
     } = this.props;
    
    if(usuariosReducer.error){
        return <ErrorMessage message={usuariosReducer.error} />
    }

    if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
        return <Spinner />
    }

    const nombre = usuariosReducer.usuarios[key].name;
    return(
        <h1>Publicaciones  de { nombre }</h1>
    );
  };

  renderPublicaciones = () => {
    const { 
        usuariosReducer,
        usuariosReducer: { usuarios },
        publicacionesReducer,
        publicacionesReducer: { publicaciones },
        match: { params : { key } },
    } =  this.props;

    if(!usuarios.length) return;
    if(usuariosReducer.error) return;

    if(publicacionesReducer.cargando){
        return <Spinner />
    }

    if(publicacionesReducer.error){
        return <ErrorMessage message={publicacionesReducer.error} />
    }

    if(!publicaciones.length) return;
    if(!('publicaciones_key' in usuarios[key])) return;

    const {publicaciones_key} =  usuarios[key];

    return this.showInfo(publicaciones[publicaciones_key], publicaciones_key)
  };

  showInfo = (publicaciones, p_key ) => (
    publicaciones.map((publicacion, c_key) => (
        <div 
            key={ publicacion.id } 
            className="post"
            onClick={()=> this.showComments(p_key, c_key, publicacion.comentarios) }
        >
            <h3>{ publicacion.title }</h3>
            <p> { publicacion.body }</p>
           
            { (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : '' }
              
        </div>
    ))
  );

  showComments = (p_key, c_key, comentarios) => {
    this.props.abrirCerrar(p_key, c_key);
    if(!comentarios.length){
        this.props.obtenerComentarios(p_key, c_key);
    }
    
  };


  render() {
    console.log(this.props);
    return (
      <div>
        { this.renderUsuario() }
        { this.renderPublicaciones() }
      </div>
    )
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer, 
        publicacionesReducer
    };
};

const mapDispatchToProps = {
    ObtenerTodosUsuarios,
    PublicacionesPorUsuario,
    abrirCerrar,
    obtenerComentarios
};
export default connect(mapStateToProps, mapDispatchToProps )(Publicaciones);


