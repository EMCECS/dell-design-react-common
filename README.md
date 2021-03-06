# dell-design-react-common binding

This project an unofficial implementation of CSS wrapper for [Dell Design System for Product](https://web.ddsproduct.com/31b3fd8b1/p/07e33c-) on [VMware Clarity Design](https://clarity.design) in React. It leverages CSS, icons and images from the Clarity project. 

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

## SASS Style conventions
1. SCSS File Structure
```
styles
 -> Common
 -> Components
 -> index.scss
 ```
Common utility styles such as Variables, Mixins, Functions, Fonts, Layout (padding, margin) etc. under the Common folder and reusable component styles are under Components like Buttons, Inputs etc.

2. Use more generic to specific, semantically-named variables with kebab-case for example:
```
Avoid- $blue-border, $light-blue-border has no pattern
Prefer - $border-blue, $border-light-blue
```
This pattern helps in recollection and hinting by editor.
In this pattern you can start generically and get more specific as the text editor auto-suggests variable names.

3. Declare/ indent the related CSS properties together so it helps to identify repeated blocks for reuse.
For example - all margin related styles (top, left, right etc) should be declared together, font-size, font-weight etc 

4. If block of style is getting repeated use mixins
5. If something needs to be calculated and returned depending on variables then use function
6. If some style is repeated declare and use as variable
7. The color codes are named as per Dell Design Standard, refer this page if any code is missing and needs to be added. https://web.ddsproduct.com/31b3fd8b1/p/60290f-colors

8. Avoid naming variables with actual values they hold, instead name them by the function they do, for example:
Avoid- ``` $padding-top-5: 5px;```
As value of the this would always remain 5px
Prefer-  ``` $checkbox-padding-top: 5px;```

9. Always override the class associated with the HTML element and not the HTML element iteself

10. @extend vs @include i.e Mixin - which one to use when?

Prefer Mixin if
```
@include keyword is used to include the code written in a mixin block. 
@include/ Mixin can also accept parameters if required, use it when you need repeatable style with same parameters but with different values.
```

Prefer @extend if
```
@extend is used in SASS to inherit(share) the properties from another css selector
@extend is most useful when the elements are almost same or identical and only differ in some properties
@extend cannot accept parameters
```

11. Mixin vs Function 
Mostly use mixins, unless you need complex custom logic and calculations
Its bad practice to use functions for side-effects and is heavily discouraged
Prefer:
```
    @function remy($pxsize) {
        @return ($pxsize/16)+rem;
    }
    h1 { font-size: remy(32);}
```
Avoid using Mixin like this
```
    @mixin remy ($pxsize) {
        font-size: ($pxsize/16)+rem;
    }
    h1 { @include remy(32);}
Function can be used across different elements in your project
    h1 { font-size: remy(32);}
    div { width: remy(800);}
```

12. Use proper nesting for the styles like HTML elements
Its a good practice to keep it only a level or two to prevent overly specific selectors (which are less useful and harder to override).
Refer various ways to use & selector https://css-tricks.com/the-sass-ampersand/
