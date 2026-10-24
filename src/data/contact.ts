import { site } from './site';

export type ContactFieldKind = 'text' | 'email' | 'select' | 'textarea';

export type ContactChannelIcon = 'at-sign' | 'users' | 'code';

export interface ContactOption {
	value: string;
	label: string;
}

export interface ContactField {
	id: string;
	/** Ej.: `01` — se muestra como prefijo del label. */
	index: string;
	label: string;
	/** Pista de tipo en el borde derecho del label, ej. `[TEXT]`. */
	hint: string;
	kind: ContactFieldKind;
	required: boolean;
	placeholder?: string;
	options?: ContactOption[];
	autocomplete?: string;
	rows?: number;
}

export interface ContactForm {
	windowTitle: string;
	fields: ContactField[];
	submitLabel: string;
	/** Banner de confirmación del despacho simulado. */
	success: string;
	latencyNote: string;
	privacyNote: string;
}

export interface ContactChannelAction {
	label: string;
	/** Texto a copiar al portapapeles. Solo en el canal de correo. */
	copy?: string;
}

export interface ContactChannel {
	icon: ContactChannelIcon;
	label: string;
	value: string;
	href: string;
	external?: boolean;
	action: ContactChannelAction;
}

export interface ContactStatusCard {
	windowTitle: string;
	badge: string;
	avatarAlt: string;
	avatarTitle: string;
	avatarCaption: string;
	paragraph: string;
}

export interface ContactTimezone {
	label: string;
	value: string;
}

export interface ContactBand {
	label: string;
	cta: string;
	href: string;
}

export interface ContactSection {
	ref: string;
	availability: string;
	sectionNumber: string;
	sectionTitle: string;
	lead: string;
	latency: string;
	form: ContactForm;
	statusCard: ContactStatusCard;
	channels: ContactChannel[];
	timezone: ContactTimezone;
	band: ContactBand;
}

/*
 * DATOS DE EJEMPLO — transcritos del diseño de Stitch.
 * Edita este archivo para sustituir los placeholders por tu información real:
 * `ref` / `availability` (etiquetas del dossier), `lead`, `latency`, `form.fields`
 * (agrega, quita o reordena campos; `kind` decide el control y `options` sus
 * valores en los `select`), `statusCard` (texto del avatar y párrafo),
 * `channels` (correo, LinkedIn, GitHub; en el canal de correo `action.copy`
 * define qué se copia al portapapeles) y `band` (aviso + enlace de la agenda).
 */
export const contact: ContactSection = {
	ref: 'CONTACT_STATION_v1.0',
	availability: 'Disponible para nuevos retos // Remoto & Híbrido',

	sectionNumber: '04',
	sectionTitle: 'Contacto',
	lead: 'Conectemos para proyectos de frontend architecture, contratos estratégicos o posiciones Senior React / Next.js.',
	latency: 'Latencia de Respuesta: < 24H',

	form: {
		windowTitle: 'FORM_DISPATCH // SMTP_MAIL',
		fields: [
			{
				id: 'name',
				index: '01',
				label: 'Nombre / Empresa',
				hint: '[TEXT]',
				kind: 'text',
				required: true,
				placeholder: 'Jesús Aviña Alcalá // Acme Corp',
				autocomplete: 'name',
			},
			{
				id: 'email',
				index: '02',
				label: 'Correo Electrónico',
				hint: '[EMAIL_ADDR]',
				kind: 'email',
				required: true,
				placeholder: 'jesus@empresa.com',
				autocomplete: 'email',
			},
			{
				id: 'subject',
				index: '03',
				label: 'Asunto / Motivo',
				hint: '[SELECT]',
				kind: 'select',
				required: false,
				options: [
					{ value: 'vacancy', label: 'Nueva Vacante / Rol Senior Frontend' },
					{ value: 'project', label: 'Proyecto / Arquitectura Web Especializada' },
					{ value: 'consultancy', label: 'Auditoría / Consulta Técnica' },
					{ value: 'other', label: 'Otro tipo de colaboración' },
				],
			},
			{
				id: 'message',
				index: '04',
				label: 'Mensaje Técnico',
				hint: '[MARKDOWN_RAW]',
				kind: 'textarea',
				required: true,
				placeholder: 'Cuéntame sobre el proyecto, stack actual, alcance esperado y plazos.',
				rows: 5,
			},
		],
		submitLabel: 'Enviar Mensaje Directo',
		success: 'Despacho simulado con éxito: mensaje recibido en cola de prioridad.',
		latencyNote: 'Respuesta estimada: < 24h hábiles.',
		privacyNote: 'Encriptación SSL // No-Spam',
	},

	statusCard: {
		windowTitle: 'Status // Energía Alta',
		badge: 'Activo',
		avatarAlt: 'Jesús Aviña Alcalá saltando con entusiasmo',
		avatarTitle: '¡Hagamos que suceda!',
		avatarCaption: 'Listo para integrarme a tu equipo',
		paragraph:
			'Frontend Architect enfocado en rendimiento extremo, Design Systems modulares y aplicaciones complejas en React 19 / Next.js.',
	},

	channels: [
		{
			icon: 'at-sign',
			label: 'Correo Directo',
			value: site.email,
			href: `mailto:${site.email}`,
			action: { label: 'Copiar', copy: site.email },
		},
		{
			icon: 'users',
			label: 'Red Profesional',
			value: 'linkedin.com/in/jesus-aviña-alcala',
			href: site.profiles.linkedin,
			external: true,
			action: { label: 'Conectar' },
		},
		{
			icon: 'code',
			label: 'Repositorios Públicos',
			value: 'github.com/donchuy846',
			href: site.profiles.github,
			external: true,
			action: { label: 'Ver Código' },
		},
	],

	timezone: {
		label: 'Zona & Disponibilidad',
		value: 'México / LATAM (GMT-6) — Solapamiento completo con horarios US & EU.',
	},

	band: {
		label: 'Auditorías de rendimiento disponibles // Benchmarks y design systems tokenizados',
		cta: 'Agendar llamada técnica (Cal.com)',
		href: `mailto:${site.email}?subject=Reunión%20Técnica`,
	},
};
