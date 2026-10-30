import { site } from './site';

export interface LinksEntry {
	id: 'portafolio' | 'github' | 'linkedin' | 'instagram';
	label: string;
	href: string;
	hint: string;
	icon: 'github' | 'linkedin' | 'instagram' | 'arrow';
	variant: 'primary' | 'default';
}

export const linksPage = {
	title: 'Jesús Aviña Alcalá | Links',
	description:
		'Todos los links de Jesús Aviña Alcalá: portafolio, GitHub, LinkedIn e Instagram. Frontend Architect desde México.',
	fullName: 'Jesús Aviña Alcalá',
	displayName: 'JESÚS AVIÑA',
	role: 'FRONTEND ARCHITECT',
	bio: 'Construyo design systems, librerías de componentes e interfaces rápidas que se mantienen sanas al escalar. México / LATAM.',
	avatarAlt: 'Retrato de Jesús Aviña Alcalá',
	links: [
		{
			id: 'portafolio',
			label: 'PORTAFOLIO',
			href: site.url,
			hint: 'jesus-avina.dev',
			icon: 'arrow',
			variant: 'primary',
		},
		{
			id: 'github',
			label: 'GITHUB',
			href: site.profiles.github,
			hint: 'github.com/donchuy846',
			icon: 'github',
			variant: 'default',
		},
		{
			id: 'linkedin',
			label: 'LINKEDIN',
			href: site.profiles.linkedin,
			hint: 'in/jesus-aviña-alcalá',
			icon: 'linkedin',
			variant: 'default',
		},
		{
			id: 'instagram',
			label: 'INSTAGRAM',
			href: 'https://instagram.com/alcalajesus846',
			hint: '@alcalajesus846',
			icon: 'instagram',
			variant: 'default',
		},
	],
	footnote: '© 2026 — JESÚS AVIÑA ALCALÁ · MÉXICO',
	motionCta: 'ACTIVAR MOVIMIENTO',
} as const;
