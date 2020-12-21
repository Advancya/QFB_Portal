import React, { useContext } from 'react';
import { localStrings as local_Strings } from '../translations/localStrings';
import { AuthContext } from "../providers/AuthProvider";

interface IFilterMoreButtonControlProps {
    onClickMore: any;
    showMore: boolean;
}

const FilterMoreButtonControl: React.FC<IFilterMoreButtonControlProps> = (props) => {

    const auth = useContext(AuthContext);
    local_Strings.setLanguage(auth.language);

    return props.showMore ? (
        <div className="actionScrollButtons">
            <a
                id="moreButton"
                onClick={props.onClickMore}
                className="d-block"
            >
                {local_Strings.ScrollForMoreLabel} <i className="fa fa-caret-down"></i>
            </a>
        </div>
    ) : null;
}

export default FilterMoreButtonControl;