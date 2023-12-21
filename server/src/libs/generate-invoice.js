import PDFDocument from "pdfkit";
import { formatPrice, toNonAccentVietnamese } from "./utils";

export const generateInvoice = (order) => {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  //create Header
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Sport Shop", 110, 57)
    .fontSize(10)
    .text("Trinh Van Bo", 200, 65, { align: "right" })
    .text("Ha Noi, Viet Nam", 200, 80, { align: "right" })
    .moveDown();

  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  // create customer information
  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(order.code, 150, customerInformationTop)
    .font("Helvetica")
    .text("Order Date:", 50, customerInformationTop + 15)
    .text(
      new Date(order.createdAt).toDateString(),
      150,
      customerInformationTop + 15
    )
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(formatPrice(order.orderTotalPrice), 150, customerInformationTop + 30)
    .font("Helvetica-Bold")
    .text(order.fullName, 300, customerInformationTop)
    .font("Helvetica")
    .text(order.phone, 300, customerInformationTop + 15)
    .text(
      toNonAccentVietnamese(order.address),
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);

  generateInvoiceTable(doc, order);

  //create footer
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );

  return doc;
};

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Price",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];

    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      toNonAccentVietnamese(item.productId.name) +
        "\n" +
        toNonAccentVietnamese(item.productVariantId.name) +
        "\n",
      formatPrice(item.productVariantId.price),
      item.quantity,
      formatPrice(item.productVariantId.price * item.quantity)
    );

    generateHr(doc, position + 22);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    formatPrice(invoice.totalPrice)
  );

  const discountPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    discountPosition,
    "",
    "",
    "Discount",
    formatPrice(invoice.couponPrice)
  );

  const shippingPosition = discountPosition + 20;
  generateTableRow(
    doc,
    shippingPosition,
    "",
    "",
    "Shipping",
    formatPrice(invoice.shippingPrice)
  );

  const duePosition = shippingPosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Total",
    formatPrice(invoice.orderTotalPrice)
  );
  doc.font("Helvetica");
}

function generateTableRow(doc, y, item, unitCost, quantity, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 280, y)
    .text(quantity, 370, y)
    .text(lineTotal, 460, y);
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}
