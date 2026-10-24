/**
 * Identidad única del sitio.
 *
 * Todo lo que Google debe asociar con Jesús Aviña Alcalá (nombre, variantes sin
 * acentos, perfiles, email y ubicación) vive aquí. Evita duplicar datos en el
 * layout, el footer, el header, contacto, robots y sitemap.
 */
const profiles = {
	github: 'https://github.com/donchuy846',
	linkedin: 'https://www.linkedin.com/in/jesus-avi%C3%B1a-alcala',
} as const;

export const site = {
	url: 'https://jesus-avina.dev/',
	locale: 'es-MX',
	name: 'Jesús Aviña Alcalá',
	firstName: 'Jesús',
	lastName: 'Aviña Alcalá',
	/** Variantes que la gente escribe sin acentos. */
	alternateNames: ['Jesus Avina Alcala', 'Jesus Avina', 'Jesús Aviña'],
	role: 'Frontend Architect',
	title: 'Jesús Aviña Alcalá | Desarrollador de Software',
	description:
		'Sitio oficial de Jesús Aviña Alcalá (Jesus Avina), Frontend Architect en México. Especialista en React 19, Next.js, design systems y rendimiento web.',
	ogImage: '/og-image.jpg',
	ogImageAlt: 'Jesús Aviña Alcalá — Frontend Architect',
	email: 'alcalajesus846@gmail.com',
	location: {
		country: 'MX',
		label: 'México',
	},
	profiles,
	sameAs: [profiles.github, profiles.linkedin],
	/**
	 * Pega aquí el token de Google Search Console si verificas con la metaetiqueta.
	 * Si verificas con el archivo HTML, puedes dejarlo vacío.
	 */
	googleSiteVerification: '',
} as const;
