import React, { useContext } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from '../Firebase';
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";



export default function Settings() {

    const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <>
        <div className="flex flex-col m-3 shadow rounded mt-5 bg-gray-50 mb-5">
            <div className="p-3">
                <h2 className="text-xl font-semibold text-center">Einstellungen</h2>
            </div>
            <div className="p-3">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    label="Jeder kann dein Profil sehen"
                  />
            </div>
            <div className="p-3">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Freunde können deine Notizen sehen"
                  />
            </div>
            <div className="p-3">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.checkedC}
                        onChange={handleChange}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label="Benachrichtigung bei neuen Features"
                  />
            </div>
            <div className="p-3">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.checkedD}
                        onChange={handleChange}
                        name="checkedD"
                        color="primary"
                      />
                    }
                    label="Benachrichtigung wenn dich Freunde überholen"
                  />
            </div>
            <div className="p-3 flex flex-row cursor-pointer">
                    <ExitToAppIcon className="ml-1 mt-2 z-30" onClick={() => firebase.auth().signOut()}/>
                    <p className="ml-4 mt-2">Log out</p>
            </div>
        </div>
    </>
  );
}