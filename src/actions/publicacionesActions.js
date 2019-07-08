import axios from 'axios';
import { 
    ACTUALIZAR, 
    CARGANDO, 
    ERROR, 
    COMENTARIO_CARGANDO, 
    COMENTARIO_ERROR,
    COMENTARIO_ACTUALIZAR
 } from '../types/publicacionesTypes';
import * as usuariosType from '../types/usuariosTypes';

const { OBTENER_TODOS: USUARIOS_OBTENER_TODOS } = usuariosType;

export const ObtenerPorUsuario = (key) => async (dispatch, getState) => {
    dispatch({ type: CARGANDO });

    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const userId = usuarios[key].id;

    
    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        
        const nuevas = respuesta.data.map((publicacion)=>({
            ...publicacion,
            comentarios: [],
            abierto: false
        }));

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];

        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        });

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados =  [...usuarios];
        usuarios_actualizados[key] = { 
            ...usuarios[key],
            publicaciones_key
        };

        dispatch({
            type: USUARIOS_OBTENER_TODOS,
            payload: usuarios_actualizados
        });
        
        
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'Ha ocurrido un error al obtener las publicaciones'
        });
    }
};

export const abrirCerrar = (post_key, comment_key) =>  (dispatch, getState) => {
    console.log(post_key, comment_key);
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[post_key][comment_key];

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[post_key] = [
        ...publicaciones[post_key]
    ];

    publicaciones_actualizadas[post_key][comment_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    });

};

export const obtenerComentarios = (post_key, comment_key) =>  async (dispatch, getState) => {
    dispatch({ type: COMENTARIO_CARGANDO });
    
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[post_key][comment_key];

    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };

        const publicaciones_actualizadas = [...publicaciones];
        publicaciones_actualizadas[post_key] = [
            ...publicaciones[post_key]
        ];

        publicaciones_actualizadas[post_key][comment_key] = actualizada;

        dispatch({
            type: COMENTARIO_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
        
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: COMENTARIO_ERROR,
            payload: 'Ha ocurrido un error al obtener los comentarios'
        });
    }
    
    

};