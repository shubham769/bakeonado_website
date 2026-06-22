# BakeONado Website

Single-page bakery storefront inspired by the structure of Ambrosia's homepage and adapted to BakeONado branding.

## Files

- `index.html`: page structure and section content
- `styles.css`: layout, palette, typography, and responsive styling
- `script.js`: hero rotation, tabs, featured product controls, timeline, testimonials, and demo form feedback
- `BakeOnado.jpeg`: provided BakeONado brand artwork used in the header and hero

## Preview

Open `index.html` directly in a browser, or run a simple local server from this folder:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## GitHub Pages

This repo already points to `https://github.com/shubham769/bakeonado_website.git`, so the default GitHub Pages project URL is:

`https://shubham769.github.io/bakeonado_website/`

The homepage now includes Open Graph and Twitter metadata so shared links can generate previews in apps that support unfurling.

After you deploy, if a preview does not appear immediately, it is usually cache-related. Re-check the live URL with a link debugger such as:

- LinkedIn Post Inspector
- Facebook Sharing Debugger
- Twitter Card Validator alternatives or any generic Open Graph checker

## Before Launch

- Replace placeholder testimonials with real customer quotes
- Replace demo contact/order copy with your actual phone number, email, address, and delivery zones
- Wire the demo forms to your preferred order workflow such as WhatsApp, email, or an e-commerce backend