// Sales Order Route
export const salesOrderRoute = (app, { router }) => {
  // Sample data
  let salesOrders = [
    {
      id: 1,
      name: "Sales Order 1"
    }
  ]

  // Index
  router.route('/sales_orders').get((req, res) => {
    res.json({
      salesOrders
    }).status(200)
  })

  // View
  router.route('/sales_orders/:id').get((req, res) => {
    const { id } = req.params
    const salesOrder = salesOrders.find(i => i.id == id)
    res.json({
      salesOrder
    }).status(200)
  })

  // Create
  router.route('/sales_orders').post((req, res) => {
    const { name } = req.body
    let id = salesOrders.length + 1
    const salesOrder = { id, name }
    salesOrders.push(salesOrder)

    res.json({
      salesOrder
    }).status(200)
  })

  // Update
  router.route('/sales_orders/:id').patch((req, res) => {
    const { id } = req.params
    const { name } = req.body
    const salesOrder = salesOrders.find(i => i.id == id)
    salesOrder.name = name

    res.json({
      salesOrder
    }).status(200)
  })

  // Delete
  router.route('/sales_orders/:id').delete((req, res) => {
    const { id } = req.params
    salesOrders = salesOrders.filter(e => e.id != id)

    res.json({
      success: true
    }).status(200)
  })
}