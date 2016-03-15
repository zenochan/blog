# css3 animation

```css
@keyframes anim-hide {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

@-webkit-keyframes anim-hide {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-30px);
  }
  60% {
    -webkit-transform: translateY(-15px);
  }
}
```

```css
.buy-hide {
  right: -7px !important;
  -webkit-animation: anim-hide 1.0s infinite;
  animation: anim-hide 1.0s infinite;
}
```