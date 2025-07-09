import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import { useAuth } from '../hooks/useAuth';

export default function Comunidad() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComment = async (commentData) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...commentData,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([newComment, ...comments]);
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleUpdateComment = async (commentId, commentData) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(comments.map(comment => 
          comment.id === commentId ? updatedComment : comment
        ));
        setEditingComment(null);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      try {
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setComments(comments.filter(comment => comment.id !== commentId));
        }
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Comparte tus ideas, ayuda
          </h1>
          <p className="text-lg text-gray-600">
            Módulo para la comunidad
          </p>
        </div>

        {/* New Comment Button */}
        {user && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              Nuevo Comentario
            </button>
          </div>
        )}

        {/* Comment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
              <CommentForm
                onSubmit={editingComment ? 
                  (data) => handleUpdateComment(editingComment.id, data) : 
                  handleCreateComment
                }
                onCancel={handleCancelEdit}
                initialData={editingComment}
                isEditing={!!editingComment}
              />
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="max-w-4xl mx-auto">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-xl mb-4">
                No hay comentarios aún
              </div>
              <p className="text-gray-500">
                Sé el primero en compartir tus ideas con la comunidad
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  currentUser={user}
                  onEdit={handleEdit}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}