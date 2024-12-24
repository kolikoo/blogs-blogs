import { useEffect, useState } from "react";
import { ThemeProvider } from "&/theme/theme-provider";
import { loginAtom } from "./store";
import { useSetAtom } from "jotai";
import { supabase } from "./supabase";
import AppRoutes from "./routes";
const App: React.FC = () => {
  const setUser = useSetAtom(loginAtom);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      setisLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen  flex flex-col overflow-x-hidden">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
