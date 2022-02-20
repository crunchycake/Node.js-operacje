import express from 'express'
import bodyParser from 'body-parser'
import { NewsManager } from './news-manager.js'

export class NewsServer {
	constructor(port) {
		this.server = express()
		this.server.use(bodyParser.json())
		this.port = port
		setupRoutes.call(this, this.server)
		this.newsManager = new NewsManager('../../news')
	}

	run() {
		this.server.listen(this.port, err => {
			if (err) {
				return console.log(`Brr, coś poszło nie tak: ${err}`)
			}
			console.log('Serwer działa na porcie', this.port)
		})
	}
}

function setupRoutes(server) {
	server.get('/news', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.json(this.newsManager.newsList())
	})
	server.post('/news', (req, res) => {
		const news = req.body.news
		const newsId = this.newsManager.addNews(news)
		res.status(200).send(`${newsId}`)
	})
	server.get('/news/:id', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		const news = this.newsManager.getNewsById(req.params.id)
		if (news) {
			res.json(news)
		} else {
			res.status(404).send(undefined)
		}
	})
}
