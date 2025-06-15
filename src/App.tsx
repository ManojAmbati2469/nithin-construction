import { Toaster } from '@/components/ui/toaster';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { ThemeProvider } from '@/components/ThemeProvider';
import FlatsAvailable from '@/pages/FlatsAvailable';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="nithin-constructions-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flats-available" element={<FlatsAvailable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
