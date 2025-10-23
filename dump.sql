--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_users_gender; Type: TYPE; Schema: public; Owner: esselleMedia
--

CREATE TYPE public.enum_users_gender AS ENUM (
    'Male',
    'Female'
);


ALTER TYPE public.enum_users_gender OWNER TO "esselleMedia";

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: esselleMedia
--

CREATE TYPE public.enum_users_role AS ENUM (
    'Admin',
    'User'
);


ALTER TYPE public.enum_users_role OWNER TO "esselleMedia";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ChannelLists; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public."ChannelLists" (
    id integer NOT NULL,
    "channelName" character varying(255) NOT NULL,
    "channelId" character varying(255) NOT NULL,
    "isLive" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ChannelLists" OWNER TO "esselleMedia";

--
-- Name: ChannelLists_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public."ChannelLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ChannelLists_id_seq" OWNER TO "esselleMedia";

--
-- Name: ChannelLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public."ChannelLists_id_seq" OWNED BY public."ChannelLists".id;


--
-- Name: channels; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    "channelId" uuid NOT NULL,
    "channelName" character varying(255) NOT NULL,
    "channelLogo" character varying(255) NOT NULL,
    "lastBroadcast" date,
    "lastTotalViewers" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "isLive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.channels OWNER TO "esselleMedia";

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.channels_id_seq OWNER TO "esselleMedia";

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    favorites text[] NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.favorites OWNER TO "esselleMedia";

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO "esselleMedia";

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "like" integer NOT NULL,
    "liveId" uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.likes OWNER TO "esselleMedia";

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO "esselleMedia";

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: lives; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.lives (
    id integer NOT NULL,
    "liveId" uuid NOT NULL,
    title character varying(255) NOT NULL,
    tags character varying(255)[] NOT NULL,
    "uniqueCode" character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    "likeCount" integer DEFAULT 0 NOT NULL,
    "commentCount" integer DEFAULT 0 NOT NULL,
    description character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.lives OWNER TO "esselleMedia";

--
-- Name: lives_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.lives_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lives_id_seq OWNER TO "esselleMedia";

--
-- Name: lives_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.lives_id_seq OWNED BY public.lives.id;


--
-- Name: matches; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.matches (
    id integer NOT NULL,
    "streamName" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    title character varying(255) NOT NULL,
    "streamId" uuid NOT NULL,
    description character varying(255) NOT NULL,
    banner character varying(255) NOT NULL,
    "isLive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.matches OWNER TO "esselleMedia";

--
-- Name: matches_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.matches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.matches_id_seq OWNER TO "esselleMedia";

--
-- Name: matches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.matches_id_seq OWNED BY public.matches.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    message character varying(255) NOT NULL,
    "fullName" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO "esselleMedia";

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO "esselleMedia";

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "postId" uuid NOT NULL,
    "userId" integer NOT NULL,
    "thumbnailUrl" character varying(255) NOT NULL,
    "bannerUrl" character varying(255) NOT NULL,
    "videoUrl" character varying(255) NOT NULL,
    "likeCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT '2025-10-22 02:57:25.299+00'::timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT '2025-10-22 02:57:25.299+00'::timestamp with time zone NOT NULL,
    "isPublic" boolean DEFAULT true NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    location character varying(255) NOT NULL,
    description text NOT NULL,
    duration integer NOT NULL,
    rating double precision,
    title character varying(255) NOT NULL,
    genre text[] NOT NULL
);


ALTER TABLE public.posts OWNER TO "esselleMedia";

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO "esselleMedia";

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: streams; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.streams (
    id integer NOT NULL,
    stream_key character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    title character varying(500),
    description text,
    is_active boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    started_at timestamp without time zone,
    ended_at timestamp without time zone
);


ALTER TABLE public.streams OWNER TO "esselleMedia";

--
-- Name: streams_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.streams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.streams_id_seq OWNER TO "esselleMedia";

--
-- Name: streams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.streams_id_seq OWNED BY public.streams.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: esselleMedia
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "middleName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    "dateOfBirth" date NOT NULL,
    gender public.enum_users_gender NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    address character varying(255) NOT NULL,
    role public.enum_users_role DEFAULT 'User'::public.enum_users_role NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    profile_picture character varying(255),
    otp character varying(255),
    "isActive" boolean DEFAULT false,
    "isDeleted" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO "esselleMedia";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: esselleMedia
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "esselleMedia";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: esselleMedia
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ChannelLists id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public."ChannelLists" ALTER COLUMN id SET DEFAULT nextval('public."ChannelLists_id_seq"'::regclass);


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: lives id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives ALTER COLUMN id SET DEFAULT nextval('public.lives_id_seq'::regclass);


--
-- Name: matches id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches ALTER COLUMN id SET DEFAULT nextval('public.matches_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: streams id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.streams ALTER COLUMN id SET DEFAULT nextval('public.streams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ChannelLists; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public."ChannelLists" (id, "channelName", "channelId", "isLive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.channels (id, "channelId", "channelName", "channelLogo", "lastBroadcast", "lastTotalViewers", "userId", "createdAt", "updatedAt", "isLive") FROM stdin;
1	53788771-62da-48f6-a794-283d1df596ba	Sports	channel/3cf51db9-18df-4c34-954e-377b2d4bf8fe	\N	0	1	2025-10-06 23:45:20.702+00	2025-10-06 23:45:20.702+00	f
2	69e88b5f-811a-41da-b3de-c9ada9d447f9	Movie	channel/5786139b-5585-44ba-b028-0beffd04602e	\N	0	1	2025-10-07 00:05:33.292+00	2025-10-07 00:05:33.292+00	f
3	7a127a63-ce2e-491e-84b9-dfd4aa7cc08a	Music	channel/507b8226-8609-4bd2-8f73-157c3e993784	\N	0	1	2025-10-07 00:06:44.027+00	2025-10-07 00:06:44.027+00	f
4	efdce3d0-d0d6-4d14-9d0a-dbac4b4adabf	Comedy	channel/79b09583-dd4f-4390-9e60-30aa7c3909a7	\N	0	1	2025-10-07 10:01:00.798+00	2025-10-07 10:01:00.798+00	f
5	b57168d4-22f3-4129-bff4-3d02a3b6a3a0	Comedy	channel/dfa20cc7-74ee-4c6f-b1f9-f894e6b5b06b	\N	0	1	2025-10-07 10:01:58.913+00	2025-10-07 10:01:58.913+00	f
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.favorites (id, "userId", favorites, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.likes (id, "userId", "like", "liveId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: lives; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.lives (id, "liveId", title, tags, "uniqueCode", location, "likeCount", "commentCount", description, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.matches (id, "streamName", "createdAt", "updatedAt", title, "streamId", description, banner, "isLive") FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.messages (id, message, "fullName", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.posts (id, "postId", "userId", "thumbnailUrl", "bannerUrl", "videoUrl", "likeCount", "createdAt", "updatedAt", "isPublic", "isDeleted", location, description, duration, rating, title, genre) FROM stdin;
1	80acf066-0737-443d-b887-97cac4321d58	1	1358f553f66c235e9693f8210b2646fb1d555266350fa3a370d738c552cb01ce	96eb7482080c107e0205f192a79c38da011ae06bc32661db853f83fe0afba66c	042bf8aabc171c6973127f52915a9e617b05fb84f839f61c066943c6a0a3f842	0	2025-10-06 14:49:12.711+00	2025-10-06 14:49:12.711+00	t	f	murray town	This Video is Just a test video to test the system. and see if posting a video is working	10	\N	Test	{Music,lifestyle}
2	6cbfa1a0-252f-40aa-8546-499314306286	1	180d170c62bd9bd0d29436e8d7fa58b8d2c79e65f68d08d6d95088f1a3d220d2	6ac95ecb4015ac0c9b405f657217aa0b50a33fd41415320e30f4bb33c9d134e7	6b6c72749103e1d206802e80b7b3c0ca3f440a2d720ec46b9e7469d3f8c9ddd0	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	Nigeria	Zlatan rocking it\r\n	6	\N	DJ MIX	{Music}
3	2d4610ee-705e-4ab8-8336-24cf63fa5e42	1	856d83ccda3c56122a5e940c384656119a4072bf182cc14c9b14db6a5971a3ff	63b47bda55f37eab6bee3c46a88b45a69b82f3e011beb5ad50d5ed558c76133e	24a77435fdfe8b54a5d8a43f63b8d387839f3fa651f564f94da5a1abce8011bc	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	Nigeria	Bovi back at it again	753	\N	Access Bank Comedy	{comedy}
4	7a10baa1-f1e0-4bc4-b99d-134ed5213802	1	c92b1f8f71a5119b13eb3ad00361a4f79cca70901a70c707b3e7e7cd490ba1ab	e3d844bf0c9e07c4896f2edafb81db5d7be5312a694a60e3db268c46290ddef7	3f02648f80d8735514c9911e3e536ca1ce374983953fd6829cb982f1c34d2e52	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	Nigeria	Kenny Blag doind what he does best	1	\N	Kenny Blag Show	{comedy}
5	d2bd82bb-47bd-44f4-a027-ebf3e7f66d81	1	4eded85e4d37c12eed7f545d4f418809f9e4c18e22e718d34e6d04b29e462727	013bfc8ff2880ce5223f0e05f4786e744cb0702106a6f79af83496265dd12367	0933bd39c26ff07cf37c53cf7b0fa5fe3dd3d79bbc17154e39f3e88f2f3613fe	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	USA	Fluffy making people laugh so hard	1612	\N	Mr. Fluffy Comedy	{comedy}
6	43efadce-4f78-4efd-8bc1-ea4bddad0bfa	1	e7061368c14f0bed24c3edd6a581c787fe95b8d7f6b4db1886e59011f71cd161	167e3478dd544c7a7b8a8b7987c353fb5725ffc0214b23142df076e39ebb3db7	6583b8f2298601e89fe67513585ca471965f265b7ee83c717f863b53d638238b	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	Nigeria	Onos performing the remix of counting your blessing	5	\N	Ono Counting Your Blessings	{Music}
7	2d2fdd6a-a1de-45b8-91c1-914eb83980ac	1	31ea41d5a0752749a376e60683228ee64ae89a1ab8fff4b9d143ef90d2fb2634	b5c78f92c747a53b74fa8a326d79aff77115b6100f7fea505a699eeca452277b	4e5c7ee68bf662b27799ef43b100a3c8a378f1941e4f9345eb55f12a6d02d5c6	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	nigeria	Rema Skelebu	6	\N	Rema Skelebu	{Music}
8	9b0331d9-d6f1-4bfa-b38b-28c492708ee2	1	334c817a8ae78a1b5cda29771aa2b105e685b730a0d5904b443c3eafc3f126da	0405a8e2f7cb9e1752f4966c3b73003ec1a4f9f6c0efcfaa53c61120953ae8e6	cfab0577422d16f2db275a1c85e69fb1ff04a0893304713c1b42fc0c8e8eb9eb	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	USA	track and field	7	\N	Track and Field	{sports}
9	4b20060c-1659-42ed-b568-e1e21d9179bd	1	e62fde113588ec95542e59946b140392f3e0903ad75458bad196f9e767f73350	b283ec9db46e6abae48ec4d0a969aadfe522e39696f4dbdff512f98f7d614e2d	15d4a17513d46043bd5de2c39a1bb958e83890fba4e685a87efbe8e735ac5df1	0	2025-10-09 01:27:18.369+00	2025-10-09 01:27:18.369+00	t	f	USA, NEW YORK	Chelsea trash PSG 3:0	204	\N	Chelsea vs PSG	{sports}
\.


--
-- Data for Name: streams; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.streams (id, stream_key, user_id, title, description, is_active, created_at, started_at, ended_at) FROM stdin;
1	test_fef63dd2	test	football	this is to watch football	t	2025-10-03 14:47:51.792446	2025-10-03 15:04:07.923807	2025-10-03 15:02:34.550418
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: esselleMedia
--

COPY public.users (id, "firstName", "middleName", "lastName", username, "dateOfBirth", gender, email, password, address, role, "phoneNumber", profile_picture, otp, "isActive", "isDeleted", "createdAt", "updatedAt") FROM stdin;
1	Solomon	Backside	Kanu	SolCaster	2023-10-10	Male	solomoncaster543@gmail.com	$2b$10$4LGvGRe4cCM439bW4FEcVOeZMs.9RPoDyw.508mrWr6W3IC3ehNnu	88 pademba road	Admin	+23233800146	profiles/73214e09-13a4-4a0a-ae13-8633e6557118		t	f	2025-10-01 18:55:59.458+00	2025-10-04 21:13:23.366+00
\.


--
-- Name: ChannelLists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public."ChannelLists_id_seq"', 1, false);


--
-- Name: channels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.channels_id_seq', 5, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.favorites_id_seq', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.likes_id_seq', 1, false);


--
-- Name: lives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.lives_id_seq', 1, false);


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.matches_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.posts_id_seq', 9, true);


--
-- Name: streams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.streams_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: esselleMedia
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: ChannelLists ChannelLists_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public."ChannelLists"
    ADD CONSTRAINT "ChannelLists_pkey" PRIMARY KEY (id);


--
-- Name: channels channels_channelId_key; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key1; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key1" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key10; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key10" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key11; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key11" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key12; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key12" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key13; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key13" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key14; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key14" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key15; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key15" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key16; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key16" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key17; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key17" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key18; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key18" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key19; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key19" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key2; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key2" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key20; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key20" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key21; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key21" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key22; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key22" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key23; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key23" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key24; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key24" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key25; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key25" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key26; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key26" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key27; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key27" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key28; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key28" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key29; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key29" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key3; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key3" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key30; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key30" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key31; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key31" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key32; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key32" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key33; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key33" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key34; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key34" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key35; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key35" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key36; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key36" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key37; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key37" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key38; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key38" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key39; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key39" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key4; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key4" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key40; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key40" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key41; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key41" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key42; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key42" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key43; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key43" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key44; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key44" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key45; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key45" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key46; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key46" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key47; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key47" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key48; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key48" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key49; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key49" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key5; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key5" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key50; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key50" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key51; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key51" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key52; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key52" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key53; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key53" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key54; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key54" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key55; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key55" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key56; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key56" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key57; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key57" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key58; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key58" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key59; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key59" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key6; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key6" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key60; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key60" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key61; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key61" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key62; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key62" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key63; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key63" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key7; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key7" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key8; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key8" UNIQUE ("channelId");


--
-- Name: channels channels_channelId_key9; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_channelId_key9" UNIQUE ("channelId");


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: lives lives_liveId_key; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key1; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key1" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key10; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key10" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key100; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key100" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key101; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key101" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key102; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key102" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key103; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key103" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key104; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key104" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key105; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key105" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key106; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key106" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key107; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key107" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key108; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key108" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key109; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key109" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key11; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key11" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key110; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key110" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key111; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key111" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key112; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key112" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key113; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key113" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key114; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key114" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key115; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key115" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key116; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key116" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key117; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key117" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key118; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key118" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key119; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key119" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key12; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key12" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key120; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key120" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key121; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key121" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key122; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key122" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key123; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key123" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key124; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key124" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key125; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key125" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key126; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key126" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key127; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key127" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key13; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key13" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key14; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key14" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key15; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key15" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key16; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key16" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key17; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key17" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key18; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key18" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key19; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key19" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key2; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key2" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key20; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key20" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key21; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key21" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key22; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key22" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key23; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key23" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key24; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key24" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key25; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key25" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key26; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key26" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key27; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key27" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key28; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key28" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key29; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key29" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key3; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key3" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key30; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key30" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key31; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key31" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key32; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key32" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key33; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key33" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key34; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key34" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key35; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key35" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key36; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key36" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key37; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key37" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key38; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key38" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key39; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key39" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key4; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key4" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key40; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key40" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key41; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key41" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key42; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key42" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key43; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key43" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key44; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key44" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key45; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key45" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key46; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key46" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key47; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key47" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key48; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key48" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key49; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key49" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key5; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key5" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key50; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key50" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key51; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key51" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key52; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key52" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key53; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key53" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key54; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key54" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key55; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key55" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key56; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key56" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key57; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key57" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key58; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key58" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key59; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key59" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key6; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key6" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key60; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key60" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key61; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key61" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key62; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key62" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key63; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key63" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key64; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key64" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key65; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key65" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key66; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key66" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key67; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key67" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key68; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key68" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key69; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key69" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key7; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key7" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key70; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key70" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key71; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key71" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key72; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key72" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key73; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key73" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key74; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key74" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key75; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key75" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key76; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key76" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key77; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key77" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key78; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key78" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key79; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key79" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key8; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key8" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key80; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key80" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key81; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key81" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key82; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key82" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key83; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key83" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key84; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key84" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key85; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key85" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key86; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key86" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key87; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key87" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key88; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key88" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key89; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key89" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key9; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key9" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key90; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key90" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key91; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key91" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key92; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key92" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key93; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key93" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key94; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key94" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key95; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key95" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key96; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key96" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key97; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key97" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key98; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key98" UNIQUE ("liveId");


--
-- Name: lives lives_liveId_key99; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_liveId_key99" UNIQUE ("liveId");


--
-- Name: lives lives_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT lives_pkey PRIMARY KEY (id);


--
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: matches matches_streamId_key; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key1; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key1" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key10; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key10" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key11; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key11" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key12; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key12" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key13; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key13" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key14; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key14" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key15; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key15" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key16; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key16" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key17; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key17" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key18; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key18" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key19; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key19" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key2; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key2" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key20; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key20" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key21; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key21" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key3; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key3" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key4; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key4" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key5; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key5" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key6; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key6" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key7; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key7" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key8; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key8" UNIQUE ("streamId");


--
-- Name: matches matches_streamId_key9; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamId_key9" UNIQUE ("streamId");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_postId_key; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key" UNIQUE ("postId");


--
-- Name: posts posts_postId_key1; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key1" UNIQUE ("postId");


--
-- Name: posts posts_postId_key10; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key10" UNIQUE ("postId");


--
-- Name: posts posts_postId_key100; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key100" UNIQUE ("postId");


--
-- Name: posts posts_postId_key101; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key101" UNIQUE ("postId");


--
-- Name: posts posts_postId_key102; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key102" UNIQUE ("postId");


--
-- Name: posts posts_postId_key103; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key103" UNIQUE ("postId");


--
-- Name: posts posts_postId_key104; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key104" UNIQUE ("postId");


--
-- Name: posts posts_postId_key105; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key105" UNIQUE ("postId");


--
-- Name: posts posts_postId_key106; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key106" UNIQUE ("postId");


--
-- Name: posts posts_postId_key107; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key107" UNIQUE ("postId");


--
-- Name: posts posts_postId_key108; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key108" UNIQUE ("postId");


--
-- Name: posts posts_postId_key109; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key109" UNIQUE ("postId");


--
-- Name: posts posts_postId_key11; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key11" UNIQUE ("postId");


--
-- Name: posts posts_postId_key110; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key110" UNIQUE ("postId");


--
-- Name: posts posts_postId_key111; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key111" UNIQUE ("postId");


--
-- Name: posts posts_postId_key112; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key112" UNIQUE ("postId");


--
-- Name: posts posts_postId_key113; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key113" UNIQUE ("postId");


--
-- Name: posts posts_postId_key114; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key114" UNIQUE ("postId");


--
-- Name: posts posts_postId_key115; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key115" UNIQUE ("postId");


--
-- Name: posts posts_postId_key116; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key116" UNIQUE ("postId");


--
-- Name: posts posts_postId_key117; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key117" UNIQUE ("postId");


--
-- Name: posts posts_postId_key118; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key118" UNIQUE ("postId");


--
-- Name: posts posts_postId_key119; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key119" UNIQUE ("postId");


--
-- Name: posts posts_postId_key12; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key12" UNIQUE ("postId");


--
-- Name: posts posts_postId_key120; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key120" UNIQUE ("postId");


--
-- Name: posts posts_postId_key121; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key121" UNIQUE ("postId");


--
-- Name: posts posts_postId_key122; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key122" UNIQUE ("postId");


--
-- Name: posts posts_postId_key123; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key123" UNIQUE ("postId");


--
-- Name: posts posts_postId_key124; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key124" UNIQUE ("postId");


--
-- Name: posts posts_postId_key125; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key125" UNIQUE ("postId");


--
-- Name: posts posts_postId_key126; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key126" UNIQUE ("postId");


--
-- Name: posts posts_postId_key127; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key127" UNIQUE ("postId");


--
-- Name: posts posts_postId_key128; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key128" UNIQUE ("postId");


--
-- Name: posts posts_postId_key129; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key129" UNIQUE ("postId");


--
-- Name: posts posts_postId_key13; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key13" UNIQUE ("postId");


--
-- Name: posts posts_postId_key130; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key130" UNIQUE ("postId");


--
-- Name: posts posts_postId_key131; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key131" UNIQUE ("postId");


--
-- Name: posts posts_postId_key132; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key132" UNIQUE ("postId");


--
-- Name: posts posts_postId_key133; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key133" UNIQUE ("postId");


--
-- Name: posts posts_postId_key134; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key134" UNIQUE ("postId");


--
-- Name: posts posts_postId_key135; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key135" UNIQUE ("postId");


--
-- Name: posts posts_postId_key136; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key136" UNIQUE ("postId");


--
-- Name: posts posts_postId_key137; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key137" UNIQUE ("postId");


--
-- Name: posts posts_postId_key138; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key138" UNIQUE ("postId");


--
-- Name: posts posts_postId_key139; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key139" UNIQUE ("postId");


--
-- Name: posts posts_postId_key14; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key14" UNIQUE ("postId");


--
-- Name: posts posts_postId_key140; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key140" UNIQUE ("postId");


--
-- Name: posts posts_postId_key141; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key141" UNIQUE ("postId");


--
-- Name: posts posts_postId_key142; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key142" UNIQUE ("postId");


--
-- Name: posts posts_postId_key143; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key143" UNIQUE ("postId");


--
-- Name: posts posts_postId_key144; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key144" UNIQUE ("postId");


--
-- Name: posts posts_postId_key145; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key145" UNIQUE ("postId");


--
-- Name: posts posts_postId_key146; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key146" UNIQUE ("postId");


--
-- Name: posts posts_postId_key147; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key147" UNIQUE ("postId");


--
-- Name: posts posts_postId_key148; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key148" UNIQUE ("postId");


--
-- Name: posts posts_postId_key149; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key149" UNIQUE ("postId");


--
-- Name: posts posts_postId_key15; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key15" UNIQUE ("postId");


--
-- Name: posts posts_postId_key150; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key150" UNIQUE ("postId");


--
-- Name: posts posts_postId_key151; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key151" UNIQUE ("postId");


--
-- Name: posts posts_postId_key152; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key152" UNIQUE ("postId");


--
-- Name: posts posts_postId_key153; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key153" UNIQUE ("postId");


--
-- Name: posts posts_postId_key154; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key154" UNIQUE ("postId");


--
-- Name: posts posts_postId_key155; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key155" UNIQUE ("postId");


--
-- Name: posts posts_postId_key156; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key156" UNIQUE ("postId");


--
-- Name: posts posts_postId_key157; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key157" UNIQUE ("postId");


--
-- Name: posts posts_postId_key158; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key158" UNIQUE ("postId");


--
-- Name: posts posts_postId_key159; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key159" UNIQUE ("postId");


--
-- Name: posts posts_postId_key16; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key16" UNIQUE ("postId");


--
-- Name: posts posts_postId_key160; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key160" UNIQUE ("postId");


--
-- Name: posts posts_postId_key161; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key161" UNIQUE ("postId");


--
-- Name: posts posts_postId_key162; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key162" UNIQUE ("postId");


--
-- Name: posts posts_postId_key163; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key163" UNIQUE ("postId");


--
-- Name: posts posts_postId_key164; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key164" UNIQUE ("postId");


--
-- Name: posts posts_postId_key165; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key165" UNIQUE ("postId");


--
-- Name: posts posts_postId_key166; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key166" UNIQUE ("postId");


--
-- Name: posts posts_postId_key167; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key167" UNIQUE ("postId");


--
-- Name: posts posts_postId_key168; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key168" UNIQUE ("postId");


--
-- Name: posts posts_postId_key169; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key169" UNIQUE ("postId");


--
-- Name: posts posts_postId_key17; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key17" UNIQUE ("postId");


--
-- Name: posts posts_postId_key170; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key170" UNIQUE ("postId");


--
-- Name: posts posts_postId_key171; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key171" UNIQUE ("postId");


--
-- Name: posts posts_postId_key172; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key172" UNIQUE ("postId");


--
-- Name: posts posts_postId_key173; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key173" UNIQUE ("postId");


--
-- Name: posts posts_postId_key174; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key174" UNIQUE ("postId");


--
-- Name: posts posts_postId_key175; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key175" UNIQUE ("postId");


--
-- Name: posts posts_postId_key176; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key176" UNIQUE ("postId");


--
-- Name: posts posts_postId_key177; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key177" UNIQUE ("postId");


--
-- Name: posts posts_postId_key178; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key178" UNIQUE ("postId");


--
-- Name: posts posts_postId_key179; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key179" UNIQUE ("postId");


--
-- Name: posts posts_postId_key18; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key18" UNIQUE ("postId");


--
-- Name: posts posts_postId_key180; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key180" UNIQUE ("postId");


--
-- Name: posts posts_postId_key181; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key181" UNIQUE ("postId");


--
-- Name: posts posts_postId_key182; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key182" UNIQUE ("postId");


--
-- Name: posts posts_postId_key183; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key183" UNIQUE ("postId");


--
-- Name: posts posts_postId_key184; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key184" UNIQUE ("postId");


--
-- Name: posts posts_postId_key185; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key185" UNIQUE ("postId");


--
-- Name: posts posts_postId_key186; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key186" UNIQUE ("postId");


--
-- Name: posts posts_postId_key187; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key187" UNIQUE ("postId");


--
-- Name: posts posts_postId_key188; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key188" UNIQUE ("postId");


--
-- Name: posts posts_postId_key189; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key189" UNIQUE ("postId");


--
-- Name: posts posts_postId_key19; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key19" UNIQUE ("postId");


--
-- Name: posts posts_postId_key190; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key190" UNIQUE ("postId");


--
-- Name: posts posts_postId_key191; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key191" UNIQUE ("postId");


--
-- Name: posts posts_postId_key192; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key192" UNIQUE ("postId");


--
-- Name: posts posts_postId_key193; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key193" UNIQUE ("postId");


--
-- Name: posts posts_postId_key2; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key2" UNIQUE ("postId");


--
-- Name: posts posts_postId_key20; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key20" UNIQUE ("postId");


--
-- Name: posts posts_postId_key21; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key21" UNIQUE ("postId");


--
-- Name: posts posts_postId_key22; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key22" UNIQUE ("postId");


--
-- Name: posts posts_postId_key23; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key23" UNIQUE ("postId");


--
-- Name: posts posts_postId_key24; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key24" UNIQUE ("postId");


--
-- Name: posts posts_postId_key25; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key25" UNIQUE ("postId");


--
-- Name: posts posts_postId_key26; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key26" UNIQUE ("postId");


--
-- Name: posts posts_postId_key27; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key27" UNIQUE ("postId");


--
-- Name: posts posts_postId_key28; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key28" UNIQUE ("postId");


--
-- Name: posts posts_postId_key29; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key29" UNIQUE ("postId");


--
-- Name: posts posts_postId_key3; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key3" UNIQUE ("postId");


--
-- Name: posts posts_postId_key30; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key30" UNIQUE ("postId");


--
-- Name: posts posts_postId_key31; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key31" UNIQUE ("postId");


--
-- Name: posts posts_postId_key32; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key32" UNIQUE ("postId");


--
-- Name: posts posts_postId_key33; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key33" UNIQUE ("postId");


--
-- Name: posts posts_postId_key34; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key34" UNIQUE ("postId");


--
-- Name: posts posts_postId_key35; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key35" UNIQUE ("postId");


--
-- Name: posts posts_postId_key36; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key36" UNIQUE ("postId");


--
-- Name: posts posts_postId_key37; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key37" UNIQUE ("postId");


--
-- Name: posts posts_postId_key38; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key38" UNIQUE ("postId");


--
-- Name: posts posts_postId_key39; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key39" UNIQUE ("postId");


--
-- Name: posts posts_postId_key4; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key4" UNIQUE ("postId");


--
-- Name: posts posts_postId_key40; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key40" UNIQUE ("postId");


--
-- Name: posts posts_postId_key41; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key41" UNIQUE ("postId");


--
-- Name: posts posts_postId_key42; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key42" UNIQUE ("postId");


--
-- Name: posts posts_postId_key43; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key43" UNIQUE ("postId");


--
-- Name: posts posts_postId_key44; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key44" UNIQUE ("postId");


--
-- Name: posts posts_postId_key45; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key45" UNIQUE ("postId");


--
-- Name: posts posts_postId_key46; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key46" UNIQUE ("postId");


--
-- Name: posts posts_postId_key47; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key47" UNIQUE ("postId");


--
-- Name: posts posts_postId_key48; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key48" UNIQUE ("postId");


--
-- Name: posts posts_postId_key49; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key49" UNIQUE ("postId");


--
-- Name: posts posts_postId_key5; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key5" UNIQUE ("postId");


--
-- Name: posts posts_postId_key50; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key50" UNIQUE ("postId");


--
-- Name: posts posts_postId_key51; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key51" UNIQUE ("postId");


--
-- Name: posts posts_postId_key52; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key52" UNIQUE ("postId");


--
-- Name: posts posts_postId_key53; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key53" UNIQUE ("postId");


--
-- Name: posts posts_postId_key54; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key54" UNIQUE ("postId");


--
-- Name: posts posts_postId_key55; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key55" UNIQUE ("postId");


--
-- Name: posts posts_postId_key56; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key56" UNIQUE ("postId");


--
-- Name: posts posts_postId_key57; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key57" UNIQUE ("postId");


--
-- Name: posts posts_postId_key58; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key58" UNIQUE ("postId");


--
-- Name: posts posts_postId_key59; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key59" UNIQUE ("postId");


--
-- Name: posts posts_postId_key6; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key6" UNIQUE ("postId");


--
-- Name: posts posts_postId_key60; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key60" UNIQUE ("postId");


--
-- Name: posts posts_postId_key61; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key61" UNIQUE ("postId");


--
-- Name: posts posts_postId_key62; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key62" UNIQUE ("postId");


--
-- Name: posts posts_postId_key63; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key63" UNIQUE ("postId");


--
-- Name: posts posts_postId_key64; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key64" UNIQUE ("postId");


--
-- Name: posts posts_postId_key65; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key65" UNIQUE ("postId");


--
-- Name: posts posts_postId_key66; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key66" UNIQUE ("postId");


--
-- Name: posts posts_postId_key67; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key67" UNIQUE ("postId");


--
-- Name: posts posts_postId_key68; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key68" UNIQUE ("postId");


--
-- Name: posts posts_postId_key69; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key69" UNIQUE ("postId");


--
-- Name: posts posts_postId_key7; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key7" UNIQUE ("postId");


--
-- Name: posts posts_postId_key70; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key70" UNIQUE ("postId");


--
-- Name: posts posts_postId_key71; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key71" UNIQUE ("postId");


--
-- Name: posts posts_postId_key72; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key72" UNIQUE ("postId");


--
-- Name: posts posts_postId_key73; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key73" UNIQUE ("postId");


--
-- Name: posts posts_postId_key74; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key74" UNIQUE ("postId");


--
-- Name: posts posts_postId_key75; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key75" UNIQUE ("postId");


--
-- Name: posts posts_postId_key76; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key76" UNIQUE ("postId");


--
-- Name: posts posts_postId_key77; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key77" UNIQUE ("postId");


--
-- Name: posts posts_postId_key78; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key78" UNIQUE ("postId");


--
-- Name: posts posts_postId_key79; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key79" UNIQUE ("postId");


--
-- Name: posts posts_postId_key8; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key8" UNIQUE ("postId");


--
-- Name: posts posts_postId_key80; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key80" UNIQUE ("postId");


--
-- Name: posts posts_postId_key81; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key81" UNIQUE ("postId");


--
-- Name: posts posts_postId_key82; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key82" UNIQUE ("postId");


--
-- Name: posts posts_postId_key83; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key83" UNIQUE ("postId");


--
-- Name: posts posts_postId_key84; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key84" UNIQUE ("postId");


--
-- Name: posts posts_postId_key85; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key85" UNIQUE ("postId");


--
-- Name: posts posts_postId_key86; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key86" UNIQUE ("postId");


--
-- Name: posts posts_postId_key87; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key87" UNIQUE ("postId");


--
-- Name: posts posts_postId_key88; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key88" UNIQUE ("postId");


--
-- Name: posts posts_postId_key89; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key89" UNIQUE ("postId");


--
-- Name: posts posts_postId_key9; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key9" UNIQUE ("postId");


--
-- Name: posts posts_postId_key90; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key90" UNIQUE ("postId");


--
-- Name: posts posts_postId_key91; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key91" UNIQUE ("postId");


--
-- Name: posts posts_postId_key92; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key92" UNIQUE ("postId");


--
-- Name: posts posts_postId_key93; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key93" UNIQUE ("postId");


--
-- Name: posts posts_postId_key94; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key94" UNIQUE ("postId");


--
-- Name: posts posts_postId_key95; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key95" UNIQUE ("postId");


--
-- Name: posts posts_postId_key96; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key96" UNIQUE ("postId");


--
-- Name: posts posts_postId_key97; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key97" UNIQUE ("postId");


--
-- Name: posts posts_postId_key98; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key98" UNIQUE ("postId");


--
-- Name: posts posts_postId_key99; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_postId_key99" UNIQUE ("postId");


--
-- Name: streams streams_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.streams
    ADD CONSTRAINT streams_pkey PRIMARY KEY (id);


--
-- Name: streams streams_stream_key_key; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.streams
    ADD CONSTRAINT streams_stream_key_key UNIQUE (stream_key);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- Name: users users_email_key100; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key100 UNIQUE (email);


--
-- Name: users users_email_key101; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key101 UNIQUE (email);


--
-- Name: users users_email_key102; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key102 UNIQUE (email);


--
-- Name: users users_email_key103; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key103 UNIQUE (email);


--
-- Name: users users_email_key104; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key104 UNIQUE (email);


--
-- Name: users users_email_key105; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key105 UNIQUE (email);


--
-- Name: users users_email_key106; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key106 UNIQUE (email);


--
-- Name: users users_email_key107; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key107 UNIQUE (email);


--
-- Name: users users_email_key108; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key108 UNIQUE (email);


--
-- Name: users users_email_key109; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key109 UNIQUE (email);


--
-- Name: users users_email_key11; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);


--
-- Name: users users_email_key110; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key110 UNIQUE (email);


--
-- Name: users users_email_key111; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key111 UNIQUE (email);


--
-- Name: users users_email_key112; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key112 UNIQUE (email);


--
-- Name: users users_email_key113; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key113 UNIQUE (email);


--
-- Name: users users_email_key114; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key114 UNIQUE (email);


--
-- Name: users users_email_key115; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key115 UNIQUE (email);


--
-- Name: users users_email_key116; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key116 UNIQUE (email);


--
-- Name: users users_email_key117; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key117 UNIQUE (email);


--
-- Name: users users_email_key118; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key118 UNIQUE (email);


--
-- Name: users users_email_key119; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key119 UNIQUE (email);


--
-- Name: users users_email_key12; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key12 UNIQUE (email);


--
-- Name: users users_email_key120; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key120 UNIQUE (email);


--
-- Name: users users_email_key121; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key121 UNIQUE (email);


--
-- Name: users users_email_key122; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key122 UNIQUE (email);


--
-- Name: users users_email_key123; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key123 UNIQUE (email);


--
-- Name: users users_email_key124; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key124 UNIQUE (email);


--
-- Name: users users_email_key125; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key125 UNIQUE (email);


--
-- Name: users users_email_key126; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key126 UNIQUE (email);


--
-- Name: users users_email_key127; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key127 UNIQUE (email);


--
-- Name: users users_email_key128; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key128 UNIQUE (email);


--
-- Name: users users_email_key129; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key129 UNIQUE (email);


--
-- Name: users users_email_key13; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key13 UNIQUE (email);


--
-- Name: users users_email_key130; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key130 UNIQUE (email);


--
-- Name: users users_email_key131; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key131 UNIQUE (email);


--
-- Name: users users_email_key132; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key132 UNIQUE (email);


--
-- Name: users users_email_key133; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key133 UNIQUE (email);


--
-- Name: users users_email_key134; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key134 UNIQUE (email);


--
-- Name: users users_email_key135; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key135 UNIQUE (email);


--
-- Name: users users_email_key136; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key136 UNIQUE (email);


--
-- Name: users users_email_key137; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key137 UNIQUE (email);


--
-- Name: users users_email_key138; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key138 UNIQUE (email);


--
-- Name: users users_email_key139; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key139 UNIQUE (email);


--
-- Name: users users_email_key14; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key14 UNIQUE (email);


--
-- Name: users users_email_key140; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key140 UNIQUE (email);


--
-- Name: users users_email_key141; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key141 UNIQUE (email);


--
-- Name: users users_email_key142; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key142 UNIQUE (email);


--
-- Name: users users_email_key143; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key143 UNIQUE (email);


--
-- Name: users users_email_key144; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key144 UNIQUE (email);


--
-- Name: users users_email_key145; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key145 UNIQUE (email);


--
-- Name: users users_email_key146; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key146 UNIQUE (email);


--
-- Name: users users_email_key147; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key147 UNIQUE (email);


--
-- Name: users users_email_key148; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key148 UNIQUE (email);


--
-- Name: users users_email_key149; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key149 UNIQUE (email);


--
-- Name: users users_email_key15; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key15 UNIQUE (email);


--
-- Name: users users_email_key150; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key150 UNIQUE (email);


--
-- Name: users users_email_key151; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key151 UNIQUE (email);


--
-- Name: users users_email_key152; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key152 UNIQUE (email);


--
-- Name: users users_email_key153; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key153 UNIQUE (email);


--
-- Name: users users_email_key154; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key154 UNIQUE (email);


--
-- Name: users users_email_key155; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key155 UNIQUE (email);


--
-- Name: users users_email_key156; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key156 UNIQUE (email);


--
-- Name: users users_email_key157; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key157 UNIQUE (email);


--
-- Name: users users_email_key158; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key158 UNIQUE (email);


--
-- Name: users users_email_key159; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key159 UNIQUE (email);


--
-- Name: users users_email_key16; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key16 UNIQUE (email);


--
-- Name: users users_email_key160; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key160 UNIQUE (email);


--
-- Name: users users_email_key161; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key161 UNIQUE (email);


--
-- Name: users users_email_key162; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key162 UNIQUE (email);


--
-- Name: users users_email_key163; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key163 UNIQUE (email);


--
-- Name: users users_email_key164; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key164 UNIQUE (email);


--
-- Name: users users_email_key165; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key165 UNIQUE (email);


--
-- Name: users users_email_key166; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key166 UNIQUE (email);


--
-- Name: users users_email_key167; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key167 UNIQUE (email);


--
-- Name: users users_email_key168; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key168 UNIQUE (email);


--
-- Name: users users_email_key169; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key169 UNIQUE (email);


--
-- Name: users users_email_key17; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key17 UNIQUE (email);


--
-- Name: users users_email_key170; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key170 UNIQUE (email);


--
-- Name: users users_email_key171; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key171 UNIQUE (email);


--
-- Name: users users_email_key172; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key172 UNIQUE (email);


--
-- Name: users users_email_key173; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key173 UNIQUE (email);


--
-- Name: users users_email_key174; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key174 UNIQUE (email);


--
-- Name: users users_email_key175; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key175 UNIQUE (email);


--
-- Name: users users_email_key176; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key176 UNIQUE (email);


--
-- Name: users users_email_key177; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key177 UNIQUE (email);


--
-- Name: users users_email_key178; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key178 UNIQUE (email);


--
-- Name: users users_email_key179; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key179 UNIQUE (email);


--
-- Name: users users_email_key18; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key18 UNIQUE (email);


--
-- Name: users users_email_key180; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key180 UNIQUE (email);


--
-- Name: users users_email_key181; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key181 UNIQUE (email);


--
-- Name: users users_email_key182; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key182 UNIQUE (email);


--
-- Name: users users_email_key183; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key183 UNIQUE (email);


--
-- Name: users users_email_key184; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key184 UNIQUE (email);


--
-- Name: users users_email_key185; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key185 UNIQUE (email);


--
-- Name: users users_email_key186; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key186 UNIQUE (email);


--
-- Name: users users_email_key187; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key187 UNIQUE (email);


--
-- Name: users users_email_key188; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key188 UNIQUE (email);


--
-- Name: users users_email_key189; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key189 UNIQUE (email);


--
-- Name: users users_email_key19; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key19 UNIQUE (email);


--
-- Name: users users_email_key190; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key190 UNIQUE (email);


--
-- Name: users users_email_key191; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key191 UNIQUE (email);


--
-- Name: users users_email_key192; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key192 UNIQUE (email);


--
-- Name: users users_email_key193; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key193 UNIQUE (email);


--
-- Name: users users_email_key194; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key194 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key20; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key20 UNIQUE (email);


--
-- Name: users users_email_key21; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key21 UNIQUE (email);


--
-- Name: users users_email_key22; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key22 UNIQUE (email);


--
-- Name: users users_email_key23; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key23 UNIQUE (email);


--
-- Name: users users_email_key24; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key24 UNIQUE (email);


--
-- Name: users users_email_key25; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key25 UNIQUE (email);


--
-- Name: users users_email_key26; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key26 UNIQUE (email);


--
-- Name: users users_email_key27; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key27 UNIQUE (email);


--
-- Name: users users_email_key28; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key28 UNIQUE (email);


--
-- Name: users users_email_key29; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key29 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_email_key30; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key30 UNIQUE (email);


--
-- Name: users users_email_key31; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key31 UNIQUE (email);


--
-- Name: users users_email_key32; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key32 UNIQUE (email);


--
-- Name: users users_email_key33; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key33 UNIQUE (email);


--
-- Name: users users_email_key34; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key34 UNIQUE (email);


--
-- Name: users users_email_key35; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key35 UNIQUE (email);


--
-- Name: users users_email_key36; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key36 UNIQUE (email);


--
-- Name: users users_email_key37; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key37 UNIQUE (email);


--
-- Name: users users_email_key38; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key38 UNIQUE (email);


--
-- Name: users users_email_key39; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key39 UNIQUE (email);


--
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- Name: users users_email_key40; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key40 UNIQUE (email);


--
-- Name: users users_email_key41; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key41 UNIQUE (email);


--
-- Name: users users_email_key42; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key42 UNIQUE (email);


--
-- Name: users users_email_key43; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key43 UNIQUE (email);


--
-- Name: users users_email_key44; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key44 UNIQUE (email);


--
-- Name: users users_email_key45; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key45 UNIQUE (email);


--
-- Name: users users_email_key46; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key46 UNIQUE (email);


--
-- Name: users users_email_key47; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key47 UNIQUE (email);


--
-- Name: users users_email_key48; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key48 UNIQUE (email);


--
-- Name: users users_email_key49; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key49 UNIQUE (email);


--
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- Name: users users_email_key50; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key50 UNIQUE (email);


--
-- Name: users users_email_key51; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key51 UNIQUE (email);


--
-- Name: users users_email_key52; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key52 UNIQUE (email);


--
-- Name: users users_email_key53; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key53 UNIQUE (email);


--
-- Name: users users_email_key54; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key54 UNIQUE (email);


--
-- Name: users users_email_key55; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key55 UNIQUE (email);


--
-- Name: users users_email_key56; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key56 UNIQUE (email);


--
-- Name: users users_email_key57; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key57 UNIQUE (email);


--
-- Name: users users_email_key58; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key58 UNIQUE (email);


--
-- Name: users users_email_key59; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key59 UNIQUE (email);


--
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- Name: users users_email_key60; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key60 UNIQUE (email);


--
-- Name: users users_email_key61; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key61 UNIQUE (email);


--
-- Name: users users_email_key62; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key62 UNIQUE (email);


--
-- Name: users users_email_key63; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key63 UNIQUE (email);


--
-- Name: users users_email_key64; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key64 UNIQUE (email);


--
-- Name: users users_email_key65; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key65 UNIQUE (email);


--
-- Name: users users_email_key66; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key66 UNIQUE (email);


--
-- Name: users users_email_key67; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key67 UNIQUE (email);


--
-- Name: users users_email_key68; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key68 UNIQUE (email);


--
-- Name: users users_email_key69; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key69 UNIQUE (email);


--
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- Name: users users_email_key70; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key70 UNIQUE (email);


--
-- Name: users users_email_key71; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key71 UNIQUE (email);


--
-- Name: users users_email_key72; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key72 UNIQUE (email);


--
-- Name: users users_email_key73; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key73 UNIQUE (email);


--
-- Name: users users_email_key74; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key74 UNIQUE (email);


--
-- Name: users users_email_key75; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key75 UNIQUE (email);


--
-- Name: users users_email_key76; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key76 UNIQUE (email);


--
-- Name: users users_email_key77; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key77 UNIQUE (email);


--
-- Name: users users_email_key78; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key78 UNIQUE (email);


--
-- Name: users users_email_key79; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key79 UNIQUE (email);


--
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- Name: users users_email_key80; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key80 UNIQUE (email);


--
-- Name: users users_email_key81; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key81 UNIQUE (email);


--
-- Name: users users_email_key82; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key82 UNIQUE (email);


--
-- Name: users users_email_key83; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key83 UNIQUE (email);


--
-- Name: users users_email_key84; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key84 UNIQUE (email);


--
-- Name: users users_email_key85; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key85 UNIQUE (email);


--
-- Name: users users_email_key86; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key86 UNIQUE (email);


--
-- Name: users users_email_key87; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key87 UNIQUE (email);


--
-- Name: users users_email_key88; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key88 UNIQUE (email);


--
-- Name: users users_email_key89; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key89 UNIQUE (email);


--
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- Name: users users_email_key90; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key90 UNIQUE (email);


--
-- Name: users users_email_key91; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key91 UNIQUE (email);


--
-- Name: users users_email_key92; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key92 UNIQUE (email);


--
-- Name: users users_email_key93; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key93 UNIQUE (email);


--
-- Name: users users_email_key94; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key94 UNIQUE (email);


--
-- Name: users users_email_key95; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key95 UNIQUE (email);


--
-- Name: users users_email_key96; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key96 UNIQUE (email);


--
-- Name: users users_email_key97; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key97 UNIQUE (email);


--
-- Name: users users_email_key98; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key98 UNIQUE (email);


--
-- Name: users users_email_key99; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key99 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: channels channels_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT "channels_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: favorites favorites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: likes likes_liveId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_liveId_fkey" FOREIGN KEY ("liveId") REFERENCES public.lives("liveId");


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: lives lives_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.lives
    ADD CONSTRAINT "lives_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: matches matches_streamName_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT "matches_streamName_fkey" FOREIGN KEY ("streamName") REFERENCES public."ChannelLists"(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: esselleMedia
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

