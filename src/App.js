import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routing from './Routing.js';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import Layout from "./layout/Layout";

Amplify.configure(awsconfig);


// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import {getRound, listNotes} from './graphql/queries';
// import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

// const initialFormState = { name: '', description: '' }
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#BE1D2C',
        },
        secondary: {
            main: '#fff',
        },
    },
});

const useStyles = makeStyles((theme) => ({

}));

function App() {
    return (
        <CssBaseline />,
        <Router>
            <Routing />
            <MuiThemeProvider theme={theme}>
                    <Layout/>
            </MuiThemeProvider>
            <Routing/>
        </Router>
    );

    //
    // const [notes, setNotes] = useState([]);
    // // const [setRound] = useState([]);
    // const [formData, setFormData] = useState(initialFormState);
    //
    // useEffect(() => {
    //     fetchNotes();
    //     // fetchCurrentRound();
    // }, []);
    //
    // async function fetchNotes() {
    //     const apiData = await API.graphql({ query: listNotes });
    //     setNotes(apiData.data.listNotes.items);
    // }
    //
    // // async function fetchCurrentRound() {
    // //     const apiData = await API.graphql({ query: listRounds });
    // //     setRound(apiData.data.listNotes.items);
    // // }
    //
    // async function createNote() {
    //     if (!formData.name || !formData.description) return;
    //     await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    //     setNotes([ ...notes, formData ]);
    //     setFormData(initialFormState);
    // }
    //
    // async function deleteNote({ id }) {
    //     const newNotesArray = notes.filter(note => note.id !== id);
    //     setNotes(newNotesArray);
    //     await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
    // }
    //
    // return (
    //     <div className="App">
    //         <h1>My Notes App</h1>
    //         <input
    //             onChange={e => setFormData({ ...formData, 'name': e.target.value})}
    //             placeholder="Note name"
    //             value={formData.name}
    //         />
    //         if (this.props.authState === 'signedIn') {
    //         <input
    //             onChange={e => setFormData({ ...formData, 'description': e.target.value})}
    //             placeholder="Note description"
    //             value={formData.description}
    //         />
    //         }
    //         <button onClick={createNote}>Create Note</button>
    //         <div style={{marginBottom: 30}}>
    //             {
    //                 notes.map(note => (
    //                     <div key={note.id || note.name}>
    //                         <h2>{note.name}</h2>
    //                         <p>{note.description}</p>
    //                         <button onClick={() => deleteNote(note)}>Delete note</button>
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //         <AmplifySignOut />
    //     </div>
    // );
}

export default App;