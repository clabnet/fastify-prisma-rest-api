CREATE TABLE public."bom" (
	id SERIAL NOT NULL,
	selection varchar(128) NULL,
	"type" varchar(254) NULL,
	"level" numeric NULL,
	t_n numeric NULL,
	quantity numeric NULL,
	"name" varchar(254) NULL,
	revision varchar(254) NULL,
	parent varchar(254) NULL,
	description varchar(254) NULL,
	description_en varchar(254) NULL,
	spare_index varchar(254) NULL,
	wbe varchar(254) NULL,
	description_wbe varchar(254) NULL,
	plantid varchar NULL,

  CONSTRAINT "Bom_pkey" PRIMARY KEY ("id")
);
