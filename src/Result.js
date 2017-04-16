import React from 'react';
import PropTypes from 'prop-types';

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

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
        <MenuItem onTouchTap={props.onItemTouchTap}>Delete</MenuItem>
    </IconMenu>
);

const definedAvatar = (
    <Avatar
        size={30}
        icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
) ;

class Result extends React.Component {

    render() {
        const result = this.props.result;

        if (!result) {
            return null;
        }
        return (
            <div>
                <ListItem
                    leftAvatar={definedAvatar}
                    rightIconButton={rightIconMenu(this.props)}
                    primaryText={result.productName ? result.productName : ''}
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>{result.productPrice ? result.productPrice : ''}</span><br />
                            {result.codeResult.code} - {result.productDate ? result.productDate : ''}
                        </p>
                    }
                    secondaryTextLines={2}
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
