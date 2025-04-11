# Vorta Website

This repository contains the static website for Vorta, a cloud software service for supply chain management. The site is built with standard HTML, CSS, and JavaScript, with no heavy frameworks required.

## Features

- Responsive design for desktop and mobile
- Multilingual support for English and Bosnian
- Language can be set via URL parameter: `?lang=en` or `?lang=bs`
- Clean, minimalist UI that reflects Vorta's brand values

## Project Structure

- `/css` - Stylesheets
- `/js` - JavaScript files
- `/images` - Images and SVG assets (includes language-specific variants with `_bs` suffix)
- `/fonts` - Custom web fonts

## Development

### Setup

No build process is required for development. Simply clone the repository and open the HTML files in your browser.

### Workflow

1. Make changes to the HTML, CSS, or JavaScript files
2. Test locally
3. Bundle assets before deployment (see below)

### Asset Bundling

#### CSS

To bundle CSS files:

```bash
cat css/normalize.css css/skeleton.css css/cookie.css css/main.css > css/bundle.css
```

For production, minify the bundled CSS:
- Use an online tool like [CSS Minifier](https://cssminifier.com/)
- Or install a minifier like `clean-css-cli`:
  ```bash
  npm install -g clean-css-cli
  cleancss -o css/bundle.min.css css/bundle.css
  ```

#### JavaScript

To bundle JavaScript files, first install `uglify-js`:

```bash
npm install uglify-js -g
```

Then run:

```bash
uglifyjs js/cookie.js js/js.cookie.js js/main.js -o js/bundle.min.js
```

### Development Assets

During development, you can include individual files instead of the bundled versions:

#### CSS
```html
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/skeleton.css">
<link rel="stylesheet" href="css/cookie.css">
<link rel="stylesheet" href="css/main.css">
```

#### JavaScript
```html
<script src="js/js.cookie.js" type="text/javascript"></script>
<script src="js/cookie.js" type="text/javascript"></script>
<script src="js/main.js" type="text/javascript"></script>
```

## Multilingual Support

The website includes support for multiple languages:

- English (default): `?lang=en`
- Bosnian: `?lang=bs`

### How It Works

1. Language selection is stored in `localStorage`
2. URL parameter (`?lang=bs`) overrides the stored preference
3. Custom SVG images for Bosnian have `_bs` suffix (e.g., `vorta_slide_1_bs.svg`)

### Adding a Translation

To add a new language:

1. Add the language option to the language switcher in `index.html`
2. Add translations to the `translations` object in `main.js`
3. Create language-specific images with appropriate suffix
4. Rebuild the JavaScript bundle

## Deployment

This is a static site that can be deployed to any web server or hosting service like:

- Netlify
- GitHub Pages
- Amazon S3
- Any standard web hosting

## License

All rights reserved. This code is proprietary to Vorta.