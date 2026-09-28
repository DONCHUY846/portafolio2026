export type AboutVariant = 'light' | 'dark';

export interface AboutMeta {
	/** Ej.: `DOSSIER TÉCNICO` */
	tag: string;
	/** Ej.: `ID: JA-8804` — se muestra tras `//`. */
	ref: string;
	/** Texto del badge superior derecho. */
	badge: string;
}

export interface AboutFact {
	label: string;
	value: string;
	/** Los facts con `accent` usan el color de acento en vez del color de texto. */
	accent?: boolean;
}

export interface AboutProfile {
	cardTitle: string;
	/** Estado del sistema en la esquina de la card, ej. `SYS: ACTIVE`. */
	status: string;
	lead: {
		before: string;
		highlight: string;
		after: string;
	};
	body: string;
	facts: AboutFact[];
}

export interface AboutPillar {
	num: string;
	title: string;
	/** Etiqueta monoespaciada de la derecha, ej. `ROBUST // DRY`. */
	metric: string;
	description: string;
}

export interface AboutStackItem {
	label: string;
}

export interface AboutSpec {
	icon: 'map-pin' | 'code-xml' | 'graduation-cap' | 'gauge';
	label: string;
	value: string;
	/** Las specs con `accent` resaltan el icono en color de acento. */
	accent?: boolean;
}

export interface AboutCard {
	/** Título de la barra tipo terminal, ej. `ENGINEER_SPEC.JSON`. */
	windowTitle: string;
	avatarAlt: string;
	avatarCaption: string;
	specs: AboutSpec[];
	telemetry: {
		label: string;
		value: string;
	};
	/** Path SVG del sparkline de telemetría. */
	sparkline: string;
}

export interface AboutAction {
	label: string;
	href: string;
	variant: 'primary' | 'secondary';
	icon?: 'download';
}

export interface AboutSection {
	meta: AboutMeta;
	sectionNumber: string;
	sectionTitle: string;
	profile: AboutProfile;
	pillarsTitle: string;
	pillars: AboutPillar[];
	stackTitle: string;
	stackNote: string;
	stack: AboutStackItem[];
	card: AboutCard;
	actions: AboutAction[];
	note: string;
}

/*
 * DATOS DE EJEMPLO — transcritos del diseño de Stitch.
 * Edita este archivo para sustituir los placeholders por tu información real:
 * `meta` (etiquetas del dossier), `profile.lead` / `profile.body` (biografía),
 * `profile.facts` (disciplina, stack base, disponibilidad), `pillars` (los tres
 * bloques, agregar o quitar elementos del array), `stack` (chips de tecnología),
 * `card.specs` (ubicación, especialidad, formación, enfoque) y `actions`
 * (enlaces; `href` externo se abre en pestaña nueva automáticamente).
 */
export const about: AboutSection = {
	meta: {
		tag: 'DOSSIER TÉCNICO',
		ref: 'ID: JA-8804',
		badge: 'PERFIL & FILOSOFÍA DE DESARROLLO',
	},

	sectionNumber: '03',
	sectionTitle: 'Sobre Mí',

	profile: {
		cardTitle: 'Trayectoria & Visión Profesional',
		status: 'SYS: ACTIVE',
		lead: {
			before: 'Soy ',
			highlight: 'Jesús Aviña Alcalá',
			after:
				', Ingeniero en Desarrollo y Gestión de Software especializado en el ecosistema React. Transformo requisitos de negocio de alta complejidad en arquitecturas web limpias, deterministas y de rendimiento sobresaliente.',
		},
		body: 'Mi enfoque radica en la intersección exacta entre una ingeniería de componentes rigurosa y un diseño de interfaz altamente táctil. Priorizo la estabilidad del estado en frontend, la eficiencia de renderizado (Core Web Vitals) y la mantenibilidad modular, implementando sistemas donde el código es tan estructurado y legible como la propia interfaz final.',
		facts: [
			{ label: 'Disciplina', value: 'Software Eng.' },
			{ label: 'Stack Base', value: 'React & Next.js' },
			{ label: 'Disponibilidad', value: 'Inmediata / Remoto', accent: true },
		],
	},

	pillarsTitle: '/// Tres Pilares de Ejecución',
	pillars: [
		{
			num: '01',
			title: 'Código Limpio & Arquitectura',
			metric: 'ROBUST // DRY',
			description:
				'TypeScript estricto, composición de componentes desacoplados, control exhaustivo de efectos secundarios y patrones de diseño testeables que garantizan una base de código escalable sin deuda técnica oculta.',
		},
		{
			num: '02',
			title: 'Diseño Centrado en el Usuario',
			metric: 'UI/UX // A11Y',
			description:
				'Fidelidad milimétrica frente al diseño, accesibilidad WCAG por defecto, microinteracciones háticas e intuitivas y respeto absoluto por la latencia y la fluidez percibida por el usuario final.',
		},
		{
			num: '03',
			title: 'Trabajo Colaborativo & Comunicación',
			metric: 'AGILE // SYNERGY',
			description:
				'Integración fluida en flujos ágiles, revisiones de código constructivas, documentación exhaustiva y sinergia directa entre los equipos de producto, diseño y desarrollo de backend.',
		},
	],

	stackTitle: 'Stack de Especialización Inmediata',
	stackNote: 'LATEST VER.',
	stack: [
		{ label: 'React 19' },
		{ label: 'Next.js (App Router)' },
		{ label: 'Tailwind CSS' },
		{ label: 'TypeScript 5.x' },
		{ label: 'State Management (Zustand / Redux)' },
		{ label: 'Performance Optimization' },
		{ label: 'REST & GraphQL' },
		{ label: 'Git & CI/CD' },
	],

	card: {
		windowTitle: 'ENGINEER_SPEC.JSON',
		avatarAlt: 'Retrato 3D de Jesús Aviña Alcalá sentado frente al portátil',
		avatarCaption: 'Jesús Aviña // Dev',
		specs: [
			{
				icon: 'map-pin',
				label: 'Ubicación',
				value: 'México / LATAM (Remoto & Híbrido)',
				accent: true,
			},
			{
				icon: 'code-xml',
				label: 'Especialidad Principal',
				value: 'Frontend Architecture / React 19',
			},
			{
				icon: 'graduation-cap',
				label: 'Formación & Experiencia',
				value: 'Ingeniería en Desarrollo y Gestión de SW',
			},
			{
				icon: 'gauge',
				label: 'Enfoque de Producción',
				value: 'Scalable Web Apps & Performance',
				accent: true,
			},
		],
		telemetry: {
			label: 'ESTADO DE SISTEMA:',
			value: 'COMPILADO SIN ERRORES',
		},
		sparkline: 'M0 20 L25 15 L50 22 L75 8 L100 12 L125 4 L150 16 L175 10 L200 5',
	},

	actions: [
		{
			label: 'Descargar CV / Resume',
			href: '/jesus-avina-cv.pdf',
			variant: 'primary',
			icon: 'download',
		},
		{
			label: 'Ver Proyectos Seleccionados',
			href: '#proyectos',
			variant: 'secondary',
		},
	],

	note: 'El software de excelencia no solo funciona correctamente en producción; también resulta evidente, ordenado y predecible para el equipo que continuará construyendo sobre él.',
};
