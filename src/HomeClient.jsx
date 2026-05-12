'use client';
// Direct import (no dynamic ssr:false) so the homepage renders on the
// server. Previously bailed to client-side rendering because App.jsx
// referenced window/document in the render path; those are now fixed
// via useIsMobile() / useMounted() / typeof guards.
import App from '@/src/App';

export default function HomeClient() {
  return <App />;
}
