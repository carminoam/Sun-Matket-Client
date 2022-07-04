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

  constructor(
    private cartService: CartService,
    private notify: NotifyService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.user = store.getState().authState.user;
      this.cart = await this.cartService.getCart();
      this.cartItems = await this.cartService.getCartItems(this.cart._id);

      this.order.street = this.user.street;
      this.order.city = this.user.city;
      this.order.cartId = this.cart._id;
      this.order.totalPrice = this.getTotalPrice(this.cartItems);
      this.order.userId = this.user._id;

    } catch (err: any) {
      this.notify.error(err);
    }
  }

  // public search(e: Event): void {
  //   const str = (e.target as HTMLInputElement).value;
  //   const text = "how are you my name is noam";
  //   const newText = text.replace(new RegExp(str, "gi"), (match) => {
  //     return `<span class="highlight">${match}</span>`;
  //     return `<mark>${match}</mark>`;
  //   });
  //   console.log(newText);
  // }

  public getTotalPrice(items: CartItemModel[]): number {
    return items?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  }

  public async makeOrder(): Promise<void> {
    try {
      this.order.orderDate = new Date();
      this.order.deliveryDate = new Date(this.order.orderDate.getTime() + (1000 * 60 * 60 * 24 * 3));
      console.log(this.order);
      // const newOrder = await this.cartService.createOrder(this.order);
      // this.isOrderFinished = true;
      // console.log(newOrder);

    } catch (err) {
      this.notify.error(err);
    }

    this.isOrderFinished = true;
  }

  // public printInvoice(): void {

  //   const pdfObject = jsPDFInvoiceTemplate(this.props);
  // }

  public props: any = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "קבלה מאתר סופר-שמש",
    orientationLandscape: false,
    compress: true,
    logo: {
      // src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
      src: "../../../../assets/images/sun-logo.png",
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
      name: "סופר - שמש",
      address: "88, רחוב שמש, תל אביב",
      phone: "(+355) 069 11 11 111",
      email: "email@sun-market.com",
      website: "www.example.al",
    },
    contact: {
      label: "פרטי המזמין :",
      name: "עידן נצאון",
      address: "Albania, Tirane, Astir",
      phone: "(+355) 069 22 22 222",
      email: "client@website.al",
      otherInfo: "www.website.al",
    },
    invoice: {
      // label: "Invoice #: ",
      label: "קבלה #: ",
      num: 19,
      invDate: "Payment Date: 01/01/2021 18:12",
      invGenDate: "Invoice Date: 02/02/2021 10:17",
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            color: "red",
            fontFamily: "Roboto",
            width: 10
          }
        },
        {
          title: "Title",
          style: {
            color: "red",
            fontFamily: "Roboto",
            width: 30
          }
        },
        {
          title: "תיאור",
          style: {
            color: "red",
            fontFamily: "Roboto",
            width: 80
          }
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" }
      ],
      table: Array.from(Array(10), (item, index) => ([
        index + 1,
        "There are many variations ",
        "Lorem Ipsum is simply dummy text dummy text ",
        200.5,
        4.5,
        "m2",
        400.5
      ])),
      additionalRows: [{
        col1: 'Total:',
        col2: '145,250.50',
        col3: 'ALL',
        style: {
          fontFamily: "Helvetica",
          fontSize: 40 //optional, default 12 14
        }
      },
      {
        col1: 'VAT:',
        col2: '20',
        col3: '%',
        style: {
          fontFamily: "Helvetica Neue",
          fontSize: 10 //optional, default 12 10
        }
      },
      {
        col1: 'SubTotal:',
        col2: '116,199.90',
        col3: 'ALL',
        style: {
          fontFamily: "Helvetica Neue",
          fontSize: 10 //optional, default 12 10
        }
      }],
      invDescLabel: "Invoice Note",
      invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  public printInvoice(): void {

    // const pdfObject = jsPDFInvoiceTemplate(this.props);
    // console.log(pdfObject);

    const doc = new jsPDF();
    doc.getFontList();
    doc.addFont('Graduate-Regular-normal.ttf', 'Graduate-Regular', 'normal');
    doc.setFont("Graduate-Regular");
    doc.text(", אני נוע, אני נוע, אני נוע, אני נוע, אני נועם", 10, 10);
    doc.save("a4.pdf");
  }

}



