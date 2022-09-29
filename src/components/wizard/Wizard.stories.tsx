/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

 import React from "react";
 import {storiesOf} from "@storybook/react";
 import Wizard, {WizardSize} from "@dellstorage/clarity-react/newWizard/Wizard";
 import WizardStep from "@dellstorage/clarity-react/newWizard/WizardStep";
 import {State} from "@sambego/storybook-state";
 import {Button} from "@dellstorage/clarity-react/forms/button";
 import {Input} from "@dellstorage/clarity-react/forms/input/Input";
 import {Select, SelectOption} from "@dellstorage/clarity-react/forms/select";
 import {WizardFooterProps} from "@dellstorage/clarity-react/newWizard/WizardFooter";
 import {SpinnerSize} from "@dellstorage/clarity-react/spinner/Spinner";
 import "styles/components/Wizard.scss";
 import {store} from './WizardUtility';
 
 
 storiesOf("New Wizard", module)
     .add("Wizard Sizes", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <p>Click to activate a wizard of the described size</p>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.MEDIUM)}>
                         MEDIUM
                     </Button>
                     <Button key={1} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         LARGE
                     </Button>
                     <Button key={2} link onClick={() => state.handleToggleWizard(WizardSize.XLARGE)}>
                         X-LARGE
                     </Button>
 
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={3}
                         size={WizardSize.MEDIUM}
                         show={state.open && state.activeWizard === WizardSize.MEDIUM}
                         showCancel={true}
                         onClose={() => state.handleClose()}
                         onNext={state.handleNext}
                         onPrevious={state.handlePrevious}
                         onComplete={state.handleComplete}
                         onNavigateTo={state.handleSelectStep}
                         title="Medium Wizard"
                     >
                         <WizardStep
                             id={0}
                             name="Basic Information"
                             valid={state.basicInfoValid}
                             complete={state.basicInfoComplete}
                         >
                             <React.Fragment>
                                 <Input label="Name" name="name" onChange={state.handleValidate} />
                                 <Input
                                     label="Height (feet)"
                                     defaultValue={1}
                                     max={10}
                                     min={1}
                                     name="heightFeet"
                                     type="number"
                                     onChange={state.handleValidate}
                                 />
                                 <Input
                                     label="Height (inches)"
                                     defaultValue={1}
                                     max={10}
                                     min={1}
                                     name="heightInches"
                                     type="number"
                                     onChange={state.handleValidate}
                                 />
                                 <Input label="Weight" name="weight" placeholder="lbs" onChange={state.handleValidate} />
                                 <Select value="3" label="Gender" onChange={state.handleValidate}>
                                     <SelectOption value="1"> Male </SelectOption>
                                     <SelectOption value="2"> Female </SelectOption>
                                     <SelectOption value="3"> Non-binary </SelectOption>
                                 </Select>
                             </React.Fragment>
                         </WizardStep>
 
                         <WizardStep id={1} name="Power" />
 
                         <WizardStep id={2} name="Weakness" />
 
                         <WizardStep id={3} name="Summary" />
                     </Wizard>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={4}
                         size={WizardSize.LARGE}
                         show={state.open && state.activeWizard === WizardSize.LARGE}
                         title="Medium Wizard"
                         onClose={state.handleClose}
                         onNavigateTo={state.handleSelectStep}
                     >
                         <WizardStep id={0} key={0} name={"Page 1"} />
                         <WizardStep id={1} key={1} name={"Page 2"} />
                     </Wizard>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={5}
                         size={WizardSize.XLARGE}
                         show={state.open && state.activeWizard === WizardSize.XLARGE}
                         title="Medium Wizard"
                         onClose={state.handleClose}
                         onNext={state.handleNext}
                         onPrevious={state.handlePrevious}
                         onComplete={state.handleComplete}
                         onNavigateTo={state.handleSelectStep}
                     >
                         <WizardStep id={0} key={0} name={"Page 1"} />
                         <WizardStep id={1} key={1} name={"Page 2"} />
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with rich titles", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.MEDIUM)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.MEDIUM}
                         show={state.open}
                         title={<h1>Rich Text Wizard Title</h1>}
                         onClose={() => state.handleClose()}
                         onNext={() => state.handleNext()}
                         onPrevious={() => state.handlePrevious()}
                         onComplete={() => state.handleComplete()}
                         onNavigateTo={state.handleSelectStep}
                     >
                         <WizardStep id={0} key={0} name={"Page 1"} />
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with custom footer", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.LARGE}
                         show={state.open}
                         title="Wizard with custom footer"
                         onClose={() => state.handleClose()}
                         onNext={() => state.handleNext()}
                         onPrevious={() => state.handlePrevious()}
                         onComplete={() => state.handleComplete()}
                         customFooter={(props: WizardFooterProps) =>
                             !props.disableComplete && <Input helperText="Save As" name="save-as" />
                         }
                         onNavigateTo={state.handleSelectStep}
                     >
                         <WizardStep
                             id={0}
                             key={0}
                             name={"Page 1"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         >
                             <Input name="some-input" label="Some Input" onChange={state.handleValidate} />
                         </WizardStep>
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with add or remove steps", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.LARGE}
                         show={state.open}
                         title="Wizard with dynamic step"
                         onClose={() => state.handleClose()}
                         onNext={() => state.addStep(1)}
                         onPrevious={() => state.handlePrevious()}
                         onComplete={() => state.handleComplete()}
                         onNavigateTo={state.handleSelectStep}
                         customFooter={(props: WizardFooterProps) => (
                             <Button primary onClick={() => state.removeStep(state.currentWizardStepID)}>
                                 Delete Step
                             </Button>
                         )}
                     >
                         {state.steps}
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with disabled previous button", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.LARGE}
                         show={state.open}
                         title="Wizard with dynamic step"
                         onClose={() => state.handleClose()}
                         onNext={() => state.addStep(1)}
                         onPrevious={() => state.handlePrevious()}
                         onComplete={() => state.handleComplete()}
                         onNavigateTo={state.handleSelectStep}
                         disablePreviousButton={true}
                         showPrevious={true}
                         customFooter={(props: WizardFooterProps) => (
                             <Button primary onClick={() => state.removeStep(state.currentWizardStepID)}>
                                 Delete Step
                             </Button>
                         )}
                     >
                         {state.steps}
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with single apply button", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.LARGE}
                         show={state.open}
                         showPrevious={false}
                         showNext={false}
                         showComplete={true}
                         showCancel={true}
                         completeText={"Apply"}
                         title="Wizard with single apply button"
                         onClose={() => state.handleClose()}
                         onComplete={() => state.handleComplete()}
                         onNavigateTo={state.handleSelectStep}
                     >
                         <WizardStep
                             id={0}
                             key={0}
                             name={"Page 1"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                         <WizardStep
                             id={1}
                             key={1}
                             name={"Page 2"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                         <WizardStep
                             id={2}
                             key={2}
                             name={"Page 3"}
                             navigationTitle={"Click for page 3"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with apply button on all steps", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.LARGE}
                         show={state.open}
                         showComplete={true}
                         showCancel={true}
                         completeText={"Apply"}
                         title="wizard with apply button on all steps"
                         onClose={() => state.handleClose()}
                         onComplete={() => state.handleComplete()}
                         onNext={() => state.handleNext()}
                         onPrevious={() => state.handlePrevious()}
                         onNavigateTo={state.handleSelectStep}
                     >
                         <WizardStep
                             id={0}
                             key={0}
                             name={"Page 1"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                         <WizardStep
                             id={1}
                             key={1}
                             name={"Page 2"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                         <WizardStep
                             id={2}
                             key={2}
                             name={"Page 3"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ))
     .add("wizard with loading spinner", (_props: any) => (
         <State store={store}>
             {state => (
                 <React.Fragment>
                     <Button key={0} link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                         OPEN WIZARD
                     </Button>
                     <Wizard
                         currentStepID={state.currentWizardStepID}
                         key={1}
                         size={WizardSize.LARGE}
                         show={state.open}
                         showCancel={true}
                         completeText={"Apply"}
                         title="Wizard with loading spinner on Apply"
                         onNext={() => state.handleNext()}
                         onPrevious={() => state.handlePrevious()}
                         onClose={() => state.handleClose()}
                         onComplete={() => state.handleSyncComplete()}
                         onNavigateTo={state.handleSelectStep}
                         isLoading={state.isLoading}
                         loadingSpinnerSize={SpinnerSize.LARGE}
                     >
                         <WizardStep
                             id={0}
                             key={0}
                             name={"Page 1"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                         <WizardStep
                             id={1}
                             key={1}
                             name={"Page 2"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         />
                         <WizardStep
                             id={2}
                             key={2}
                             name={"Page 3"}
                             valid={state.basicInfoValid}
                             complete={state.basicInfoValid}
                         >
                             <Input name="some-input" label="Some Input" onChange={state.handleValidate} />
                         </WizardStep>
                     </Wizard>
                 </React.Fragment>
             )}
         </State>
     ));
 