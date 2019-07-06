import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../General/Spinner';
import ErrorMessage from '../General/ErrorMessage';
import Tabla from './Tabla';

class Usuarios extends Component {
	
	componentDidMount() {
		this.props.ObtenerTodos();
	}

	ponerContenido = () => {
		if(this.props.cargando){
			return <Spinner />
		}
		if(this.props.error){
			return <ErrorMessage message={ this.props.error } />
		}
		return <Tabla />
	}

	render() {
		return (
			<div>
				<h3>Listado de Usuarios</h3>
				{ this.ponerContenido() }
			</div>
		)
	}
};

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};
export default connect(mapStateToProps, usuariosActions )(Usuarios);