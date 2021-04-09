// Purchase Order Route
export const purchaseOrderRoute = (app, { router }) => {
  // Sample data
  let purchaseOrders = [
    {
      id: 1,
      name: "Purchase Order 1"
    }
  ]

  // Index
  router.route('/purchase_orders').get((req, res) => {
    res.json({
      purchaseOrders
    }).status(200)
  })

  // View
  router.route('/purchase_orders/:id').get((req, res) => {
    const { id } = req.params
    const purchaseOrder = purchaseOrders.find(i => i.id == id)
    res.json({
      purchaseOrder
    }).status(200)
  })

  // Create
  router.route('/purchase_orders').post((req, res) => {
    const { name } = req.body
    let id = purchaseOrders.length + 1
    const purchaseOrder = { id, name }
    purchaseOrders.push(purchaseOrder)

    res.json({
      purchaseOrder
    }).status(200)
  })

  // Update
  router.route('/purchase_orders/:id').patch((req, res) => {
    const { id } = req.params
    const { name } = req.body
    const purchaseOrder = purchaseOrders.find(i => i.id == id)
    purchaseOrder.name = name

    res.json({
      purchaseOrder
    }).status(200)
  })

  // Delete
  router.route('/purchase_orders/:id').delete((req, res) => {
    const { id } = req.params
    purchaseOrders = purchaseOrders.filter(e => e.id != id)
    res.json({
      success: true
    }).status(200)
  })
}