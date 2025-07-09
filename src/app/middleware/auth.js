// Middleware para verificar autenticación en las APIs
export function requireAuth(handler) {
  return async (req, res) => {
    // En una implementación real, verificarías el token JWT aquí
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    try {
      // Aquí verificarías el token JWT y extraerías el userId
      // Para el ejemplo, simulamos que el token es válido
      if (token === 'demo-token') {
        req.user = { id: 'user123', name: 'Usuario Demo' };
      } else {
        throw new Error('Token inválido');
      }
      
      return handler(req, res);
    } catch {
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
}

// Middleware para verificar si el usuario es propietario del recurso
export function requireOwnership(handler) {
  return async (req, res) => {
    const { id: resourceId } = req.query;
    const { userId } = req.body;
    
    // Aquí verificarías que el userId del token coincida con el userId del recurso
    if (!userId) {
      return res.status(400).json({ error: 'Usuario no identificado' });
    }
    
    // Log para verificar ownership (opcional)
    console.log(`Verificando ownership para recurso ${resourceId} y usuario ${userId}`);
    
    return handler(req, res);
  };
}

// Función para extraer usuario de headers (simulada)
export function getUserFromRequest(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token === 'demo-token') {
    return { id: 'user123', name: 'Usuario Demo' };
  }
  
  return null;
}