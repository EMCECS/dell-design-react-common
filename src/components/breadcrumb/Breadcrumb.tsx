/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {Button} from "@dellstorage/clarity-react/forms/button";
import {Icon} from "@dellstorage/clarity-react/icon";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const DEFAULT_MAX_ITEMS = 3;

/**
 * Props for the BreadcrumbItem
 * @param {title} is to get the title of the Breadcrumb Item.(can be string or JSX Element)
 * @param {path} is to get the path on which url should be redirected on clicking of particular Breadcrumb Item.
 * @param {isActive} is to get the status of the Breadcrumb Item whether its active or not.
 * @param {dataqa} quality engineering testing field
 */
export type BreadcrumbItem = {
    title: JSX.Element | string;
    path: string;
    isActive?: boolean;
    dataqa?: string;
};

/**
 * Props for the BreadcrumbItems
 * @param {breadcrumbItems} is to get the array of Breadcrumb Elements to be displayed in the Breadcrumb.
 * @param {className} is to get a custom class to be applied on Breadcrumb or else default class is applied.
 * @param {dataqa} quality engineering testing field
 * @param {onClick} is to get a custom handler to be applied on click of Breadcrumb Element.
 */
export type BreadcrumbItems = {
    breadcrumbItems: Array<BreadcrumbItem>;
    className?: string;
    dataqa?: string;
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
    maxItems?: number;
    isCollapsible?: boolean;
};

const getBreadcrumbItems = (
    items: Array<BreadcrumbItem>,
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void,
    isCollapsible: boolean = true,
    maxItems: number = DEFAULT_MAX_ITEMS,
): JSX.Element[] => {
    let breadcrumbItems: JSX.Element[] = [];
    const collapsedItems: JSX.Element[] = [];
    items.forEach((item, index) => {
        if (index !== items.length - 1) {
            if (isCollapsible && items.length > maxItems) {
                if ([0, items.length - 2].includes(index)) {
                    breadcrumbItems = [
                        ...breadcrumbItems,
                        <Breadcrumb.Item
                            key={index}
                            data-qa={item?.dataqa}
                            href={item?.path}
                            active={item?.isActive}
                            onClick={(event?: React.MouseEvent<HTMLElement>) => {
                                onClick && onClick(event);
                            }}
                        >
                            {<span>{item?.title}</span>}
                        </Breadcrumb.Item>,
                    ];
                } else {
                    collapsedItems.push(<a href={item?.path}>{item?.title}</a>);
                }
            } else {
                breadcrumbItems.push(
                    <Breadcrumb.Item
                        key={index}
                        data-qa={item?.dataqa}
                        href={item?.path}
                        active={item?.isActive}
                        onClick={(event?: React.MouseEvent<HTMLElement>) => {
                            onClick && onClick(event);
                        }}
                    >
                        {<span>{item?.title}</span>}
                    </Breadcrumb.Item>,
                );
            }
        }
    });
    items.length > maxItems &&
        isCollapsible &&
        breadcrumbItems.splice(
            1,
            0,
            <div className="breadcrumb-item-container">
                <Button className="breadcrumb-item">
                    <Icon
                        shape="ellipsis-horizontal"
                        data-qa="breadcrumb-collapsed-ellipsis"
                        className="breadcrumb-collapsed-ellipsis"
                    />
                </Button>
                <div className="breadcrumb-collapsed-menu">{collapsedItems}</div>
            </div>,
        );
    return breadcrumbItems;
};

export const Breadcrumbs = ({
    breadcrumbItems = [],
    className,
    dataqa,
    onClick,
    maxItems,
    isCollapsible,
}: BreadcrumbItems) => {
    return (
        <div className={`breadcrumbs-container ${className}`}>
            <Breadcrumb data-qa={dataqa}>
                {getBreadcrumbItems(breadcrumbItems, onClick, isCollapsible, maxItems)}
            </Breadcrumb>
            <div className="breadcrumb active-element">{breadcrumbItems[breadcrumbItems.length - 1]?.title}</div>
        </div>
    );
};
