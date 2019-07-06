import axios from 'axios';
import { OBTENER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';

export const ObtenerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: OBTENER_TODOS,
            payload: respuesta.data
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        });
    }
};