// app/comunidad/components/CommentForm.jsx
import { useState } from 'react';

export default function CommentForm({ onSubmit, onCancel, initialData, isEditing }) {
  const [content, setContent] = useState(initialData?.content || '');
  const [carBrand, setCarBrand] = useState(initialData?.carBrand || '');
  const [carModel, setCarModel] = useState(initialData?.carModel || '');
  const [carYear, setCarYear] = useState(initialData?.carYear || '');
  const [category, setCategory] = useState(initialData?.category || 'general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const carBrands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz',
    'Audi', 'Volkswagen', 'Nissan', 'Hyundai', 'Kia', 'Mazda',
    'Subaru', 'Mitsubishi', 'Lexus', 'Infiniti', 'Porsche', 'Jaguar',
    'Land Rover', 'Volvo', 'Jeep', 'Dodge', 'Chrysler', 'Cadillac',
    'Buick', 'GMC', 'Lincoln', 'Acura', 'Genesis', 'Alfa Romeo',
    'Fiat', 'Mini', 'Smart', 'Tesla', 'Peugeot', 'Citroën', 'Renault'
  ];

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'tuning', label: 'Tuning & Modificaciones' },
    { value: 'clasicos', label: 'Autos Clásicos' },
    { value: 'mantenimiento', label: 'Mantenimiento' },
    { value: 'repuestos', label: 'Repuestos' },
    { value: 'eventos', label: 'Eventos' },
    { value: 'compra-venta', label: 'Compra/Venta' },
    { value: 'seguros', label: 'Seguros' },
    { value: 'electricos', label: 'Autos Eléctricos' },
    { value: 'deportivos', label: 'Autos Deportivos' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Por favor, escribe tu comentario antes de publicar.');
      return;
    }

    if (content.trim().length < 10) {
      alert('El comentario debe tener al menos 10 caracteres.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = {
        content: content.trim(),
        carBrand: carBrand || null,
        carModel: carModel || null,
        carYear: carYear ? parseInt(carYear) : null,
        category: category
      };

      await onSubmit(formData);
      
      if (!isEditing) {
        // Limpiar formulario después de crear
        setContent('');
        setCarBrand('');
        setCarModel('');
        setCarYear('');
        setCategory('general');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error al publicar el comentario. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setContent(value);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {isEditing ? 'Editar Comentario' : 'Comparte tu Experiencia'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {isEditing ? 'Actualiza tu comentario' : 'Cuéntanos sobre tu auto, modificaciones o experiencias'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Información del auto (opcional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marca del Auto (Opcional)
            </label>
            <select
              value={carBrand}
              onChange={(e) => setCarBrand(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              disabled={isSubmitting}
            >
              <option value="">Selecciona una marca</option>
              {carBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modelo (Opcional)
            </label>
            <input
              type="text"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              placeholder="ej: Civic, Corolla, Mustang"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              disabled={isSubmitting}
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año (Opcional)
            </label>
            <input
              type="number"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              placeholder="ej: 2020"
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tu Comentario *
          </label>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Comparte tu experiencia con este modelo, ideas de tuning, modificaciones recomendadas, problemas que hayas tenido, consejos de mantenimiento, o cualquier información útil para otros entusiastas automotrices..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            rows={8}
            disabled={isSubmitting}
            required
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-500">
              Mínimo 10 caracteres
            </div>
            <div className={`text-sm ${content.length > 900 ? 'text-red-600' : 'text-gray-500'}`}>
              {content.length}/1000 caracteres
            </div>
          </div>
        </div>

        {/* Consejos */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            💡 Consejos para tu post:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sé específico sobre tu experiencia</li>
            <li>• Incluye detalles técnicos si es relevante</li>
            <li>• Menciona costos aproximados si compartes modificaciones</li>
            <li>• Sé respetuoso con otros miembros de la comunidad</li>
            <li>• Usa un lenguaje claro y descriptivo</li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !content.trim() || content.trim().length < 10}
            className="px-8 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            {isSubmitting && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span>
              {isSubmitting ? 'Publicando...' : (isEditing ? 'Actualizar Comentario' : 'Publicar Comentario')}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}