import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrambleTextPlugin);

/**
 * Intro estilo hero + tilt 3D (giroscopio/touch/mouse) + fondo shader.
 * Todo vive dentro de `prefers-reduced-motion: no-preference`; el contenido
 * sin JS o con motion reducido queda visible en su estado final.
 */
export function initLinksMotion(root: HTMLElement): () => void {
	const profile = root.querySelector<HTMLElement>('[data-links-profile]');
	const nameEl = root.querySelector<HTMLElement>('[data-links-name]');
	const roleEl = root.querySelector<HTMLElement>('[data-links-role]');
	const bioEl = root.querySelector<HTMLElement>('[data-links-bio]');
	const footnote = root.querySelector<HTMLElement>('[data-links-footnote]');
	const frame = root.querySelector<HTMLElement>('.links__frame');
	const canvas = root.querySelector<HTMLCanvasElement>('[data-links-canvas]');
	const motionCta = root.querySelector<HTMLButtonElement>('[data-links-motion-cta]');
	const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-links-card]'));

	const mm = gsap.matchMedia();
	let shaderDispose: (() => void) | null = null;

	mm.add('(prefers-reduced-motion: no-preference)', () => {
		/* ---------- Intro ---------- */
		const splits: SplitText[] = [];
		const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });

		if (profile) {
			tl.fromTo(
				profile,
				{ clipPath: 'inset(0 0 100% 0)', scale: 0.92, rotate: -2 },
				{ clipPath: 'inset(0 0 0% 0)', scale: 1, rotate: 0, duration: 1.1 },
				0,
			);
		}

		if (nameEl) {
			const nameSplit = new SplitText(nameEl, { type: 'chars', charsClass: 'split-char' });
			splits.push(nameSplit);
			tl.from(nameSplit.chars, { yPercent: 150, duration: 0.9, stagger: 0.03 }, 0.15);
		}

		if (roleEl) {
			const roleText = roleEl.textContent ?? '';
			tl.from(roleEl, { y: 8, opacity: 0, duration: 0.5, ease: 'power3.out' }, 0.5);
			tl.to(
				roleEl,
				{
					scrambleText: { text: roleText, chars: 'upperCase', speed: 0.35, revealDelay: 0.15 },
					duration: 1.2,
					ease: 'none',
					onStart: () => {
						roleEl.textContent = '';
					},
				},
				0.55,
			);
		}

		if (bioEl) {
			const bioSplit = new SplitText(bioEl, { type: 'words', wordsClass: 'split-word' });
			splits.push(bioSplit);
			tl.from(
				bioSplit.words,
				{ y: 16, opacity: 0, duration: 0.6, stagger: 0.015, ease: 'power3.out' },
				0.7,
			);
		}

		if (cards.length) {
			tl.fromTo(
				cards,
				{ y: 24, opacity: 0, rotate: -1.5 },
				{
					y: 0,
					opacity: 1,
					rotate: 0,
					duration: 0.7,
					stagger: 0.08,
					ease: 'expo.out',
					// Devolver el transform al CSS para que hover/active de la marca funcionen.
					onComplete: () => gsap.set(cards, { clearProps: 'transform' }),
				},
				0.85,
			);
		}

		if (footnote) {
			tl.from(footnote, { y: 10, opacity: 0, duration: 0.5, ease: 'power3.out' }, 1.15);
		}

		let started = false;
		const play = () => {
			if (started) return;
			started = true;
			tl.play();
		};
		const fallback = window.setTimeout(play, 1200);

		if (document.fonts?.ready) document.fonts.ready.then(play).catch(play);

		/* ---------- Tilt 3D ---------- */
		// El tilt va sobre el <li> para no pisar el transform de hover/active del <a>.
		const tiltTargets = [profile, ...cards.map((card) => card.closest('li') ?? card)].filter(
			(el): el is HTMLElement => el instanceof HTMLElement,
		);

		const tilters = tiltTargets.map((el) => {
			gsap.set(el, { transformPerspective: 900 });
			return {
				rotX: gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' }),
				rotY: gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' }),
			};
		});

		const clamp = (value: number) => Math.min(Math.max(value, -1), 1);

		const applyTilt = (nx: number, ny: number) => {
			const x = clamp(nx);
			const y = clamp(ny);
			for (const tilter of tilters) {
				tilter.rotY(x * 8);
				tilter.rotX(-y * 8);
			}
		};

		const resetTilt = () => applyTilt(0, 0);

		const normFromPoint = (clientX: number, clientY: number) => {
			const rect = (frame ?? root).getBoundingClientRect();
			return {
				nx: ((clientX - rect.left) / rect.width - 0.5) * 2,
				ny: ((clientY - rect.top) / rect.height - 0.5) * 2,
			};
		};

		const cleanupFns: Array<() => void> = [];
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

		/* ---------- Mouse (escritorio) ---------- */
		if (finePointer) {
			const onPointerMove = (event: PointerEvent) => {
				const { nx, ny } = normFromPoint(event.clientX, event.clientY);
				applyTilt(nx, ny);
			};
			const onPointerLeave = () => resetTilt();

			root.addEventListener('pointermove', onPointerMove);
			root.addEventListener('pointerleave', onPointerLeave);
			cleanupFns.push(() => {
				root.removeEventListener('pointermove', onPointerMove);
				root.removeEventListener('pointerleave', onPointerLeave);
			});
		}

		/* ---------- Giroscopio (iOS pide permiso) ---------- */
		let orientationHandler: ((event: DeviceOrientationEvent) => void) | null = null;

		const startGyro = () => {
			if (orientationHandler) return;
			orientationHandler = (event: DeviceOrientationEvent) => {
				if (event.gamma == null || event.beta == null) return;
				const gamma = Math.min(Math.max(event.gamma, -30), 30);
				const beta = Math.min(Math.max(event.beta - 45, -30), 30);
				applyTilt(gamma / 30, beta / 30);
			};
			window.addEventListener('deviceorientation', orientationHandler);
		};

		const stopGyro = () => {
			if (!orientationHandler) return;
			window.removeEventListener('deviceorientation', orientationHandler);
			orientationHandler = null;
		};

		type DeviceOrientationStatic = typeof DeviceOrientationEvent & {
			requestPermission?: () => Promise<'granted' | 'denied' | PermissionState>;
		};

		const orientationCtor = window.DeviceOrientationEvent as DeviceOrientationStatic | undefined;

		if (coarsePointer && orientationCtor) {
			if (typeof orientationCtor.requestPermission === 'function' && motionCta) {
				motionCta.hidden = false;
				const onCtaClick = () => {
					orientationCtor
						.requestPermission?.()
						.then((state) => {
							if (state === 'granted') startGyro();
							else stopGyro();
						})
						.catch(() => stopGyro())
						.finally(() => {
							motionCta.hidden = true;
						});
				};
				motionCta.addEventListener('click', onCtaClick);
				cleanupFns.push(() => {
					motionCta.removeEventListener('click', onCtaClick);
					motionCta.hidden = true;
				});
			} else {
				startGyro();
			}
		}

		/* ---------- Touch fallback ---------- */
		if (coarsePointer) {
			const onTouchMove = (event: TouchEvent) => {
				const touch = event.touches[0];
				if (!touch) return;
				const { nx, ny } = normFromPoint(touch.clientX, touch.clientY);
				applyTilt(nx, ny);
			};
			const onTouchEnd = () => resetTilt();

			root.addEventListener('touchmove', onTouchMove, { passive: true });
			root.addEventListener('touchend', onTouchEnd);
			root.addEventListener('touchcancel', onTouchEnd);
			cleanupFns.push(() => {
				root.removeEventListener('touchmove', onTouchMove);
				root.removeEventListener('touchend', onTouchEnd);
				root.removeEventListener('touchcancel', onTouchEnd);
			});
		}

		/* ---------- Fondo shader ---------- */
		let disposed = false;
		if (canvas) {
			const loadShader = () => {
				if (disposed) return;
				import('../scripts/hero-grid')
					.then((module) => {
						if (disposed) return;
						shaderDispose = module.initHeroGrid(canvas);
					})
					.catch(() => {});
			};

			if (typeof window.requestIdleCallback === 'function') {
				window.requestIdleCallback(loadShader, { timeout: 2000 });
			} else {
				window.addEventListener('load', loadShader, { once: true });
			}
		}

		return () => {
			disposed = true;
			started = true;
			window.clearTimeout(fallback);
			tl.kill();
			splits.forEach((split) => split.revert());
			stopGyro();
			cleanupFns.forEach((remove) => remove());
			tiltTargets.forEach((el) => gsap.set(el, { clearProps: 'transform,perspective' }));
			if (shaderDispose) {
				shaderDispose();
				shaderDispose = null;
			}
		};
	});

	return () => {
		mm.revert();
		if (shaderDispose) {
			shaderDispose();
			shaderDispose = null;
		}
	};
}
