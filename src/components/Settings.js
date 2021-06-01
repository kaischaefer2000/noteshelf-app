import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Settings() {

    const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


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
        </div>
    </>
  );
}