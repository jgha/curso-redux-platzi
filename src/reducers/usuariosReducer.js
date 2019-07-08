import { OBTENER_TODOS, OBTENER_USUARIO, CARGANDO, ERROR } from '../types/usuariosTypes';

const INITIAL_STATE = {
    usuarios: [],
    usuario: [],
    cargando: false,
    error: '',
};

export default ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case OBTENER_TODOS:
            return { 
                ...state, 
                usuarios: action.payload, 
                cargando: false,
                error: ''
            };
        
        case OBTENER_USUARIO:
                return { ...state, usuario: action.payload, cargando: false };
            
        case CARGANDO:
            return { ...state, cargando: true };

        case ERROR:
            return { ...state, error: action.payload, cargando: false};
        
        default: return state;
    }
}; 