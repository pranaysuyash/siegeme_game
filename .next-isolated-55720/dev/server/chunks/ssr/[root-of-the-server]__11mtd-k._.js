module.exports = [
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[project]/src/components/GameCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-ssr] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-ssr] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$rapier$2f$dist$2f$react$2d$three$2d$rapier$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/rapier/dist/react-three-rapier.esm.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$AdaptiveDpr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/AdaptiveDpr.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$AdaptiveEvents$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/AdaptiveEvents.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/ContactShadows.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Environment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Instances$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Instances.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Lightformer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2f$generator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/world/generator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$simulation$2f$ballistics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/simulation/ballistics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$camera$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/camera.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/targets.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/timing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$debris$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/debris.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$graphics$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/graphics-policy.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const palette = {
    sky: "#07121f",
    stone: "#4d5a68",
    stoneLight: "#718090",
    stoneDark: "#293541",
    stoneCrack: "#17232c",
    wood: "#8f4d2a",
    metal: "#b6a16f",
    core: "#62e7d5",
    accent: "#ef9b55",
    terrain: "#203b42"
};
function CameraRig({ motionReduced }) {
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const phase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot?.phase ?? "ACTIVE");
    const pendingPhase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.pendingSnapshot?.phase);
    const projectileKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.projectile?.commandKey ?? null);
    const [viewportWidth, setViewportWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1280);
    const transitionStartedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const startPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
    const startQuaternion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]());
    const targetPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
    const targetQuaternion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Quaternion"]());
    const targetLookAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
    const transitionDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(420);
    const previousProjectileKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const perspectiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(camera);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const update = ()=>setViewportWidth(window.innerWidth);
        update();
        window.addEventListener("resize", update);
        return ()=>window.removeEventListener("resize", update);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const presentationMode = mode === "empty" ? "spectator" : mode;
        const preset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$camera$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cameraPresetFor"])({
            mode: presentationMode,
            phase,
            pendingPhase,
            viewportWidth
        });
        startPosition.current.copy(camera.position);
        startQuaternion.current.copy(camera.quaternion);
        targetPosition.current.fromArray(preset.position);
        targetLookAt.current.fromArray(preset.target);
        const orientation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"]();
        orientation.position.copy(targetPosition.current);
        orientation.lookAt(targetLookAt.current);
        targetQuaternion.current.copy(orientation.quaternion);
        transitionDuration.current = motionReduced ? 0 : preset.transitionMs;
        transitionStartedAt.current = performance.now();
        previousProjectileKey.current = projectileKey;
    }, [
        camera,
        mode,
        motionReduced,
        pendingPhase,
        phase,
        projectileKey,
        viewportWidth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        const perspective = perspectiveRef.current;
        const elapsed = Math.max(0, performance.now() - transitionStartedAt.current);
        const progress = transitionDuration.current === 0 ? 1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$camera$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeOutHandoff"])(elapsed / transitionDuration.current);
        perspective.position.lerpVectors(startPosition.current, targetPosition.current, progress);
        perspective.quaternion.slerpQuaternions(startQuaternion.current, targetQuaternion.current, progress);
        perspective.fov += ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$camera$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cameraPresetFor"])({
            mode: mode === "empty" ? "spectator" : mode,
            phase,
            pendingPhase,
            viewportWidth
        }).fov - perspective.fov) * Math.min(1, progress * 0.22 + 0.04);
        perspective.updateProjectionMatrix();
        if (projectileKey && previousProjectileKey.current === projectileKey && mode === "attack-flight" && !motionReduced) {
            const flightElapsed = Math.max(0, performance.now() - transitionStartedAt.current);
            const [x, y, z] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$camera$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flightShakeOffset"])(flightElapsed, true);
            perspective.position.x += x;
            perspective.position.y += y;
            perspective.position.z += z;
        }
    });
    return null;
}
function Atmosphere({ reducedGraphics, motionReduced }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    palette.sky
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    palette.sky,
                    12,
                    28
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 1.5,
                color: "#9bb3c5"
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -5,
                    10,
                    7
                ],
                intensity: 3.4,
                color: "#fff0d3",
                castShadow: true,
                "shadow-mapSize": [
                    1024,
                    1024
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    7,
                    4,
                    -5
                ],
                intensity: 1.5,
                color: "#4a8ca0"
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            !reducedGraphics && !motionReduced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Environment"], {
                frames: 1,
                resolution: 256,
                environmentIntensity: 0.34,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "rect",
                        intensity: 1.6,
                        color: "#ffd7a6",
                        position: [
                            -4,
                            6,
                            4
                        ],
                        scale: [
                            5,
                            3,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "rect",
                        intensity: 0.9,
                        color: "#61c6c7",
                        position: [
                            4,
                            3,
                            -4
                        ],
                        scale: [
                            4,
                            2,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lightformer"], {
                        form: "ring",
                        intensity: 0.55,
                        color: "#b9f3e8",
                        position: [
                            0,
                            5,
                            0
                        ],
                        scale: 2.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
function GraphicsPolish({ reducedGraphics, motionReduced }) {
    if (reducedGraphics || motionReduced) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContactShadows"], {
                position: [
                    0,
                    0.04,
                    0
                ],
                opacity: 0.3,
                scale: 15,
                blur: 2.4,
                far: 5.5,
                resolution: 256,
                frames: 1
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EffectComposer"], {
                multisampling: 0,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bloom"], {
                    luminanceThreshold: 0.9,
                    luminanceSmoothing: 0.12,
                    intensity: 0.42,
                    mipmapBlur: true
                }, void 0, false, {
                    fileName: "[project]/src/components/GameCanvas.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
function Terrain() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.15,
                    0
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            7.3,
                            8.1,
                            0.42,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.terrain,
                        roughness: 0.95
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.02,
                    0
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            5.9,
                            6.4,
                            0.18,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#2d5155",
                        roughness: 0.86
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.1,
                    5.2
                ],
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            2.6,
                            7
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#3f5d58",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.22,
                    5.8
                ],
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                        args: [
                            1.2,
                            1.24,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: palette.accent,
                        transparent: true,
                        opacity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
function Crenellations({ width, y, z, color }) {
    const count = Math.max(2, Math.round(width / 0.55));
    const positions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Array.from({
            length: count
        }, (_, index)=>[
                (index / (count - 1) - 0.5) * width,
                y,
                z
            ]), [
        count,
        width,
        y,
        z
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Instances$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Instances"], {
        limit: count,
        range: count,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                args: [
                    0.32,
                    0.42,
                    0.34
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: color,
                roughness: 0.86
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            positions.map((position, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Instances$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Instance"], {
                    position: position,
                    castShadow: true
                }, index, false, {
                    fileName: "[project]/src/components/GameCanvas.tsx",
                    lineNumber: 155,
                    columnNumber: 43
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
function RubbleFragments({ width, depth, motionReduced }) {
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fragmentRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const startedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const fragments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                position: [
                    -width * 0.25,
                    0.22,
                    -depth * 0.1
                ],
                rotation: [
                    0.3,
                    0.2,
                    -0.22
                ],
                velocity: [
                    -0.7,
                    1.3,
                    -0.25
                ],
                scale: [
                    0.55,
                    0.22,
                    0.48
                ]
            },
            {
                position: [
                    width * 0.08,
                    0.38,
                    depth * 0.08
                ],
                rotation: [
                    -0.1,
                    0.4,
                    0.3
                ],
                velocity: [
                    0.25,
                    1.65,
                    0.5
                ],
                scale: [
                    0.35,
                    0.28,
                    0.32
                ]
            },
            {
                position: [
                    width * 0.3,
                    0.18,
                    -depth * 0.18
                ],
                rotation: [
                    0.16,
                    -0.5,
                    0.15
                ],
                velocity: [
                    0.8,
                    1.05,
                    -0.35
                ],
                scale: [
                    0.28,
                    0.18,
                    0.25
                ]
            }
        ], [
        depth,
        width
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        startedAt.current = performance.now();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (!groupRef.current || motionReduced) return;
        const elapsedSeconds = Math.min(1, Math.max(0, performance.now() - startedAt.current) / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESENTATION_TIMING"].rubbleMs);
        for (const [index, fragment] of fragments.entries()){
            const object = fragmentRefs.current[index];
            if (!object) continue;
            const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$debris$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["debrisTransform"])({
                ...fragment,
                angularVelocity: [
                    1.8,
                    2.2,
                    1.5
                ]
            }, elapsedSeconds);
            object.position.fromArray(transform.position);
            object.rotation.fromArray(transform.rotation);
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Instances$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Instances"], {
            limit: fragments.length,
            range: fragments.length,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                    args: [
                        1,
                        1,
                        1
                    ]
                }, void 0, false, {
                    fileName: "[project]/src/components/GameCanvas.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                    color: palette.stoneDark,
                    roughness: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/GameCanvas.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                fragments.map((fragment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Instances$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Instance"], {
                        ref: (node)=>{
                            fragmentRefs.current[index] = node;
                        },
                        position: fragment.position,
                        rotation: fragment.rotation,
                        scale: fragment.scale,
                        castShadow: true
                    }, index, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 188,
                        columnNumber: 45
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/GameCanvas.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
function Banner({ position, accent, motionReduced }) {
    const flagRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(({ clock })=>{
        if (flagRef.current && !motionReduced) flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.08;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.85,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            0.035,
                            0.035,
                            2.1,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.metal,
                        metalness: 0.75,
                        roughness: 0.3
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: flagRef,
                position: [
                    0.38,
                    -0.3,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            0.76,
                            0.52,
                            3,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: accent,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
                        roughness: 0.72
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.38,
                    -0.3,
                    0.015
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            0.12,
                            16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: "#f8d6a3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
function Core({ state, position, motionReduced }) {
    const coreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(({ clock })=>{
        if (coreRef.current) {
            const pulse = motionReduced ? 1 : state === "CRITICAL" || state === "DAMAGED" ? 1 + Math.sin(clock.elapsedTime * 5) * 0.08 : 1 + Math.sin(clock.elapsedTime * 2) * 0.04;
            coreRef.current.scale.setScalar(pulse);
        }
    });
    if (state === "DESTROYED") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: coreRef,
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                        args: [
                            0.55,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.core,
                        emissive: palette.core,
                        emissiveIntensity: state === "CRITICAL" ? 5 : 2.4,
                        roughness: 0.18,
                        metalness: 0.12
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                scale: 1.65,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.55,
                            16,
                            16
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: palette.core,
                        transparent: true,
                        opacity: 0.09
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
function FortressComponent({ definition, state, motionReduced }) {
    const [width, height, depth] = definition.size;
    const isDestroyed = state === "DESTROYED";
    const materialColor = definition.materialClass === "WOOD" ? palette.wood : definition.materialClass === "METAL" ? palette.metal : state === "CRITICAL" ? palette.stoneDark : state === "DAMAGED" ? palette.stoneLight : palette.stone;
    const position = [
        definition.position[0],
        definition.position[1],
        definition.position[2]
    ];
    if (definition.type === "CORE") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$rapier$2f$dist$2f$react$2d$three$2d$rapier$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RigidBody"], {
            type: "fixed",
            colliders: "ball",
            position: position,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Core, {
                state: state,
                position: [
                    0,
                    0,
                    0
                ],
                motionReduced: motionReduced
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/GameCanvas.tsx",
            lineNumber: 248,
            columnNumber: 7
        }, this);
    }
    if (isDestroyed) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RubbleFragments, {
            width: width,
            depth: depth,
            motionReduced: motionReduced
        }, void 0, false, {
            fileName: "[project]/src/components/GameCanvas.tsx",
            lineNumber: 256,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$rapier$2f$dist$2f$react$2d$three$2d$rapier$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RigidBody"], {
        type: "fixed",
        colliders: "cuboid",
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                castShadow: true,
                receiveShadow: true,
                children: [
                    definition.type === "TOWER" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                        args: [
                            width / 1.65,
                            width / 1.7,
                            height,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 263,
                        columnNumber: 40
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            width,
                            height,
                            depth
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 263,
                        columnNumber: 109
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: materialColor,
                        roughness: definition.materialClass === "METAL" ? 0.38 : 0.9,
                        metalness: definition.materialClass === "METAL" ? 0.75 : 0.05
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            (definition.type === "WALL" || definition.type === "KEEP") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Crenellations, {
                width: width * 0.92,
                y: height / 2 + 0.2,
                z: 0,
                color: materialColor
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 266,
                columnNumber: 70
            }, this),
            definition.type === "TOWER" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Crenellations, {
                width: width * 0.9,
                y: height / 2 + 0.2,
                z: 0,
                color: materialColor
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 267,
                columnNumber: 39
            }, this),
            definition.type === "GATE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.18,
                    depth / 2 + 0.03
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            width * 0.55,
                            height * 0.62,
                            0.04
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#3b2117",
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 269,
                columnNumber: 9
            }, this),
            definition.type === "CORE_ENCLOSURE" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0,
                    depth / 2 + 0.05
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            width * 0.68,
                            height * 0.72,
                            0.05
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.stoneDark,
                        roughness: 1
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 275,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 261,
        columnNumber: 5
    }, this);
}
function ThroneMarker() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            1.3,
            -1.88
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.9,
                            0.12,
                            0.5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.metal,
                        metalness: 0.85,
                        roughness: 0.28
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    0.48,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.65,
                            0.85,
                            0.12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.metal,
                        metalness: 0.85,
                        roughness: 0.28
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    1.12,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("octahedronGeometry", {
                        args: [
                            0.22,
                            0
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.accent,
                        emissive: palette.accent,
                        emissiveIntensity: 0.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, this);
}
function Launcher({ position, motionReduced }) {
    const aim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.attackAim);
    const projectileKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.projectile?.commandKey ?? null);
    const barrelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const muzzleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const firedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (projectileKey) firedAt.current = performance.now();
    }, [
        projectileKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (!barrelRef.current || !muzzleRef.current) return;
        if (!projectileKey || motionReduced) {
            barrelRef.current.position.y = -0.08;
            muzzleRef.current.visible = false;
            return;
        }
        const elapsed = performance.now() - firedAt.current;
        const pulse = Math.max(0, 1 - elapsed / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESENTATION_TIMING"].launcherRecoilMs);
        barrelRef.current.position.y = -0.08 - pulse * 0.16;
        muzzleRef.current.visible = pulse > 0;
        muzzleRef.current.scale.setScalar(0.65 + pulse * 0.65);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: position,
        rotation: [
            0,
            aim.yaw * 0.45,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.45,
                    0
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            2.25,
                            0.32,
                            1.25
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#26313d",
                        metalness: 0.55,
                        roughness: 0.4
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: barrelRef,
                position: [
                    0,
                    -0.08,
                    -0.15
                ],
                rotation: [
                    aim.elevation - 0.65 - (aim.isDragging ? aim.power * 0.08 : 0),
                    0,
                    0
                ],
                scale: aim.isDragging ? 1 + aim.power * 0.04 : 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        castShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.23,
                                    0.3,
                                    2.55,
                                    12
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: "#9b6947",
                                metalness: 0.35,
                                roughness: 0.52
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        ref: muzzleRef,
                        position: [
                            0,
                            1.36,
                            0
                        ],
                        visible: false,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.22,
                                    8,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: "#ffe1a3",
                                transparent: true,
                                opacity: 0.8
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    -0.46,
                    0
                ],
                scale: aim.isDragging ? 1 + aim.power * 0.12 : 1,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("torusGeometry", {
                        args: [
                            0.78,
                            0.035,
                            8,
                            32
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: palette.accent,
                        transparent: true,
                        opacity: 0.6
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 341,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
function TrajectoryPreview({ definition }) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const aim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.attackAim);
    const points = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$simulation$2f$ballistics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trajectoryPreview"])(aim).map(([x, y, z])=>[
                x + definition.launcherPosition[0],
                y + definition.launcherPosition[1],
                z + definition.launcherPosition[2]
            ]), [
        aim,
        definition.launcherPosition
    ]);
    if (mode !== "attack-aim") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: points.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: point,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.045 + index * 0.002,
                            8,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 352,
                        columnNumber: 82
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: palette.accent,
                        transparent: true,
                        opacity: 0.52 - index * 0.025
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 352,
                        columnNumber: 137
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 352,
                columnNumber: 47
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 352,
        columnNumber: 10
    }, this);
}
function DefensePlacementPreview({ definition }) {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const placement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.defensePlacement);
    const activeDefenseSlots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot?.activeDefenses ?? []);
    if (mode !== "defense-placement" || !placement) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: definition.defenseSlots.map((slot)=>{
            const active = activeDefenseSlots.some((defense)=>defense.slotId === slot.id);
            const selected = slot.id === placement.slotId;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: slot.position,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            slot.size[0],
                            slot.size[1],
                            Math.max(0.06, slot.size[2])
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: active ? "#40535b" : selected ? palette.accent : palette.core,
                        transparent: true,
                        opacity: active ? 0.08 : selected ? 0.28 : 0.1,
                        wireframe: !selected
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this)
                ]
            }, slot.id, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 364,
                columnNumber: 14
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 360,
        columnNumber: 10
    }, this);
}
function PowerOrb({ definition, worldVersion, siegeCharge, motionReduced }) {
    const orbRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$simulation$2f$ballistics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["powerOrbPosition"])(definition, worldVersion);
    const charge = Math.min(100, Math.max(0, siegeCharge)) / 100;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(({ clock })=>{
        if (!orbRef.current) return;
        if (!motionReduced) {
            orbRef.current.rotation.y = clock.elapsedTime * 1.7;
            orbRef.current.rotation.x = Math.sin(clock.elapsedTime * 1.1) * 0.18;
            orbRef.current.scale.setScalar(0.92 + charge * 0.16 + Math.sin(clock.elapsedTime * 3.2) * (0.012 + charge * 0.02));
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: orbRef,
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("icosahedronGeometry", {
                        args: [
                            0.32,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 386,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: palette.core,
                        emissive: palette.core,
                        emissiveIntensity: 2.2 + charge * 3.2,
                        roughness: 0.22,
                        metalness: 0.2
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 387,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 385,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                scale: 1.7 + charge * 0.45,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.32,
                            12,
                            12
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 390,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: palette.core,
                        transparent: true,
                        opacity: 0.1 + charge * 0.1
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 391,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 389,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 384,
        columnNumber: 10
    }, this);
}
function DefenseCues({ definition, defenses, motionReduced }) {
    const cueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(({ clock })=>{
        if (!cueRef.current || motionReduced) return;
        cueRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.4) * 0.025);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: cueRef,
        children: defenses.map((defense)=>{
            const slot = definition.defenseSlots.find((candidate)=>candidate.id === defense.slotId);
            if (!slot) return null;
            const shield = defense.type === "SHIELD";
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: slot.position,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        rotation: [
                            -Math.PI / 2,
                            0,
                            0
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                                args: [
                                    Math.max(slot.size[0], slot.size[1]) * 0.42,
                                    Math.max(slot.size[0], slot.size[1]) * 0.46,
                                    24
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: shield ? "#8dd6e8" : palette.accent,
                                transparent: true,
                                opacity: 0.26,
                                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 410,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                                args: [
                                    slot.size[0] * 0.92,
                                    slot.size[1] * 0.92,
                                    0.035
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                                color: shield ? "#8dd6e8" : palette.accent,
                                transparent: true,
                                opacity: 0.08,
                                wireframe: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/GameCanvas.tsx",
                                lineNumber: 414,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this)
                ]
            }, defense.id, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 407,
                columnNumber: 14
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 402,
        columnNumber: 10
    }, this);
}
let sharedAudioContext = null;
function playImpactSound() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const settings = undefined;
    const AudioContextConstructor = undefined;
    const context = undefined;
    const oscillator = undefined;
    const gain = undefined;
}
function Projectile({ definition }) {
    const projectile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.projectile);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const from = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](...definition.launcherPosition), [
        definition.launcherPosition
    ]);
    const visualTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (projectile?.impactPoint) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](...projectile.impactPoint);
        const targetPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentationTargetPosition"])(definition, snapshot, projectile?.targetId);
        if (targetPosition) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](...targetPosition);
        if (projectile?.targetId === "miss") {
            const preview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$simulation$2f$ballistics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trajectoryPreview"])(projectile.aim, 12, 0.8).at(-1);
            return preview ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](preview[0] + from.x, preview[1] + from.y, preview[2] + from.z) : null;
        }
        return null;
    }, [
        definition,
        from,
        projectile,
        snapshot
    ]);
    const position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"]());
    const completeProjectile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.completeProjectile);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        progress.current = 0;
    }, [
        projectile?.commandKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])((_, delta)=>{
        if (!projectile) return;
        progress.current = Math.min(1, progress.current + Math.min(delta, 0.05) / projectile.flightSeconds);
        if (visualTarget && meshRef.current) {
            position.current.lerpVectors(from, visualTarget, progress.current);
            position.current.y += Math.sin(progress.current * Math.PI) * 2.1;
            meshRef.current.position.copy(position.current);
        }
        if (progress.current >= 1) completeProjectile();
    });
    if (!projectile || !visualTarget) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        position: from,
        castShadow: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    0.22,
                    12,
                    12
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 485,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: projectile.projectileType === "BREAKER" ? palette.accent : "#c6a377",
                emissive: projectile.projectileType === "BREAKER" ? palette.accent : "#5b321e",
                emissiveIntensity: projectile.projectileType === "BREAKER" ? 1.8 : 0.5,
                roughness: 0.7
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 484,
        columnNumber: 5
    }, this);
}
function ImpactBurst({ definition, motionReduced }) {
    const effect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.impactEffect);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const clear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.clearImpactEffect);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const materialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const targetPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (effect?.impactPoint) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](...effect.impactPoint);
        const position = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentationTargetPosition"])(definition, snapshot, effect?.targetId);
        return position ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](...position) : null;
    }, [
        definition,
        effect,
        snapshot
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!effect) return;
        startedAt.current = performance.now();
        playImpactSound();
    }, [
        effect
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])(()=>{
        if (!effect) return;
        if (motionReduced) {
            clear(effect.key);
            return;
        }
        const progress = Math.min(1, (performance.now() - startedAt.current) / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESENTATION_TIMING"].impactMs);
        if (!ringRef.current || !materialRef.current) {
            if (progress >= 1) clear(effect.key);
            return;
        }
        ringRef.current.scale.setScalar(0.4 + progress * 2.2);
        materialRef.current.opacity = (1 - progress) * 0.75;
        if (progress >= 1) clear(effect.key);
    });
    if (!effect || !targetPosition) return null;
    const targetKind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$targets$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentationTargetKind"])(effect.targetId);
    const impactColor = effect.projectileType === "BREAKER" ? palette.accent : targetKind === "power-orb" ? palette.core : targetKind === "defense" ? "#8dd6e8" : targetKind === "miss" ? palette.stoneLight : palette.accent;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: ringRef,
        position: targetPosition,
        rotation: [
            -Math.PI / 2,
            0,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                args: [
                    0.22,
                    0.34,
                    24
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 531,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                ref: materialRef,
                color: impactColor,
                emissive: impactColor,
                emissiveIntensity: 4,
                transparent: true,
                opacity: 0.75,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"],
                roughness: 0.35,
                metalness: 0.1
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 532,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 530,
        columnNumber: 7
    }, this);
}
function WorldScene({ snapshot, motionReduced, reducedGraphics }) {
    const definition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2f$generator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateFortress"])(snapshot.worldSeed, snapshot.generatorVersion), [
        snapshot.worldSeed,
        snapshot.generatorVersion
    ]);
    const states = new Map(snapshot.components.map((component)=>[
            component.componentId,
            component.state
        ]));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Atmosphere, {
                reducedGraphics: reducedGraphics,
                motionReduced: motionReduced
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 542,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraRig, {
                motionReduced: motionReduced
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$rapier$2f$dist$2f$react$2d$three$2d$rapier$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Physics"], {
                gravity: [
                    0,
                    -9.81,
                    0
                ],
                timeStep: 1 / 60,
                interpolate: false,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Terrain, {}, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, this),
                    definition.components.map((component)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FortressComponent, {
                            definition: component,
                            state: states.get(component.id) ?? "INTACT",
                            motionReduced: motionReduced
                        }, component.id, false, {
                            fileName: "[project]/src/components/GameCanvas.tsx",
                            lineNumber: 546,
                            columnNumber: 51
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThroneMarker, {}, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Banner, {
                        position: [
                            -2.25,
                            6.15,
                            -0.75
                        ],
                        accent: palette.accent,
                        motionReduced: motionReduced
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Banner, {
                        position: [
                            2.25,
                            6.15,
                            -0.75
                        ],
                        accent: palette.accent,
                        motionReduced: motionReduced
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 549,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Launcher, {
                        position: definition.launcherPosition,
                        motionReduced: motionReduced
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 550,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PowerOrb, {
                        definition: definition,
                        worldVersion: snapshot.worldVersion,
                        siegeCharge: snapshot.reign?.siegeCharge ?? 0,
                        motionReduced: motionReduced
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DefenseCues, {
                        definition: definition,
                        defenses: snapshot.activeDefenses,
                        motionReduced: motionReduced
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 552,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrajectoryPreview, {
                        definition: definition
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DefensePlacementPreview, {
                        definition: definition
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 554,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Projectile, {
                        definition: definition
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 555,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ImpactBurst, {
                        definition: definition,
                        motionReduced: motionReduced
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 556,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GraphicsPolish, {
                reducedGraphics: reducedGraphics,
                motionReduced: motionReduced
            }, void 0, false, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 558,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 541,
        columnNumber: 5
    }, this);
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function GameCanvas() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const setAim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.setAim);
    const fireAttack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.fireAttack);
    const shellRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererCleanupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [motionReduced, setMotionReduced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [graphicsPolicy, setGraphicsPolicy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$graphics$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["graphicsPolicyFor"])(1280, null));
    const [contextLost, setContextLost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [benchmarkMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time value", "undefined") !== "undefined" && new URLSearchParams(window.location.search).get("benchmark") === "1");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const cancelAim = ()=>setAim({
                isDragging: false
            });
        window.addEventListener("blur", cancelAim);
        document.addEventListener("visibilitychange", cancelAim);
        return ()=>{
            window.removeEventListener("blur", cancelAim);
            document.removeEventListener("visibilitychange", cancelAim);
        };
    }, [
        setAim
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = ()=>setMotionReduced(query.matches);
        update();
        query.addEventListener("change", update);
        return ()=>query.removeEventListener("change", update);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const device = navigator;
        const update = ()=>setGraphicsPolicy((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$graphics$2d$policy$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["graphicsPolicyFor"])(window.innerWidth, device.deviceMemory));
        update();
        window.addEventListener("resize", update);
        return ()=>window.removeEventListener("resize", update);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (window.__THREE_GAME_DIAGNOSTICS__) window.__THREE_GAME_DIAGNOSTICS__.graphics = graphicsPolicy;
    }, [
        graphicsPolicy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>rendererCleanupRef.current?.(), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onKeyDown(event) {
            if (mode !== "attack-aim" || event.target.matches("input, textarea, select, button")) return;
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState();
            const step = event.shiftKey ? 0.08 : 0.035;
            if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
                event.preventDefault();
                setAim({
                    yaw: clamp(state.attackAim.yaw - step, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minYaw, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxYaw)
                });
            } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
                event.preventDefault();
                setAim({
                    yaw: clamp(state.attackAim.yaw + step, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minYaw, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxYaw)
                });
            } else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
                event.preventDefault();
                setAim({
                    elevation: clamp(state.attackAim.elevation + step * 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minElevation, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxElevation)
                });
            } else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
                event.preventDefault();
                setAim({
                    elevation: clamp(state.attackAim.elevation - step * 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minElevation, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxElevation)
                });
            } else if (event.key === "+" || event.key === "=") {
                event.preventDefault();
                setAim({
                    power: clamp(state.attackAim.power + step, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minPower, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxPower)
                });
            } else if (event.key === "-" || event.key === "_") {
                event.preventDefault();
                setAim({
                    power: clamp(state.attackAim.power - step, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minPower, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxPower)
                });
            } else if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                void fireAttack();
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        fireAttack,
        mode,
        setAim
    ]);
    if (!snapshot) return null;
    function updateAim(clientX, clientY) {
        if (!shellRef.current) return;
        const rect = shellRef.current.getBoundingClientRect();
        const horizontal = clamp((clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
        const vertical = clamp((clientY - rect.top) / rect.height, 0, 1);
        setAim({
            yaw: horizontal * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxYaw,
            elevation: clamp(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxElevation - vertical * 0.34, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minElevation, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxElevation),
            power: clamp(0.35 + Math.abs(horizontal) * 0.32 + (1 - vertical) * 0.28, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.minPower, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.maxPower)
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: shellRef,
        className: "canvas-shell",
        onPointerDown: (event)=>{
            if (mode !== "attack-aim" || event.target.closest("button")) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            setAim({
                isDragging: true
            });
            updateAim(event.clientX, event.clientY);
        },
        onPointerMove: (event)=>{
            if (mode === "attack-aim" && event.currentTarget.hasPointerCapture(event.pointerId)) updateAim(event.clientX, event.clientY);
        },
        onPointerUp: (event)=>{
            if (mode !== "attack-aim" || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
            event.currentTarget.releasePointerCapture(event.pointerId);
            setAim({
                isDragging: false
            });
            if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(8);
            void fireAttack();
        },
        onPointerCancel: ()=>setAim({
                isDragging: false
            }),
        onLostPointerCapture: ()=>setAim({
                isDragging: false
            }),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                shadows: graphicsPolicy.reduced ? false : "basic",
                dpr: graphicsPolicy.reduced ? [
                    0.75,
                    1
                ] : [
                    1,
                    1.6
                ],
                camera: {
                    position: [
                        10.8,
                        7.1,
                        11.6
                    ],
                    fov: 37,
                    near: 0.1,
                    far: 50
                },
                gl: {
                    antialias: true,
                    powerPreference: "high-performance"
                },
                onCreated: ({ gl, camera })=>{
                    gl.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
                    gl.toneMapping = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"];
                    gl.toneMappingExposure = 1.05;
                    gl.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFShadowMap"];
                    rendererCleanupRef.current?.();
                    const canvas = gl.domElement;
                    const onContextLost = (event)=>{
                        event.preventDefault();
                        setContextLost(true);
                        if (window.__THREE_GAME_DIAGNOSTICS__) window.__THREE_GAME_DIAGNOSTICS__.contextLost = true;
                    };
                    const onContextRestored = ()=>{
                        setContextLost(false);
                        if (window.__THREE_GAME_DIAGNOSTICS__) window.__THREE_GAME_DIAGNOSTICS__.contextLost = false;
                    };
                    canvas.addEventListener("webglcontextlost", onContextLost, false);
                    canvas.addEventListener("webglcontextrestored", onContextRestored, false);
                    rendererCleanupRef.current = ()=>{
                        canvas.removeEventListener("webglcontextlost", onContextLost);
                        canvas.removeEventListener("webglcontextrestored", onContextRestored);
                    };
                    window.__THREE_GAME_DIAGNOSTICS__ = {
                        renderer: gl.info,
                        engine: "@react-three/rapier",
                        fixedTimestep: 1 / 60,
                        graphics: graphicsPolicy,
                        contextLost: false,
                        camera: camera
                    };
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$AdaptiveDpr$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdaptiveDpr"], {
                        pixelated: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 696,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$AdaptiveEvents$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdaptiveEvents"], {}, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 697,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WorldScene, {
                        snapshot: snapshot,
                        motionReduced: motionReduced,
                        reducedGraphics: graphicsPolicy.reduced || benchmarkMode
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 698,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 659,
                columnNumber: 7
            }, this),
            contextLost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "graphics-warning",
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Graphics paused"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 700,
                        columnNumber: 70
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "The browser interrupted the 3D context. Restore the tab or reload the siege to reconnect the scene."
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 700,
                        columnNumber: 102
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        children: "Reload scene ↻"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GameCanvas.tsx",
                        lineNumber: 700,
                        columnNumber: 214
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GameCanvas.tsx",
                lineNumber: 700,
                columnNumber: 23
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GameCanvas.tsx",
        lineNumber: 639,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/SiegeApp.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiegeApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/realtime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2f$generator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/world/generator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/labels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/server-time.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/audio.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/GameCanvas.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function formatMoney(minor) {
    return `$${(minor / 100).toFixed(0)}`;
}
function formatDuration(startedAt, skewMs = 0) {
    const minutes = Math.max(0, Math.floor(((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverNow"])(Date.now(), skewMs) - new Date(startedAt).getTime()) / 60000));
    return `${Math.floor(minutes / 60).toString().padStart(2, "0")}h ${String(minutes % 60).padStart(2, "0")}m`;
}
function ProductMark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "product-mark",
        "aria-label": `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productConfig"].name}, ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productConfig"].domain}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mark-glyph",
                children: "✦"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 41,
                columnNumber: 102
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productConfig"].name
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 41,
                columnNumber: 139
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "product-domain",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productConfig"].domain
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 41,
                columnNumber: 172
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 41,
        columnNumber: 10
    }, this);
}
function IdentityChip() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const openSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.openSheet);
    if (!snapshot?.ruler) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "identity-chip",
        onClick: ()=>openSheet("identity"),
        "aria-label": "Open ruler identity",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "identity-avatar",
                children: "FH"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "identity-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: snapshot.ruler.displayName
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 51,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: snapshot.ruler.identityType
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 51,
                        columnNumber: 84
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "chip-chevron",
                children: "↗"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
function CoreIndicator() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    if (!snapshot?.reign) return null;
    const percent = Math.round(snapshot.reign.coreIntegrity / snapshot.reign.coreMaxIntegrity * 100);
    const critical = percent <= 25;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `core-indicator ${critical ? "is-critical" : ""}`,
        "aria-label": `Core Integrity ${percent} percent`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "core-label",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: critical ? "CORE CRITICAL" : "CORE INTEGRITY"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 64,
                        columnNumber: 35
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            percent,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                children: "%"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 64,
                                columnNumber: 112
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 64,
                        columnNumber: 95
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "core-track",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        width: `${percent}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 65,
                    columnNumber: 35
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function ReconnectingOverlay() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    if (mode !== "reconnecting") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "reconnect-overlay",
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "loading-pulse"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 73,
                columnNumber: 59
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: "Reconnecting to the siege"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 73,
                columnNumber: 93
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                children: "Holding the last safe world. Commands are paused until authority confirms the next version."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 73,
                columnNumber: 135
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 73,
        columnNumber: 10
    }, this);
}
function ActiveAttackChip() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const activeAttack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot?.activeAttack ?? null);
    if (!activeAttack || mode !== "spectator" && mode !== "empty") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "critical-notice",
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "live-dot"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 80,
                columnNumber: 57
            }, this),
            " ",
            activeAttack.label,
            " · shot ",
            activeAttack.shotNumber,
            " incoming"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
function LiveTicker() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const [event, setEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const refresh = async ()=>{
            try {
                const response = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/events")}?limit=1`, {
                    cache: "no-store"
                });
                if (!response.ok) return;
                const payload = await response.json();
                const latest = payload.events?.[0] ?? null;
                if (!cancelled && latest) setEvent(latest);
            } catch  {}
        };
        void refresh();
        const timer = window.setInterval(()=>void refresh(), 4_000);
        return ()=>{
            cancelled = true;
            window.clearInterval(timer);
        };
    }, [
        snapshot?.worldVersion
    ]);
    if (!event || !snapshot) return null;
    const copy = event.targetId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["impactLabel"])(event.targetId, event.damage ?? 0, event.projectileType ?? "STANDARD", snapshot) : "The live world changed";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "live-ticker",
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "live-dot"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 103,
                columnNumber: 72
            }, this),
            " LAST IMPACT ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: copy
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 103,
                columnNumber: 114
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                children: [
                    "event ",
                    event.eventSequence
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 103,
                columnNumber: 137
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 103,
        columnNumber: 10
    }, this);
}
function CriticalNotice() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const percent = snapshot?.reign ? snapshot.reign.coreIntegrity / snapshot.reign.coreMaxIntegrity : 1;
    if (percent > 0.25 || !snapshot?.reign) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "critical-notice",
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "live-dot"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 110,
                columnNumber: 57
            }, this),
            " CORE CRITICAL · every impact matters"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, this);
}
function DebugOverlay() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const [enabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time value", "undefined") !== "undefined" && new URL(window.location.href).searchParams.get("debug") === "1" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"));
    const [camera, setCamera] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enabled) return;
        const read = ()=>{
            const current = window.__THREE_GAME_DIAGNOSTICS__?.camera;
            setCamera(current ? {
                position: {
                    x: current.position.x,
                    y: current.position.y,
                    z: current.position.z
                },
                fov: current.fov
            } : null);
        };
        read();
        const timer = window.setInterval(read, 250);
        return ()=>window.clearInterval(timer);
    }, [
        enabled
    ]);
    if (!enabled || !snapshot) return null;
    const damaged = snapshot.components.filter((component)=>component.state !== "INTACT").map((component)=>`${component.componentId}:${component.state}`).join(" · ") || "none";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "debug-overlay",
        "aria-label": "Local scene diagnostics",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: "LOCAL DIAGNOSTICS"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 130,
                columnNumber: 80
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "mode ",
                    mode,
                    " · phase ",
                    snapshot.phase
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 130,
                columnNumber: 114
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "world v",
                    snapshot.worldVersion,
                    " · reign ",
                    snapshot.currentReignId ?? "none"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 130,
                columnNumber: 163
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "generator ",
                    snapshot.generatorVersion
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 130,
                columnNumber: 250
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "camera ",
                    camera ? `${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)} · fov ${camera.fov.toFixed(1)}` : "waiting"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 130,
                columnNumber: 300
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "damage ",
                    damaged
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 130,
                columnNumber: 473
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 130,
        columnNumber: 10
    }, this);
}
function CheckoutStatus() {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("checking");
    const mounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(()=>()=>undefined, ()=>true, ()=>false);
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const visible = mounted && !dismissed && new URLSearchParams(window.location.search).get("checkout") === "return";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!visible) return;
        const expected = (()=>{
            try {
                const stored = window.sessionStorage.getItem("siegeme:checkout-intent");
                return stored ? JSON.parse(stored) : null;
            } catch  {
                return null;
            }
        })();
        let attempts = 0;
        let timer;
        const check = async ()=>{
            attempts += 1;
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/entitlements"), {
                    credentials: "include",
                    cache: "no-store"
                });
                const payload = await response.json();
                const quantity = expected ? payload.entitlements?.find((item)=>item.kind === expected?.purchaseKind)?.quantityRemaining ?? 0 : 0;
                if (response.ok && expected && quantity > expected.baselineQuantity) {
                    setStatus("confirmed");
                    window.sessionStorage.removeItem("siegeme:checkout-intent");
                    return;
                }
                if (expected?.intentId) {
                    const intentResponse = await fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/checkout/status")}?intentId=${encodeURIComponent(expected.intentId)}`, {
                        credentials: "include",
                        cache: "no-store"
                    });
                    const intent = await intentResponse.json();
                    if (intentResponse.ok && intent.status === "FAILED") {
                        setStatus("failed");
                        return;
                    }
                }
            } catch  {}
            if (attempts >= 5) setStatus("pending");
            else timer = window.setTimeout(()=>void check(), 2500);
        };
        void check();
        return ()=>{
            if (timer) window.clearTimeout(timer);
        };
    }, [
        visible
    ]);
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `checkout-status checkout-${status}`,
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: status === "checking" ? "Confirming payment…" : status === "confirmed" ? "Payment confirmed" : status === "failed" ? "Payment could not be confirmed" : "Payment is still confirming"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 174,
                columnNumber: 78
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: status === "confirmed" ? "Your matching confirmed entitlement is ready at the throne." : status === "failed" ? "The purchase intent failed without granting shots. Open Attack to try again." : "The server is waiting for the matching entitlement. You can check again from Attack or Defend."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 174,
                columnNumber: 278
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setDismissed(true),
                "aria-label": "Dismiss payment status",
                children: "×"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 174,
                columnNumber: 581
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 174,
        columnNumber: 10
    }, this);
}
function protectionActive(snapshot, skewMs = 0) {
    return (snapshot?.coronation?.protectedUntil ?? 0) > (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverNow"])(Date.now(), skewMs);
}
function PrimaryActions() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const openSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.openSheet);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const skew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.serverClockSkewMs);
    if (mode !== "spectator" && mode !== "empty" && mode !== "defeat-cinematic" || protectionActive(snapshot, skew)) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "primary-actions",
        children: mode === "spectator" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "action-button action-attack",
                    onClick: ()=>openSheet("attack"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Attack"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 191,
                            columnNumber: 95
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: [
                                "buy 3 shots · ",
                                formatMoney(300)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 191,
                            columnNumber: 114
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 191,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "action-button action-defend",
                    onClick: ()=>openSheet("defend"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Defend"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 192,
                            columnNumber: 95
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: [
                                "shield the hold · from ",
                                formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? 300)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 192,
                            columnNumber: 114
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 192,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 190,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "claim-button",
            onClick: ()=>openSheet("coronation"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Claim the throne"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 195,
                    columnNumber: 82
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                    children: "publish your identity and begin a reign"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 195,
                    columnNumber: 111
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 195,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
function DefeatCinematic() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const openSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.openSheet);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    if (mode !== "defeat-cinematic" || snapshot?.phase !== "CORONATION") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "defeat-cinematic",
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "eyebrow",
                children: "THE CORE HAS FALLEN"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 206,
                columnNumber: 58
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: "The throne is open."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 206,
                columnNumber: 110
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                children: "The decisive conqueror may publish the next reign."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 206,
                columnNumber: 146
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "secondary-action",
                onClick: ()=>openSheet("coronation"),
                children: [
                    "Claim the throne ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 206,
                        columnNumber: 305
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 206,
                columnNumber: 211
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 206,
        columnNumber: 10
    }, this);
}
function DefensePlacementHud() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const placement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.defensePlacement);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const cancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.cancelDefense);
    const submit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.submitDefensePlacement);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.attackError);
    if (mode !== "defense-placement" || !placement) return null;
    const label = placement.slotId.replace(/^(shield_slot|brace_slot):/, "").replaceAll("_", " ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "defense-placement-hud",
        role: "dialog",
        "aria-label": "Defense placement",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "eyebrow",
                        children: [
                            "DEFENSE PLACEMENT · ",
                            placement.type
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 218,
                        columnNumber: 99
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 218,
                        columnNumber: 168
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: snapshot?.worldVersion ? `live world ${snapshot.worldVersion} · confirm to anchor this defense` : "checking live world"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 218,
                        columnNumber: 192
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 218,
                columnNumber: 94
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "defense-placement-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "secondary-action",
                        onClick: cancel,
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 218,
                        columnNumber: 377
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sheet-primary",
                        onClick: ()=>void submit(),
                        children: [
                            "Confirm placement",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 218,
                                columnNumber: 527
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 218,
                        columnNumber: 446
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 218,
                columnNumber: 334
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 218,
                columnNumber: 566
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 218,
        columnNumber: 10
    }, this);
}
function LiveMeta() {
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const skew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.serverClockSkewMs);
    const openSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.openSheet);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    if (!snapshot?.reign) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "live-meta",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "live-dot"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 32
            }, this),
            " LIVE REIGN ",
            snapshot.reign.ordinal.toString().padStart(2, "0"),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "meta-divider"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 125
            }, this),
            formatDuration(snapshot.reign.startedAt, skew),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>openSheet("details"),
                "aria-label": "Open siege details",
                children: "details ↗"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 206
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>openSheet("share"),
                "aria-label": "Share this reign",
                children: "share ↗"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 301
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>openSheet("how"),
                "aria-label": "How the siege works",
                children: "how ↗"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 390
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>openSheet("recovery"),
                "aria-label": "Open recovery",
                children: "recover ↗"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 478
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>router.push("/history"),
                children: "history ↗"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 228,
                columnNumber: 569
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
function ProtectionNotice() {
    const protectedUntil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot?.coronation?.protectedUntil ?? null);
    const skew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.serverClockSkewMs);
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!protectedUntil) return;
        const timer = window.setInterval(()=>setNow(Date.now()), 1000);
        return ()=>window.clearInterval(timer);
    }, [
        protectedUntil
    ]);
    const authorityNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverNow"])(now, skew);
    if (!protectedUntil || protectedUntil <= authorityNow) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "protection-notice",
        role: "status",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "live-dot"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 243,
                columnNumber: 78
            }, this),
            " NEW REIGN PROTECTED · ",
            Math.ceil((protectedUntil - authorityNow) / 1000),
            "s"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 243,
        columnNumber: 10
    }, this);
}
function Sheet({ children, title, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sheet-backdrop",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "sheet",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "siege-sheet-title",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sheet-handle"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 247,
                    columnNumber: 200
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "sheet-close",
                    onClick: onClose,
                    "aria-label": "Close",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 247,
                    columnNumber: 232
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "eyebrow",
                    children: "SIEGE ME / LIVE WORLD"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 247,
                    columnNumber: 311
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "siege-sheet-title",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 247,
                    columnNumber: 359
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 247,
            columnNumber: 60
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 247,
        columnNumber: 10
    }, this);
}
function SoundControls() {
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readAudioSettings"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const update = (event)=>{
            const detail = event.detail;
            if (detail) setSettings(detail);
        };
        window.addEventListener("siegeme:audio-settings", update);
        return ()=>window.removeEventListener("siegeme:audio-settings", update);
    }, []);
    const update = (next)=>setSettings((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$audio$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAudioSettings"])(next));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
        className: "audio-controls",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                children: "SOUND"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 261,
                columnNumber: 47
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "form-field",
                children: [
                    "IMPACT VOLUME ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            Math.round(settings.effectsVolume * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 261,
                        columnNumber: 113
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "0",
                        max: "1",
                        step: "0.05",
                        value: settings.effectsVolume,
                        onChange: (event)=>update({
                                ...settings,
                                effectsVolume: Number(event.target.value),
                                muted: false
                            })
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 261,
                        columnNumber: 169
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 261,
                columnNumber: 69
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "secondary-action",
                onClick: ()=>update({
                        ...settings,
                        muted: !settings.muted
                    }),
                children: settings.muted ? "Unmute impact sound" : "Mute impact sound"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 261,
                columnNumber: 361
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 261,
        columnNumber: 10
    }, this);
}
function ContextSheet() {
    const activeSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.activeSheet);
    const closeSheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.closeSheet);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const skew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.serverClockSkewMs);
    const shotLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.shotLog);
    const resetAttack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.resetAttack);
    const [checkoutState, setCheckoutState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [checkoutError, setCheckoutError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [displayName, setDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [identityType, setIdentityType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Person");
    const [destinationUrl, setDestinationUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [socialHandle, setSocialHandle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [ctaChoice, setCtaChoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("VISIT");
    const [coronationState, setCoronationState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [recoveryCode, setRecoveryCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [recoveryState, setRecoveryState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [recoveryError, setRecoveryError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [recoveryInput, setRecoveryInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [entitlementStatus, setEntitlementStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [contributors, setContributors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyStatus, setHistoryStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [eventsStatus, setEventsStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [contributorsStatus, setContributorsStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const claimTurn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.claimTurn);
    const turnStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.turnStatus);
    const turnError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.attackError);
    const queuePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.queuePosition);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (activeSheet !== "details") return;
        let cancelled = false;
        void fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/history")}?limit=3`, {
            cache: "no-store"
        }).then(async (response)=>{
            if (!response.ok) throw new Error("history unavailable");
            const payload = await response.json();
            if (!cancelled) {
                setHistory(payload.reigns ?? []);
                setHistoryStatus("ready");
            }
        }).catch(()=>{
            if (!cancelled) setHistoryStatus("error");
        });
        void fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/events")}?limit=8`, {
            cache: "no-store"
        }).then(async (response)=>{
            if (!response.ok) throw new Error("events unavailable");
            const payload = await response.json();
            if (!cancelled) {
                setEvents(payload.events ?? []);
                setEventsStatus("ready");
            }
        }).catch(()=>{
            if (!cancelled) setEventsStatus("error");
        });
        if (snapshot?.currentReignId) {
            void fetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/contributors")}?reignId=${encodeURIComponent(snapshot.currentReignId)}`, {
                cache: "no-store"
            }).then(async (response)=>{
                if (!response.ok) throw new Error("contributors unavailable");
                const payload = await response.json();
                if (!cancelled) {
                    setContributors(payload.contributors ?? []);
                    setContributorsStatus("ready");
                }
            }).catch(()=>{
                if (!cancelled) setContributorsStatus("error");
            });
        }
        return ()=>{
            cancelled = true;
        };
    }, [
        activeSheet,
        snapshot?.currentReignId
    ]);
    async function startCheckout(purchaseKind) {
        setCheckoutState("loading");
        setCheckoutError(null);
        try {
            let baselineQuantity = 0;
            try {
                const entitlementResponse = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/entitlements"), {
                    credentials: "include",
                    cache: "no-store"
                });
                const entitlementPayload = await entitlementResponse.json();
                baselineQuantity = entitlementPayload.entitlements?.find((item)=>item.kind === purchaseKind)?.quantityRemaining ?? 0;
            } catch  {}
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/checkout"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    purchase_kind: purchaseKind
                })
            });
            const payload = await response.json();
            if (!response.ok || !payload.checkoutUrl) {
                setCheckoutState("error");
                setCheckoutError(payload.error ?? "Dodo checkout is unavailable.");
                return;
            }
            const intentId = payload.sessionId ?? new URL(payload.checkoutUrl, window.location.origin).searchParams.get("intent");
            window.sessionStorage.setItem("siegeme:checkout-intent", JSON.stringify({
                purchaseKind,
                baselineQuantity,
                intentId
            }));
            window.location.assign(payload.checkoutUrl);
        } catch  {
            setCheckoutState("error");
            setCheckoutError("The secure checkout could not be reached. Try again.");
        }
    }
    async function startAttackCheckout() {
        return startCheckout("ATTACK_PACK");
    }
    async function confirmEntitlements() {
        setCheckoutState("loading");
        setCheckoutError(null);
        try {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/entitlements"), {
                credentials: "include",
                cache: "no-store"
            });
            const payload = await response.json();
            if (!response.ok) throw new Error(payload.error ?? "Entitlements could not be checked");
            const attack = payload.entitlements?.find((item)=>item.kind === "ATTACK_PACK")?.quantityRemaining ?? 0;
            const defense = payload.entitlements?.find((item)=>item.kind === "DEFENSE_PACK")?.quantityRemaining ?? 0;
            setEntitlementStatus(`${attack} attack shots · ${defense} defense placements confirmed`);
            setCheckoutState("idle");
        } catch (error) {
            setCheckoutState("error");
            setCheckoutError(error instanceof Error ? error.message : "Entitlements could not be checked");
        }
    }
    const beginDefense = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.beginDefense);
    async function createRecoveryCode() {
        setRecoveryState("loading");
        setRecoveryError(null);
        try {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/recovery/create"), {
                method: "POST",
                credentials: "include"
            });
            const payload = await response.json();
            if (!response.ok || !payload.recoveryCode) throw new Error(payload.error ?? "Recovery code could not be created");
            setRecoveryCode(payload.recoveryCode);
            setRecoveryState("success");
        } catch (error) {
            setRecoveryState("error");
            setRecoveryError(error instanceof Error ? error.message : "Recovery code could not be created");
        }
    }
    async function submitCoronation() {
        setCoronationState("loading");
        setCheckoutError(null);
        try {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/identity"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    displayName,
                    identityType,
                    destinationUrl: destinationUrl || null,
                    message: message || null,
                    socialHandle: socialHandle || null,
                    ctaChoice
                })
            });
            const payload = await response.json();
            if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "The throne could not be coronated");
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState().setSnapshot(payload.snapshot);
            setCoronationState("success");
            closeSheet();
        } catch (error) {
            setCoronationState("error");
            setCheckoutError(error instanceof Error ? error.message : "The throne could not be coronated");
        }
    }
    async function claimRecovery() {
        setRecoveryState("loading");
        setRecoveryError(null);
        try {
            const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/recovery/claim"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    code: recoveryInput
                })
            });
            const payload = await response.json();
            if (!response.ok) throw new Error(payload.error ?? "Recovery code could not be claimed");
            setRecoveryState("success");
            window.location.reload();
        } catch (error) {
            setRecoveryState("error");
            setRecoveryError(error instanceof Error ? error.message : "Recovery code could not be claimed");
        }
    }
    if (!activeSheet) return null;
    if (activeSheet === "share") {
        const shareUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "https://siegeme.com";
        const shareCardUrl = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "https://api.siegeme.com/share-card/current.svg";
        const share = async ()=>{
            if (navigator.share) await navigator.share({
                title: "Siege Me",
                text: "Watch the live global siege.",
                url: shareUrl
            });
            else await navigator.clipboard?.writeText(shareUrl);
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
            title: "Share the live siege",
            onClose: closeSheet,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "sheet-lede",
                    children: "Send the current reign to someone who wants to watch the fortress fall."
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 420,
                    columnNumber: 69
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "share-link",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "LIVE REIGN LINK"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 420,
                            columnNumber: 198
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: shareUrl
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 420,
                            columnNumber: 226
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 420,
                    columnNumber: 170
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "sheet-primary",
                    onClick: ()=>void share(),
                    children: [
                        "Copy or share link",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "↗"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 420,
                            columnNumber: 340
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 420,
                    columnNumber: 259
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "secondary-action share-card-link",
                    href: shareCardUrl,
                    target: "_blank",
                    rel: "noreferrer",
                    children: [
                        "Open share card",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "↗"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 420,
                            columnNumber: 479
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 420,
                    columnNumber: 363
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted-note",
                    children: "The link is a public view. It never grants payment, authority, or identity access. The card is a deterministic public summary."
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 420,
                    columnNumber: 497
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 420,
            columnNumber: 12
        }, this);
    }
    if (activeSheet === "summary") {
        const totalDamage = shotLog.reduce((total, shot)=>total + shot.damage, 0);
        const coreShots = shotLog.filter((shot)=>shot.targetId === "core:main").length;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
            title: "Your shots are spent",
            onClose: ()=>{
                closeSheet();
                resetAttack();
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "sheet-lede",
                    children: "Every paid attempt in this pack has been resolved by the live authority. Outcomes are recorded against this reign for everyone."
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 425,
                    columnNumber: 97
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "detail-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: shotLog.length
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 425,
                                    columnNumber: 289
                                }, this),
                                "shots fired"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 425,
                            columnNumber: 283
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: totalDamage
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 425,
                                    columnNumber: 346
                                }, this),
                                "total damage"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 425,
                            columnNumber: 340
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: coreShots
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 425,
                                    columnNumber: 401
                                }, this),
                                "core hits"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 425,
                            columnNumber: 395
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: shotLog.filter((shot)=>shot.targetId === "miss").length
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 425,
                                    columnNumber: 451
                                }, this),
                                "misses"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 425,
                            columnNumber: 445
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 425,
                    columnNumber: 254
                }, this),
                shotLog.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "history-list",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "card-label",
                            children: "SHOT RECORD"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 425,
                            columnNumber: 599
                        }, this),
                        shotLog.map((shot, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            "SHOT ",
                                            index + 1
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 425,
                                        columnNumber: 715
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: [
                                            shot.targetId.replace(":", " "),
                                            " · −",
                                            shot.damage
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 425,
                                        columnNumber: 748
                                    }, this)
                                ]
                            }, `${shot.targetId}:${index}`, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 425,
                                columnNumber: 676
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 425,
                    columnNumber: 569
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "sheet-primary",
                    onClick: ()=>{
                        closeSheet();
                        resetAttack();
                    },
                    children: [
                        "Back to the siege",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "→"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 425,
                            columnNumber: 928
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 425,
                    columnNumber: 828
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted-note",
                    children: "Another pack can be bought at any time — unused packs never expire with the reign."
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 425,
                    columnNumber: 951
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 425,
            columnNumber: 12
        }, this);
    }
    if (activeSheet === "coronation") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
        title: "Take the throne",
        onClose: closeSheet,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "sheet-lede",
                children: "Your decisive shot opened a new reign. Publish a bounded public identity and the fortress will be regenerated for everyone."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 96
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-field",
                        children: [
                            "DISPLAY NAME",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: displayName,
                                onChange: (event)=>setDisplayName(event.target.value),
                                maxLength: 48,
                                placeholder: "Your name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 318
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 276
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-field",
                        children: [
                            "IDENTITY TYPE",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: identityType,
                                onChange: (event)=>setIdentityType(event.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Person"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 581
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Company"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 604
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Product"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 628
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Project"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 652
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Community"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 676
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Campaign"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 702
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Creator"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 727
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 494
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 451
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-field full-field",
                        children: [
                            "DESTINATION URL ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-optional",
                                children: "OPTIONAL"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 825
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: destinationUrl,
                                onChange: (event)=>setDestinationUrl(event.target.value),
                                maxLength: 2048,
                                placeholder: "https://..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 873
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 768
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-field",
                        children: [
                            "SOCIAL HANDLE ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-optional",
                                children: "OPTIONAL"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 1060
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: socialHandle,
                                onChange: (event)=>setSocialHandle(event.target.value),
                                maxLength: 41,
                                placeholder: "@yourname"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 1108
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 1016
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-field",
                        children: [
                            "CTA",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: ctaChoice,
                                onChange: (event)=>setCtaChoice(event.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "VISIT",
                                        children: "Visit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 1357
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "FOLLOW",
                                        children: "Follow"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 1393
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "LEARN_MORE",
                                        children: "Learn more"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 1431
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "SUPPORT",
                                        children: "Support"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 427,
                                        columnNumber: 1477
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 1276
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 1243
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "form-field full-field",
                        children: [
                            "MESSAGE ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-optional",
                                children: "OPTIONAL"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 1583
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: message,
                                onChange: (event)=>setMessage(event.target.value),
                                maxLength: 160,
                                placeholder: "A short message for the live world"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 427,
                                columnNumber: 1631
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 1534
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 249
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "sheet-primary",
                onClick: submitCoronation,
                disabled: coronationState === "loading" || !displayName.trim(),
                children: [
                    coronationState === "loading" ? "Starting the new reign…" : "Publish and begin reign",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 2003
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 1791
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "secondary-action",
                onClick: createRecoveryCode,
                disabled: recoveryState === "loading",
                children: recoveryState === "loading" ? "Creating recovery code…" : "Create cross-device recovery code"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 2026
            }, this),
            recoveryCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "recovery-code",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "STORE THIS ONCE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 2283
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: recoveryCode
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 2311
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: "It expires in 30 days and can be used once."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 427,
                        columnNumber: 2342
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 2252
            }, this),
            (checkoutError || recoveryError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: checkoutError ?? recoveryError
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 2444
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Automated safety moderation checks identity type, markup, URL scheme, private hosts, and field limits before the identity is published."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 427,
                columnNumber: 2520
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 427,
        columnNumber: 44
    }, this);
    if (activeSheet === "recovery") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
        title: "Recover a reign",
        onClose: closeSheet,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "sheet-lede",
                children: "Paste the one-time recovery code created during coronation. This restores the silent player identity on this device without adding a login wall."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 428,
                columnNumber: 94
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "form-field full-field",
                children: [
                    "RECOVERY CODE",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: recoveryInput,
                        onChange: (event)=>setRecoveryInput(event.target.value.toUpperCase()),
                        placeholder: "SIEGE-...",
                        autoCapitalize: "characters"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 428,
                        columnNumber: 322
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 428,
                columnNumber: 268
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "sheet-primary",
                onClick: claimRecovery,
                disabled: recoveryState === "loading" || !recoveryInput.trim(),
                children: [
                    recoveryState === "loading" ? "Checking code…" : "Restore identity",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 428,
                        columnNumber: 677
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 428,
                columnNumber: 486
            }, this),
            recoveryError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: recoveryError
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 428,
                columnNumber: 718
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Codes are hashed in D1 and cannot be displayed again after creation."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 428,
                columnNumber: 777
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 428,
        columnNumber: 42
    }, this);
    if (activeSheet === "identity") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
        title: snapshot?.ruler?.displayName ?? "The ruler",
        onClose: closeSheet,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "identity-sheet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "large-avatar",
                        children: "FH"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 429,
                        columnNumber: 154
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sheet-kicker",
                                children: [
                                    "CURRENT RULER · ",
                                    snapshot?.ruler?.identityType
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 429,
                                columnNumber: 197
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sheet-message",
                                children: snapshot?.ruler?.message
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 429,
                                columnNumber: 276
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sheet-stats",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: snapshot?.reign?.ordinal.toString().padStart(2, "0")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SiegeApp.tsx",
                                                lineNumber: 429,
                                                columnNumber: 370
                                            }, this),
                                            "reign"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 429,
                                        columnNumber: 364
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: snapshot?.reign ? formatDuration(snapshot.reign.startedAt, skew) : "--"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SiegeApp.tsx",
                                                lineNumber: 429,
                                                columnNumber: 459
                                            }, this),
                                            "duration"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 429,
                                        columnNumber: 453
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: snapshot?.worldVersion
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SiegeApp.tsx",
                                                lineNumber: 429,
                                                columnNumber: 570
                                            }, this),
                                            "world version"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 429,
                                        columnNumber: 564
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 429,
                                columnNumber: 335
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 429,
                        columnNumber: 192
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 429,
                columnNumber: 122
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Identity details are locked to this reign. Destination links will appear here only after a moderated public identity is published."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 429,
                columnNumber: 649
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 429,
        columnNumber: 42
    }, this);
    if (activeSheet === "attack") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
        title: "Choose your angle",
        onClose: closeSheet,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "sheet-lede",
                children: "A paid pack is three finite shots. Buy the pack first, then claim one live turn before aiming."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 94
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "purchase-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-label",
                                children: "ATTACK PACK"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 430,
                                columnNumber: 254
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "3 shots"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 430,
                                columnNumber: 301
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                children: "one-time · outcome depends on aim and the live fortress"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 430,
                                columnNumber: 325
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 430,
                        columnNumber: 249
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "price",
                        children: "$3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 430,
                        columnNumber: 401
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 218
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "sheet-primary",
                onClick: startAttackCheckout,
                disabled: checkoutState === "loading",
                children: [
                    checkoutState === "loading" ? "Opening secure checkout…" : "Buy 3 shots",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 430,
                        columnNumber: 617
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 440
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "secondary-action",
                onClick: ()=>void confirmEntitlements(),
                disabled: checkoutState === "loading",
                children: "Check confirmed shots"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 640
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "secondary-action",
                onClick: ()=>void claimTurn(),
                disabled: turnStatus === "claiming",
                children: turnStatus === "claiming" ? "Claiming live turn…" : turnStatus === "queued" ? "Queued for next turn" : "Use confirmed shots · claim turn"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 789
            }, this),
            entitlementStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "confirmed-note",
                children: entitlementStatus
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 1066
            }, this),
            turnStatus === "queued" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "queue-note",
                role: "status",
                children: [
                    "Queued for the next live turn",
                    queuePosition ? ` · position ${queuePosition}` : "",
                    ". This sheet can stay open while the authority promotes you."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 1148
            }, this),
            (checkoutError || turnStatus !== "queued" && turnError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: checkoutError ?? turnError
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 1397
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Keyboard controls: arrows or A/D/W/S aim, +/- changes power, Space or Enter fires once a live turn is active."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 1469
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Dodo confirms payment on the server. A checkout return never grants shots by itself."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 430,
                columnNumber: 1608
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 430,
        columnNumber: 40
    }, this);
    if (activeSheet === "defend") {
        const slots = snapshot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$world$2f$generator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateFortress"])(snapshot.worldSeed, snapshot.generatorVersion).defenseSlots.filter((slot)=>!snapshot.activeDefenses.some((defense)=>defense.slotId === slot.id)) : [];
        const braceEligible = snapshot?.components.some((component)=>component.state === "DAMAGED" || component.state === "CRITICAL") ?? false;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
            title: "Hold the line",
            onClose: closeSheet,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "sheet-lede",
                    children: "Choose a finite shield or brace between live turns. Defense delays destruction, but never heals the Core."
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 431,
                    columnNumber: 427
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "defense-options",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "option-icon",
                                    children: "◌"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 600
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Shield"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 638
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: "absorbs two projectile impacts at the selected approach"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 661
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "secondary-action",
                                    onClick: ()=>startCheckout("DEFENSE_PACK"),
                                    disabled: checkoutState === "loading",
                                    children: [
                                        "Buy shield · ",
                                        formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? 300)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 731
                                }, this),
                                slots.filter((slot)=>slot.type === "SHIELD").map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "secondary-action",
                                        onClick: ()=>{
                                            beginDefense("SHIELD", slot.id);
                                            closeSheet();
                                        },
                                        children: [
                                            "Preview ",
                                            slot.id.replace("shield_slot:", "").replaceAll("_", " ")
                                        ]
                                    }, slot.id, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 431,
                                        columnNumber: 997
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 431,
                            columnNumber: 595
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "option-icon",
                                    children: "⌗"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 1203
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: "Brace"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 1241
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: "absorbs one projectile impact and protects a damaged structure"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 1263
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "secondary-action",
                                    onClick: ()=>startCheckout("DEFENSE_PACK"),
                                    disabled: checkoutState === "loading",
                                    children: [
                                        "Buy brace · ",
                                        formatMoney(snapshot?.reign?.nextDefensePriceMinor ?? 300)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 1340
                                }, this),
                                braceEligible ? slots.filter((slot)=>slot.type === "BRACE").map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "secondary-action",
                                        onClick: ()=>{
                                            beginDefense("BRACE", slot.id);
                                            closeSheet();
                                        },
                                        children: [
                                            "Preview ",
                                            slot.id.replace("brace_slot:", "").replaceAll("_", " ")
                                        ]
                                    }, slot.id, true, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 431,
                                        columnNumber: 1620
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "muted-note",
                                    children: "BRACE unlocks after a structure is damaged or critical."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 1815
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 431,
                            columnNumber: 1198
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 431,
                    columnNumber: 562
                }, this),
                checkoutError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "error-note",
                    role: "alert",
                    children: checkoutError
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 431,
                    columnNumber: 1931
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted-note",
                    children: "The next placement raises the price. Placement is checked against the live slot and world version after you confirm."
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 431,
                    columnNumber: 1990
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 431,
            columnNumber: 377
        }, this);
    }
    if (activeSheet === "how") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
        title: "How the siege works",
        onClose: closeSheet,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "how-steps",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "01 · Watch"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 125
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Everyone sees the same fortress and versioned world."
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 152
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 432,
                        columnNumber: 120
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "02 · Choose"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 228
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Attackers buy finite shots. Defenders place finite shields and braces."
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 256
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 432,
                        columnNumber: 223
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "03 · Aim"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 350
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Drag the world to set yaw, elevation, and power. The authority resolves the shot."
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 375
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 432,
                        columnNumber: 345
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "04 · Rule"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 480
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "When the Core falls, the decisive conqueror can publish the next reign."
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 432,
                                columnNumber: 506
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 432,
                        columnNumber: 475
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 432,
                columnNumber: 93
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SoundControls, {}, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 432,
                columnNumber: 602
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Payments confirm on the server. Redirects, local animations, and client predictions never grant damage or ownership."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 432,
                columnNumber: 619
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 432,
        columnNumber: 37
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sheet, {
        title: "The siege, at a glance",
        onClose: closeSheet,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "detail-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    snapshot?.reign?.siegeCharge ?? 0,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 433,
                                columnNumber: 104
                            }, this),
                            "siege charge"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 98
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    snapshot?.reign?.royalGuardCharge ?? 0,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 433,
                                columnNumber: 182
                            }, this),
                            "royal guard",
                            snapshot?.reign?.royalShieldPulseArmed ? " · pulse armed" : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 176
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: snapshot?.worldVersion
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 433,
                                columnNumber: 328
                            }, this),
                            "state version"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 322
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: snapshot?.components.filter((item)=>item.state === "DESTROYED").length
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 433,
                                columnNumber: 395
                            }, this),
                            "structures down"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 389
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 69
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "This view is the versioned snapshot received from the Cloudflare siege authority."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 514
            }, this),
            contributorsStatus === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Loading reign contributors…"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 662
            }, this),
            contributorsStatus === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: "Contribution records are temporarily unavailable."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 755
            }, this),
            contributors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "history-list",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-label",
                        children: "REIGN CONTRIBUTORS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 906
                    }, this),
                    contributors.slice(0, 5).map((contributor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: contributor.titles[0] ?? contributor.playerLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 433,
                                    columnNumber: 1042
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: [
                                        contributor.damage,
                                        " damage · ",
                                        contributor.coreDamage,
                                        " Core · ",
                                        contributor.defensesPlaced,
                                        " defenses"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 433,
                                    columnNumber: 1109
                                }, this)
                            ]
                        }, contributor.playerLabel, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 433,
                            columnNumber: 1007
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 876
            }, this),
            eventsStatus === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Loading recent impacts…"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 1269
            }, this),
            eventsStatus === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: "Recent impacts are temporarily unavailable."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 1352
            }, this),
            eventsStatus === "ready" && events.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "No recent impacts are recorded in the retained event window."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 1491
            }, this),
            events.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "history-list",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-label",
                        children: "RECENT IMPACTS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 1634
                    }, this),
                    events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: event.type === "ATTACK_RESOLVED" ? "IMPACT" : "DEFENSE"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 433,
                                    columnNumber: 1738
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: event.targetId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["impactLabel"])(event.targetId, event.damage ?? 0, event.projectileType ?? "STANDARD", snapshot) : "world state changed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 433,
                                    columnNumber: 1812
                                }, this)
                            ]
                        }, event.eventSequence, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 433,
                            columnNumber: 1707
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 1604
            }, this),
            historyStatus === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "Loading recent reigns…"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 2009
            }, this),
            historyStatus === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-note",
                role: "alert",
                children: "Recent reigns are temporarily unavailable."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 2092
            }, this),
            historyStatus === "ready" && history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted-note",
                children: "No archived reigns are available yet."
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 2232
            }, this),
            history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "history-list",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-label",
                        children: "RECENT REIGNS"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 433,
                        columnNumber: 2353
                    }, this),
                    history.map((reign)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "REIGN ",
                                        String(reign.ordinal).padStart(2, "0")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 433,
                                    columnNumber: 2446
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                    children: [
                                        reign.endedAt ? new Date(reign.endedAt).toLocaleDateString() : "active",
                                        " · ",
                                        reign.summary?.components.filter((item)=>item.state === "DESTROYED").length ?? 0,
                                        " structures down"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SiegeApp.tsx",
                                    lineNumber: 433,
                                    columnNumber: 2509
                                }, this)
                            ]
                        }, reign.id, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 433,
                            columnNumber: 2426
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 433,
                columnNumber: 2323
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 433,
        columnNumber: 10
    }, this);
}
function AttackControls() {
    const aim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.attackAim);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.resetAttack);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.lastResult);
    const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.attackError);
    const impact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.impactEffect);
    const remainingShots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.remainingShots);
    const breakerShotsRemaining = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.breakerShotsRemaining);
    const claimTurn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.claimTurn);
    const cancelTurn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.cancelTurn);
    const turnStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.turnStatus);
    const turn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.turn);
    const skew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.serverClockSkewMs);
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!turn) return;
        const timer = window.setInterval(()=>setNow(Date.now()), 250);
        return ()=>window.clearInterval(timer);
    }, [
        turn
    ]);
    if (!mode.startsWith("attack")) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "shot-result error-result",
            role: "alert",
            children: [
                error,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: reset,
                    children: "dismiss"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 458,
                    columnNumber: 78
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 458,
            columnNumber: 16
        }, this) : result ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "shot-result",
            role: "status",
            children: [
                result,
                remainingShots !== null && remainingShots > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "confirmed-note",
                            children: [
                                remainingShots,
                                " shot",
                                remainingShots === 1 ? "" : "s",
                                " left"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 458,
                            columnNumber: 238
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>void claimTurn(),
                            disabled: turnStatus === "claiming",
                            children: turnStatus === "claiming" ? "claiming…" : "fire next shot"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SiegeApp.tsx",
                            lineNumber: 458,
                            columnNumber: 337
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 458,
                    columnNumber: 236
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: reset,
                    children: "close"
                }, void 0, false, {
                    fileName: "[project]/src/components/SiegeApp.tsx",
                    lineNumber: 458,
                    columnNumber: 490
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SiegeApp.tsx",
            lineNumber: 458,
            columnNumber: 136
        }, this) : null
    }, void 0, false, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 457,
        columnNumber: 5
    }, this);
    const remainingTurnSeconds = turn ? Math.max(0, Math.ceil((turn.expiresAt - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverNow"])(now, skew)) / 1000)) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "attack-hud",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "eyebrow",
                        children: "LIVE ATTACK · SERVER AUTHORITY"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 62
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: mode === "attack-flight" ? "Impact in progress" : mode === "attack-requesting" ? "Validating attack" : "Pull back. Pick a wall."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 125
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: mode === "attack-flight" ? "The committed impact is travelling to the fortress." : mode === "attack-requesting" ? "The siege authority is checking your entitlement and aim." : "Drag anywhere on the world, then release to fire."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 264
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        className: "input-help",
                        children: "Keyboard: arrows or A/D/W/S to aim, +/- to change power, Space or Enter to fire."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 500
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 462,
                columnNumber: 57
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "attack-readout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "SHOT ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: turn ? `${turn.shotNumber}/3` : "-"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 462,
                                columnNumber: 667
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 656
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "POWER ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    Math.round(aim.power * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 462,
                                columnNumber: 740
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 728
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "AIM ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: aim.yaw < -0.2 ? "LEFT" : aim.yaw > 0.2 ? "RIGHT" : "CENTER"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 462,
                                columnNumber: 804
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 794
                    }, this),
                    remainingShots !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "LEFT ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: remainingShots
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 462,
                                columnNumber: 929
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 918
                    }, this),
                    remainingTurnSeconds !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "TURN ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    remainingTurnSeconds,
                                    "s"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 462,
                                columnNumber: 1015
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 1004
                    }, this),
                    breakerShotsRemaining > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "BREAKER ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    breakerShotsRemaining,
                                    " READY"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 462,
                                columnNumber: 1107
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 1093
                    }, this),
                    mode === "attack-aim" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "secondary-action attack-cancel",
                        onClick: ()=>void cancelTurn(),
                        children: "Release turn"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 462,
                        columnNumber: 1187
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 462,
                columnNumber: 624
            }, this),
            impact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "damage-number",
                children: [
                    "−",
                    impact.damage
                ]
            }, impact.key, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 462,
                columnNumber: 1311
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 462,
        columnNumber: 10
    }, this);
}
function SiegeApp() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.mode);
    const loadingStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.loadingStep);
    const setLoadingStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.setLoadingStep);
    const setSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.setSnapshot);
    const setRealtimeSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.setRealtimeSnapshot);
    const setRealtimeDelta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.setRealtimeDelta);
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.snapshot);
    const setMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"])((state)=>state.setMode);
    const hasSnapshot = Boolean(snapshot);
    const worldText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>()=>{
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState();
            return JSON.stringify({
                coordinateSystem: "world x left/right, y up, z front/back; screen camera is fixed 3/4",
                mode: state.mode,
                loadingStep: state.loadingStep,
                turnStatus: state.turnStatus,
                queuePosition: state.queuePosition,
                turn: state.turn ? {
                    id: state.turn.id,
                    reignId: state.turn.reignId,
                    shotNumber: state.turn.shotNumber,
                    expiresAt: state.turn.expiresAt
                } : null,
                aim: state.attackAim,
                projectile: state.projectile,
                impact: state.impactEffect,
                lastResult: state.lastResult,
                attackError: state.attackError,
                world: state.snapshot ? {
                    phase: state.snapshot.phase,
                    worldVersion: state.snapshot.worldVersion,
                    coreIntegrity: state.snapshot.reign?.coreIntegrity ?? null,
                    ruler: state.snapshot.ruler?.displayName ?? null,
                    components: state.snapshot.components.filter((item)=>item.state !== "INTACT").map((item)=>`${item.componentId}:${item.state}`)
                } : null
            });
        }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.render_game_to_text = worldText;
        window.advanceTime = (ms)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState().advanceTime(ms);
        let cancelled = false;
        const query = new URLSearchParams(window.location.search);
        const empty = query.get("empty") === "1";
        const load = async ()=>{
            const probe = document.createElement("canvas");
            const graphicsSupported = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
            if (!graphicsSupported) {
                setMode("unsupported");
                return;
            }
            setLoadingStep("Connecting");
            setLoadingStep("Loading world");
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])(`/world${empty ? "?empty=1" : ""}`), {
                    cache: "no-store",
                    credentials: "include"
                });
                if (!response.ok) throw new Error("Live world unavailable");
                const loaded = await response.json();
                if (!cancelled) {
                    setLoadingStep("World ready");
                    setSnapshot(loaded);
                }
            } catch  {
                if (!cancelled) setMode("unavailable");
            }
        };
        void load();
        return ()=>{
            cancelled = true;
        };
    }, [
        setLoadingStep,
        setMode,
        setSnapshot,
        worldText
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hasSnapshot) return;
        const configuredUrl = ("TURBOPACK compile-time value", "ws://127.0.0.1:55710/ws");
        const localHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const socketUrl = configuredUrl ?? (localHost ? `ws://${window.location.hostname}:8787/ws` : `wss://api.${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productConfig"].domain}/ws`);
        let cancelled = false;
        let retryTimer;
        let socket;
        let lastEventSequence = 0;
        const connect = ()=>{
            if (cancelled) return;
            socket = new WebSocket(socketUrl);
            socket.onopen = ()=>{
                if (!cancelled && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState().mode === "reconnecting") setMode(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState().snapshot?.phase === "ACTIVE" ? "spectator" : "empty");
            };
            socket.onmessage = (event)=>{
                try {
                    for (const message of (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flattenRealtimeMessages"])(JSON.parse(event.data))){
                        const typed = message;
                        if (typeof typed.eventSequence === "number") {
                            const sequenceAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["realtimeSequenceAction"])(lastEventSequence, typed.eventSequence);
                            if (sequenceAction === "resync") {
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState().setResyncing(true);
                                socket?.send("resync");
                                return;
                            }
                            if (sequenceAction === "ignore") continue;
                            lastEventSequence = typed.eventSequence;
                        }
                        if (typed.snapshot && (typed.type === "snapshot" || typed.type === "turn_claimed" || typed.type === "attack_resolved" || typed.type === "reign_started")) setRealtimeSnapshot(typed.snapshot);
                        if (typed.delta && (typed.type === "attack_resolved" || typed.type === "defense_placed")) setRealtimeDelta(typed.delta);
                        // Spectators see other players' impacts land (S04) without minting anything.
                        if (typed.type === "attack_resolved" && typed.impact) {
                            const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState();
                            if ((state.mode === "spectator" || state.mode === "empty") && !state.projectile) {
                                state.showImpact({
                                    key: `remote-${typed.eventSequence ?? crypto.randomUUID()}`,
                                    targetId: typed.impact.targetId,
                                    damage: typed.impact.damage,
                                    projectileType: typed.projectileType ?? "STANDARD",
                                    impactPoint: typed.impact.point ?? null
                                });
                            }
                        }
                    }
                } catch  {
                    socket?.close();
                }
            };
            socket.onclose = ()=>{
                if (cancelled) return;
                const currentMode = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSiegeStore"].getState().mode;
                if (currentMode === "spectator" || currentMode === "empty") setMode("reconnecting");
                retryTimer = window.setTimeout(connect, 1500);
            };
            socket.onerror = ()=>socket?.close();
        };
        connect();
        return ()=>{
            cancelled = true;
            if (retryTimer) window.clearTimeout(retryTimer);
            socket?.close();
        };
    }, [
        hasSnapshot,
        setMode,
        setRealtimeDelta,
        setRealtimeSnapshot
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (snapshot && mode === "loading") setMode(snapshot.phase === "ACTIVE" ? "spectator" : "empty");
    }, [
        mode,
        setMode,
        snapshot
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `siege-app mode-${mode}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GameCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "vignette"
            }, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DebugOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 577,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckoutStatus, {}, void 0, false, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 578,
                columnNumber: 7
            }, this),
            mode === "loading" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "loading-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductMark, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 579,
                        columnNumber: 62
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "loading-sigil",
                                children: "✦"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 579,
                                columnNumber: 109
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "THE GLOBAL THRONE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 579,
                                columnNumber: 147
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "Preparing the siege"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 579,
                                columnNumber: 191
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "loading-step",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "loading-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SiegeApp.tsx",
                                        lineNumber: 579,
                                        columnNumber: 247
                                    }, this),
                                    loadingStep
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 579,
                                columnNumber: 219
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 579,
                        columnNumber: 77
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "loading-footer",
                        children: [
                            "one throne · one world · ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["productConfig"].domain
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 579,
                        columnNumber: 304
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 579,
                columnNumber: 30
            }, this),
            mode !== "loading" && mode !== "unavailable" && mode !== "unsupported" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "top-chrome",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductMark, {}, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 580,
                                columnNumber: 115
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IdentityChip, {}, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 580,
                                columnNumber: 130
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CoreIndicator, {}, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 580,
                                columnNumber: 146
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 84
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveMeta, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 172
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProtectionNotice, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 184
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveAttackChip, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 204
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CriticalNotice, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 224
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LiveTicker, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 242
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReconnectingOverlay, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 256
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DefeatCinematic, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 279
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryActions, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 298
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DefensePlacementHud, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 316
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AttackControls, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 339
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContextSheet, {}, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 580,
                        columnNumber: 357
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 580,
                columnNumber: 82
            }, this),
            mode === "unavailable" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "unavailable-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "LIVE AUTHORITY OFFLINE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 581,
                        columnNumber: 68
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "The siege is unavailable."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 581,
                        columnNumber: 117
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "This client will not substitute a local world. Start the Cloudflare authority or check the deployment configuration, then reconnect."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 581,
                        columnNumber: 151
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sheet-primary",
                        onClick: ()=>window.location.reload(),
                        children: [
                            "Reconnect ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "↻"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 581,
                                columnNumber: 375
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 581,
                        columnNumber: 290
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 581,
                columnNumber: 34
            }, this),
            mode === "unsupported" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "unavailable-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "GRAPHICS UNAVAILABLE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 582,
                        columnNumber: 68
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "This browser cannot render the siege."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 582,
                        columnNumber: 115
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Siege Me needs WebGL for the live fortress. Update your browser or enable hardware acceleration, then try again."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 582,
                        columnNumber: 161
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sheet-primary",
                        onClick: ()=>window.location.reload(),
                        children: [
                            "Try again ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "↻"
                            }, void 0, false, {
                                fileName: "[project]/src/components/SiegeApp.tsx",
                                lineNumber: 582,
                                columnNumber: 365
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 582,
                        columnNumber: 280
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 582,
                columnNumber: 34
            }, this),
            mode === "empty" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "empty-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "NO ACTIVE REIGN"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 583,
                        columnNumber: 56
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "The throne is empty."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 583,
                        columnNumber: 98
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "There is no ruler to attack yet. The first coronation seeds the world for everyone."
                    }, void 0, false, {
                        fileName: "[project]/src/components/SiegeApp.tsx",
                        lineNumber: 583,
                        columnNumber: 127
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SiegeApp.tsx",
                lineNumber: 583,
                columnNumber: 28
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SiegeApp.tsx",
        lineNumber: 574,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productConfig",
    ()=>productConfig
]);
const productConfig = {
    name: "Siege Me",
    domain: "siegeme.com",
    tagline: "Rule or ruin."
};
}),
"[project]/src/game/camera.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cameraPresetFor",
    ()=>cameraPresetFor,
    "easeOutHandoff",
    ()=>easeOutHandoff,
    "flightShakeOffset",
    ()=>flightShakeOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/timing.ts [app-ssr] (ecmascript)");
;
const LIVE = {
    position: [
        10.8,
        7.1,
        11.6
    ],
    target: [
        0,
        2.1,
        0
    ],
    fov: 37,
    transitionMs: 420
};
const ATTACK = {
    position: [
        9.1,
        5.9,
        10.1
    ],
    target: [
        0,
        2.35,
        0.25
    ],
    fov: 34,
    transitionMs: 360
};
const DEFENSE = {
    position: [
        8.6,
        6.2,
        10.7
    ],
    target: [
        0,
        2.45,
        0.35
    ],
    fov: 35,
    transitionMs: 360
};
const CORONATION = {
    position: [
        7.3,
        5.3,
        8.5
    ],
    target: [
        0,
        3.45,
        -0.2
    ],
    fov: 32,
    transitionMs: 780
};
const DEFEAT = {
    position: [
        5.9,
        4.35,
        6.8
    ],
    target: [
        0,
        4.05,
        0.85
    ],
    fov: 31,
    transitionMs: 680
};
function mobilePreset(preset, viewportWidth) {
    if (viewportWidth > 640) return preset;
    return {
        ...preset,
        position: [
            preset.position[0] * 0.86,
            preset.position[1] * 0.9,
            preset.position[2] * 0.86
        ],
        target: [
            preset.target[0],
            preset.target[1] + 0.16,
            preset.target[2]
        ],
        fov: Math.min(39, preset.fov + 2)
    };
}
function cameraPresetFor(input) {
    const defeat = input.mode === "defeat-cinematic" || input.pendingPhase === "CORONATION";
    const coronation = input.mode === "coronation" || input.phase === "CORONATION";
    const base = defeat ? DEFEAT : coronation ? CORONATION : input.mode === "attack-aim" || input.mode === "attack-flight" ? ATTACK : input.mode === "defense-placement" ? DEFENSE : LIVE;
    return mobilePreset(base, input.viewportWidth);
}
function easeOutHandoff(progress) {
    const clamped = Math.min(1, Math.max(0, progress));
    return 1 - Math.pow(1 - clamped, 1.8);
}
function flightShakeOffset(elapsedMs, enabled) {
    if (!enabled) return [
        0,
        0,
        0
    ];
    const elapsed = Math.max(0, elapsedMs);
    const envelope = Math.max(0, 1 - elapsed / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESENTATION_TIMING"].cameraShakeMs);
    if (envelope === 0) return [
        0,
        0,
        0
    ];
    const intensity = envelope * 0.045;
    return [
        Math.sin(elapsed * 0.08) * intensity,
        Math.cos(elapsed * 0.11) * intensity * 0.7,
        Math.sin(elapsed * 0.13) * intensity
    ];
}
}),
"[project]/src/game/client/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorityApiUrl",
    ()=>authorityApiUrl
]);
function authorityApiUrl(path) {
    const configured = process.env.NEXT_PUBLIC_SIEGE_API_URL;
    if (configured) return new URL(path, configured).toString();
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const localProxy = {
        "/world": "/api/world",
        "/session": "/api/session",
        "/attack": "/api/siege/attack",
        "/turn/claim": "/api/siege/turn/claim",
        "/turn/cancel": "/api/siege/turn/cancel",
        "/queue": "/api/siege/queue",
        "/entitlements": "/api/siege/entitlements",
        "/history": "/api/history",
        "/events": "/api/events",
        "/contributors": "/api/contributors",
        "/checkout/status": "/api/payments/status",
        "/defense/place": "/api/defense/place",
        "/identity": "/api/coronation/identity",
        "/recovery/create": "/api/recovery/create",
        "/recovery/claim": "/api/recovery/claim",
        "/checkout": "/api/payments/attack-checkout"
    };
    return localProxy[path] ?? path;
}
}),
"[project]/src/game/client/audio.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUDIO_SETTINGS_KEY",
    ()=>AUDIO_SETTINGS_KEY,
    "DEFAULT_AUDIO_SETTINGS",
    ()=>DEFAULT_AUDIO_SETTINGS,
    "normalizeAudioSettings",
    ()=>normalizeAudioSettings,
    "readAudioSettings",
    ()=>readAudioSettings,
    "saveAudioSettings",
    ()=>saveAudioSettings
]);
const AUDIO_SETTINGS_KEY = "siegeme:audio-settings";
const DEFAULT_AUDIO_SETTINGS = {
    muted: false,
    effectsVolume: 0.8
};
function normalizeAudioSettings(value) {
    return {
        muted: value?.muted === true,
        effectsVolume: Math.min(1, Math.max(0, typeof value?.effectsVolume === "number" && Number.isFinite(value.effectsVolume) ? value.effectsVolume : DEFAULT_AUDIO_SETTINGS.effectsVolume))
    };
}
function readAudioSettings() {
    if ("TURBOPACK compile-time truthy", 1) return DEFAULT_AUDIO_SETTINGS;
    //TURBOPACK unreachable
    ;
}
function saveAudioSettings(settings) {
    const normalized = normalizeAudioSettings(settings);
    if ("TURBOPACK compile-time truthy", 1) return normalized;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/src/game/client/graphics-policy.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "graphicsPolicyFor",
    ()=>graphicsPolicyFor
]);
function graphicsPolicyFor(viewportWidth, deviceMemory) {
    const safeViewportWidth = Number.isFinite(viewportWidth) ? Math.max(0, viewportWidth) : 0;
    const safeDeviceMemory = typeof deviceMemory === "number" && Number.isFinite(deviceMemory) && deviceMemory > 0 ? deviceMemory : null;
    const reason = safeViewportWidth < 700 ? "narrow-viewport" : safeDeviceMemory !== null && safeDeviceMemory <= 4 ? "low-device-memory" : "none";
    return {
        reduced: reason !== "none",
        reason,
        viewportWidth: safeViewportWidth,
        deviceMemory: safeDeviceMemory
    };
}
}),
"[project]/src/game/client/realtime.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_REALTIME_BATCH_EVENTS",
    ()=>MAX_REALTIME_BATCH_EVENTS,
    "applyWorldDelta",
    ()=>applyWorldDelta,
    "flattenRealtimeMessages",
    ()=>flattenRealtimeMessages,
    "realtimeSequenceAction",
    ()=>realtimeSequenceAction
]);
const MAX_REALTIME_BATCH_EVENTS = 32;
function realtimeSequenceAction(lastEventSequence, incomingEventSequence) {
    if (!Number.isInteger(incomingEventSequence) || incomingEventSequence <= lastEventSequence) return "ignore";
    if (lastEventSequence > 0 && incomingEventSequence > lastEventSequence + 1) return "resync";
    return "apply";
}
function applyWorldDelta(snapshot, delta) {
    if (delta.worldVersion <= snapshot.worldVersion) return snapshot;
    const changed = new Map(delta.changes.map((component)=>[
            component.componentId,
            component
        ]));
    return {
        ...snapshot,
        worldVersion: delta.worldVersion,
        phase: delta.phase,
        currentReignId: delta.currentReignId,
        reign: delta.reign,
        ruler: delta.ruler,
        coronation: delta.coronation,
        activeDefenses: delta.activeDefenses,
        activeAttack: delta.activeAttack,
        serverNow: delta.serverNow,
        components: snapshot.components.map((component)=>changed.get(component.componentId) ?? component)
    };
}
function flattenRealtimeMessages(raw) {
    if (!raw || typeof raw !== "object") return [];
    const message = raw;
    if (message.type === "batch" && Array.isArray(message.events)) {
        return message.events.slice(0, MAX_REALTIME_BATCH_EVENTS).filter((event)=>Boolean(event && typeof event === "object"));
    }
    return [
        message
    ];
}
}),
"[project]/src/game/client/server-time.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Convert a local wall-clock reading into the authority's wall-clock domain. */ __turbopack_context__.s([
    "serverClockSkew",
    ()=>serverClockSkew,
    "serverNow",
    ()=>serverNow
]);
function serverNow(localNow, serverClockSkewMs) {
    return localNow + serverClockSkewMs;
}
function serverClockSkew(authorityNow, localNow) {
    return authorityNow - localNow;
}
}),
"[project]/src/game/client/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSiegeStore",
    ()=>useSiegeStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/realtime.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/labels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/presentation/timing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/client/server-time.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
const initialAim = {
    yaw: 0,
    elevation: 0.64,
    power: 0.5,
    isDragging: false
};
const useSiegeStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        mode: "loading",
        loadingStep: "Connecting",
        snapshot: null,
        attackAim: initialAim,
        turn: null,
        turnStatus: "idle",
        queuePosition: null,
        projectile: null,
        pendingSnapshot: null,
        impactEffect: null,
        lastResult: null,
        attackError: null,
        shotLog: [],
        remainingShots: null,
        breakerShotsRemaining: 0,
        resyncing: false,
        serverClockSkewMs: 0,
        activeSheet: null,
        defensePlacement: null,
        setLoadingStep: (loadingStep)=>set({
                loadingStep
            }),
        setSnapshot: (snapshot)=>set((state)=>{
                if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return state;
                return {
                    snapshot,
                    mode: snapshot.phase === "ACTIVE" ? "spectator" : "empty",
                    resyncing: false,
                    serverClockSkewMs: typeof snapshot.serverNow === "number" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverClockSkew"])(snapshot.serverNow, Date.now()) : state.serverClockSkewMs
                };
            }),
        setRealtimeSnapshot: (snapshot)=>set((state)=>{
                if (state.snapshot && snapshot.worldVersion < state.snapshot.worldVersion) return state;
                return {
                    snapshot,
                    resyncing: false,
                    serverClockSkewMs: typeof snapshot.serverNow === "number" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverClockSkew"])(snapshot.serverNow, Date.now()) : state.serverClockSkewMs,
                    mode: state.mode === "reconnecting" ? snapshot.phase === "ACTIVE" ? "spectator" : "empty" : state.mode
                };
            }),
        setRealtimeDelta: (delta)=>set((state)=>state.snapshot ? {
                    snapshot: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$realtime$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyWorldDelta"])(state.snapshot, delta),
                    mode: state.mode === "reconnecting" ? delta.phase === "ACTIVE" ? "spectator" : "empty" : state.mode,
                    serverClockSkewMs: typeof delta.serverNow === "number" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverClockSkew"])(delta.serverNow, Date.now()) : state.serverClockSkewMs
                } : state),
        setMode: (mode)=>set({
                mode
            }),
        openSheet: (activeSheet)=>set({
                activeSheet
            }),
        closeSheet: ()=>set({
                activeSheet: null
            }),
        beginAttack: ()=>{
            set({
                mode: "attack-aim",
                activeSheet: null,
                lastResult: null,
                attackError: null,
                attackAim: initialAim
            });
            void fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/session"), {
                method: "POST",
                credentials: "include"
            });
            void get().refreshEntitlements();
        },
        beginDefense: (type, slotId)=>set({
                mode: "defense-placement",
                activeSheet: null,
                defensePlacement: {
                    type,
                    slotId
                },
                attackError: null
            }),
        cancelDefense: ()=>set({
                mode: "spectator",
                defensePlacement: null,
                attackError: null
            }),
        submitDefensePlacement: async ()=>{
            const { snapshot, defensePlacement } = get();
            if (!snapshot || !defensePlacement || snapshot.phase !== "ACTIVE") return;
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/defense/place"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        commandId: crypto.randomUUID(),
                        reignId: snapshot.currentReignId,
                        expectedWorldVersion: snapshot.worldVersion,
                        ...defensePlacement
                    })
                });
                const payload = await response.json();
                if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "Defense placement was rejected");
                set({
                    snapshot: payload.snapshot,
                    mode: "spectator",
                    defensePlacement: null,
                    attackError: null,
                    lastResult: `${defensePlacement.type} anchored`
                });
            } catch (error) {
                set({
                    attackError: error instanceof Error ? error.message : "Defense placement was rejected"
                });
            }
        },
        claimTurn: async ()=>{
            const { snapshot } = get();
            if (!snapshot) return;
            set({
                turnStatus: "claiming",
                queuePosition: null,
                attackError: null
            });
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/turn/claim"), {
                    method: "POST",
                    credentials: "include"
                });
                const payload = await response.json();
                if (!response.ok) throw new Error(payload.error ?? "The live turn could not be claimed");
                if (payload.status === "ACTIVE" && payload.turn) {
                    set((state)=>({
                            turn: payload.turn,
                            turnStatus: "active",
                            queuePosition: null,
                            mode: "attack-aim",
                            activeSheet: null,
                            lastResult: null,
                            attackError: null,
                            attackAim: initialAim,
                            snapshot: payload.snapshot && (!state.snapshot || payload.snapshot.worldVersion >= state.snapshot.worldVersion) ? payload.snapshot : state.snapshot,
                            serverClockSkewMs: payload.snapshot?.serverNow ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverClockSkew"])(payload.snapshot.serverNow, Date.now()) : state.serverClockSkewMs
                        }));
                } else {
                    set({
                        mode: "spectator",
                        turn: null,
                        turnStatus: "queued",
                        queuePosition: payload.position ?? null,
                        attackError: null
                    });
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                }
            } catch (error) {
                set({
                    turnStatus: "idle",
                    queuePosition: null,
                    attackError: error instanceof Error ? error.message : "The live turn could not be claimed"
                });
            }
        },
        cancelTurn: async ()=>{
            const { turnStatus } = get();
            if (turnStatus !== "active" && turnStatus !== "queued") return;
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/turn/cancel"), {
                    method: "POST",
                    credentials: "include"
                });
                const payload = await response.json();
                if (!response.ok || !payload.snapshot) throw new Error(payload.error ?? "The live turn could not be released");
                set((state)=>({
                        snapshot: payload.snapshot && (!state.snapshot || payload.snapshot.worldVersion >= state.snapshot.worldVersion) ? payload.snapshot : state.snapshot,
                        mode: "spectator",
                        turn: null,
                        turnStatus: "idle",
                        queuePosition: null,
                        attackError: null,
                        serverClockSkewMs: payload.snapshot?.serverNow ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$server$2d$time$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serverClockSkew"])(payload.snapshot.serverNow, Date.now()) : state.serverClockSkewMs
                    }));
            } catch (error) {
                set({
                    attackError: error instanceof Error ? error.message : "The live turn could not be released"
                });
            }
        },
        setAim: (aim)=>set((state)=>({
                    attackAim: {
                        ...state.attackAim,
                        ...aim
                    }
                })),
        fireAttack: async ()=>{
            const { snapshot, mode, turn, turnStatus, attackAim, remainingShots, breakerShotsRemaining } = get();
            if (!snapshot || mode !== "attack-aim" || turnStatus !== "active" || !turn) return;
            if (get().resyncing) {
                set({
                    attackError: "Reconnecting to the live world — try again in a moment."
                });
                return;
            }
            set({
                mode: "attack-requesting",
                lastResult: null,
                attackError: null
            });
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/attack"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        commandId: crypto.randomUUID(),
                        reignId: snapshot.currentReignId,
                        turnId: get().turn?.id ?? "turn:none",
                        expectedWorldVersion: snapshot.worldVersion,
                        simulationVersion: "ballistic-v1",
                        ...remainingShots === 0 && breakerShotsRemaining > 0 ? {
                            projectile: "BREAKER"
                        } : {},
                        ...attackAim
                    })
                });
                const payload = await response.json();
                if (!response.ok || !payload.impact || !payload.snapshot) {
                    set({
                        mode: "spectator",
                        turn: null,
                        turnStatus: "idle",
                        queuePosition: null,
                        attackError: payload.error ?? "The live siege rejected this attack."
                    });
                    return;
                }
                const projectileType = payload.projectile ?? "STANDARD";
                set({
                    mode: "attack-flight",
                    projectile: {
                        progress: 0,
                        targetId: payload.impact.targetId,
                        damage: payload.impact.damage,
                        commandKey: crypto.randomUUID(),
                        projectileType,
                        aim: {
                            yaw: attackAim.yaw,
                            elevation: attackAim.elevation,
                            power: attackAim.power
                        },
                        impactPoint: payload.impact.point ?? null,
                        flightSeconds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$timing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentationFlightSeconds"])(payload.impact.timeSeconds)
                    },
                    pendingSnapshot: payload.snapshot.worldVersion >= snapshot.worldVersion ? payload.snapshot : null
                });
            } catch  {
                set({
                    mode: "spectator",
                    turn: null,
                    turnStatus: "idle",
                    queuePosition: null,
                    attackError: "The live siege could not be reached. Try again."
                });
            }
        },
        refreshEntitlements: async ()=>{
            try {
                const response = await fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$client$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authorityApiUrl"])("/entitlements"), {
                    credentials: "include",
                    cache: "no-store"
                });
                if (!response.ok) return;
                const payload = await response.json();
                const attack = payload.entitlements?.find((item)=>item.kind === "ATTACK_PACK")?.quantityRemaining ?? 0;
                const breaker = payload.entitlements?.find((item)=>item.kind === "BREAKER_SHOT")?.quantityRemaining ?? 0;
                set({
                    remainingShots: attack,
                    breakerShotsRemaining: breaker
                });
                if (attack === 0 && get().shotLog.length > 0 && !get().activeSheet) set({
                    activeSheet: "summary"
                });
            } catch  {}
        },
        advanceTime: (ms)=>{
            const { mode, projectile, snapshot, pendingSnapshot } = get();
            if (mode !== "attack-flight" || !projectile || !snapshot) return;
            const progress = projectile.progress + ms / (projectile.flightSeconds * 1000);
            if (progress < 1) {
                set({
                    projectile: {
                        ...projectile,
                        progress
                    }
                });
                return;
            }
            const nextSnapshot = pendingSnapshot && pendingSnapshot.worldVersion >= snapshot.worldVersion ? pendingSnapshot : snapshot;
            set({
                snapshot: nextSnapshot,
                pendingSnapshot: null,
                projectile: null,
                turn: null,
                turnStatus: "idle",
                queuePosition: null,
                mode: nextSnapshot.phase === "CORONATION" ? "defeat-cinematic" : "spectator",
                activeSheet: nextSnapshot.phase === "CORONATION" ? null : get().activeSheet,
                lastResult: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["impactLabel"])(projectile.targetId, projectile.damage, projectile.projectileType, nextSnapshot),
                impactEffect: {
                    key: projectile.commandKey,
                    targetId: projectile.targetId,
                    damage: projectile.damage,
                    projectileType: projectile.projectileType,
                    impactPoint: projectile.impactPoint
                },
                shotLog: [
                    ...get().shotLog,
                    {
                        targetId: projectile.targetId,
                        damage: projectile.damage
                    }
                ]
            });
            void get().refreshEntitlements();
        },
        completeProjectile: ()=>{
            const state = get();
            if (state.mode !== "attack-flight" || !state.projectile || !state.snapshot) return;
            const projectile = state.projectile;
            const nextSnapshot = state.pendingSnapshot && state.pendingSnapshot.worldVersion >= state.snapshot.worldVersion ? state.pendingSnapshot : state.snapshot;
            set({
                snapshot: nextSnapshot,
                pendingSnapshot: null,
                projectile: null,
                turn: null,
                turnStatus: "idle",
                queuePosition: null,
                mode: nextSnapshot.phase === "CORONATION" ? "defeat-cinematic" : "spectator",
                activeSheet: nextSnapshot.phase === "CORONATION" ? null : state.activeSheet,
                lastResult: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$presentation$2f$labels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["impactLabel"])(projectile.targetId, projectile.damage, projectile.projectileType, nextSnapshot),
                impactEffect: {
                    key: projectile.commandKey,
                    targetId: projectile.targetId,
                    damage: projectile.damage,
                    projectileType: projectile.projectileType,
                    impactPoint: projectile.impactPoint
                },
                shotLog: [
                    ...state.shotLog,
                    {
                        targetId: projectile.targetId,
                        damage: projectile.damage
                    }
                ]
            });
            void get().refreshEntitlements();
        },
        clearImpactEffect: (key)=>set((state)=>state.impactEffect?.key === key ? {
                    impactEffect: null
                } : state),
        showImpact: (effect)=>set({
                impactEffect: effect
            }),
        setResyncing: (resyncing)=>set({
                resyncing
            }),
        resetAttack: ()=>set({
                mode: "spectator",
                projectile: null,
                pendingSnapshot: null,
                turn: null,
                turnStatus: "idle",
                queuePosition: null,
                defensePlacement: null,
                attackAim: initialAim,
                lastResult: null,
                attackError: null,
                impactEffect: null,
                shotLog: [],
                remainingShots: null,
                breakerShotsRemaining: 0
            })
    }));
}),
"[project]/src/game/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GAME_CONFIG_VERSION",
    ()=>GAME_CONFIG_VERSION,
    "GameConfig",
    ()=>GameConfig,
    "defensePriceForTier",
    ()=>defensePriceForTier,
    "nextDefenseTier",
    ()=>nextDefenseTier
]);
const GAME_CONFIG_VERSION = "game-config-0.1.0";
const GameConfig = {
    version: GAME_CONFIG_VERSION,
    attack: {
        turnDurationMs: 20_000,
        minElevation: 0.5,
        maxElevation: 0.86,
        minPower: 0.25,
        maxPower: 1,
        minYaw: -0.72,
        maxYaw: 0.72,
        baseDamage: 8,
        powerDamage: 12,
        maxCoreDamage: 20,
        powerOrbCharge: 25,
        breakerStructureMultiplier: 1.5,
        breakerCoreDamageCapFraction: 0.25
    },
    defense: {
        priceLadderMinor: [
            300,
            600,
            1200,
            2200,
            3400
        ],
        royalGuardPerPlacement: 25,
        royalGuardMax: 100,
        shieldHits: 2,
        braceHits: 1,
        braceDamageMultiplier: 0.65
    },
    coronation: {
        protectedSetupMs: 120_000,
        identityTimeoutMs: 120_000
    },
    retention: {
        worldEventsKeep: 500,
        commandRetentionMs: 30 * 24 * 60 * 60 * 1000
    },
    realtime: {
        broadcastBatchWindowMs: 100,
        broadcastBatchMaxEvents: 32,
        broadcastBatchMaxBytes: 64_000
    }
};
function defensePriceForTier(tier) {
    const safeTier = Number.isInteger(tier) && tier >= 0 ? tier : 0;
    return GameConfig.defense.priceLadderMinor[Math.min(safeTier, GameConfig.defense.priceLadderMinor.length - 1)];
}
function nextDefenseTier(tier) {
    return Math.min(Math.max(0, tier) + 1, GameConfig.defense.priceLadderMinor.length - 1);
}
}),
"[project]/src/game/presentation/debris.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debrisTransform",
    ()=>debrisTransform
]);
const GRAVITY = 4.2;
const FLOOR_Y = 0.08;
const BOUNCE_DAMPING = 0.34;
function clampTime(seconds) {
    return Math.min(1.5, Math.max(0, Number.isFinite(seconds) ? seconds : 0));
}
function debrisTransform(fragment, elapsedSeconds) {
    const time = clampTime(elapsedSeconds);
    const [x, y, z] = fragment.position;
    const [vx, vy, vz] = fragment.velocity;
    const [rx, ry, rz] = fragment.rotation;
    const [ax, ay, az] = fragment.angularVelocity;
    const collisionA = -GRAVITY;
    const collisionB = vy;
    const collisionC = y - FLOOR_Y;
    const discriminant = collisionB * collisionB - 4 * collisionA * collisionC;
    const collisionTime = discriminant >= 0 ? (-collisionB - Math.sqrt(discriminant)) / (2 * collisionA) : Number.POSITIVE_INFINITY;
    const bounced = collisionTime >= 0 && collisionTime < time;
    const localTime = bounced ? time - collisionTime : time;
    const vertical = bounced ? FLOOR_Y + Math.max(0, -vy - GRAVITY * collisionTime) * BOUNCE_DAMPING * localTime - 0.5 * GRAVITY * localTime * localTime : y + vy * time - 0.5 * GRAVITY * time * time;
    return {
        position: [
            x + vx * time,
            Math.max(FLOOR_Y, vertical),
            z + vz * time
        ],
        rotation: [
            rx + ax * time,
            ry + ay * time,
            rz + az * time
        ],
        bounced
    };
}
}),
"[project]/src/game/presentation/labels.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "impactLabel",
    ()=>impactLabel
]);
function impactLabel(targetId, damage, projectileType = "STANDARD", snapshot = null) {
    const prefix = projectileType === "BREAKER" ? "Breaker · " : "";
    if (targetId === "miss") return `${prefix}Miss`;
    if (targetId === "power-orb") return `${prefix}Power Orb struck${damage > 0 ? ` · −${damage}` : ""}`;
    if (targetId.startsWith("defense:")) {
        const defense = snapshot?.activeDefenses.find((candidate)=>`defense:${candidate.id}` === targetId);
        return `${prefix}${defense?.type === "BRACE" ? "Brace held" : "Shield absorbed"}${damage > 0 ? ` · −${damage}` : ""}`;
    }
    if (targetId === "core:main") return `${prefix}Core hit · −${damage}`;
    if (targetId === "core:enclosure") return `${prefix}Core enclosure hit · −${damage}`;
    if (targetId.includes(":")) {
        const [type, side] = targetId.split(":");
        return `${prefix}${type.replaceAll("_", " ")} ${side?.replaceAll("_", " ") ?? ""}`.trim() + ` · −${damage}`;
    }
    return `${prefix}Structure hit · −${damage}`;
}
}),
"[project]/src/game/presentation/targets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "presentationTargetKind",
    ()=>presentationTargetKind,
    "presentationTargetPosition",
    ()=>presentationTargetPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$simulation$2f$ballistics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/simulation/ballistics.ts [app-ssr] (ecmascript)");
;
function presentationTargetKind(targetId) {
    if (!targetId) return "unknown";
    if (targetId === "power-orb") return "power-orb";
    if (targetId === "miss") return "miss";
    if (targetId.startsWith("defense:")) return "defense";
    if (targetId.includes(":")) return "component";
    return "unknown";
}
function presentationTargetPosition(definition, snapshot, targetId) {
    if (!targetId) return null;
    const component = definition.components.find((candidate)=>candidate.id === targetId);
    if (component) return component.position;
    if (targetId === "power-orb") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$simulation$2f$ballistics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["powerOrbPosition"])(definition, snapshot?.worldVersion ?? 1);
    if (targetId.startsWith("defense:")) {
        const defense = snapshot?.activeDefenses.find((candidate)=>`defense:${candidate.id}` === targetId);
        const slot = defense ? definition.defenseSlots.find((candidate)=>candidate.id === defense.slotId) : null;
        return slot?.position ?? null;
    }
    return null;
}
}),
"[project]/src/game/presentation/timing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRESENTATION_TIMING",
    ()=>PRESENTATION_TIMING,
    "presentationFlightSeconds",
    ()=>presentationFlightSeconds
]);
const PRESENTATION_TIMING = {
    flightDefaultSeconds: 0.85,
    impactMs: 700,
    cameraShakeMs: 850,
    rubbleMs: 650,
    launcherRecoilMs: 180
};
function presentationFlightSeconds(timeSeconds) {
    if (!Number.isFinite(timeSeconds) || (timeSeconds ?? 0) <= 0) return PRESENTATION_TIMING.flightDefaultSeconds;
    return Math.min(2.4, Math.max(0.85, timeSeconds * 1.35));
}
}),
"[project]/src/game/simulation/ballistics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BALLISTIC_SIMULATION_VERSION",
    ()=>BALLISTIC_SIMULATION_VERSION,
    "damageForPower",
    ()=>damageForPower,
    "powerOrbPosition",
    ()=>powerOrbPosition,
    "resolveBallisticShot",
    ()=>resolveBallisticShot,
    "trajectoryPreview",
    ()=>trajectoryPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/game/config.ts [app-ssr] (ecmascript)");
;
const BALLISTIC_SIMULATION_VERSION = "ballistic-v1";
const GRAVITY = -9.81;
const PROJECTILE_RADIUS = 0.22;
const STEP_SECONDS = 1 / 120;
const MAX_TIME_SECONDS = 2.4;
function powerOrbPosition(definition, worldVersion) {
    const phase = Math.max(0, worldVersion - 1) * 0.72;
    return [
        definition.powerOrbPosition[0] + Math.sin(phase) * 0.72,
        definition.powerOrbPosition[1] + Math.cos(phase * 0.8) * 0.34,
        definition.powerOrbPosition[2]
    ];
}
function trajectoryPreview(input, pointCount = 12, durationSeconds = 0.62) {
    const velocity = launchVelocity(input);
    return Array.from({
        length: pointCount
    }, (_, index)=>positionAt([
            0,
            0,
            0
        ], velocity, (index + 1) / pointCount * durationSeconds));
}
function positionAt(start, velocity, timeSeconds) {
    return [
        start[0] + velocity[0] * timeSeconds,
        start[1] + velocity[1] * timeSeconds + 0.5 * GRAVITY * timeSeconds * timeSeconds,
        start[2] + velocity[2] * timeSeconds
    ];
}
function segmentBoxEntry(start, end, min, max) {
    let entry = 0;
    let exit = 1;
    for(let axis = 0; axis < 3; axis += 1){
        const delta = end[axis] - start[axis];
        if (Math.abs(delta) < 1e-9) {
            if (start[axis] < min[axis] || start[axis] > max[axis]) return null;
            continue;
        }
        const inverse = 1 / delta;
        let near = (min[axis] - start[axis]) * inverse;
        let far = (max[axis] - start[axis]) * inverse;
        if (near > far) [near, far] = [
            far,
            near
        ];
        entry = Math.max(entry, near);
        exit = Math.min(exit, far);
        if (entry > exit) return null;
    }
    return entry;
}
function expandedBounds(position, size) {
    return [
        [
            position[0] - size[0] / 2 - PROJECTILE_RADIUS,
            position[1] - size[1] / 2 - PROJECTILE_RADIUS,
            position[2] - size[2] / 2 - PROJECTILE_RADIUS
        ],
        [
            position[0] + size[0] / 2 + PROJECTILE_RADIUS,
            position[1] + size[1] / 2 + PROJECTILE_RADIUS,
            position[2] + size[2] / 2 + PROJECTILE_RADIUS
        ]
    ];
}
function launchVelocity(input) {
    const speed = 13 + input.power * 12;
    const horizontal = Math.cos(input.elevation);
    return [
        Math.sin(input.yaw) * horizontal * speed,
        Math.sin(input.elevation) * speed,
        -Math.cos(input.yaw) * horizontal * speed
    ];
}
function resolveBallisticShot(definition, snapshot, input) {
    const states = new Map(snapshot.components.map((component)=>[
            component.componentId,
            component.state
        ]));
    const velocity = launchVelocity(input);
    let previous = definition.launcherPosition;
    for(let step = 1; step <= Math.ceil(MAX_TIME_SECONDS / STEP_SECONDS); step += 1){
        const timeSeconds = step * STEP_SECONDS;
        const current = positionAt(definition.launcherPosition, velocity, timeSeconds);
        let closestEntry = Number.POSITIVE_INFINITY;
        let closestComponent = null;
        for (const component of definition.components){
            if (!component.destructible || states.get(component.id) === "DESTROYED") continue;
            const [min, max] = expandedBounds(component.position, component.size);
            const entry = segmentBoxEntry(previous, current, min, max);
            if (entry !== null && entry < closestEntry) {
                closestEntry = entry;
                closestComponent = component;
            }
        }
        const orbPosition = powerOrbPosition(definition, snapshot.worldVersion);
        const [orbMin, orbMax] = expandedBounds(orbPosition, [
            0.72,
            0.72,
            0.72
        ]);
        const orbEntry = segmentBoxEntry(previous, current, orbMin, orbMax);
        if (orbEntry !== null && orbEntry < closestEntry) {
            closestEntry = orbEntry;
            closestComponent = {
                id: "power-orb",
                type: "CORE",
                position: orbPosition,
                size: [
                    0.72,
                    0.72,
                    0.72
                ],
                materialClass: "CORE",
                maxHp: 1,
                destructible: true
            };
        }
        for (const defense of snapshot.activeDefenses){
            const slot = definition.defenseSlots.find((candidate)=>candidate.id === defense.slotId);
            if (!slot || defense.hp <= 0) continue;
            const [min, max] = expandedBounds(slot.position, slot.size);
            const entry = segmentBoxEntry(previous, current, min, max);
            if (entry !== null && entry < closestEntry) {
                closestEntry = entry;
                closestComponent = {
                    id: `defense:${defense.id}`,
                    type: "FOUNDATION",
                    position: slot.position,
                    size: slot.size,
                    materialClass: "METAL",
                    maxHp: defense.maxHp,
                    destructible: true
                };
            }
        }
        if (closestComponent) {
            const hitTime = (step - 1 + closestEntry) * STEP_SECONDS;
            return {
                hit: {
                    componentId: closestComponent.id,
                    point: positionAt(definition.launcherPosition, velocity, hitTime),
                    timeSeconds: hitTime
                }
            };
        }
        previous = current;
    }
    return {
        hit: null
    };
}
function damageForPower(power) {
    return Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.baseDamage + power * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$game$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameConfig"].attack.powerDamage);
}
}),
"[project]/src/game/world/generator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GENERATOR_VERSION",
    ()=>GENERATOR_VERSION,
    "generateFortress",
    ()=>generateFortress,
    "worldHash",
    ()=>worldHash
]);
const GENERATOR_VERSION = "fortress-0.1.0";
function seedOffset(seed, channel) {
    let value = channel + 17;
    for (const char of seed)value = (value * 31 + char.charCodeAt(0)) % 997;
    return (value / 997 - 0.5) * 0.22;
}
function generateV010(seed) {
    const wobble = seedOffset(seed, 1);
    return {
        generatorVersion: GENERATOR_VERSION,
        seed,
        launcherPosition: [
            0,
            0.78,
            8.2
        ],
        coreComponentId: "core:main",
        powerOrbPosition: [
            2.1,
            2.8,
            4.8
        ],
        components: [
            {
                id: "foundation:main",
                type: "FOUNDATION",
                position: [
                    0,
                    0.42,
                    0
                ],
                size: [
                    10.8,
                    0.75,
                    5.8
                ],
                materialClass: "STONE",
                maxHp: 999,
                destructible: false
            },
            {
                id: "tower:left",
                type: "TOWER",
                position: [
                    -4.1,
                    2.75,
                    -0.25
                ],
                size: [
                    1.7,
                    4.9,
                    1.7
                ],
                materialClass: "STONE",
                maxHp: 180,
                supportGroup: "outer",
                destructible: true
            },
            {
                id: "tower:right",
                type: "TOWER",
                position: [
                    4.1,
                    2.75,
                    -0.25
                ],
                size: [
                    1.7,
                    4.9,
                    1.7
                ],
                materialClass: "STONE",
                maxHp: 180,
                supportGroup: "outer",
                destructible: true
            },
            {
                id: "wall:front:left",
                type: "WALL",
                position: [
                    -2.45,
                    1.85,
                    0.35 + wobble
                ],
                size: [
                    2.25,
                    2.75,
                    0.82
                ],
                materialClass: "STONE",
                maxHp: 115,
                supportGroup: "outer",
                destructible: true
            },
            {
                id: "wall:front:center",
                type: "WALL",
                position: [
                    0,
                    1.75,
                    0.38
                ],
                size: [
                    2.25,
                    2.55,
                    0.82
                ],
                materialClass: "STONE",
                maxHp: 115,
                supportGroup: "outer",
                destructible: true
            },
            {
                id: "wall:front:right",
                type: "WALL",
                position: [
                    2.45,
                    1.85,
                    0.35 - wobble
                ],
                size: [
                    2.25,
                    2.75,
                    0.82
                ],
                materialClass: "STONE",
                maxHp: 115,
                supportGroup: "outer",
                destructible: true
            },
            {
                id: "gate:main",
                type: "GATE",
                position: [
                    0,
                    1.15,
                    0.92
                ],
                size: [
                    1.8,
                    1.55,
                    0.48
                ],
                materialClass: "WOOD",
                maxHp: 85,
                supportGroup: "gate",
                destructible: true
            },
            {
                id: "keep:central",
                type: "KEEP",
                position: [
                    0,
                    3.2,
                    -0.62
                ],
                size: [
                    4.2,
                    4.9,
                    1.95
                ],
                materialClass: "STONE",
                maxHp: 220,
                supportGroup: "inner",
                destructible: true
            },
            {
                id: "core:enclosure",
                type: "CORE_ENCLOSURE",
                position: [
                    0,
                    4.15,
                    0.48
                ],
                size: [
                    2.15,
                    1.9,
                    0.68
                ],
                materialClass: "STONE",
                maxHp: 110,
                supportGroup: "core",
                destructible: true
            },
            {
                id: "core:main",
                type: "CORE",
                position: [
                    0,
                    4.05,
                    1.03
                ],
                size: [
                    0.78,
                    0.78,
                    0.78
                ],
                materialClass: "CORE",
                maxHp: 100,
                supportGroup: "core",
                destructible: true
            },
            {
                id: "throne:main",
                type: "THRONE",
                position: [
                    0,
                    1.1,
                    -1.58
                ],
                size: [
                    0.95,
                    1.5,
                    0.5
                ],
                materialClass: "METAL",
                maxHp: 1,
                destructible: false
            }
        ],
        defenseSlots: [
            {
                id: "shield_slot:core_front",
                type: "SHIELD",
                position: [
                    0,
                    3.15,
                    1.3
                ],
                size: [
                    2.8,
                    2.3,
                    0.12
                ]
            },
            {
                id: "shield_slot:left_approach",
                type: "SHIELD",
                position: [
                    -2.5,
                    1.2,
                    2.1
                ],
                size: [
                    1.8,
                    1.6,
                    0.12
                ]
            },
            {
                id: "shield_slot:right_approach",
                type: "SHIELD",
                position: [
                    2.5,
                    1.2,
                    2.1
                ],
                size: [
                    1.8,
                    1.6,
                    0.12
                ]
            },
            {
                id: "brace_slot:front_left",
                type: "BRACE",
                position: [
                    -2.45,
                    1.85,
                    0.88
                ],
                size: [
                    1.65,
                    2.1,
                    0.12
                ]
            },
            {
                id: "brace_slot:front_center",
                type: "BRACE",
                position: [
                    0,
                    1.75,
                    0.88
                ],
                size: [
                    1.65,
                    2,
                    0.12
                ]
            },
            {
                id: "brace_slot:front_right",
                type: "BRACE",
                position: [
                    2.45,
                    1.85,
                    0.88
                ],
                size: [
                    1.65,
                    2.1,
                    0.12
                ]
            }
        ]
    };
}
const GENERATORS = {
    [GENERATOR_VERSION]: generateV010
};
function generateFortress(seed, generatorVersion = GENERATOR_VERSION) {
    const generator = GENERATORS[generatorVersion];
    if (!generator) throw new Error(`Unsupported fortress generator version: ${generatorVersion}`);
    return generator(seed);
}
function worldHash(definition) {
    return JSON.stringify({
        version: definition.generatorVersion,
        seed: definition.seed,
        launcher: definition.launcherPosition,
        powerOrb: definition.powerOrbPosition,
        core: definition.coreComponentId,
        components: definition.components,
        defenseSlots: definition.defenseSlots
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__11mtd-k._.js.map