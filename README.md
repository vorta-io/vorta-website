*** VORTA website

Cat all assets

```
cat css/normalize.css css/skeleton.css css/cookie.css css/main.css css/custom.css > css/bundle.css

Got to

https://cssminifier.com/
```

Install uglify-js

```
npm install uglify-js -g
uglifyjs js/cookie.js js/js.cookie.js js/main.js -o js/bundle.min.js
```

Development Assets

CSS

```
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">
  <link rel="stylesheet" href="css/cookie.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/custom.css">
```

JS

```
  <script src="js/js.cookie.js" type="text/javascript"></script>
  <script src="js/cookie.js" type="text/javascript"></script>
  <script src="js/main.js" type="text/javascript"></script>
```
