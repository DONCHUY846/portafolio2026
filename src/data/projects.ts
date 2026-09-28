export type ProjectCategory = 'react-next' | 'design-systems' | 'fullstack-apis';

export type CodeTone = 'emerald' | 'sky' | 'amber' | 'purple' | 'teal' | 'strong' | 'muted';

export interface ProjectMetric {
	value: string;
	label: string;
	/** Al estar defined, la cifra se anima con un contador. */
	count?: {
		to: number;
		prefix?: string;
		suffix?: string;
	};
}

export interface ProjectCodeRow {
	marker?: string;
	label: string;
	detail?: string;
	tone?: CodeTone;
	detailTone?: CodeTone;
	indent?: boolean;
	divider?: boolean;
}

export type ProjectCodePanel =
	| {
			kind: 'rows';
			title: string;
			meta: string;
			rows: ProjectCodeRow[];
	  }
	| {
			kind: 'telemetry';
			title: string;
			meta: string;
			ticker: { key: string; value: string; delta: string };
			sparkline: string;
			footers: string[];
	  };

export interface ProjectLink {
	label: string;
	href: string;
	variant: 'primary' | 'secondary';
}

export interface Project {
	id: string;
	ref: string;
	year: string;
	categoryLabel: string;
	kicker: string;
	title: string;
	description: string;
	categories: ProjectCategory[];
	panel: ProjectCodePanel;
	metrics: ProjectMetric[];
	stack: string[];
	links: ProjectLink[];
}

export interface ProjectFilter {
	id: 'all' | ProjectCategory;
	label: string;
}

export const projectFilters: ProjectFilter[] = [
	{ id: 'all', label: 'TODOS' },
	{ id: 'react-next', label: 'REACT 19 & NEXT.JS' },
	{ id: 'design-systems', label: 'DESIGN SYSTEMS & UI' },
	{ id: 'fullstack-apis', label: 'FULL-STACK & APIS' },
];

/*
 * PROYECTOS DE EJEMPLO.
 * Edita este archivo para sustituir los placeholders por tus proyectos reales:
 * `ref` / `year` (metadatos), `title`, `description`, `metrics`, `stack`, `links`
 * y el bloque `panel` (diagrama técnico). Agrega o quita elementos del array;
 * los filtros y el grid se ajustan solos.
 */
export const projects: Project[] = [
	{
		id: 'nexus-crm',
		ref: 'PRJ-01',
		year: '2025',
		categoryLabel: 'ENTERPRISE SAAS // ARCHITECTURE',
		kicker: 'PROD ENVIRONMENT // CLOUD ENGINE',
		title: 'Nexus CRM & Analytics Platform',
		description:
			'Plataforma analítica en tiempo real para métricas de retención masiva. Reemplazo del motor de renderizado legado reduciendo el TBT (Total Blocking Time) en un 64% mediante concurrent rendering y data-fetching incremental.',
		categories: ['react-next', 'fullstack-apis'],
		panel: {
			kind: 'rows',
			title: 'TERMINAL ARCHITECTURE VIEW',
			meta: 'STATE_FLOW.v19',
			rows: [
				{
					marker: '● [RSC]',
					label: 'Server Component Edge Hydration',
					detail: '0.4ms',
					tone: 'emerald',
				},
				{
					marker: '↳ [ZUSTAND]',
					label: 'Atomic Store Sync & Filter Cache',
					detail: 'O(1)',
					tone: 'sky',
					indent: true,
				},
				{
					marker: '↳ [TANSTACK]',
					label: 'Optimistic Invalidation & Streaming',
					detail: '100k evt/s',
					tone: 'amber',
					indent: true,
				},
			],
		},
		metrics: [
			{ value: '99/100', label: 'Core Web Vitals', count: { to: 99, suffix: '/100' } },
			{ value: '-48%', label: 'Bundle Size', count: { to: 48, prefix: '-', suffix: '%' } },
			{ value: '100k+', label: 'Eventos / Seg', count: { to: 100, suffix: 'k+' } },
		],
		stack: [
			'React 19',
			'Next.js (App Router)',
			'Zustand',
			'TanStack Query',
			'Tailwind CSS',
			'TypeScript',
		],
		links: [
			{ label: 'VER DEMO EN VIVO', href: '#', variant: 'primary' },
			{ label: 'REPOSITORIO GITHUB', href: '#', variant: 'secondary' },
		],
	},
	{
		id: 'atlas-design-system',
		ref: 'PRJ-02',
		year: '2024-2025',
		categoryLabel: 'INTERNAL TOOLS // UI LIBRARY',
		kicker: 'ENTERPRISE DESIGN ENGINE',
		title: 'Atlas Design System',
		description:
			'Sistema de diseño multi-marca basado en tokens semánticos accesibles (WCAG AAA), con más de 45 componentes atómicos desacoplados, control de variantes vía CVA y compatibilidad total con React Server Components.',
		categories: ['design-systems', 'react-next'],
		panel: {
			kind: 'rows',
			title: 'TOKEN SPEC // PARSER ENGINE',
			meta: 'ATLAS_CORE.d.ts',
			rows: [
				{
					label: 'export type DesignToken',
					detail: 'WCAG AAA Validated',
					tone: 'purple',
					detailTone: 'muted',
				},
				{ label: '├─ variant: "solid" | "subtle" | "brutalist"', tone: 'muted', indent: true },
				{ label: '├─ density: "compact" | "default" | "editorial"', tone: 'muted', indent: true },
				{
					label: '✔ Zero-Runtime CSS (Tailwind Engine)',
					detail: '100% Tree-shakable',
					tone: 'emerald',
					detailTone: 'strong',
					divider: true,
				},
			],
		},
		metrics: [
			{ value: '45+', label: 'Componentes', count: { to: 45, suffix: '+' } },
			{ value: '100%', label: 'Tipado Estricto', count: { to: 100, suffix: '%' } },
			{ value: '0 Dep', label: 'Pesadas / Bloq' },
		],
		stack: ['React 19', 'TypeScript', 'Storybook', 'Radix UI', 'CVA', 'Tailwind CSS'],
		links: [
			{ label: 'DOCS & SPECS', href: '#', variant: 'primary' },
			{ label: 'NPM PACKAGE', href: '#', variant: 'secondary' },
		],
	},
	{
		id: 'pulse-finance',
		ref: 'PRJ-03',
		year: '2024',
		categoryLabel: 'FINTECH WEB APP',
		kicker: 'HIGH-FREQUENCY TRADING UI',
		title: 'Pulse Finance Dashboard',
		description:
			'Interfaz determinista para operaciones bursátiles y visualización de velas financieras con actualizaciones WebSocket bidireccionales, streaming binario y virtualización de órdenes profundas sin degradación del thread principal.',
		categories: ['react-next', 'fullstack-apis'],
		panel: {
			kind: 'telemetry',
			title: 'WEBSOCKET TELEMETRY STREAM',
			meta: 'WS://FEED.PULSE:8080',
			ticker: { key: 'TICK: BTC/USDT', value: '$98,420.50', delta: '+3.84%' },
			sparkline:
				'M0,28 L30,22 L60,26 L90,14 L120,19 L150,11 L180,16 L210,8 L240,12 L270,4 L300,6',
			footers: ['SOCKET SYNC: 12ms', 'BUFFER DRAIN: 0 dropped', 'GC PAUSE: 0.1ms'],
		},
		metrics: [
			{ value: '< 16ms', label: 'Frame (60 FPS)', count: { to: 16, prefix: '< ', suffix: 'ms' } },
			{ value: '10k+', label: 'Filas Virtualiz.', count: { to: 10, suffix: 'k+' } },
			{ value: '0 Mem', label: 'Leaks Auditados' },
		],
		stack: ['React', 'Next.js', 'WebSockets', 'Canvas API', 'Recharts', 'Zustand'],
		links: [
			{ label: 'CASO TÉCNICO', href: '#', variant: 'primary' },
			{ label: 'VER DEMO', href: '#', variant: 'secondary' },
		],
	},
	{
		id: 'devflow',
		ref: 'PRJ-04',
		year: '2024',
		categoryLabel: 'DEVELOPER WORKFLOW',
		kicker: 'OFFLINE-FIRST PRODUCTIVITY',
		title: 'DevFlow Kanban & CI Automation',
		description:
			'Herramienta de gestión de tareas técnicas y flujos CI/CD con optimistic UI updates, drag-and-drop nativo vía HTML5 Pointer API sin dependencias de terceros y persistencia robusta offline con IndexedDB sync.',
		categories: ['react-next', 'design-systems'],
		panel: {
			kind: 'rows',
			title: 'OFFLINE PIPELINE SCHEMA',
			meta: 'INDEXED_DB.v2',
			rows: [
				{
					label: '[MUTATION_DISPATCH]',
					detail: '0ms latency (local UI)',
					tone: 'teal',
					detailTone: 'emerald',
				},
				{
					label: '↳ writeTransaction("tasks_store", "readwrite")',
					tone: 'muted',
					indent: true,
				},
				{
					label: '↳ backgroundSync()',
					detail: '→ Service Worker push on reconnection',
					tone: 'amber',
					detailTone: 'muted',
					indent: true,
				},
				{
					label: 'CONFLICT RESOLUTION: CRDT',
					detail: 'SYNC_OK',
					tone: 'muted',
					detailTone: 'strong',
					divider: true,
				},
			],
		},
		metrics: [
			{ value: '0ms', label: 'Latencia UI', count: { to: 0, suffix: 'ms' } },
			{ value: '100%', label: 'Offline First', count: { to: 100, suffix: '%' } },
			{ value: 'PWA', label: 'Instalable Standalone' },
		],
		stack: ['React 19', 'TypeScript', 'IndexedDB', 'Tailwind', 'Service Workers'],
		links: [
			{ label: 'ACCEDER AL SISTEMA', href: '#', variant: 'primary' },
			{ label: 'REPO GITHUB', href: '#', variant: 'secondary' },
		],
	},
];
