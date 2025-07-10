// Simulación de base de datos en memoria (debe ser la misma que en comments.js)
let comments = [
  {
    id: '1',
    content: 'Este es un comentario de ejemplo para mostrar cómo funciona la funcionalidad. ¡Esperamos que sea útil para la comunidad!',
    userId: 'user123',
    userName: 'Juan Pérez',
    userAvatar: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    content: 'Gracias por crear este espacio para compartir ideas. Creo que será muy útil para todos nosotros.',
    userId: 'user456',
    userName: 'María González',
    userAvatar: null,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '3',
    content: 'Me parece una excelente iniciativa. Espero poder contribuir con contenido valioso para la comunidad.',
    userId: 'user789',
    userName: 'Carlos Rodriguez',
    userAvatar: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString()
  }
];

export default function handler(req, res) {
  const { method, query: { id } } = req;

  // Buscar el comentario
  const commentIndex = comments.findIndex(comment => comment.id === id);
  
  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comentario no encontrado' });
  }

  const comment = comments[commentIndex];

  switch (method) {
    case 'GET':
      // Obtener comentario específico
      res.status(200).json(comment);
      break;

    case 'PUT':
      // Actualizar comentario
      const { content, userId } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: 'El contenido es requerido' });
      }

      // Verificar que el usuario sea el propietario
      if (comment.userId !== userId) {
        return res.status(403).json({ error: 'No tienes permiso para editar este comentario' });
      }

      const updatedComment = {
        ...comment,
        content,
        updatedAt: new Date().toISOString()
      };

      comments[commentIndex] = updatedComment;
      res.status(200).json(updatedComment);
      break;

    case 'DELETE':
      // Eliminar comentario
      const { userId: deleteUserId } = req.body;
      
      // Verificar que el usuario sea el propietario
      if (comment.userId !== deleteUserId) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' });
      }

      comments.splice(commentIndex, 1);
      res.status(200).json({ message: 'Comentario eliminado exitosamente' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}