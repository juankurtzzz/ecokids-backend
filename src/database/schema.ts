import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core'

export const criancas = pgTable('criancas', {
    id: serial('id').primaryKey(),
    nomeCrianca: varchar('nome_crianca', { length: 100 }).notNull(),
    numeroEmbalagens: integer('numero_embalagens').notNull().default(0),
    numeroMoedas: integer('numero_moedas').notNull().default(0),
    escola: varchar('escola', { length: 150 }).notNull(),
    serie: varchar('serie', { length: 20 }).notNull(),
})

export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 150 }).notNull(),
    password: varchar('password', { length: 150 }).notNull(),
})
