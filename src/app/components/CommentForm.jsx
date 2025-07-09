import { useState } from 'react';

export default function CommentForm({ onSubmit, onCancel, initialData, isEditing }) {
  const [content, setContent] = useState(initialData?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Por favor, escribe tu comentario sobre el modelo o tuning antes de publicar.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({ content: content.trim() });
      if (!isEditing) {
        setContent('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error al publicar el comentario. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {isEditing ? 'Editar Comentario' : 'Comparte tu Opinión'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comparte tu experiencia con este modelo, ideas de tuning, modificaciones recomendadas o cualquier consejo para otros entusiastas..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            rows={6}
            maxLength={1000}
            disabled={isSubmitting}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {content.length}/1000 caracteres
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            {isSubmitting && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>
              {isSubmitting ? 'Publicando...' : (isEditing ? 'Actualizar' : 'Publicar')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}