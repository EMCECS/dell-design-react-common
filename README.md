# dell-design-react-common binding

This project an unofficial implementation of CSS wrapper for [Dell Design System for Product] (https://web.ddsproduct.com/31b3fd8b1/p/07e33c-) on [VMware Clarity Design](https://clarity.design) in React. It leverages CSS, icons and images from the Clarity project. 

## Usage in React projects

To use the project simply add the dependencies with `yarn`, `npm`, etc:
```shell
$ yarn add @dellstorage/dell-design-react-common
```

Import styles and globals from peer dependencies:

#### `index.tsx`
```typescript
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@dellstorage/dell-design-react-common/main.css";
import "@clr/icons/clr-icons-lite.min.js";
import "@clr/icons/shapes/technology-shapes.js";

...
```

And make use of the components in your app:
#### `App.tsx`
```typescript jsx
import React, {Component} from 'react';
import MainContainer from "@dellstorage/clarity-react/layout/main-container/MainContainer";

const initialState = {
};

type MainPageProps = {
    token?: string
    level?: string
    message?: string
}

export type MainPageState = Readonly<typeof initialState>;

export default class MainPage extends Component<MainPageProps> {
    readonly state: MainPageState = initialState;

    render() {
        return(
            <MainContainer>
                Hello
            </MainContainer>
        );
    }
}
```

## Storybook

This project includes [Storybook](https://storybook.js.org/) as a component browser. To fire up storybook, download the project in Git:
```shell
$ git clone git@github.com:EMCECS/dell-design-react-common.git
```

Install the dependencies with `yarn`, `npm`, etc.
```sbtshell
$ cd dell-design-react-common

# Using yarn
$ yarn

# Using NPM
$ npm install
```

Any run the "storybook" script:
```shell
# Using yarn
$ yarn run storybook

# Using NPM
$ npm run storybook
```

## Licenses
* dell-design-react-common components is licensed under Apache 2.0 License.
* The VMware Clarity Design System is licensed under the MIT license.
