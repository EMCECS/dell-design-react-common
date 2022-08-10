/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import React, {useEffect, useState} from "react";
import {Card, CardBlock, CardText, CardTitle} from "@dellstorage/clarity-react/cards";
import CloseButton from 'react-bootstrap/CloseButton';
import {Icon} from "@dellstorage/clarity-react/icon/Icon";
import {DatePicker} from "@dellstorage/clarity-react/forms/datepicker/DatePicker";
import {Select, SelectOption} from "@dellstorage/clarity-react/forms/select";
import Accordion from "react-bootstrap/Accordion";
import {Button} from "@dds/components";


const FilterPanel = () => {

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const closeFilter = () => {
        setIsFilterOpen(false);
    }
    const openFilter = () => {
        setIsFilterOpen(true);
    }
    const renderDefaultSelectOptions = () => {
        const arr = [1, 2, 3]
        return arr.map(a => {
            return a
        });
    }

    useEffect(() => {
        [].forEach.call(
            document.querySelectorAll('[data-toggle="dds__button"]'),
            function (element) {
                new Button(element);
            }
        );
    });

    const loadFilterIcon = () => {
        return (
            <div className="filter-icon" onClick={() => openFilter()}>
                {/*<img
                src="https://zeroheight-uploads.s3-accelerate.amazonaws.com/c7fba900e82a7c5dd07f7c?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA3AVNYHQK4QFFEFF5%2F20220805%2Feu-west-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20220805T080825Z&amp;X-Amz-Expires=86400&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=9966b1a038751cb05e171ef0f0115705b5f292ee94e487d88e09f471fd2411e7"
                alt="" height="32px" width="32px"
                className=" white-background max-full-height max-full-width spec-shadow"/>*/}

                <Icon shape={"filter"}/>
                {/*<img
                  src="https://zeroheight-uploads.s3-accelerate.amazonaws.com/9e90a51bbf649788467df3?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIA3AVNYHQK4QFFEFF5%2F20220805%2Feu-west-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20220805T080736Z&amp;X-Amz-Expires=86400&amp;X-Amz-SignedHeaders=host&amp;X-Amz-Signature=52e193e255e9dccefe2bdd6c32257cb318226c841c9004e26f7a14f3d7c834ff"
                  alt="" height="32" width="32"
                  className=" white-background max-full-height max-full-width spec-shadow" onClick={()=>openFilter()}/>*/}
            </div>
        )
    }
    return (
        <div>
            {loadFilterIcon()}

            {isFilterOpen ?
                <div>
                    <Card>
                        <CloseButton onClick={closeFilter} className={"align-close-icon"}/>
                        <CardBlock>
                            <CardTitle>
                                Filter
                            </CardTitle>
                        </CardBlock>
                        <CardBlock>
                            <CardText>
                                Card content can contain text, links, images, data visualizations, lists and more.
                            </CardText>
                            <CardText>TEST DEMO</CardText>
                            <CardText>TEST DEMO</CardText>
                            <CardText><DatePicker/></CardText>
                            <CardText>
                                <div>
                                    <Select>
                                        <SelectOption value="select">select</SelectOption>
                                        {renderDefaultSelectOptions()}
                                    </Select>
                                </div>
                            </CardText>
                            <CardText>

                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Status</Accordion.Header>
                                        <Accordion.Body>
                                            Status Body
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Date</Accordion.Header>
                                        <Accordion.Body>
                                            Date Picker
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </CardText>
                        </CardBlock>
                    </Card>
                </div> : null
            }
        </div>
    );
}
export default FilterPanel;
