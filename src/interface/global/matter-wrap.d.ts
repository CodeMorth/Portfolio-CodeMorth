declare module 'matter-wrap' {
    import Matter from 'matter-js';
    
    export default function MatterWrap(Matter: typeof Matter): void;
}
