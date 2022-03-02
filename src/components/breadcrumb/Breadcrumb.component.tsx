import { ReactNode } from "react";
import "styles/components/Breadcrumb.scss";
import {action} from "@storybook/addon-actions";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export type BreadcrumbItem = {
    title: JSX.Element | string;
    path: string;
    isActive?: boolean;
}
export type BreadcrumbItems = {
    breadcrumbItems:Array<BreadcrumbItem>;
    className?:string;
}

const getLabelColorClass=(isActive:boolean | undefined):string=>{
    if(isActive){
        return 'breadcrumb1__breadcrumb-item-active';
    }else{
        return 'breadcrumb1__breadcrumb-item';
    }
}

const getBreadcrumbItems=(items:Array<BreadcrumbItem>):ReactNode=>{
    return  items.map((item,index) => {
        let labelColorClass = getLabelColorClass(item?.isActive);
        return (
        <Breadcrumb.Item key={index} href={item.path} active={item?.isActive} onClick={()=>{action("onClick - Lorem");}}>
            {
                <span className={labelColorClass} >
                    {item.title}
                </span>
            }
        </Breadcrumb.Item>
        );
    });
}

export const Breadcrumbs=({breadcrumbItems=[],className='breadcrumb1'}:BreadcrumbItems)=>{
    return (
        <div className={className}>
            <Breadcrumb>
                {
                getBreadcrumbItems(breadcrumbItems)
                }
            </Breadcrumb>
        </div>
    )
}
