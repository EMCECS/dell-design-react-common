/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {action} from "@storybook/addon-actions";
import WizardStep, {WizardStepType} from "@dellstorage/clarity-react/newWizard/WizardStep";
import {Store} from "@sambego/storybook-state";

let steps: any[] = [];
 
 // Function to create array of step data
 function buildStepData(numberOfSteps: number = 1) {
     for (let i = 0; i < numberOfSteps; i++) {
         steps.push({name: "page " + i, type: null});
     }
 }
 
 // Function to create steps UI
 function buildStepsUI() {
     const StepUI = steps.map((step, index) => {
         return <WizardStep id={index} key={index} name={step.name} type={step.type} valid={true} complete={true} />;
     });
     return StepUI;
 }
 
 // Function to build steps for story
 function buildSteps(numberOfSteps: number = 1) {
     buildStepData(numberOfSteps);
     return buildStepsUI();
 }
 
 // Function to update steps array for story
 function updateSteps(index: number, action: string) {
     if (action === "insert") {
         // Insert new step
         steps.splice(index, 0, {index: index, name: "page new", type: WizardStepType.SUB_STEP});
     } else if (action === "remove") {
         steps.splice(index, 1);
     }
     return buildStepsUI();
 }
 
 export const store = new Store({
     open: false,
     isLoading: false,
     activeWizard: "",
     basicInfoValid: true,
     basicInfoComplete: false,
     currentWizardStepID: 0,
     steps: buildSteps(2),
     addStep: (index: number, numberOfSteps: number = 1) =>
         store.set({
             open: true,
             steps: updateSteps(index, "insert"),
         }),
     removeStep: (index: number, numberOfSteps: number = 1) =>
         store.set({
             open: true,
             steps: updateSteps(index, "remove"),
         }),
     handleToggleWizard: (size: string) =>
         store.set({
             open: true,
             activeWizard: size,
         }),
     handleClose: (): void =>
         store.set({
             open: false,
         }),
     handleNext: (): void => {
         action("next");
         store.set({
             currentWizardStepID: store.get("currentWizardStepID") + 1,
         });
     },
     handlePrevious: (): void =>
         action("previous") &&
         store.set({
             currentWizardStepID: store.get("currentWizardStepID") - 1,
         }),
     handleComplete: (): void =>
         action("complete") &&
         store.set({
             open: false,
         }),
     handleSyncComplete: (): void => {
         action("complete with loading spinner") &&
             store.set({
                 isLoading: true,
             });
 
         // enable wizard navigation and footer after 3 sec
         setTimeout(function() {
             store.set({
                 isLoading: false,
             });
         }, 3000);
 
         // Add delay for story only
         setTimeout(function() {
             store.set({
                 open: false,
             });
         }, 5000);
     },
     handleSelectStep: (selectedStepID: any): void => {
         action("selected step ", selectedStepID) &&
             store.set({
                 currentWizardStepID: selectedStepID,
             });
     },
     handleValidate: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
         if (evt.target.value.length > 2) {
             store.set({
                 basicInfoValid: true,
                 basicInfoComplete: true,
             });
         } else {
             store.set({
                 basicInfoValid: false,
                 basicInfoComplete: false,
             });
         }
     },
 });
