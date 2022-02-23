import {storiesOf} from "@storybook/react";
 import {Dropdown, DropdownMenu, DropdownItem, MenuItemType}  from "@dellstorage/clarity-react/forms/dropdown";
 import {action} from "@storybook/addon-actions";
import React from "react";

//import "styles/components/DropDown.scss";

 storiesOf("PopOver", module)
 .add(" Basic dropdown", () => (
    <React.Fragment>
    <Dropdown label={"User Actions"} >
    <DropdownMenu>
    <DropdownItem label={"LogOut"} onClick={() => {}} />
    <DropdownItem label={"Settings"} onClick={() => {}} />
    </DropdownMenu>
    </Dropdown>
    </React.Fragment>
    ));