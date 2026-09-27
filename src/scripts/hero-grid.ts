import {
	Mesh,
	OrthographicCamera,
	PlaneGeometry,
	Scene,
	ShaderMaterial,
	Vector2,
	WebGLRenderer,
} from 'three';

const vertexShader = /* glsl */ `
	varying vec2 vUv;

	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

const fragmentShader = /* glsl */ `
	precision highp float;

	varying vec2 vUv;

	uniform vec2 uResolution;
	uniform vec2 uMouse;
	uniform float uTime;
	uniform float uCell;

	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
	}

	void main() {
		vec2 frag = vUv * uResolution;
		vec2 cellId = floor(frag / uCell);
		vec2 node = (cellId + 0.5) * uCell;

		node += vec2(
			sin(uTime * 0.6 + cellId.x * 0.7 + cellId.y * 0.3),
			cos(uTime * 0.5 + cellId.y * 0.9 + cellId.x * 0.4)
		) * 1.6;

		vec2 delta = node - uMouse;
		float dist = length(delta);
		float radius = 150.0;

		if (dist < radius && dist > 0.001) {
			float force = 1.0 - dist / radius;
			node += (delta / dist) * force * force * 24.0;
		}

		float d = length(frag - node);
		float dotRadius = 1.7;
		float alpha = 1.0 - smoothstep(dotRadius, dotRadius + 0.7, d);

		float h = hash(cellId);
		vec3 color = vec3(0.067, 0.067, 0.067);
		if (h > 0.977) color = vec3(0.063, 0.725, 0.505);

		gl_FragColor = vec4(color, alpha * 0.16);
	}
`;

export function initHeroGrid(canvas: HTMLCanvasElement): () => void {
	const host = canvas.parentElement;
	if (!host) return () => {};

	let renderer: WebGLRenderer;
	try {
		renderer = new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: false,
			powerPreference: 'low-power',
		});
	} catch {
		return () => {};
	}

	renderer.setClearColor(0x000000, 0);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

	const scene = new Scene();
	const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 10);
	camera.position.z = 1;

	const geometry = new PlaneGeometry(2, 2);
	const material = new ShaderMaterial({
		vertexShader,
		fragmentShader,
		transparent: true,
		depthTest: false,
		uniforms: {
			uResolution: { value: new Vector2(1, 1) },
			uMouse: { value: new Vector2(-9999, -9999) },
			uTime: { value: 0 },
			uCell: { value: 36 },
		},
	});

	scene.add(new Mesh(geometry, material));

	const resize = () => {
		const rect = host.getBoundingClientRect();
		const width = Math.max(1, rect.width);
		const height = Math.max(1, rect.height);
		renderer.setSize(width, height, false);
		material.uniforms.uResolution.value.set(width, height);
		material.uniforms.uCell.value = width < 768 ? 30 : 36;
	};

	const target = new Vector2(-9999, -9999);

	const onPointerMove = (event: PointerEvent) => {
		const rect = host.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = rect.bottom - event.clientY;
		const margin = 160;

		if (x < -margin || y < -margin || x > rect.width + margin || y > rect.height + margin) {
			target.set(-9999, -9999);
			return;
		}

		target.set(x, y);
	};

	const onPointerLeave = () => {
		target.set(-9999, -9999);
	};

	const tick = (time: number) => {
		material.uniforms.uTime.value = time * 0.001;
		const mouse = material.uniforms.uMouse.value;
		if (Math.abs(mouse.x) > 5000 || Math.abs(target.x) > 5000) {
			mouse.copy(target);
		} else {
			mouse.lerp(target, 0.1);
		}
		renderer.render(scene, camera);
	};

	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(host);

	const visibility = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				renderer.setAnimationLoop(entry.isIntersecting ? tick : null);
			}
		},
		{ threshold: 0 },
	);
	visibility.observe(canvas);

	window.addEventListener('pointermove', onPointerMove, { passive: true });
	document.addEventListener('pointerleave', onPointerLeave);

	resize();
	renderer.setAnimationLoop(tick);

	return () => {
		renderer.setAnimationLoop(null);
		resizeObserver.disconnect();
		visibility.disconnect();
		window.removeEventListener('pointermove', onPointerMove);
		document.removeEventListener('pointerleave', onPointerLeave);
		geometry.dispose();
		material.dispose();
		renderer.dispose();
	};
}
