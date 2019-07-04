import axios from 'axios';
import { OBTENER_TODOS } from '../types/usuariosTypes';

export const ObtenerTodos = () => async (dispatch) => {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
	
    dispatch({
        type: OBTENER_TODOS,
        payload: respuesta.data
    })
};