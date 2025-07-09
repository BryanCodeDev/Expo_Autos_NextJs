// Funciones auxiliares para el módulo de comunidad

// Formatear fecha
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Hace 1 día';
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Hace ${months} mes${months > 1 ? 'es' : ''}`;
  } else {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Formatear fecha completa
export function formatFullDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Generar avatar por defecto
export function generateAvatar(name, size = 128) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const colors = [
    '6366f1', '8b5cf6', 'a855f7', 'd946ef', 'ec4899',
    'f43f5e', 'ef4444', 'f97316', 'f59e0b', 'eab308',
    '84cc16', '22c55e', '10b981', '14b8a6', '06b6d4',
    '0ea5e9', '3b82f6', '6366f1', '8b5cf6', 'a855f7'
  ];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return `https://ui-avatars.com/api/?name=${initials}&background=${randomColor}&color=fff&size=${size}`;
}

// Truncar texto
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Validar contenido del comentario
export function validateComment(content) {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'El comentario no puede estar vacío' };
  }
  
  if (content.length > 1000) {
    return { valid: false, error: 'El comentario no puede superar los 1000 caracteres' };
  }
  
  return { valid: true };
}

// Escapar HTML para prevenir XSS
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Detectar enlaces en texto
export function detectLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>');
}

// Formatear número de likes/comentarios
export function formatCount(count) {
  if (count < 1000) return count.toString();
  if (count < 1000000) return (count / 1000).toFixed(1) + 'K';
  return (count / 1000000).toFixed(1) + 'M';
}

// Generar ID único
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function para búsqueda
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Validar email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Copiar texto al portapapeles
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

// Obtener iniciales del nombre
export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}