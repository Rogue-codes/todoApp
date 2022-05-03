import { Toaster } from 'react-hot-toast';
import styled from 'styled-components'
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';

const Cont = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
`

function App() {
  return (
    <Cont className="App">
     <AppHeader/>
     <AppContent/>
     <Toaster/>
    </Cont>
  );
}

export default App;
