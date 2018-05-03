```html
<ion-scroll scrollX>
  <div  class="item" style="width: 60px;height: 60px;background: red"
       *ngFor="let item of [1,1,1,1,1,11,1,1,1,1,1,1]">
  </div>
</ion-scroll>
```


```scss
ion-scroll[scrollX] {
  white-space: nowrap;
  width: 100%;
  height: 20vw;

  .item {
    margin: 0 8px;
    display: inline-block;
  }
}
```

## Demo

<style>
.scrollX{
  width:100%;
  height:60px;
  white-space:nowrap;
  overflow-y: scroll;
}

.item{
  width:20%;
  height:100%;
  display:inline-block;
  margin:8px;
  background:#60C4A5
}
</style>

<div class="scrollX">
<div class="item"> </div>
<div class="item"> </div>
<div class="item"> </div>
<div class="item"> </div>
<div class="item"> </div>
<div class="item"> </div>
<div class="item"> </div>
</div>
