import { useState } from 'react';
import Image from 'next/image';

export default function CommentCard({ comment, currentUser, onEdit, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);

  const isOwner = currentUser && currentUser.id === comment.userId;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvatarSrc = () => {
    if (comment.userAvatar) {
      return comment.userAvatar;
    }
    // Generar un avatar por defecto basado en el nombre
    const initials = comment.userName.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12">
            <Image
              src={getAvatarSrc()}
              alt={`Avatar de ${comment.userName}`}
              fill
              className="rounded-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${comment.userName}&background=6366f1&color=fff&size=128`;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{comment.userName}</h3>
            <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
        
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit(comment);
                      setShowOptions(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      onDelete(comment.id);
                      setShowOptions(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">Me gusta</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm">Responder</span>
          </button>
        </div>
        
        {comment.updatedAt !== comment.createdAt && (
          <span className="text-xs text-gray-400">
            Editado
          </span>
        )}
      </div>
    </div>
  );
}