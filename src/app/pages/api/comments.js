// Simulación de base de datos en memoria
let comments = [
  {
    id: '1',
    content: 'Este es un comentario de ejemplo para mostrar cómo funciona la funcionalidad. ¡Esperamos que sea útil para la comunidad!',
    userId: 'user123',
    userName: 'Juan Pérez',
    userAvatar: null,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    content: 'Gracias por crear este espacio para compartir ideas. Creo que será muy útil para todos nosotros.',
    userId: 'user456',
    userName: 'María González',
    userAvatar: null,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '3',
    content: 'Me parece una excelente iniciativa. Espero poder contribuir con contenido valioso para la comunidad.',
    userId: 'user789',
    userName: 'Carlos Rodriguez',
    userAvatar: null,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 días atrás
    updatedAt: new Date(Date.now() - 259200000).toISOString()
  }
];

let nextId = 4;

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Obtener todos los comentarios
      res.status(200).json(comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      break;

    case 'POST':
      // Crear nuevo comentario
      const { content, userId, userName, userAvatar } = req.body;
      
      if (!content || !userId || !userName) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }

      const newComment = {
        id: nextId.toString(),
        content,
        userId,
        userName,
        userAvatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      comments.push(newComment);
      nextId++;

      res.status(201).json(newComment);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}