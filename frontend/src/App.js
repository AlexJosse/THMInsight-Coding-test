import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Form from './components/form';

const App = () => {

  return (
    <div>
    <CssBaseline />
     <Container fixed>

       <Typography component="div" style={{ backgroundColor: 'white',
                                            height: '100vh' }}>
              <Form></Form>
      </Typography>

       </Container>
    </div>
  );
}
export default App;
