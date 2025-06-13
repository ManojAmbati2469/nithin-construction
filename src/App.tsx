
import { Toaster } from '@/components/ui/toaster';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="nithin-constructions-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
