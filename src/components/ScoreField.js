import {TextField} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";

const ScoreField = ({
                        id,
                        onChange,
                        value,
                        ...props
                    }) => {
    return (
        <TextField
            id={id} label="score" type="number" variant="outlined"
            style={{
                width: 100,
                height: 100,
                textAlign: "center"
            }}
            inputProps={{
                min: 0,
                max: 999,
                style: {
                    fontSize: 40,
                    textAlign: 'center'
                }
            }}
            onInput={(event) => event.target.value = parseInt(!event.target.value ? "0" : event.target.value).toString().slice(0, 3)}
            value={!value ? "0" : value}
            onChange={onChange}
        />
    )
}

ScoreField.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}

export default ScoreField