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
 import {Card, CardBlock, CardTitle} from "@dellstorage/clarity-react/cards";
 import CloseButton from 'react-bootstrap/CloseButton';
 
 const FilterPanel = (props: any) => {
 
     return (
         <div className='filter-classes'>
                 <div className='filter-container'>
                     { props.data ?
                     <Card>
                         <CloseButton onClick={props.onClose} className={"align-close-icon"}/>
                         <CardBlock>
                             <CardTitle>
                                 {props.title}
                             </CardTitle>
                         </CardBlock>
                         <div className='filter-item-container'>
                             {props.data}
                         </div>
                     </Card> : null }
                 </div>
         </div>
     );
 }
 export default FilterPanel;
 