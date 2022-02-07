# Simple Toast

Simple toast is a very basic implementation of feedback toasts in web apps, drawing its inspiration from the implementation of bootstrap alerts. The toasts have been styled with accessibility in mind in terms of contrast.

## Usage

Include the js file and the stylesheet as found in the src folder in your web app, in like fashion.

```html
<link rel="stylesheet" href="./src/simple_toast.min.css"/>

<script src="./src/simple_toast.min.js">
```

Create a new simpleToast object, with the various customization options

```javascript
var simpleToast = new SimpleToast({ duration: 6000, position: "top-right" });
```

The are two parameters currently, the duration in milli seconds and the position of your toast container rather than the toasts themselves.

Then go ahead to call the function:

```javascript
simpleToast.toast("The message you want to show", "variant");
```

Simple toast comes with four variants, which are:

1.  error
1.  success
1.  info
1.  warning

Likewise, four preset positions currently exist:

1.  top-left
1.  top-right
1.  bottom-left
1.  bottom-right

If a position used in the declaration is not in the above list, the program defaults to top-right.

So the toast can be called in like manner:

```javascript
simpleToast.toast("Error message", "error");
simpleToast.toast("Info message", "info");
simpleToast.toast("Success message", "success");
simpleToast.toast("Warning message", "warning");
```

If a variant falls outside the four variants stipulated, the library defaults back to the info variant of the toast.

Simple toast currently does not support title of the toast notifications, only operating to show the message of the notification.

The toasts are set to disappear automatically after the time chosen during the SimpleToast Object creation. Use of a negative number will cause the program to default to 6000 milliseconds.
