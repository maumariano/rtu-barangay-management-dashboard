export default function handler(req, res) {
    res.status(200).end(JSON.stringify({ message:'Send Mail' }))
    }