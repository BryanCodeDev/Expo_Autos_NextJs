// Constantes para el módulo de comunidad
export const COMMENT_CONSTANTS = {
  MAX_CONTENT_LENGTH: 1000,
  MIN_CONTENT_LENGTH: 1,
  MAX_COMMENTS_PER_PAGE: 20,
  AVATAR_SIZE: 48,
  AVATAR_SIZE_LARGE: 128
};

export const API_ENDPOINTS = {
  COMMENTS: '/api/comments',
  COMMENT_BY_ID: (id) => `/api/comments/${id}`,
  USERS: '/api/users',
  AUTH: '/api/auth'
};

export const MESSAGES = {
  COMMENT_CREATED: 'Comentario publicado exitosamente',
  COMMENT_UPDATED: 'Comentario actualizado exitosamente',
  COMMENT_DELETED: 'Comentario eliminado exitosamente',
  COMMENT_EMPTY: 'Por favor, escribe un comentario antes de publicar',
  COMMENT_TOO_LONG: `El comentario no puede superar los ${COMMENT_CONSTANTS.MAX_CONTENT_LENGTH} caracteres`,
  PERMISSION_DENIED: 'No tienes permiso para realizar esta acción',
  NETWORK_ERROR: 'Error de conexión. Por favor, intenta de nuevo',
  LOADING: 'Cargando...',
  NO_COMMENTS: 'No hay comentarios aún',
  BE_FIRST: 'Sé el primero en compartir tus ideas con la comunidad'
};

export const COLORS = {
  PRIMARY: 'blue',
  SUCCESS: 'green',
  DANGER: 'red',
  WARNING: 'yellow',
  INFO: 'indigo'
};

export const ROUTES = {
  HOME: '/',
  COMUNIDAD: '/comunidad',
  LOGIN: '/login',
  PROFILE: '/profile'
};