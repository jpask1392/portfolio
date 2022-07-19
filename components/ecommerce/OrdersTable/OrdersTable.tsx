import Table from '@/components/ui/Table';
import { formatMoney } from '@/utils/formatMoney';

interface Props {
  orders: any[]
}

const OrdersTable: React.FC<Props> = ({
  orders
}) => {
  const columns = [
    {
      id: "1",
      title: "Order Number",
      orderKey: "orderNumber",
    },
    {
      id: "2",
      title: "Fulfillment Status",
      orderKey: "fulfillmentStatus",
    },
    {
      id: "3",
      title: "Financial Status",
      orderKey: "financialStatus",
    },
    {
      id: "4",
      title: "Total Price",
      orderKey: "totalPriceV2",
    }
  ]

  const table = {
    thead: columns.map((column) => ({
      _uid: column.id,
      value: column.title,
    })),

    tbody: orders.map((order, index) => ({
      _uid: order.id + "_" + index,
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
