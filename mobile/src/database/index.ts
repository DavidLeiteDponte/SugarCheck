// src/database/index.ts
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { mySchema } from './schema'
import Todo from './Todo'

// Creamos el adaptador que conecta JavaScript con el SQLite nativo
const adapter = new SQLiteAdapter({
  schema: mySchema,
  // jsi: true, // Actívalo si usas Hermes para un rendimiento ultra rápido
  onSetUpError: error => {
    console.error('Error inicializando la base de datos:', error)
  }
})

// Instancia global de la base de datos
export const database = new Database({
  adapter,
  modelClasses: [Todo],
})