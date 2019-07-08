import axios from 'axios';
import { OBTENER_TODOS, OBTENER_USUARIO, CARGANDO, ERROR } from '../types/usuariosTypes';

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
            payload: 'Ha ocurrido un error al obtener la información del usuario.'
        });
    }
};

export const ObtenerUsuario = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: OBTENER_USUARIO,
            payload: respuesta.data
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Ha ocurrido un error al obtener la información del usuario.'
        });
    }
};