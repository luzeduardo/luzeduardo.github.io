import React from 'react';

class Result extends React.Component {
    render() {
        const result = this.props.result;

        if (!result) {
            return null;
        }
        return (
            <li>
                {result.codeResult.code} [{result.codeResult.format}]
            </li>
        );
    }
}

Result.propTypes = {
    result: React.PropTypes.object
}
export default Result;
