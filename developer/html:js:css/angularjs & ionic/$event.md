# $event

- 阻止时间冒泡

	```html
	<button class="button btn-order-style" ng-click="clickOP(order);$event.stopPropagation();">
     <span>点击</span>
   </button>
	```
