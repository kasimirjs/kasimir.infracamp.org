---
layout: scrollspy
title: KasimirJS - pure javascript browser libraries
description: |
    KasimirJS is a set of pure ES6 browser
    side front end developing libraries. It is natively
    supported by all recent browsers and focuses on ease
    of development. KasimirJS is no framework and therefor
    comes without development dogmas.    
---

KasimirJS libraries are independent from each other and 
independent from any other frameworks or libraries.

## Use kasimirjs

**Load library from infracamp (uncompressed with debugging stuff)**

```html
<script language="JavaScript" src="https://kasimirjs.infracamp.org/dist/v1/kasmirjs.full.js"></script>
```

**Load production minified version (16kB)**
```html
<script language="JavaScript" src="https://kasimirjs.infracamp.org/dist/v1/kasmirjs.full-min.js"></script>
```


## Kasimir Template

Kasimir Template library extends the dom-syntax with `*if=""`, `*for=""` and other
useful stuff to repeat, exclude, modify dom elements directly.

**Demo:** Rendering a html table

<template is="ka-include" src="/ka-demo/tpl-table.html" auto></template>


## Kasimir Request

Use single line ajax requests with `ka_http_req(<url>, <params>)` library.

<template is="ka-include" src="/ka-demo/req-base.html" auto></template>

## Kasimir Form



<template is="ka-include" src="/ka-demo/form-base.html" auto></template>