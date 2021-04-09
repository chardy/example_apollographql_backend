// Journal Route
export const journalRoute = (app, { router }) => {
  // Sample data
  let journals = [
    {
      id: 1,
      name: "Journal 1"
    }
  ]

  // Index
  router.route('/journals').get((req, res) => {
    res.json({
      journals
    }).status(200)
  })

  // View
  router.route('/journals/:id').get((req, res) => {
    const { id } = req.params
    const journal = journals.find(i => i.id == id)
    res.json({
      journal
    }).status(200)
  })

  // Create
  router.route('/journals').post((req, res) => {
    const { name } = req.body
    let id = journals.length + 1
    const journal = { id, name }
    journals.push(journal)

    res.json({
      journal
    }).status(200)
  })

  // Update
  router.route('/journals/:id').patch((req, res) => {
    const { id } = req.params
    const { name } = req.body
    const journal = journals.find(i => i.id == id)
    journal.name = name

    res.json({
      journal
    }).status(200)
  })

  // Delete
  router.route('/journals/:id').delete((req, res) => {
    const { id } = req.params
    journals = journals.filter(e => e.id != id)
    res.json({
      success: true
    }).status(200)
  })
}