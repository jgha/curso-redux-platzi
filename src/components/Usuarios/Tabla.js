import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../General/Icons';

const Tabla = (props) => {
    
    const ponerFilas = () => props.usuarios.map((usuario, key) => (
		<tr key={ usuario.id }>
			<td> { usuario.name } </td>
			<td> { usuario.email } </td>
            <td> { usuario.website } </td>
            <td> 
                <Link to={ `/publicaciones/${key}` } title="Ver publicaciones">
                    <Icon name="eye" />
                </Link>
            </td>
		</tr>
	));
    
    return (
        <table className="tabla">
		    <thead>
			    <tr>
				    <th>Nombre</th>
					<th>Correo</th>
                    <th>Enlace</th>
                    <td> -- </td>
				</tr>
			</thead>
			<tbody>
				{ ponerFilas() }
			</tbody>
		</table>
    );
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};
export default connect(mapStateToProps)(Tabla);