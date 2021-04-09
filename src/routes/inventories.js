// Inventory Route
export const inventoryRoute = (app, { router }) => {
  // Sample data
  let inventories = [
    {
      id: 1,
      name: "Inventory 1"
    }
  ]

  // Index
  router.route('/inventories').get((req, res) => {
    res.json({
      inventories
    }).status(200)
  })

  // View
  router.route('/inventories/:id').get((req, res) => {
    const { id } = req.params
    const inventory = inventories.find(i => i.id == id)
    res.json({
      inventory
    }).status(200)
  })

  // Create
  router.route('/inventories').post((req, res) => {
    const { name } = req.body
    let id = inventories.length + 1
    const inventory = { id, name }
    inventories.push(inventory)

    res.json({
      inventory
    }).status(200)
  })

  // Update
  router.route('/inventories/:id').patch((req, res) => {
    const { id } = req.params
    const { name } = req.body
    const inventory = inventories.find(i => i.id == id)
    inventory.name = name

    res.json({
      inventory
    }).status(200)
  })

  // Delete
  router.route('/inventories/:id').delete((req, res) => {
    const { id } = req.params
    inventories = inventories.filter(e => e.id != id)
    res.json({
      success: true
    }).status(200)
  })
}