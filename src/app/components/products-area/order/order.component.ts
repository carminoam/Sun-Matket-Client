import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { CartItemModel } from 'src/app/models/cart-item.model';
import store from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user.model';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import { NotifyService } from 'src/app/services/notify.service';
// import logoImage from "../../../../assets/images/sun2.png";
// import 'Graduate-Regular-normal.js';
import '../../../../assets/fonts/Graduate/Graduate-Regular-normal.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public order = new OrderModel();

  public cart: CartModel;
  public cartItems: CartItemModel[];
  public user: UserModel;
  public isOrderFinished: boolean = false;
  public searchString: string;

  public threeDigits: string;
  public expiredDate: Date;
  
  constructor(
    private cartService: CartService,
    private notify: NotifyService
    ) { }
    
    async ngOnInit(): Promise<void> {
      try {
        this.user = store.getState().authState.user;
        this.cart = await this.cartService.getCart();
        this.cartItems = await this.cartService.getCartItems(this.cart._id);
        this.order.totalPrice = this.getTotalPrice(this.cartItems);
      

    } catch (err: any) {
      this.notify.error(err);
    }
  }

  // Calc total price:
  public getTotalPrice(items: CartItemModel[]): number {
    return items?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  }

  public async makeOrder(value: OrderModel): Promise<void> {
    try {
      this.order.orderDate = new Date();
      this.order.deliveryDate = new Date(this.order.orderDate.getTime() + (1000 * 60 * 60 * 24 * 3));
      this.order.city = value.city;
      this.order.street = value.street;
      this.order.cartId = this.cart._id;
      this.order.userId = this.user._id;
      this.order.payment4Digits = value.payment4Digits.substring(value.payment4Digits.length - 4, value.payment4Digits.length);
      const newOrder = await this.cartService.createOrder(this.order);
      this.order = newOrder;
      this.isOrderFinished = true;
      console.log(newOrder);

    } catch (err) {
      this.notify.error(err);
    }

    this.isOrderFinished = true;
  }

  public printInvoice(): void {
    const doc = jsPDFInvoiceTemplate({
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: " - קבלה סופר שמש" + this.order._id,
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "Sunshine Market",
          address: "Albania, Tirane ish-Dogana, Durres 2001",
          phone: "(+355) 069 11 11 111",
          email: "email@example.com",
          email_1: "info@example.al",
          website: "www.example.al",
      },
      contact: {
          label: "Invoice issued for:",
          name: this.user.firstName + " " + this.user.lastName,
          address: "Albania, Tirane, Astir",
          phone: "(+355) 069 22 22 222",
          email: "client@website.al",
          otherInfo: "www.website.al",
      },
      invoice: {
          label: "Invoice #: ",
          num: 19,
          invDate: "Payment Date: 01/01/2021 18:12",
          invGenDate: "Invoice Date: 02/02/2021 10:17",
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#", 
              style: { 
                width: 10 
              } 
            }, 
            { 
              title: "Title",
              style: {
                width: 30
              } 
            }, 
            { 
              title: "Description",
              style: {
                width: 80
              } 
            }, 
            { title: "Price"},
            { title: "Quantity"},
            { title: "Unit"},
            { title: "Total"}
          ],
          table: Array.from(Array(10), (item, index)=>([
              index + 1,
              "There are many variations ",
              "Lorem Ipsum is simply dummy text dummy text ",
              200.5,
              4.5,
              "m2",
              400.5
          ])),
          // additionalRows: [{
          //     col1: 'Total:',
          //     col2: '145,250.50',
          //     col3: 'ALL',
          //     style: {
          //         fontSize: 14 //optional, default 12
          //     }
          // },
          // {
          //     col1: 'VAT:',
          //     col2: '20',
          //     col3: '%',
          //     style: {
          //         fontSize: 10 //optional, default 12
          //     }
          // },
          // {
          //     col1: 'SubTotal:',
          //     col2: '116,199.90',
          //     col3: 'ALL',
          //     style: {
          //         fontSize: 10 //optional, default 12
          //     }
          // }],
          invDescLabel: "Invoice Note",
          invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
          text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
  });
  }

}



