import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {CssBaseline, responsiveFontSizes} from "@material-ui/core";
import Layout from "./layout/Layout";
import {BrowserRouter as Router} from "react-router-dom";

Amplify.configure(awsconfig);

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#BE1D2C',
        },
        secondary: {
            main: '#fff',
        },
    },
});

theme = responsiveFontSizes(theme);

function App() {
    return (
        <CssBaseline/>,
            <Router>
                <MuiThemeProvider theme={theme}>
                    <Layout/>
                </MuiThemeProvider>
            </Router>
    );

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