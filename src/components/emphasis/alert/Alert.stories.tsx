/**
 * Copyright (c) 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import { storiesOf } from "@storybook/react";
import { Alert, AlertItem, AlertLevel, AlertSize, AlertType } from "@dellstorage/clarity-react/emphasis/alert";
import { Direction, Icon } from "@dellstorage/clarity-react/icon";
import { Button, ButtonSize } from "@dellstorage/clarity-react/forms/button";
import "styles/components/Alert.scss";

let closeable = false;

storiesOf("Alert", module)
    .add("Global / App Level Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} level={AlertLevel.APP} style={{ marginBottom: "2em" }}>
                <AlertItem>Informational Standard</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} level={AlertLevel.APP} style={{ marginBottom: "2em" }}>
                <AlertItem>Dangerous Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} level={AlertLevel.APP}>
                <AlertItem>Warning Alert</AlertItem>
            </Alert>
        </div>
    ))
    .add("Global / App Level Actionable Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} level={AlertLevel.APP} style={{ marginBottom: "2em" }}>
                <AlertItem actions={<Button>Action</Button>}>Informational Standard</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} level={AlertLevel.APP} style={{ marginBottom: "2em" }}>
                <AlertItem actions={<Button>Action</Button>}>Dangerous Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} level={AlertLevel.APP}>
                <AlertItem actions={<Button>Action</Button>}>Warning Alert</AlertItem>
            </Alert>
        </div>
    ))
    .add("Global / App Level Actionable Alerts with carousel", () => (
        <div style={{ width: '80em', padding: '3em' }}>
            <div className="alert alert-info alert-app-level" style={{ marginBottom: "2em" }}>
                <div className="alert-carousal">
                    <Button
                        link
                        size={ButtonSize.SMALL}
                        icon={{ shape: "angle", dir: Direction.LEFT }}
                    />
                    <div className="alert-carousal-text"> 1 of 5</div>
                    <Button
                        link
                        size={ButtonSize.SMALL}
                        icon={{ shape: "angle", dir: Direction.RIGHT }}
                    />
                </div>
                <div className="alert-items"><AlertItem actions={<Button>Action</Button>}>Informational Standard </AlertItem>
                </div>
            </div>
            <div className="alert alert-danger alert-app-level" style={{ marginBottom: "2em" }}>
                <div className="alert-carousal">
                    <Button
                        link
                        size={ButtonSize.SMALL}
                        icon={{ shape: "angle", dir: Direction.LEFT }}
                    />
                    <div className="alert-carousal-text"> 1 of 5</div>
                    <Button
                        link
                        size={ButtonSize.SMALL}
                        icon={{ shape: "angle", dir: Direction.RIGHT }}
                    />
                </div>
                <div className="alert-items"><AlertItem actions={<Button>Action</Button>}>Informational Standard</AlertItem>
                </div>
            </div>
            <div className="alert alert-warning alert-app-level" style={{ marginBottom: "2em" }}>
                <div className="alert-carousal">
                    <Button
                        link
                        size={ButtonSize.SMALL}
                        icon={{ shape: "angle", dir: Direction.LEFT }}
                    />
                    <div className="alert-carousal-text"> 1 of 5</div>
                    <Button
                        link
                        size={ButtonSize.SMALL}
                        icon={{ shape: "angle", dir: Direction.RIGHT }}
                    />
                </div>
                <div className="alert-items"><AlertItem actions={<Button>Action</Button>}>Informational Standard</AlertItem>
                </div>
            </div>
        </div>
    ))
    .add("Inline Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} style={{ marginBottom: "2em" }}>
                <AlertItem>This is the default informational alert.</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} style={{ marginBottom: "2em" }}>
                <AlertItem>This is the default dangerous alert</AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS} style={{ marginBottom: "2em" }}>
                <AlertItem>This is the success alert</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} style={{ marginBottom: "2em" }}>
                <AlertItem>This is a warning alert</AlertItem>
            </Alert>
        </div>
    ))
    .add("Closable Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} closeable style={{ marginBottom: "2em" }}>
                <AlertItem>Informational Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} closeable style={{ marginBottom: "2em" }}>
                <AlertItem>Dangerous Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS} closeable style={{ marginBottom: "2em" }}>
                <AlertItem>Successful Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} closeable>
                <AlertItem>Warning Alert</AlertItem>
            </Alert>
        </div>
    ))
    .add("Compact Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} size={AlertSize.COMPACT} style={{ marginBottom: "2em" }}>
                <AlertItem>Informational Standard</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} size={AlertSize.COMPACT} style={{ marginBottom: "2em" }}>
                <AlertItem>Dangerous Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS} size={AlertSize.COMPACT} style={{ marginBottom: "2em" }}>
                <AlertItem>Successful Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} size={AlertSize.COMPACT}>
                <AlertItem>Warning Alert</AlertItem>
            </Alert>
        </div>
    ))
    .add("Actionable Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} closeable={true} style={{ marginBottom: "2em" }}>
                <AlertItem actions={<Button link>Action</Button>}>Informational Standard</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} closeable={true} style={{ marginBottom: "2em" }}>
                <AlertItem actions={<Button link>Action</Button>}>Dangerous Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS} closeable={true} style={{ marginBottom: "2em" }}>
                <AlertItem actions={<Button link>Action</Button>}>Successful Alert</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} closeable={true} size={AlertSize.COMPACT}>
                <AlertItem actions={<Button link>Action</Button>}>Warning Alert</AlertItem>
            </Alert>
        </div>
    ))
    .add("Multi-item alert", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} style={{ marginBottom: "2em" }} closeable={true}>
                <AlertItem>Alert Item one</AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank" />}>Alert Item two</AlertItem>
                <AlertItem icon={<Icon shape="dollar" />}>Alert Item three</AlertItem>
                <AlertItem icon={<Icon shape="asterisk" />}>Alert Item four</AlertItem>
            </Alert>
            <Alert type={AlertType.DANGER} style={{ marginBottom: "2em" }} closeable={true}>
                <AlertItem>Alert Item one</AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank" />}>Alert Item two</AlertItem>
                <AlertItem icon={<Icon shape="dollar" />}>Alert Item three</AlertItem>
                <AlertItem icon={<Icon shape="asterisk" />}>Alert Item four</AlertItem>
            </Alert>
            <Alert type={AlertType.SUCCESS} style={{ marginBottom: "2em" }} closeable={true}>
                <AlertItem>Alert Item one</AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank" />}>Alert Item two</AlertItem>
                <AlertItem icon={<Icon shape="dollar" />}>Alert Item three</AlertItem>
                <AlertItem icon={<Icon shape="asterisk" />}>Alert Item four</AlertItem>
            </Alert>
            <Alert type={AlertType.WARNING} style={{ marginBottom: "2em" }} closeable={true}>
                <AlertItem>Alert Item one</AlertItem>
                <AlertItem icon={<Icon shape="piggy-bank" />}>Alert Item two</AlertItem>
                <AlertItem icon={<Icon shape="dollar" />}>Alert Item three</AlertItem>
                <AlertItem icon={<Icon shape="asterisk" />}>Alert Item four</AlertItem>
            </Alert>
        </div>
    ))
    .add("Static Alerts", () => (
        <div style={{ width: "80em", padding: "3em" }}>
            <Alert type={AlertType.INFO} style={{ marginBottom: "2em" }}>
                <AlertItem isStatic>Informational Standard</AlertItem>
            </Alert>
        </div>
    ))
    .add("Alert for word wrap for JSON String", () => {
        const jsonText = `Thisisaverylongstringwithnospacesorpunctuationsijustmadesurethismakessenseohlookiamtalkingforquitealongtimenowbutatleastthisstringisbetterthanloremsoiguessthistestcaseworks.`;
        return (
            <div style={{ width: "50vw", padding: "3em" }}>
                <Alert type={AlertType.DANGER}>
                    <AlertItem>{jsonText}</AlertItem>
                </Alert>
            </div>
        );
    });
