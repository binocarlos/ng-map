ng-map
======

Angular directive component to display a google map centered on a postcode

## installation

```
$ component install binocarlos/ng-map
```

## usage

Include the module:

```js
angular.module('myApp', [
	require('ng-map')
])
```

Use the directive:

```html
<div>

	<map lat="map.lat" long="map.long" zoom="map.zoom" />

</div>
```

## scope

```js
{
  lat:'=',
  long:'=',
  zoom:'='
}
```

## license

MIT