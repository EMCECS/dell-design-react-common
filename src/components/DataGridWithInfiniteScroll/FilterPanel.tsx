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
import {DatePicker} from "@dellstorage/clarity-react/forms/datepicker/DatePicker";
import {Select, SelectOption} from "@dellstorage/clarity-react/forms/select";
import Accordion from "react-bootstrap/Accordion";
import { CheckBox } from '@dellstorage/clarity-react/forms/checkbox/CheckBox'

const FilterPanel = (props: any) => {
    const renderDefaultSelectOptions = () => {
        const arr = [1, 2, 3]
        return arr.map(a => {
            return a;
        });
    }

    const [filterState, setFilterState] = useState<any>([])
    useEffect(() => {
      setFilterData()
    }, [])
    useEffect(() => {
      props.onChange(filterState)
    }, [filterState])
  
    const onFilterChanged = (checked: any, subItem: string, index: number) => {
      const currentFilterState = filterState.slice()
      currentFilterState[index]['data'][subItem[0]] = checked
      setFilterState(currentFilterState)
    }
    const setFilterData = () => {
      const filterArray: any = []
      props.data.map((item: any) => {
        const title = item.title
        const filterData: any = {}
        item.data.map((subItem: string) => {
          filterData[subItem] = false
        })
        const obj = { title, data: filterData }
        filterArray.push(obj)
      })
      setFilterState(filterArray)
    }
    return (
        <div className='filter-classes'>
                <div className='filter-container'>
                    { props.data ?
                    <Card>
                        <CloseButton onClick={props.onClose} className={"align-close-icon"}/>
                        <CardBlock>
                            <CardTitle>
                                Filter
                            </CardTitle>
                        </CardBlock>
                        <div className='filter-item-container'>
                        <CardBlock>
                            <CardText>
                                Card content can contain text, links, images, data visualizations, lists and more.
                            </CardText>
                            <CardText>TEST DEMO</CardText>
                            <CardText>TEST DEMO</CardText>
                            <CardText>
                                <div>
                                    <Select>
                                        <SelectOption value="select">select</SelectOption>
                                        {renderDefaultSelectOptions()}
                                    </Select>
                                </div>
                            </CardText>
                            <CardText>
                           { Object.entries(filterState).map((item: any, index: number) => {
                                return (
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                        <p className='filter-item-title'>{item[1].title}</p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                        {Object.entries(item[1].data).map(
                                            (subItem: any, subIndex: number) => (
                                            <span key={subIndex} className='filter-item-checkbox'>
                                                <CheckBox
                                                name={item[1].title}
                                                label={subItem[0]}
                                                checked={subItem[1]}
                                                onClick={(evt: any) =>
                                                    onFilterChanged(
                                                    evt.target && evt.target.checked,
                                                    subItem,
                                                    index
                                                    )
                                                }
                                                />
                                            </span>
                                            )
                                        )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    </Accordion>
                                )}) }
                                    <Accordion>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Date</Accordion.Header>
                                        <Accordion.Body>
                                            <DatePicker/>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </CardText>
                        </CardBlock> 
                        </div>
                    </Card> : null }
                </div>
        </div>
    );
}
export default FilterPanel;
