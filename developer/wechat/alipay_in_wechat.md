# angularjs 实现

微信公众平台 - 网页授权获取用户基本信息


```html
  <ion-nav-title>
    <div class="bar bar-header">
      <button class="button" 
        ng-if="model.show_alipay" 
        ng-click="reloadPayment()"
        >
        重选
      </button>
      <h1 class="title">选择支付方式</h1>
    </div>
  </ion-nav-title>
  <ion-content class="payment-view">
    <div id="alipay_frame_div" 
        ng-if="model.show_alipay" 
        class="alipay-frame"
        >
      <iframe src="{{model.alipay_url}}"></iframe>
    </div>
  </ion-content>
```