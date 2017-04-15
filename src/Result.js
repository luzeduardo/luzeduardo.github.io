import React from 'react';
import PropTypes from 'prop-types';

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (props) => (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Forward</MenuItem>
        <MenuItem onTouchTap={props.onItemTouchTap}>Delete</MenuItem>
    </IconMenu>
);

class Result extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const result = this.props.result;

        if (!result) {
            return null;
        }
        return (
            <div>
                <ListItem
                    rightIconButton={rightIconMenu(this.props)}
                    primaryText={result.codeResult.code}
                    secondaryText=""
                />
                <Divider inset={true} />
            </div>
        );
    }
}

Result.propTypes = {
    result: PropTypes.object,
    onItemTouchTap: PropTypes.func
}
export default Result;
