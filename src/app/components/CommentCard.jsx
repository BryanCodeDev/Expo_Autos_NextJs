// app/comunidad/components/CommentCard.jsx
import { useState } from 'react';
import Image from 'next/image';

export default function CommentCard({ comment, currentUser, onEdit, onDelete, onLike }) {
  const [showOptions, setShowOptions] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isOwner = currentUser && currentUser.id === comment.userId;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace menos de una hora';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getAvatarSrc = () => {
    if (comment.userAvatar && !imageError) {
      return comment.userAvatar;
    }
    // Generar un avatar por defecto basado en el nombre
    const name = comment.userName.replace(/\s+/g, '+');
    return `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=128`;
  };

  const handleLikeClick = () => {
    if (onLike) {
      onLike(comment.id);
    }
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
              onError={() => setImageError(true)}
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-800">{comment.userName}</h3>
              {comment.carBrand && comment.carModel && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {comment.carBrand} {comment.carModel}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
        
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none p-1"
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
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(comment.id);
                      setShowOptions(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm lg:text-base">
          {comment.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLikeClick}
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              comment.likedByCurrentUser
                ? 'text-red-600 hover:text-red-700'
                : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <svg 
              className={`w-5 h-5 ${comment.likedByCurrentUser ? 'fill-current' : ''}`} 
              fill={comment.likedByCurrentUser ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{comment.likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Responder</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Compartir</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {comment.updatedAt !== comment.createdAt && (
            <span className="text-xs text-gray-400">
              Editado
            </span>
          )}
          
          {comment.carBrand && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {comment.carBrand}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}