export function addToCart(productButton: EventTarget & HTMLButtonElement, productId: number, AddToCart: Function, cl: any, ...rest: any) {
   if (!productButton.classList.contains('_hold')) {
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');

      const cart = document.querySelector<HTMLElement>('.cartHeaderIcon');
      const product = document.querySelector<HTMLElement>(`[data-pid="${productId}"]`);
      const productImage = product?.querySelector<HTMLElement>(`.${cl.itemProduct__img}`);
      const productImageFly = productImage?.cloneNode(true);


      const productImageFlyWidth = productImage?.offsetWidth;
      const productImageFlyHeight = productImage?.offsetHeight;
      const productImageFlyTop = productImage?.getBoundingClientRect().top;
      const productImageFlyLeft = productImage?.getBoundingClientRect().left;

      (productImageFly as HTMLElement)?.setAttribute('class', '_flyImage');
      (productImageFly as HTMLElement).style.cssText =
         `
       left: ${productImageFlyLeft}px;
       top: ${productImageFlyTop}px;
       width: ${productImageFlyWidth}px;
       height: ${productImageFlyHeight}px;
    `;

      document.body.append((productImageFly as HTMLElement));

      const cartFlyLeft = cart?.getBoundingClientRect().left;
      const cartFlyTop = cart?.getBoundingClientRect().top;

      (productImageFly as HTMLElement).style.cssText =
         `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      width: 0px;
      height: 0px;
      opacity:0;
   `;

      (productImageFly as HTMLElement).addEventListener('transitionend', function () {
         if (productButton.classList.contains('_fly')) {
            (productImageFly as HTMLElement).remove();
            AddToCart(...rest, productId)
            productButton.classList.remove('_hold');
            productButton.classList.remove('_fly');
         }
      });
   }
}