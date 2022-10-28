--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-2.pgdg20.04+2)
-- Dumped by pg_dump version 15.0 (Ubuntu 15.0-1.pgdg20.04+1)

-- Started on 2022-10-28 10:01:40 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 26519)
-- Name: float_sensors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.float_sensors (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    value character varying NOT NULL,
    fk_sensor_id bigint NOT NULL
);


ALTER TABLE public.float_sensors OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 26518)
-- Name: float_sensors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.float_sensors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.float_sensors_id_seq OWNER TO postgres;

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 218
-- Name: float_sensors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.float_sensors_id_seq OWNED BY public.float_sensors.id;


--
-- TOC entry 221 (class 1259 OID 26529)
-- Name: humidity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.humidity (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    value character varying NOT NULL,
    fk_sensor_id bigint NOT NULL
);


ALTER TABLE public.humidity OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 26528)
-- Name: humidity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.humidity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.humidity_id_seq OWNER TO postgres;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 220
-- Name: humidity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.humidity_id_seq OWNED BY public.humidity.id;


--
-- TOC entry 210 (class 1259 OID 26475)
-- Name: maintainers_registry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maintainers_registry (
    id bigint NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    company character varying NOT NULL,
    phone character varying NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public.maintainers_registry OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 26474)
-- Name: maintainers_registry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maintainers_registry_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maintainers_registry_id_seq OWNER TO postgres;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 209
-- Name: maintainers_registry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maintainers_registry_id_seq OWNED BY public.maintainers_registry.id;


--
-- TOC entry 215 (class 1259 OID 26501)
-- Name: parking_areas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_areas (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL
);


ALTER TABLE public.parking_areas OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 26500)
-- Name: parking_areas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_areas_id_seq OWNER TO postgres;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 214
-- Name: parking_areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_areas_id_seq OWNED BY public.parking_areas.id;


--
-- TOC entry 223 (class 1259 OID 26539)
-- Name: parking_sensors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_sensors (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    fk_sensor_id bigint NOT NULL,
    value boolean NOT NULL
);


ALTER TABLE public.parking_sensors OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 26538)
-- Name: parking_sensors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_sensors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_sensors_id_seq OWNER TO postgres;

--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 222
-- Name: parking_sensors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_sensors_id_seq OWNED BY public.parking_sensors.id;


--
-- TOC entry 217 (class 1259 OID 26510)
-- Name: parking_spots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_spots (
    id bigint NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    fk_parking_area_id bigint NOT NULL
);


ALTER TABLE public.parking_spots OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 26509)
-- Name: parking_spots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parking_spots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.parking_spots_id_seq OWNER TO postgres;

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 216
-- Name: parking_spots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parking_spots_id_seq OWNED BY public.parking_spots.id;


--
-- TOC entry 230 (class 1259 OID 26580)
-- Name: parking_spots_sensors_sensors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking_spots_sensors_sensors (
    "parkingSpotsId" bigint NOT NULL,
    "sensorsId" bigint NOT NULL
);


ALTER TABLE public.parking_spots_sensors_sensors OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 26551)
-- Name: particular_matter10; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.particular_matter10 (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    value character varying NOT NULL,
    fk_sensor_id bigint NOT NULL
);


ALTER TABLE public.particular_matter10 OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 26550)
-- Name: particular_matter10_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.particular_matter10_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.particular_matter10_id_seq OWNER TO postgres;

--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 224
-- Name: particular_matter10_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.particular_matter10_id_seq OWNED BY public.particular_matter10.id;


--
-- TOC entry 227 (class 1259 OID 26561)
-- Name: particular_matter25; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.particular_matter25 (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    value character varying NOT NULL,
    fk_sensor_id bigint NOT NULL
);


ALTER TABLE public.particular_matter25 OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 26560)
-- Name: particular_matter25_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.particular_matter25_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.particular_matter25_id_seq OWNER TO postgres;

--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 226
-- Name: particular_matter25_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.particular_matter25_id_seq OWNED BY public.particular_matter25.id;


--
-- TOC entry 213 (class 1259 OID 26492)
-- Name: sensors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensors (
    id bigint NOT NULL,
    name character varying NOT NULL,
    battery character varying NOT NULL,
    charge character varying NOT NULL,
    type character varying NOT NULL,
    is_active boolean NOT NULL,
    last_survey timestamp without time zone DEFAULT now() NOT NULL,
    fk_maintainer_id bigint
);


ALTER TABLE public.sensors OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 26484)
-- Name: sensors_maintenance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sensors_maintenance (
    id bigint NOT NULL,
    to_be_repaired boolean DEFAULT false NOT NULL,
    to_be_charged boolean DEFAULT false NOT NULL,
    is_updating boolean DEFAULT false NOT NULL,
    fk_sensor_id bigint NOT NULL
);


ALTER TABLE public.sensors_maintenance OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 26483)
-- Name: sensors_maintenance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sensors_maintenance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sensors_maintenance_id_seq OWNER TO postgres;

--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 211
-- Name: sensors_maintenance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sensors_maintenance_id_seq OWNED BY public.sensors_maintenance.id;


--
-- TOC entry 229 (class 1259 OID 26571)
-- Name: temperature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.temperature (
    id bigint NOT NULL,
    address character varying NOT NULL,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    value character varying NOT NULL,
    fk_sensor_id bigint NOT NULL
);


ALTER TABLE public.temperature OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 26570)
-- Name: temperature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.temperature_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.temperature_id_seq OWNER TO postgres;

--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 228
-- Name: temperature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.temperature_id_seq OWNED BY public.temperature.id;


--
-- TOC entry 3235 (class 2604 OID 26522)
-- Name: float_sensors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.float_sensors ALTER COLUMN id SET DEFAULT nextval('public.float_sensors_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 26532)
-- Name: humidity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.humidity ALTER COLUMN id SET DEFAULT nextval('public.humidity_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 26478)
-- Name: maintainers_registry id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintainers_registry ALTER COLUMN id SET DEFAULT nextval('public.maintainers_registry_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 26504)
-- Name: parking_areas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_areas ALTER COLUMN id SET DEFAULT nextval('public.parking_areas_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 26542)
-- Name: parking_sensors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_sensors ALTER COLUMN id SET DEFAULT nextval('public.parking_sensors_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 26513)
-- Name: parking_spots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots ALTER COLUMN id SET DEFAULT nextval('public.parking_spots_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 26554)
-- Name: particular_matter10 id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.particular_matter10 ALTER COLUMN id SET DEFAULT nextval('public.particular_matter10_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 26564)
-- Name: particular_matter25 id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.particular_matter25 ALTER COLUMN id SET DEFAULT nextval('public.particular_matter25_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 26487)
-- Name: sensors_maintenance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_maintenance ALTER COLUMN id SET DEFAULT nextval('public.sensors_maintenance_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 26574)
-- Name: temperature id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperature ALTER COLUMN id SET DEFAULT nextval('public.temperature_id_seq'::regclass);


--
-- TOC entry 3278 (class 2606 OID 26559)
-- Name: particular_matter10 PK_23d94fae1bef67a9f7c0e74d384; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.particular_matter10
    ADD CONSTRAINT "PK_23d94fae1bef67a9f7c0e74d384" PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 26527)
-- Name: float_sensors PK_2e0d8cd99b3d9c90c34d747a242; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.float_sensors
    ADD CONSTRAINT "PK_2e0d8cd99b3d9c90c34d747a242" PRIMARY KEY (id);


--
-- TOC entry 3262 (class 2606 OID 26508)
-- Name: parking_areas PK_2ffb33474b9d765bde81e1d9449; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_areas
    ADD CONSTRAINT "PK_2ffb33474b9d765bde81e1d9449" PRIMARY KEY (id);


--
-- TOC entry 3282 (class 2606 OID 26579)
-- Name: temperature PK_3b69dc45d57daf28f4b930eb4c9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperature
    ADD CONSTRAINT "PK_3b69dc45d57daf28f4b930eb4c9" PRIMARY KEY (id);


--
-- TOC entry 3286 (class 2606 OID 26584)
-- Name: parking_spots_sensors_sensors PK_55829b2959c429b666ed98a8889; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots_sensors_sensors
    ADD CONSTRAINT "PK_55829b2959c429b666ed98a8889" PRIMARY KEY ("parkingSpotsId", "sensorsId");


--
-- TOC entry 3274 (class 2606 OID 26547)
-- Name: parking_sensors PK_63a249b6d3b49760259e1e6e241; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_sensors
    ADD CONSTRAINT "PK_63a249b6d3b49760259e1e6e241" PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 26569)
-- Name: particular_matter25 PK_8020ae1710ab9ff6624a240d603; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.particular_matter25
    ADD CONSTRAINT "PK_8020ae1710ab9ff6624a240d603" PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 26499)
-- Name: sensors PK_b8bd5fcfd700e39e96bcd9ba6b7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 26537)
-- Name: humidity PK_bda920ea7c56a024fa6b3740091; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.humidity
    ADD CONSTRAINT "PK_bda920ea7c56a024fa6b3740091" PRIMARY KEY (id);


--
-- TOC entry 3256 (class 2606 OID 26489)
-- Name: sensors_maintenance PK_c7442c198994a4d13f01fcd5bb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_maintenance
    ADD CONSTRAINT "PK_c7442c198994a4d13f01fcd5bb7" PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 26482)
-- Name: maintainers_registry PK_ddc7e846437d4b494add643f6f6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintainers_registry
    ADD CONSTRAINT "PK_ddc7e846437d4b494add643f6f6" PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 26517)
-- Name: parking_spots PK_e0b54c8ecaf56846b47ef1f32f8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots
    ADD CONSTRAINT "PK_e0b54c8ecaf56846b47ef1f32f8" PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 26549)
-- Name: parking_sensors REL_4c04b915b03093681da8a755ae; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_sensors
    ADD CONSTRAINT "REL_4c04b915b03093681da8a755ae" UNIQUE (fk_sensor_id);


--
-- TOC entry 3258 (class 2606 OID 26491)
-- Name: sensors_maintenance REL_66bbdb2549318e31e7f537aa50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_maintenance
    ADD CONSTRAINT "REL_66bbdb2549318e31e7f537aa50" UNIQUE (fk_sensor_id);


--
-- TOC entry 3268 (class 2606 OID 26654)
-- Name: parking_spots UQ_042f2cf7b9c02766512ad820220; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots
    ADD CONSTRAINT "UQ_042f2cf7b9c02766512ad820220" UNIQUE (latitude, longitude);


--
-- TOC entry 3250 (class 2606 OID 26656)
-- Name: maintainers_registry UQ_289c7d8f4db881d6ae3a7d5ca8a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintainers_registry
    ADD CONSTRAINT "UQ_289c7d8f4db881d6ae3a7d5ca8a" UNIQUE (company);


--
-- TOC entry 3264 (class 2606 OID 26652)
-- Name: parking_areas UQ_309bd396a551d717991d62fd843; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_areas
    ADD CONSTRAINT "UQ_309bd396a551d717991d62fd843" UNIQUE (latitude, longitude);


--
-- TOC entry 3252 (class 2606 OID 26658)
-- Name: maintainers_registry UQ_4918d56ee8cd4771187d06a4c4d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintainers_registry
    ADD CONSTRAINT "UQ_4918d56ee8cd4771187d06a4c4d" UNIQUE (phone);


--
-- TOC entry 3254 (class 2606 OID 26660)
-- Name: maintainers_registry UQ_539cc24815c76a4212cb0d971b3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maintainers_registry
    ADD CONSTRAINT "UQ_539cc24815c76a4212cb0d971b3" UNIQUE (email);


--
-- TOC entry 3283 (class 1259 OID 26586)
-- Name: IDX_70bcc7965e6c84b96dc5179d40; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_70bcc7965e6c84b96dc5179d40" ON public.parking_spots_sensors_sensors USING btree ("sensorsId");


--
-- TOC entry 3284 (class 1259 OID 26585)
-- Name: IDX_d9ae08ddadc9213d70afff5f7a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d9ae08ddadc9213d70afff5f7a" ON public.parking_spots_sensors_sensors USING btree ("parkingSpotsId");


--
-- TOC entry 3294 (class 2606 OID 26622)
-- Name: particular_matter25 FK_299ba0cc8e51be8077603bc91c6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.particular_matter25
    ADD CONSTRAINT "FK_299ba0cc8e51be8077603bc91c6" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3292 (class 2606 OID 26612)
-- Name: parking_sensors FK_4c04b915b03093681da8a755ae0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_sensors
    ADD CONSTRAINT "FK_4c04b915b03093681da8a755ae0" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3291 (class 2606 OID 26607)
-- Name: humidity FK_5f3eaaed791d1a2e8a1b8018ede; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.humidity
    ADD CONSTRAINT "FK_5f3eaaed791d1a2e8a1b8018ede" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3287 (class 2606 OID 26587)
-- Name: sensors_maintenance FK_66bbdb2549318e31e7f537aa507; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors_maintenance
    ADD CONSTRAINT "FK_66bbdb2549318e31e7f537aa507" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3296 (class 2606 OID 26677)
-- Name: parking_spots_sensors_sensors FK_70bcc7965e6c84b96dc5179d407; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots_sensors_sensors
    ADD CONSTRAINT "FK_70bcc7965e6c84b96dc5179d407" FOREIGN KEY ("sensorsId") REFERENCES public.sensors(id);


--
-- TOC entry 3288 (class 2606 OID 26592)
-- Name: sensors FK_76b9129fa05132dd60cad5cefcc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT "FK_76b9129fa05132dd60cad5cefcc" FOREIGN KEY (fk_maintainer_id) REFERENCES public.maintainers_registry(id);


--
-- TOC entry 3293 (class 2606 OID 26617)
-- Name: particular_matter10 FK_8dbb11d69adbbc2e78a3f9ceb79; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.particular_matter10
    ADD CONSTRAINT "FK_8dbb11d69adbbc2e78a3f9ceb79" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3295 (class 2606 OID 26627)
-- Name: temperature FK_92213d908392765b3d83c3e7782; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.temperature
    ADD CONSTRAINT "FK_92213d908392765b3d83c3e7782" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3297 (class 2606 OID 26632)
-- Name: parking_spots_sensors_sensors FK_d9ae08ddadc9213d70afff5f7ae; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots_sensors_sensors
    ADD CONSTRAINT "FK_d9ae08ddadc9213d70afff5f7ae" FOREIGN KEY ("parkingSpotsId") REFERENCES public.parking_spots(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3289 (class 2606 OID 26697)
-- Name: parking_spots FK_da69aea8c19590eaa82efd972b2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking_spots
    ADD CONSTRAINT "FK_da69aea8c19590eaa82efd972b2" FOREIGN KEY (fk_parking_area_id) REFERENCES public.parking_areas(id) ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 26602)
-- Name: float_sensors FK_f11d9b10fe9b3711d8857df7122; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.float_sensors
    ADD CONSTRAINT "FK_f11d9b10fe9b3711d8857df7122" FOREIGN KEY (fk_sensor_id) REFERENCES public.sensors(id);


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-10-28 10:01:40 CEST

--
-- PostgreSQL database dump complete
--

