import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import  DefaultLayout from './layout/DefaultLayout';
import Configuration from './pages/Dashboard/Configuration';
import { QueryClient, QueryClientProvider } from "react-query";
import Monitor from './pages/Dashboard/Monitor';
const queryClient = new QueryClient();
function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Routes>
      <Route index element={<SignIn/>} />
        <Route element={<DefaultLayout />}>
        <Route path='/configuration' element={<Configuration />} />
        <Route path='/monitor' element={<Monitor />} />

        </Route>
      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
