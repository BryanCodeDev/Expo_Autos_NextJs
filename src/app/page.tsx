"use client";

import { useState } from 'react';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Card from "./components/card";
import CommentForm from "./components/CommentForm";
import CommentCard from "./components/CommentCard";

export default function Home() {
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "¡Increíble trabajo con el Civic! La combinación de turbo y kit de carrocería quedó espectacular. ¿Qué potencia lograron al final?",
      userName: "Carlos Rodríguez",
      userId: 1,
      userAvatar: "/next.svg",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      content: "Estoy pensando en tunear mi Mazda 3. ¿Recomiendan empezar con modificaciones visuales o motor? Soy nuevo en esto.",
      userName: "Ana Gómez",
      userId: 2,
      userAvatar: "/vercel.svg",
      createdAt: "2024-01-14T15:45:00Z",
      updatedAt: "2024-01-14T15:45:00Z"
    },
    {
      id: 3,
      content: "El Subaru WRX con ese sistema de escape suena brutal. ¿Podrían hacer un video mostrando el antes y después?",
      userName: "Miguel Torres",
      userId: 3,
      userAvatar: null,
      createdAt: "2024-01-13T09:20:00Z",
      updatedAt: "2024-01-13T09:20:00Z"
    }
  ]);

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  
  // Usuario actual simulado
  const currentUser = { id: 1, name: "Carlos Rodríguez" };

  // Modelos de carros populares para tuning
  const carModels = [
    {
      id: 1,
      title: "Honda Civic Type R",
      description: "El deportivo japonés perfecto para tuning. Modificaciones de turbo, suspensión y aerodinámica disponibles.",
      image: "/next.svg"
    },
    {
      id: 2,
      title: "Subaru WRX STI",
      description: "Potencia pura y tracción AWD. Especialistas en modificaciones de motor y sistemas de escape.",
      image: "/vercel.svg"
    },
    {
      id: 3,
      title: "Mazda 3 Turbo",
      description: "Elegancia y deportividad. Kits de carrocería y mejoras de rendimiento que transforman su estilo.",
      image: "/next.svg"
    },
    {
      id: 4,
      title: "Volkswagen Golf GTI",
      description: "El hot hatch europeo legendario. Chip tuning, downpipe y modificaciones visuales disponibles.",
      image: "/vercel.svg"
    },
    {
      id: 5,
      title: "Ford Mustang",
      description: "Muscle car americano. Supercargadores, kits de carrocería y modificaciones de suspensión.",
      image: "/next.svg"
    },
    {
      id: 6,
      title: "Chevrolet Camaro",
      description: "Potencia V8 sin límites. Turbos, sistemas de escape y modificaciones de alta performance.",
      image: "/vercel.svg"
    }
  ];

  const handleAddComment = ({ content }) => {
    const newComment = {
      id: Date.now(),
      content,
      userName: currentUser.name,
      userId: currentUser.id,
      userAvatar: "/next.svg",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setComments([newComment, ...comments]);
    setShowCommentForm(false);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setShowCommentForm(true);
  };

  const handleUpdateComment = ({ content }) => {
    setComments(comments.map(comment => 
      comment.id === editingComment.id 
        ? { ...comment, content, updatedAt: new Date().toISOString() }
        : comment
    ));
    setEditingComment(null);
    setShowCommentForm(false);
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleCancelComment = () => {
    setShowCommentForm(false);
    setEditingComment(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            <span className="text-red-600">Tuning</span> y Modificaciones
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            en Mosquera, Cundinamarca
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubre las mejores combinaciones para el tuning de tu vehículo. 
            Explora modelos populares, modificaciones recomendadas y comparte tu experiencia con otros entusiastas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Ver Modelos
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Cotizar Tuning
            </button>
          </div>
        </section>

        {/* Modelos Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Modelos Populares para Tuning
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Especialistas en las mejores marcas y modelos. Cada vehículo tiene su potencial único 
            y nosotros sabemos cómo desbloquearlo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carModels.map((car) => (
              <Card
                key={car.id}
                title={car.title}
                description={car.description}
                image={car.image}
              />
            ))}
          </div>
        </section>

        {/* Servicios destacados */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tuning de Motor</h3>
              <p className="text-gray-600">Chip tuning, turbos, supercargadores y modificaciones de alta performance.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Kits de Carrocería</h3>
              <p className="text-gray-600">Modificaciones visuales, spoilers, difusores y kits aerodinámicos.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sistemas de Escape</h3>
              <p className="text-gray-600">Escapes deportivos, downpipes y sistemas de alta performance.</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Suspensión</h3>
              <p className="text-gray-600">Coilovers, amortiguadores deportivos y modificaciones de suspensión.</p>
            </div>
          </div>
        </section>

        {/* Sección de Comentarios */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Comunidad de Tuning
            </h2>
            <button
              onClick={() => setShowCommentForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Agregar Comentario
            </button>
          </div>
          
          <p className="text-gray-600 mb-8 max-w-2xl">
            Comparte tu experiencia, consejos y preguntas con otros entusiastas del tuning. 
            La comunidad está aquí para ayudarte a sacar el máximo provecho de tu vehículo.
          </p>

          {/* Formulario de comentarios */}
          {showCommentForm && (
            <div className="bg-white rounded-lg shadow-lg mb-8">
              <CommentForm
                onSubmit={editingComment ? handleUpdateComment : handleAddComment}
                onCancel={handleCancelComment}
                initialData={editingComment}
                isEditing={!!editingComment}
              />
            </div>
          )}

          {/* Lista de comentarios */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500 text-lg">No hay comentarios aún</p>
              <p className="text-gray-400">¡Sé el primero en compartir tu experiencia!</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para transformar tu vehículo?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Contacta a nuestros expertos y comienza tu proyecto de tuning hoy mismo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573001234567"
              className="bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
              </svg>
              Escribir por WhatsApp
            </a>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-red-600 transition-colors">
              Agendar Cita
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}