// Ejemplo de utilidades para base de datos
// Puedes usar PostgreSQL, MySQL, MongoDB, etc.

// Ejemplo con PostgreSQL usando pg
/*
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function createCommentsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      user_name VARCHAR(255) NOT NULL,
      user_avatar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  await pool.query(query);
}

export async function getComments() {
  const query = 'SELECT * FROM comments ORDER BY created_at DESC';
  const result = await pool.query(query);
  return result.rows;
}

export async function createComment({ content, userId, userName, userAvatar }) {
  const query = `
    INSERT INTO comments (content, user_id, user_name, user_avatar)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(query, [content, userId, userName, userAvatar]);
  return result.rows[0];
}

export async function updateComment(id, { content, userId }) {
  const query = `
    UPDATE comments 
    SET content = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND user_id = $3
    RETURNING *
  `;
  
  const result = await pool.query(query, [content, id, userId]);
  return result.rows[0];
}

export async function deleteComment(id, userId) {
  const query = 'DELETE FROM comments WHERE id = $1 AND user_id = $2';
  const result = await pool.query(query, [id, userId]);
  return result.rowCount > 0;
}

export async function getCommentById(id) {
  const query = 'SELECT * FROM comments WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
*/

// Ejemplo con MongoDB usando mongoose
/*
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export async function getComments() {
  await connectDB();
  return await Comment.find().sort({ createdAt: -1 });
}

export async function createComment(commentData) {
  await connectDB();
  const comment = new Comment(commentData);
  return await comment.save();
}

export async function updateComment(id, content, userId) {
  await connectDB();
  return await Comment.findOneAndUpdate(
    { _id: id, userId: userId },
    { content, updatedAt: new Date() },
    { new: true }
  );
}

export async function deleteComment(id, userId) {
  await connectDB();
  const result = await Comment.deleteOne({ _id: id, userId: userId });
  return result.deletedCount > 0;
}
*/

// Para la implementación actual con datos en memoria
export const commentsData = {
  comments: [
    {
      id: '1',
      content: 'Este es un comentario de ejemplo para mostrar cómo funciona la funcionalidad. ¡Esperamos que sea útil para la comunidad!',
      userId: 'user123',
      userName: 'Juan Pérez',
      userAvatar: null,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      content: 'Gracias por crear este espacio para compartir ideas. Creo que será muy útil para todos nosotros.',
      userId: 'user456',
      userName: 'María González',
      userAvatar: null,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: '3',
      content: 'Me parece una excelente iniciativa. Espero poder contribuir con contenido valioso para la comunidad.',
      userId: 'user789',
      userName: 'Carlos Rodriguez',
      userAvatar: null,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      updatedAt: new Date(Date.now() - 259200000).toISOString()
    }
  ],
  nextId: 4
};