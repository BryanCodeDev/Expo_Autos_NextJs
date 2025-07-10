// app/comunidad/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';

interface Comment {
  id: number;
  content: string;
  userName: string;
  userAvatar?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  likes: number;
  carModel?: string;
  carBrand?: string;
  likedByCurrentUser?: boolean;
}

interface User {
  id: number;
  name: string;
  avatar?: string;
}

export default function ComunidadPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('recientes');

  // Simular usuario actual (en una app real esto vendría de autenticación)
  useEffect(() => {
    setCurrentUser({
      id: 1,
      name: 'Usuario Demo',
      avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=dc2626&color=fff&size=128'
    });
  }, []);

  // Simular datos de comentarios
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: 1,
        content: 'Increíble el trabajo de tuning en este Honda Civic Type R. Las modificaciones en el motor y la suspensión realmente lo transformaron. ¿Alguien tiene experiencia con turbos similares?',
        userName: 'Carlos Rodríguez',
        userAvatar: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=059669&color=fff&size=128',
        userId: 2,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        likes: 15,
        carModel: 'Civic Type R',
        carBrand: 'Honda',
        likedByCurrentUser: false
      },
      {
        id: 2,
        content: 'Acabo de terminar la instalación de mi sistema de suspensión coilover en mi Subaru WRX. La diferencia en manejo es increíble. Para los que están pensando en hacer el upgrade, totalmente recomendado.',
        userName: 'Ana María González',
        userAvatar: 'https://ui-avatars.com/api/?name=Ana+Maria+Gonzalez&background=7c3aed&color=fff&size=128',
        userId: 3,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
        likes: 23,
        carModel: 'WRX',
        carBrand: 'Subaru',
        likedByCurrentUser: true
      },
      {
        id: 3,
        content: '¿Alguien sabe dónde conseguir repuestos originales para un BMW E30? Estoy restaurando uno del 87 y necesito algunas piezas específicas del interior.',
        userName: 'Miguel Torres',
        userAvatar: 'https://ui-avatars.com/api/?name=Miguel+Torres&background=dc2626&color=fff&size=128',
        userId: 4,
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        updatedAt: new Date(Date.now() - 10800000).toISOString(),
        likes: 8,
        carModel: 'E30',
        carBrand: 'BMW',
        likedByCurrentUser: false
      },
      {
        id: 4,
        content: 'Terminé de instalar mi sistema de escape Borla ATAK en mi Mustang GT. El sonido es espectacular y la ganancia de potencia es notable. ¿Alguien más tiene experiencia con este sistema?',
        userName: 'Luis Martínez',
        userAvatar: 'https://ui-avatars.com/api/?name=Luis+Martinez&background=f59e0b&color=fff&size=128',
        userId: 5,
        createdAt: new Date(Date.now() - 14400000).toISOString(),
        updatedAt: new Date(Date.now() - 14400000).toISOString(),
        likes: 12,
        carModel: 'Mustang GT',
        carBrand: 'Ford',
        likedByCurrentUser: false
      }
    ];

    setComments(mockComments);
    setLoading(false);
  }, []);

  const handleSubmitComment = async (commentData: { content: string }) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: Date.now(),
      content: commentData.content,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      likedByCurrentUser: false
    };

    setComments(prev => [newComment, ...prev]);
    setShowCommentForm(false);
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setShowCommentForm(true);
  };

  const handleUpdateComment = async (commentData: { content: string }) => {
    if (!editingComment) return;

    const updatedComment = {
      ...editingComment,
      content: commentData.content,
      updatedAt: new Date().toISOString()
    };

    setComments(prev => prev.map(comment => 
      comment.id === editingComment.id ? updatedComment : comment
    ));
    
    setEditingComment(null);
    setShowCommentForm(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.likedByCurrentUser;
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          likedByCurrentUser: !isLiked
        };
      }
      return comment;
    }));
  };

  const filteredComments = comments.filter(comment => {
    switch (activeFilter) {
      case 'populares':
        return comment.likes > 10;
      case 'tuning':
        return comment.content.toLowerCase().includes('tuning') || 
               comment.content.toLowerCase().includes('modificacion') ||
               comment.content.toLowerCase().includes('escape') ||
               comment.content.toLowerCase().includes('suspension') ||
               comment.content.toLowerCase().includes('turbo');
      case 'clasicos':
        return comment.carBrand && ['BMW', 'Mercedes', 'Porsche', 'Volkswagen'].includes(comment.carBrand);
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando comunidad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Comunidad Automotriz
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comparte tu pasión por los autos, experiencias de tuning y conecta con otros entusiastas automotrices de Colombia
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Filters and New Comment Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('recientes')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'recientes'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Recientes
            </button>
            <button
              onClick={() => setActiveFilter('populares')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'populares'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Populares
            </button>
            <button
              onClick={() => setActiveFilter('tuning')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'tuning'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tuning
            </button>
            <button
              onClick={() => setActiveFilter('clasicos')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'clasicos'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Clásicos
            </button>
          </div>

          <button
            onClick={() => setShowCommentForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nuevo Post</span>
          </button>
        </div>

        {/* Comment Form Modal */}
        {showCommentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <CommentForm
                onSubmit={editingComment ? handleUpdateComment : handleSubmitComment}
                onCancel={() => {
                  setShowCommentForm(false);
                  setEditingComment(null);
                }}
                initialData={editingComment}
                isEditing={!!editingComment}
              />
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {filteredComments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay comentarios
              </h3>
              <p className="text-gray-600 mb-4">
                {activeFilter === 'recientes' 
                  ? 'Sé el primero en compartir tu experiencia automotriz'
                  : `No hay comentarios en la categoría "${activeFilter}"`
                }
              </p>
              <button
                onClick={() => setShowCommentForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Crear Primer Post
              </button>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                onLike={handleLikeComment}
              />
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredComments.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg border border-gray-300 font-medium transition-colors">
              Cargar más comentarios
            </button>
          </div>
        )}
      </div>

      {/* Community Stats */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {comments.length}
              </div>
              <div className="text-gray-600">Posts de la Comunidad</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {comments.reduce((acc, comment) => acc + comment.likes, 0)}
              </div>
              <div className="text-gray-600">Likes Totales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {new Set(comments.map(c => c.userId)).size}
              </div>
              <div className="text-gray-600">Miembros Activos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}