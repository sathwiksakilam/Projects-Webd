import './App.css';
import { SideBar } from './components/Sidebar/SideBar.component';
import Messages from './components/Messages/Messages';
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column className='messagepanel'>
        <Messages />
      </Grid.Column>
      <Grid.Column width={3}>
        <span>

        </span>

      </Grid.Column>
    </Grid>
  );
}

export default App;
