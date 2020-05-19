import { Component } from '@angular/core';
import { ExportPdfService } from './export-pdf.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'export-pdf';
   item = [{
    seqNo:'1',
    barCode:'9999990154136',
    skuCode:'000000000030001888',
    skuName:'TEST ITEM',
    sunSku:'ชิ้น',
    qtySku:'1.00',
    price:'89.00'
  },
  {
    seqNo:'2',
    barCode:'9999990154136',
    skuCode:'000000000030001888',
    skuName:'TEST ITEM 2',
    sunSku:'ชิ้น',
    qtySku:'1.00',
    price:'89.00'
  },
  {
    seqNo:'1',
    barCode:'9999990154136',
    skuCode:'000000000030001888',
    skuName:'TEST ITEM 3',
    sunSku:'ชิ้น',
    qtySku:'1.00',
    price:'89.00'
  }];
  constructor(private pdf: ExportPdfService){}

  //make table body data
  buildTableBody(data, columns,header) {
      var body = [];

      //กำหนดชื่อ header ของตาราง
      body.push(header);

      //กำหนดค่าของแต่ละคอลั่ม
      data.forEach((row) => {
          var dataRow = [];

          columns.forEach((column) => {
            dataRow.push(row[column].toString());
          })

          body.push(dataRow);
      });
      body.push([{text:'รวมทั้งสิ้น', colSpan: 5, alignment: 'center'},
      {},
      {},
      {},
      {},
      {text:'2.00', alignment: 'center'},
      {text:'3170.00', alignment: 'center'}]);

      return body;
  }

  //make table style
  table(data, columns, header) {
      return {
        style: 'tableItem',
          table: {
              headerRows: 1,
              widths: [30, 110, 110, 130, 30, 30, 50],
              //call function for create body content of table
              body: this.buildTableBody(data, columns,header),
          }
        };
  }

  exportPdf(){

    if(this.item.length > 3){
      var docTwoPage = {
        //กำหนดชนิดกระดาษและระยะห่างของขอบกระดาษกับเส้นประ
        pageSize: 'A4',
        pageMargins: [ 10, 10, 10, 10],
        content:[
          //ส่วนของสาขา
          {
            //กำหนดเส้นประขอบกระดาษและเส้นประแบ่งครึ่งกระดาษ
            canvas: [
              {
                //ขอบตารางแบบตรงเส้นประ
                type: 'rect',
                x: 0,
                y: 0,
                w: 575,
                h: 820,
                lineColor: 'black',
                dash: {length: 5, space: 10}
              }
            ],
            absolutePosition:{x: 10, y: 10}
          },
          {
            // ตำแหน่งบาร์โค้ด
            width: 260,
            table: {
              body: [
                [{
                  image: `data:image/png;base64,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`,
                  fit: [220, 130]
                 }]
              ],
            },
            layout: 'noBorders',
            absolutePosition:{x: 350, y: 35}
          },
          {
            columns: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 150,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 327, y: 88}
              },
              {
                // ใบจองสินค้าข้อความ header
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ใบจองสินค้า`, style: `header`,
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 385, y: 105}
              }
            ]
          },
          {
            columns: [
              {
                // fixed width
                width:300,
                table: {
                  body: [
                    [{
                      text: `บริษัท ซี เจ เอ็กเพรส กรุ๊ป จำกัด
                      339/4 ม.3 ต.ท่าเสา อ.ไทรโยค จ.กาญจนบุรี
                      Tel:
                      Fax:
                      สาขา: สาขาที่ 00123 ไทรโยค
                      ผู้บันทึก : นางสาว...........`, style: `text`,
                    }]
                  ]
                },
                layout: 'noBorders',
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เอกสารใบจองสินค้า(สำหรับพนักงาน)`, style: 'header',
                     }]
                  ],
                },
                layout: 'noBorders',
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 135,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: -40, y: 95}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ลูกค้า: (s0223746) name test
                      โทรศัพท์: 0861612681`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: -38, y: 110}
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 170,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 317, y: 123}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เลขที่เอกสาร :  CB19050101001-000039
                      วันที่เอกสาร : 2020-05-03`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 317, y: 138}
              }
            ]
          },
          this.table(this.item, ['seqNo','barCode','skuCode','skuName','sunSku','qtySku','price'],['ลำดับ','บาร์โค้ด','รหัสสินค้า','ชื่อสินค้า','หน่วย','จำนวนสินค้า','ราคา'],
          ),
          {
            width: 260,
            table: {
              body: [
                [{
                  text: `จองสินค้าวันที่.....................................................................`,
                  style: 'textCoDetail',alignment: 'center'
                 }],
                 [{
                  text: `ลูกค้า :.................................................................................................................`, style: 'textCoDetail',
                 }],
                 [{
                  text: `ตัวบรรจง`, style: 'textCoDetail',alignment: 'center'
                 }],
                 [{
                  text: `พนักงาน :.................................................................................................................`, style: 'textCoDetail',
                 }],
                 [{
                  text: `ตัวบรรจง`, style: 'textCoDetail',alignment: 'center',
                 }]
              ],
            },
            layout: 'noBorders',
          },
           //ส่วนของลูกค้า
           {
            pageBreak: 'before',
            //กำหนดเส้นประขอบกระดาษและเส้นประแบ่งครึ่งกระดาษ
            canvas: [
              {
                //ขอบตารางแบบตรงเส้นประ
                type: 'rect',
                x: 0,
                y: 0,
                w: 575,
                h: 820,
                lineColor: 'black',
                dash: {length: 5, space: 10}
              }
            ],
            absolutePosition:{x: 10, y: 10}
          },
          {
            // ตำแหน่งบาร์โค้ด
            width: 260,
            table: {
              body: [
                [{
                  image: `data:image/png;base64,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`,
                  fit: [220, 130]
                 }]
              ],
            },
            layout: 'noBorders',
            absolutePosition:{x: 350, y: 35}
          },
          {
            columns: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 150,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 327, y: 88}
              },
              {
                // ใบจองสินค้าข้อความ header
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ใบจองสินค้า`, style: `header`,
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 385, y: 105}
              }
            ]
          },
          {
            columns: [
              {
                // fixed width
                width:300,
                table: {
                  body: [
                    [{
                      text: `บริษัท ซี เจ เอ็กเพรส กรุ๊ป จำกัด
                      339/4 ม.3 ต.ท่าเสา อ.ไทรโยค จ.กาญจนบุรี
                      Tel:
                      Fax:
                      สาขา: สาขาที่ 00123 ไทรโยค
                      ผู้บันทึก : นางสาว...........`, style: `text`,
                    }]
                  ]
                },
                layout: 'noBorders',
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เอกสารใบจองสินค้า(สำหรับลูกค้า)`, style: 'header',
                     }]
                  ],
                },
                layout: 'noBorders',
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 135,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: -40, y: 95}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ลูกค้า: (s0223746) name test
                      โทรศัพท์: 0861612681`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: -38, y: 110}
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 170,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 317, y: 123}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เลขที่เอกสาร :  CB19050101001-000039
                      วันที่เอกสาร : 2020-05-03`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 317, y: 138}
              }
            ]
          },
          this.table(this.item, ['seqNo','barCode','skuCode','skuName','sunSku','qtySku','price'],['ลำดับ','บาร์โค้ด','รหัสสินค้า','ชื่อสินค้า','หน่วย','จำนวนสินค้า','ราคา'],
          )
        ],
        defaultStyle: {
          font: 'THSarabunNew',

        },
        styles : {
          header: {
            alignment: 'right',
            fontSize: 22,
            bold: true,
            margin: [35, 0, 0, 0],
          },
          headerCustomer:{
            alignment: 'right',
            fontSize: 22,
            bold: true,
            margin: [48, 0, 0, 0],
          },
          coCustomerSection:{
            alignment: 'right',
            fontSize: 22,
            bold: true,
            margin: [35, 0, 0, 0],
          },
          text:{
            margin: [5, 0, 0, 0],
          },
          textCoDetail:{
            margin: [65, 0, 0, 0],
          },
          tableItem: {
            margin: [10, 65, 0, 15]
          },
          tableCustomer: {
            margin: [5, 15, 0, 0]
          },
        }
      }
      this.pdf.generatePdf(docTwoPage);
    } else {
      var docOnepage = {
        //กำหนดชนิดกระดาษและระยะห่างของขอบกระดาษกับเส้นประ
        pageSize: 'A4',
        pageMargins: [ 10, 10, 10, 10],
        content:[
          //ส่วนของสาขา
          {
            //กำหนดเส้นประขอบกระดาษและเส้นประแบ่งครึ่งกระดาษ
            canvas: [
              {
                //ขอบตารางแบบตรงเส้นประ
                type: 'rect',
                x: 0,
                y: 0,
                w: 575,
                h: 820,
                lineColor: 'black',
                dash: {length: 5, space: 10}
              },
              { type: 'line', x1: 0, y1: 410, x2: 700, y2: 410, dash: {length: 5, space: 10} },
            ],
            absolutePosition:{x: 10, y: 10}
          },
          {
            // ตำแหน่งบาร์โค้ด
            width: 260,
            table: {
              body: [
                [{
                  image: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAABkCAYAAACxbEqUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB8xSURBVHhe7ZxRdlRJtizfuBgQ42E0NRkGw1M0mOTHCFfsk1UXtCBtLfvY7n7UIiVlq6jb9/+98C0F35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHd4TUA35Db1Jx6cP/o3jm4R9NycM/t3HiHDff5zCQ3d3tuC9Mcod1N2HVL8A25zd45mtY7RzPNuS3suhR23dJMezjtpj3C6W6wa/tpb/KZFFpuvENod3gNwDfkNjWnHtw/uncO7tG0HNxzOzfeYcN9PjPJzd2e28I0R2h3E3bdEnxDbrN3jqb1ztFMc24Luy6FXbc00x5Ou2mPcLob7Np+2pt8JoWWG+8Q2h1eA/ANuU3NqQf3j+6dg3s0LQf33M6Nd9hwn89McnO357YwzRHa3YRdtwTfkNvsnaNpvXM005zbwq5LYdctzbSH027aI5zuBru2n/Ymn0mh5cY7hHaH1wB8Q25Tc+rB/aN75+AeTcvBPbdz4x023Oczk9zc7bktTHOEdjdh1y3BN+Q2e+doWu8czTTntrDrUth1SzPt4bSb9ginu8Gu7ae9yWdSaLnxDqHdr/7Inzx58uTJb+b5hvzkyZMnH4TnG/KTJ0+efBCeb8hPnjx58kF4viEH/3xef7H+6duXrz8C8fWfL98+f4q/gP/0+duXf8pYfP3y6eWZz9/++XH/xNevL//5n759yr/g//Tp2+f68V/2Xz5f9p9ePp/hp/M/3v3z/vP57fP4yf0z31+f9ed8233+8s/LZzrj9PonH/H1fOXua3f7c11//sc/1+Nrt2H2s/FrvvZ/Ms835B98/ybt3xRv/c9+OnwXfX39AS0/BF//+fZZH/PiZz/19duX/C8G+dN8w7/58+6eeXf/6cvxB/P0+SQf8fVMbr12tz9X3rz2vvcmvji+dhv+1ffKf/y1/9N5viEvLr/RbL4pvn55/W0kv+HfvrnbN9L6rSu/Wfc/BPyAfXr54Xv5ZemV9fHf/nN/hAv+cy+/FeV/1uGH7fTnfeHWbyyvr49+q4s3m3ff1Aafz3c+6Osp7rx2dz/XfPO6fi++fQ3+zffiT5y+Nr/sa/938HxD5hvq5Yfx+19H/PxNwQ/B7jfh2r183Ne/3nj92Lsfgh/fuOU3idcfwNfvan6b23/zHt8MBn/et/+M2Q8tbyrbHzx+4NpP5ejzeeGjvp4/cee1e/RzLa81r6XL8WsnBl+bX/K1/4v4y9+Q84en/WC+/wP79k11/aHiB/n736Pd+SEV7Ydsy+FzvXwe721/vFGM/jPff1N5n+nn81Ffzx13XrsDP32uPz52/XP/+Hz/k+/F3LXX4dd87f8m/uo35OtvP+2bIr9xdux/SL6+/PPn24c5fYzOe7+dX3n5R9LP/o3qyuzP+8KP32zWP0Zf/2UTP9TB5U3j5WPyObR9MP58XviIr+eWO6/dgZ8/19Mb4P51eeS1G31tftHX/m/ir31D5pv97WetfVM89kNwZbLZwDf8e8+9br77qfwQzP+8b9tqvha8AX15+cdi73Dz2t35fH7m97+ejVuv3XtsP9fDazT58w1eu/HX5rd87f9s/s435O3fbbVvit/0hhxvDJdP06zdp5ffxOL/5OjTZ32ut/68a/72ca7/nubtc3r9rY2P/T9fPtb2XzTFfnHz8/mZ3/x6vsOt167xzuf69obfX+t/9b1452vzW772fzZ/3xsy3+w/vcG2b4pf/4Z8/Tfsd75D1z9mf3/u9Rv+9p/3gD/e6w9l+Tje/yefz298PS9vQm/6jXNL/bO/cf5c+bNvHP0Lu3deu7tfm9/ytf+z+evekI//SPkq37CnH/793yFfOX0MiL+3fPnmHP2Q/8T187n/5z2hP8vxTea6/28+n9/3ev6rN+R3P+87n+vL9vI/DOHva398/Hfe8N/7HG5/bX7L1/7P5vmGXOWbgm+q4W8BW977QQQ262O97PoHO/B//UOgP8uHfUP+v3k9/x3tY/1Hnytfi3ffzfuf5/mG/Pv5a/+l3s/wzfPzGy/fSLu/+3uve6P/EHzn7Qfyf/8DgR/pnsNv5KP/gli0P+/h4/Mb4uvHf/vct+8D//rz2fERX8/F3dducedzXR/i+3b3Wv8334s72tfm7XP/dV/7P5vnG/Ir73xT8I31v2+8t3L9fd/Kzt9I7/8QzH6Q3nj9e039NnXrXxy98+ftH3//vx57faN5+VjX1ydftx9h5c4P5Ud8Pb9z97W7+7m+vdb58ddfYXz/OOc32vdfuz3vfG1++df+z+b5hvzK+98U/ODsnL/57X4I+K3qYPmtauvLT8D5+/q9P+/L5/TOx9/9ed/+/nPj+SfyhTs/lB/x9YQ7r91//bn+29eu8f7X5td+7f9snm/Ir5y/KdZ/619+2F5+C5r9f3t754fg9TeMgz/9Y5//xc7aXH9LeZ/Tn/f7v2S6fvz3/7z/+y3w8vr8l59P8hFfz2T42v2bz1Uf3/9ndp13XrvK+Wvz6772fzbPN+QnT548+SA835CfPHny5IPwfEN+8uTJkw/C8w35yZMnTz4IzzfkJ0+ePPkQfPv2/wGASLj/JxC90gAAAABJRU5ErkJggg==`,
                  fit: [220, 130]
                 }]
              ],
            },
            layout: 'noBorders',
            absolutePosition:{x: 350, y: 35}
          },
          {
            columns: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 150,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 327, y: 88}
              },
              {
                // ใบจองสินค้าข้อความ header
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ใบจองสินค้า`, style: `header`,
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 385, y: 105}
              }
            ]
          },
          {
            columns: [
              {
                // fixed width
                width:300,
                table: {
                  body: [
                    [{
                      text: `บริษัท ซี เจ เอ็กเพรส กรุ๊ป จำกัด
                      339/4 ม.3 ต.ท่าเสา อ.ไทรโยค จ.กาญจนบุรี
                      Tel:
                      Fax:
                      สาขา: สาขาที่ 00123 ไทรโยค
                      ผู้บันทึก : นางสาว...........`, style: `text`,
                    }]
                  ]
                },
                layout: 'noBorders',
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เอกสารใบจองสินค้า(สำหรับพนักงาน)`, style: 'header',
                     }]
                  ],
                },
                layout: 'noBorders',
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 135,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: -40, y: 95}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ลูกค้า: (s0223746) name test
                      โทรศัพท์: 0861612681`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: -38, y: 110}
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 170,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 317, y: 123}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เลขที่เอกสาร :  CB19050101001-000039
                      วันที่เอกสาร : 2020-05-03`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 317, y: 138}
              }
            ]
          },
          this.table(this.item, ['seqNo','barCode','skuCode','skuName','sunSku','qtySku','price'],['ลำดับ','บาร์โค้ด','รหัสสินค้า','ชื่อสินค้า','หน่วย','จำนวนสินค้า','ราคา'],
          ),
          {
            width: 260,
            table: {
              body: [
                [{
                  text: `จองสินค้าวันที่.....................................................................`,
                  style: 'textCoDetail',alignment: 'center'
                 }],
                 [{
                  text: `ลูกค้า :.................................................................................................................`, style: 'textCoDetail',
                 }],
                 [{
                  text: `ตัวบรรจง`, style: 'textCoDetail',alignment: 'center'
                 }],
                 [{
                  text: `พนักงาน :.................................................................................................................`, style: 'textCoDetail',
                 }],
                 [{
                  text: `ตัวบรรจง`, style: 'textCoDetail',alignment: 'center',
                 }]
              ],
            },
            layout: 'noBorders',
          },
          //ส่วนของลูกค้า
          {
            // ตำแหน่งบาร์โค้ด
            width: 260,
            style: 'tableCustomer',
            table: {
              body: [
                [{
                  image: `data:image/png;base64,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`,
                  fit: [220, 130]
                 }]
              ],
            },
            layout: 'noBorders',
            absolutePosition:{x: 350, y: 445}
          },
          {
            columns: [
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 150,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 327, y: 495}
              },
              {
                // ใบจองสินค้าข้อความ header
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ใบจองสินค้า`, style: `coCustomerSection`,
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 385, y: 510}
              }
            ]
          },
          {
            columns: [
              {
                // fixed width
                width:300,
                table: {
                  body: [
                    [{
                      text: `บริษัท ซี เจ เอ็กเพรส กรุ๊ป จำกัด
                      339/4 ม.3 ต.ท่าเสา อ.ไทรโยค จ.กาญจนบุรี
                      Tel:
                      Fax:
                      สาขา: สาขาที่ 00123 ไทรโยค
                      ผู้บันทึก : นางสาว...........`, style: `text`,
                    }]
                  ]
                },
                layout: 'noBorders',
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เอกสารใบจองสินค้า(สำหรับลูกค้า)`, style: 'headerCustomer',
                     }]
                  ],
                },
                layout: 'noBorders',
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 135,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: -40, y: 500}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `ลูกค้า: (s0223746) name test
                      โทรศัพท์: 0861612681`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: -38, y: 515}
              }
            ]
          },
          {
            columns:[
              {
                canvas: [
                  {
                    type: 'rect',
                    x: 57,
                    y: 17,
                    w: 170,
                    h: 30,
                    r: 5,
                    lineColor: 'black',
                  },
                ],
                absolutePosition:{x: 317, y: 530}
              },
              {
                // fixed width
                width: 260,
                table: {
                  body: [
                    [{
                      text: `เลขที่เอกสาร :  CB19050101001-000039
                      วันที่เอกสาร : 2020-05-03`, style: 'textCoDetail',
                     }]
                  ],
                },
                layout: 'noBorders',
                absolutePosition:{x: 317, y: 546}
              }
            ]
          },
          this.table(this.item, ['seqNo','barCode','skuCode','skuName','sunSku','qtySku','price'],['ลำดับ','บาร์โค้ด','รหัสสินค้า','ชื่อสินค้า','หน่วย','จำนวนสินค้า','ราคา'],
          ),
        ],
        defaultStyle: {
          font: 'THSarabunNew',

        },
        styles : {
          header: {
            alignment: 'right',
            fontSize: 22,
            bold: true,
            margin: [35, 0, 0, 0],
          },
          headerCustomer:{
            alignment: 'right',
            fontSize: 22,
            bold: true,
            margin: [48, 0, 0, 0],
          },
          coCustomerSection:{
            alignment: 'right',
            fontSize: 22,
            bold: true,
            margin: [35, 0, 0, 0],
          },
          text:{
            margin: [5, 0, 0, 0],
          },
          textCoDetail:{
            margin: [65, 0, 0, 0],
          },
          tableItem: {
            margin: [10, 65, 0, 15]
          },
          tableCustomer: {
            margin: [5, 15, 0, 0]
          },
        }
      }
      this.pdf.generatePdf(docOnepage);
    }
  }
}
