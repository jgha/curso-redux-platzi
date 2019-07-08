import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../General/Spinner';
import ErrorMessage from '../General/ErrorMessage';

const Comentarios = (props) => {

    if(props.comentario_error){
        return <ErrorMessage message={props.comentario_error} />
    }

    if(props.comentario_cargando && !props.comentarios.length){
        return <Spinner />
    }

    const showComment = () =>{
        return props.comentarios.map((comentario, key)=>(
            <li key={comentario.id}>
            <span>{ comentario.email }</span>
            <p>{ comentario.body }</p>
            </li>
        ));
    };
    return(
        <div className="comments">
            <h3>Comentarios</h3>
            <ul>
                { showComment() }
            </ul>
        </div>
    );
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer
export default connect(mapStateToProps)(Comentarios);

