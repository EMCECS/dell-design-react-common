/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { MouseEventHandler, ReactNode } from "react";
import "styles/components/Breadcrumb.scss";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { AnyRecord } from "dns";


/**
 * Props for the doughnut chart
 * @param {title} is to get the title of the Breadcrumb Item.(can be string or JSX Element)
 * @param {path} is to get the path on which url should be redirected on clicking of particular Breadcrumb Item.
 * @param {isActive} is to get the status of the Breadcrumb Item whether its active or not.
 * @param {breadcrumbItems} is to get the array of Breadcrumb Elements to be displayed in the Breadcrumb.
 * @param {className} is to get a custom class to be applied on Breadcrumb or else default class is applied.
 * @param {onClickHandler} is to get a custom handler to be applied on click of Breadcrumb Element.
 */


export type BreadcrumbItem = {
    title: JSX.Element | string;
    path: string;
    isActive?: boolean;
}
export type BreadcrumbItems = {
    breadcrumbItems:Array<BreadcrumbItem>;
    className?:string;
    onClickHandler?:(e?: MouseEventHandler<HTMLElement>)=>void;
}

const getLabelColorClass=(isActive?:boolean):string=>{
    return isActive ? "breadcrumb1__breadcrumb-item-active" : "breadcrumb1__breadcrumb-item";
}

const getBreadcrumbItems=(items:Array<BreadcrumbItem>,onClickHandler?:(e?: MouseEventHandler<HTMLElement>)=>void):ReactNode=>{
    return  items.map((item,index) => {
        const labelColorClass = getLabelColorClass(item?.isActive);
        return (
        <Breadcrumb.Item key={index} href={item.path} active={item?.isActive} onClick={(e?:any)=>{onClickHandler&&onClickHandler(e)}}>
            {
                <span className={labelColorClass} >
                    {item.title}
                </span>
            }
        </Breadcrumb.Item>
        );
    });
}

export const Breadcrumbs=({breadcrumbItems=[],className='breadcrumb1',onClickHandler}:BreadcrumbItems)=>{
    return (
        <div className={className}>
            <Breadcrumb>
                {
                getBreadcrumbItems(breadcrumbItems,onClickHandler)
                }
            </Breadcrumb>
        </div>
    )
}
