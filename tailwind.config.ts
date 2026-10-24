import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#17211d', paper:'#fbfaf7', vermilion:'#c94735', moss:'#496b58', line:'#e8e5dd' }, boxShadow: { soft:'0 12px 40px rgba(29,38,31,.06)' } } }, plugins: [] };
export default config;
