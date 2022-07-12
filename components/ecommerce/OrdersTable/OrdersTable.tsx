import Table from '@/components/ui/Table';
import { formatMoney } from '@/utils/formatMoney';

interface Props {
  orders: any[]
}

const OrdersTable: React.FC<Props> = ({
  orders
}) => {
  // const columns = [
  //   "orderNumber",
  //   "processedAt",
  //   "fulfillmentStatus",
  //   "financialStatus",
  //   "totalPrice",
  // ]

  const columns = [
    {
      id: "",
      title: "Order Number",
      orderKey: "orderNumber",
    },
    {
      id: "",
      title: "Fulfillment Status",
      orderKey: "fulfillmentStatus",
    },
    {
      id: "",
      title: "Financial Status",
      orderKey: "financialStatus",
    },
    {
      id: "",
      title: "Total Price",
      orderKey: "totalPriceV2",
    }
  ]

  const table = {
    thead: columns.map((column) => ({
      _uid: column.id,
      value: column.title,
    })),

    tbody: orders.map((order) => ({
      _uid: order.id,
      body: columns.map((column) => {
        let value;

        switch (column.orderKey) {
          case 'totalPriceV2': 
            value = formatMoney(order.totalPriceV2.amount); 
            break;
          default: value = order[column.orderKey];
        }

        return ({
          _uid: order.id,
          value: value,
        })
      })
    })),
  }

  return (
    <div>
      <Table table={table} />
    </div>
  )
}

export default OrdersTable;
