# angular2

## 阻止冒泡

```typescript
@Component({
  template: `
    <ul #listEl [class.rendered]="listEl.rendered">
      <li *ngFor="#item of list; if(last) {listEl.rendered = true;}" (click)="list.push(Math.random()); $event.stopPropagation(); $event.preventDefault(); // Do other fancy stuff">
        {{ item.text }}
      </li>
    </ul>
  `,
})
```


[ng1和ng2的部分对比----angular2系列（四)](http://www.cnblogs.com/1wen/p/5564368.html)