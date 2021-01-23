import {TextField} from "@material-ui/core";
import React from "react";

export default class ScoreField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '0',
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value === "" ? 0 : event.target.value,
        });
    };

    handleInput = (event) => {
        event.target.value = Math.max(0, parseInt(event.target.value)).toString().slice(0, 3)
    }

    render() {
        return (
            <TextField
                id={this.props.id} label="score" type="number" variant="outlined"
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
                onInput={this.handleInput}
                value={this.state.value}
                onChange={this.handleChange}
            >
            </TextField>
        )
    }
}