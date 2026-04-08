// eslint-disable-next-line @typescript-eslint/no-explicit-any
let gsapPromise: Promise<any> | null = null;

export function loadGsap() {
    if (!gsapPromise) {
        gsapPromise = (async () => {
            const gsap = (await import('gsap')).default;
            const ScrollTrigger = (await import('gsap/dist/ScrollTrigger')).default;
            const SplitText = (await import('gsap/dist/SplitText')).default;
            gsap.registerPlugin(ScrollTrigger, SplitText);
            return { gsap, ScrollTrigger, SplitText };
        })();
    }
    return gsapPromise!;
}
