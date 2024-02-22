import './App.css';
import MapBox from './map/MapBox';
import SideBar from './nav/SideBar';
function App() {
  return (
    <>
      {' '}
      <main>
        <MapBox />
      </main>
      <SideBar> </SideBar>
    </>
  );
}

export default App;
