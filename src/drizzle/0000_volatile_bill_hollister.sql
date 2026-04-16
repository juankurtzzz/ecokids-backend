CREATE TABLE "criancas" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome_crianca" varchar(100) NOT NULL,
	"numero_embalagens" integer DEFAULT 0 NOT NULL,
	"numero_moedas" integer DEFAULT 0 NOT NULL,
	"escola" varchar(150) NOT NULL,
	"serie" varchar(20) NOT NULL
);
