/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {ReactNode} from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

/**
 * Props for the BreadcrumbItem
 * @param {title} is to get the title of the Breadcrumb Item.(can be string or JSX Element)
 * @param {path} is to get the path on which url should be redirected on clicking of particular Breadcrumb Item.
 * @param {isActive} is to get the status of the Breadcrumb Item whether its active or not.
 */
export type BreadcrumbItem = {
    title: JSX.Element | string;
    path: string;
    isActive?: boolean;
}

/**
 * Props for the BreadcrumbItems
 * @param {breadcrumbItems} is to get the array of Breadcrumb Elements to be displayed in the Breadcrumb.
 * @param {className} is to get a custom class to be applied on Breadcrumb or else default class is applied.
 * @param {onClick} is to get a custom handler to be applied on click of Breadcrumb Element.
 */
export type BreadcrumbItems = {
    breadcrumbItems:Array<BreadcrumbItem>;
    className?:string;
    onClick?:(event?: React.MouseEvent<HTMLElement>)=>void;
}

const getBreadcrumbItems=(items:Array<BreadcrumbItem>,onClick?:(event?: React.MouseEvent<HTMLElement>)=>void):ReactNode=>{
    return items.map((item,index) => {
        return (
        <Breadcrumb.Item key={index} href={item.path} active={item?.isActive} onClick={(event?:React.MouseEvent<HTMLElement>)=>{onClick&&onClick(event)}}>
            {
                <span>
                    {item.title}
                </span>
            }
        </Breadcrumb.Item>
        );
    });
}

export const Breadcrumbs=({breadcrumbItems=[],className,onClick}:BreadcrumbItems)=>{
    return (
        <div className={className}>
            <Breadcrumb>
                {
                getBreadcrumbItems(breadcrumbItems,onClick)
                }
            </Breadcrumb>
        </div>
    )
}
