import axios from 'axios';


export const ObtenerTodos = () => async (dispatch) => {
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
	
    dispatch({
        type: 'obtener_usuarios',
        payload: respuesta.data
    })
};