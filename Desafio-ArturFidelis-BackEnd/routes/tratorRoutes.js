const router = require('express').Router()
const Trator = require('../models/Trator')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null,`FunOfHeuristic_${file.originalname}`)
  }
})
const upload = multer({dest: 'uploads/'})

router.post('/', upload.single('img'), async (req, res) => {
    const { nome, marca, valor, image } = req.body
   const isNewTrator = await Trator.isThisNameInUse(nome);

  if (!isNewTrator)
    return res.json({
      sucess: false,
      message: 'nome ja usado',
    });

  if(!nome) {
        res.status(422).json({error: 'O nome é obrigatorio!'})
        return
    }
  
    const trator = {
      
      nome,
      marca,
      valor,
      image
    }
    
    try {
      await Trator.create(trator)
  
      res.status(201).json({ message: 'Trator inserido no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
  })

  // read - leitura de dados
  router.get('/', async (req, res) => {

    try {

        const tratores = await Trator.find()

        res.status(200).json(tratores)
        
    } catch (error) {
        res.status(500).json({ erro: error })
    }

  })

  router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const trator = await Trator.findOne({ _id: id })
        

        if(!trator) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(trator)

    } catch (error) {
        res.status(500).json({ erro: error })
    }

  })

  //Update - atualização de dados (PUT, PATCH)
  router.put('/:id', async (req, res) => {

    const id = req.params.id

    const { nome, marca, valor,  } = req.body

    const trator = {
  
      nome,
      marca,
      valor,
      
    }
  

    try {
      
      const updateTrator = await Trator.updateOne({_id: id}, trator)

      if(updateTrator.matchedCount === 0){
        res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
      }

      res.status(200).json(trator)
    } catch (error) {
      res.status(500).json({ erro: error })
    }

  })

  // Delete - deletar dados
  router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const trator = await Trator.findOne({ _id: id })

        if(!trator) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        try {

          await Trator.deleteOne({_id: id})

          res.status(200).json({message: 'Usuario removido com sucesso!'})
          
        } catch (error) {
          res.status(500).json({ erro: error })
        }
  })
  
  module.exports = router